// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_PROGRESS_API = "http://localhost:8080/api/v1/progress";
// // const COURSE_PROGRESS_API = "https://udemyclone-6z5o.onrender.com/api/v1/progress";

// export const courseProgressApi = createApi({
//   reducerPath: "courseProgressApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_PROGRESS_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getCourseProgress: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "GET",
//       }),
//     }),
//     updateLectureProgress: builder.mutation({
//       query: ({ courseId, lectureId }) => ({
//         url: `/${courseId}/lecture/${lectureId}/view`,
//         method:"POST"
//       }),
//     }),

//     completeCourse: builder.mutation({
//         query:(courseId) => ({
//             url:`/${courseId}/complete`,
//             method:"POST"
//         })
//     }),
//     inCompleteCourse: builder.mutation({
//         query:(courseId) => ({
//             url:`/${courseId}/incomplete`,
//             method:"POST"
//         })
//     }),
    
//   }),
// });
// export const {
// useGetCourseProgressQuery,
// useUpdateLectureProgressMutation,
// useCompleteCourseMutation,
// useInCompleteCourseMutation
// } = courseProgressApi;



import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery"; // adjust path as needed

// const COURSE_PROGRESS_API = "http://localhost:8080/api/v1/progress";
const COURSE_PROGRESS_API = "https://udemyclone-6z5o.onrender.com/api/v1/progress";

console.log(COURSE_PROGRESS_API);



export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: axiosBaseQuery({ baseUrl: COURSE_PROGRESS_API }),

  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;
