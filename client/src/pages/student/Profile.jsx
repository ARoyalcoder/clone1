// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState("");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   console.log(data);

//   const onChangeHandler = (e) => {
//     const file = e?.target?.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("profilePhoto", profilePhoto);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data?.message || "Profile updated.");
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data && data?.user;

//   console.log(user);
  

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user?.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, refetch, isError: isUserLoadError, error: userLoadError } = useLoadUserQuery();

  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    refetch(); // Ensures fresh user data on mount
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully.");
      refetch(); // Refresh user info after update
    }
    if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update profile.");
    }
  }, [isSuccess, isUpdateError, updateError, refetch]);

  const onChangeHandler = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePhoto(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const updateUserHandler = async () => {
    if (!name.trim() && !profilePhoto) {
      return toast.warning("Please provide name or photo to update.");
    }

    const formData = new FormData();
    if (name.trim()) formData.append("name", name.trim());
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    try {
      await updateUser(formData);
    } catch (err) {
      toast.error("An error occurred while updating.");
    }
  };

  if (isLoading) return <h1 className="text-center mt-10">Loading profile...</h1>;
  if (isUserLoadError) return <h1 className="text-red-500 text-center mt-10">Failed to load profile: {userLoadError?.data?.message || "Unknown error"}</h1>;

  const user = data?.user;

  if (!user) return <h1 className="text-center mt-10 text-gray-500">User data not available.</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt={user?.name || "User"}
              onError={(e) => {
                e.target.src = "https://github.com/shadcn.png";
              }}
            />
            <AvatarFallback>{(user?.name || "U")?.[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase() || "USER"}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg mb-2">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(user?.enrolledCourses) && user.enrolledCourses.length > 0 ? (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          ) : (
            <h1 className="col-span-full text-gray-500">
              You haven't enrolled in any courses yet.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
