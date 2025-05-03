import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path"



dotenv.config({});

// call database connection here
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();



// white listing 
const whitelist = [
    "http://localhost:5173",
    // "https://willowy-blancmange-d6ba0c.netlify.app",
    // "https://your-production-domain.com"
];
// https://willowy-blancmange-d6ba0c.netlify.app/my-learning
// console.log(whitelist); 

// ⚡ Handle webhook raw body FIRST
app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || whitelist.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true
// }));

app.use(cors({
    origin: 'http://localhost:5173', // allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    credentials: true // allow cookies
  }));


// default middleware
app.use(express.json());
app.use(cookieParser());


// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);



app.use(express.static(path.join(_dirname, "/client/dist")));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});



