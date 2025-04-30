// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import { Link } from "react-router-dom";

// const Course = ({course}) => {
//   return (
//     <Link to={`/course-detail/${course._id}`}>
//     <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//       <div className="relative">
//         <img
//           src={course.courseThumbnail}
//           alt="course"
//           className="w-full h-36 object-cover rounded-t-lg"
//         />
//       </div>
//       <CardContent className="px-5 py-4 space-y-3">
//         <h1 className="hover:underline font-bold text-lg truncate">
//           {course.courseTitle}
//         </h1>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={course?.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <h1 className="font-medium text-sm">{course?.creator?.name}</h1>
//           </div>
//           <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
//             {course.courseLevel}
//           </Badge>
//         </div>
//         <div className="text-lg font-bold">
//             <span>₹{course.coursePrice}</span>
//         </div>
//       </CardContent>
//     </Card>
//     </Link>
//   );
// };

// export default Course;



import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  // Safeguard for undefined course
  if (!course || typeof course !== "object") {
    return (
      <Card className="p-4 text-center text-red-600 font-semibold">
        Invalid course data.
      </Card>
    );
  }

  const {
    _id,
    courseThumbnail = "https://via.placeholder.com/300x150.png?text=No+Image",
    courseTitle = "Untitled Course",
    courseLevel = "Unknown Level",
    coursePrice = "N/A",
    creator = {}
  } = course;

  const creatorName = creator?.name || "Unknown Creator";
  const creatorImage = creator?.photoUrl || "https://github.com/shadcn.png";

  return (
    <Link to={_id ? `/course-detail/${_id}` : "#"}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-36 object-cover rounded-t-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x150.png?text=No+Image";
            }}
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={creatorImage}
                  alt={creatorName}
                  onError={(e) => {
                    e.target.src = "https://github.com/shadcn.png";
                  }}
                />
                <AvatarFallback>
                  {creatorName?.[0] || "C"}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm truncate max-w-[120px]">
                {creatorName}
              </h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            {coursePrice !== "N/A" ? <span>₹{coursePrice}</span> : <span>Free</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
