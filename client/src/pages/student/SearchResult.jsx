// import { Badge } from "@/components/ui/badge";
// import React from "react";
// import { Link } from "react-router-dom";

// const SearchResult = ({ course }) => {
   
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
//       <Link
//         to={`/course-detail/${course._id}`}
//         className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
//       >
//         <img
//           src={course.courseThumbnail}
//           alt="course-thumbnial"
//           className="h-32 w-full md:w-56 object-cover rounded"
//         />
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
//           <p className="text-sm text-gray-600">{course.subTitle}</p>
//           <p className="text-sm text-gray-700">
//             Intructor: <span className="font-bold">{course.creator?.name}</span>{" "}
//           </p>
//           <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
//         </div>
//       </Link>
//       <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
//         <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;


import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  // Fallbacks for missing course object
  if (!course || typeof course !== "object") {
    return (
      <div className="text-red-500 font-semibold p-4 border border-red-300 rounded">
        Course information is not available.
      </div>
    );
  }

  const {
    _id,
    courseTitle = "Untitled Course",
    subTitle = "No description available.",
    coursePrice = 0,
    courseThumbnail,
    courseLevel = "Unknown Level",
    creator = {},
  } = course;

  const instructorName = creator?.name || "Unknown Instructor";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${_id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={courseThumbnail || "/default-thumbnail.jpg"}
          alt="course-thumbnail"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-thumbnail.jpg";
          }}
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{courseTitle}</h1>
          <p className="text-sm text-gray-600">{subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold">{instructorName}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">
          ₹{isNaN(coursePrice) ? 0 : coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
