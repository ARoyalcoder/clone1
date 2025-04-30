import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import Razorpay from "../config/razorpay.js";
import crypto from "crypto"; 
 

export const createCheckoutSession = async (req, res) => {
  try {
      const userId = req.id;
      const { courseId } = req.body;

      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: "Course not found!" });

      const amount = course.coursePrice * 100;

      // Create Razorpay Order
      const order = await Razorpay.orders.create({
          amount,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: {
              courseId: courseId.toString(),
              userId: userId.toString(),
          },
      });
      if (!order) {
          return res.status(400).json({ success: false, message: "Error while creating Razorpay order" });
      }

      // Save the pending purchase in DB
      const newPurchase = new CoursePurchase({
          courseId,
          userId,
          amount: course.coursePrice,
          status: "pending",
          paymentId: order.id,
      });

      await newPurchase.save();

      // Set URLs based on environment
      const successUrl = process.env.NODE_ENV === 'production'
      ? `https://pwclone-nine.vercel.app/course-progress/${courseId}`
      : `http://localhost:5173/course-progress/${courseId}`;
  
  const cancelUrl = process.env.NODE_ENV === 'production'
      ? `https://pwclone-nine.vercel.app/course-detail/${courseId}`
      : `http://localhost:5173/course-detail/${courseId}`;
  
      return res.status(200).json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_PUBLISHABLE_KEY,
          courseTitle: course.courseTitle,
          thumbnail: course.courseThumbnail,
          successUrl,
          cancelUrl,
          url: null, // mimic Stripe response for frontend compatibility
      });
  } catch (error) {
      console.error("Checkout session error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const rawBody = req.body; // this will be Buffer because of express.raw()

  try {
      const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(rawBody)
          .digest("hex");

      if (signature !== expectedSignature) {
          console.log("Signature mismatch");
          return res.status(400).send("Webhook signature mismatch");
      }

      const event = JSON.parse(rawBody.toString('utf8'));

      if (event.event !== "payment.captured") {
          return res.status(200).send("Event received");
      }

      const { order_id, amount } = event.payload.payment.entity;

      const purchase = await CoursePurchase.findOne({ paymentId: order_id }).populate("courseId");
      if (!purchase) return res.status(404).json({ message: "Purchase not found" });
      if (purchase.status === "completed") {
          return res.status(200).send("Already processed");
      }

      purchase.status = "completed";
      purchase.amount = amount / 100;
      await purchase.save();

      if (purchase.courseId?.lectures?.length) {
          await Lecture.updateMany(
              { _id: { $in: purchase.courseId.lectures } },
              { $set: { isPreviewFree: true } }
          );
      }

      await Promise.all([
          User.findByIdAndUpdate(purchase.userId, {
              $addToSet: { enrolledCourses: purchase.courseId._id }
          }),
          Course.findByIdAndUpdate(purchase.courseId._id, {
              $addToSet: { enrolledStudents: purchase.userId }
          })
      ]);

      res.status(200).send("Payment processed successfully");

  } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
};





export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
