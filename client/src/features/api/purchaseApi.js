// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // const COURSE_PURCHASE_API = "https://udemyclone-6z5o.onrender.com/api/v1/purchase";
// const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

// export const purchaseApi = createApi({
//   reducerPath: "purchaseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_PURCHASE_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     createCheckoutSession: builder.mutation({
//       query: (courseId) => ({
//         url: "/checkout/create-checkout-session",
//         method: "POST",
//         body: { courseId },
//       }),
//     }),
//     getCourseDetailWithStatus: builder.query({
//       query: (courseId) => ({
//         url: `/course/${courseId}/detail-with-status`,
//         method: "GET",
//       }),
//     }),
//     getPurchasedCourses: builder.query({
//       query: () => ({
//         url: `/`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateCheckoutSessionMutation,
//   useGetCourseDetailWithStatusQuery,
//   useGetPurchasedCoursesQuery,
// } = purchaseApi;





import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery"; 

const COURSE_PURCHASE_API = "https://udemyclone-6z5o.onrender.com/api/v1/purchase";
// const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

console.log(COURSE_PURCHASE_API);


export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: axiosBaseQuery({ baseUrl: COURSE_PURCHASE_API }),

  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        data: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
