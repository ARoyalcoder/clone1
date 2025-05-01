import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "https://udemyclone-6z5o.onrender.com/api/v1/user/"
// const USER_API = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;



// import { createApi } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";
// import axiosBaseQuery from "../axiosBaseQuery.js";




// // const USER_API = "https://udemyclone-6z5o.onrender.com/api/v1/user/"
// const USER_API = "http://localhost:8080/api/v1/user/";
// console.log(USER_API);

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: axiosBaseQuery({ baseUrl: USER_API }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (inputData) => ({
//         url: "register",
//         method: "POST",
//         data: inputData
//       })
//     }),
//     loginUser: builder.mutation({
//       query: (inputData) => ({
//         url: "login",
//         method: "POST",
//         data: inputData
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }),
//     logoutUser: builder.mutation({
//       query: () => ({
//         url: "logout",
//         method: "GET"
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           await queryFulfilled;
//           dispatch(userLoggedOut());
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }),
//     loadUser: builder.query({
//       query: () => ({
//         url: "profile",
//         method: "GET"
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user }));
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }),
//     updateUser: builder.mutation({
//       query: (formData) => ({
//         url: "profile/update",
//         method: "PUT",
//         data: formData
//       })
//     })
//   })
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLogoutUserMutation,
//   useLoadUserQuery,
//   useUpdateUserMutation
// } = authApi;
