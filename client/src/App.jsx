import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

// Lazy load page components
const Login = lazy(() => import("./pages/Login"));
const HeroSection = lazy(() => import("./pages/student/HeroSection"));
const Courses = lazy(() => import("./pages/student/Courses"));
const MyLearning = lazy(() => import("./pages/student/MyLearning"));
const Profile = lazy(() => import("./pages/student/Profile"));
const SearchPage = lazy(() => import("./pages/student/SearchPage"));
const CourseDetail = lazy(() => import("./pages/student/CourseDetail"));
const CourseProgress = lazy(() => import("./pages/student/CourseProgress"));
const Sidebar = lazy(() => import("./pages/admin/Sidebar"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const CourseTable = lazy(() => import("./pages/admin/course/CourseTable"));
const AddCourse = lazy(() => import("./pages/admin/course/AddCourse"));
const EditCourse = lazy(() => import("./pages/admin/course/EditCourse"));
const CreateLecture = lazy(() => import("./pages/admin/lecture/CreateLecture"));
const EditLecture = lazy(() => import("./pages/admin/lecture/EditLecture"));


const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <>
                <HeroSection />
                <Courses />
              </>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AuthenticatedUser>
                <Login />
              </AuthenticatedUser>
            </Suspense>
          ),
        },
        {
          path: "my-learning",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "course/search",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "course-detail/:courseId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <PurchaseCourseProtectedRoute>
                  <CourseProgress />
                </PurchaseCourseProtectedRoute>
              </ProtectedRoute>
            </Suspense>
          ),
        },

        // admin routes
        {
          path: "admin",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute>
                <Sidebar />
              </AdminRoute>
            </Suspense>
          ),
          children: [
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              ),
            },
            {
              path: "course",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <CourseTable />
                </Suspense>
              ),
            },
            {
              path: "course/create",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AddCourse />
                </Suspense>
              ),
            },
            {
              path: "course/:courseId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <EditCourse />
                </Suspense>
              ),
            },
            {
              path: "course/:courseId/lecture",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateLecture />
                </Suspense>
              ),
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <EditLecture />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);


function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}


export default App;
