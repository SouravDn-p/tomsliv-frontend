import React, { useState, useEffect, useRef } from "react";
import { useUpdateAdminProfileMutation } from "@/redux/features/adminSettings/adminSettingsApi";
import { AdminUser } from "@/redux/types/adminSettings";
import { toast } from "sonner";

interface ProfileInfoProps {
  user?: AdminUser | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateAdminProfileMutation();

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      if (user.profilePictureUrl) {
        setImagePreview(user.profilePictureUrl);
      } else {
        setImagePreview(""); // fallback
      }
    }
  }, [user]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setIsEditing(true);
  };

  // Trigger hidden file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Save profile changes
  const handleSave = async () => {
    if (!user) return;
    try {
      const updateData: any = {};
      if (name !== user.name) updateData.name = name;
      if (phone !== user.phone) updateData.phone = phone;
      if (profileImage) updateData.image = profileImage;

      if (Object.keys(updateData).length === 0) return;

      const result = await updateProfile(updateData).unwrap();

      if (result.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setProfileImage(null);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const avatarSrc = imagePreview || user?.profilePictureUrl || "";

  return (
    <div className="w-full mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Personal Information
          </h2>

          <div className="flex items-center space-x-4">
            <button
              onClick={triggerFileInput}
              className="px-4 py-2 cursor-pointer  text-[#205CA5] font-medium  hover:text-[#205CA5] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-colors duration-200"
            >
              Upload Photo
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-semibold text-gray-500">
                {user?.name?.[0]?.toUpperCase() ?? ""}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {user?.name || "Loading..."}
            </h3>
            <p className="text-gray-500 capitalize">
              {user?.role?.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsEditing(true);
              }}
              className="w-full bg-[#E8EAEB] border-none rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setIsEditing(true);
              }}
              className="w-full bg-[#E8EAEB] border-none rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full bg-gray-100 border-none rounded-xl p-3 focus:outline-none cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleSave}
          disabled={!isEditing || isUpdating}
          className={`text-lg flex justify-center cursor-pointer items-center gap-2.5 w-full sm:w-[206px] h-[52px] px-4 py-[15px] rounded-lg text-white mt-4 ${
            isEditing && !isUpdating
              ? "bg-[#205CA5] hover:bg-[#0a458d]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUpdating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;

// import React, { useState, useEffect, useRef } from "react";
// import { useUpdateAdminProfileMutation } from "@/redux/features/adminSettings/adminSettingsApi";
// import { AdminUser } from "@/redux/types/adminSettings";

// interface ProfileInfoProps {
//   user?: AdminUser | null;
// }

// const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [isEditing, setIsEditing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [updateProfile, { isLoading: isUpdating }] =
//     useUpdateAdminProfileMutation();

//   // Initialize form with user data
//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//       setPhone(user.phone || "");
//       setEmail(user.email || "");
//       if (user.profilePictureUrl) {
//         setImagePreview(user.profilePictureUrl);
//       } else {
//         setImagePreview(""); // fallback
//       }
//     }
//   }, [user]);

//   // Handle image selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setProfileImage(file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//     setIsEditing(true);
//   };

//   // Trigger hidden file input
//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   // Save profile changes
//   const handleSave = async () => {
//     if (!user) return;
//     try {
//       const updateData: any = {};
//       if (name !== user.name) updateData.name = name;
//       if (phone !== user.phone) updateData.phone = phone;
//       if (profileImage) updateData.image = profileImage;

//       if (Object.keys(updateData).length === 0) return;

//       const result = await updateProfile(updateData).unwrap();

//       if (result.success) {
//         alert("Profile updated successfully!");
//         setIsEditing(false);
//         setProfileImage(null);
//       }
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   const avatarSrc = imagePreview || user?.profilePictureUrl || "";

//   return (
//     <div className="w-full mx-auto space-y-5">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Admin Personal Information
//           </h2>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={triggerFileInput}
//               className="px-4 py-2 cursor-pointer  text-[#205CA5] font-medium  hover:text-[#205CA5] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-colors duration-200"
//             >
//               Upload Photo
//             </button>

//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageChange}
//               accept="image/*"
//               className="hidden"
//             />
//           </div>
//         </div>

//         {/* Profile Info */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//             {avatarSrc ? (
//               <img
//                 src={avatarSrc}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-2xl font-semibold text-gray-500">
//                 {user?.name?.[0]?.toUpperCase() ?? ""}
//               </div>
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-medium text-gray-900">
//               {user?.name || "Loading..."}
//             </h3>
//             <p className="text-gray-500 capitalize">
//               {user?.role?.toLowerCase().replace("_", " ")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setIsEditing(true);
//               }}
//               className="w-full bg-[#E8EAEB] border-none rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2">Phone</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => {
//                 setPhone(e.target.value);
//                 setIsEditing(true);
//               }}
//               className="w-full bg-[#E8EAEB] border-none rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-gray-700 mb-2">E-mail</label>
//             <input
//               type="email"
//               value={email}
//               readOnly
//               className="w-full bg-gray-100 border-none rounded-xl p-3 focus:outline-none cursor-not-allowed"
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Email cannot be changed
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end items-center">
//         <button
//           onClick={handleSave}
//           disabled={!isEditing || isUpdating}
//           className={`text-lg flex justify-center cursor-pointer items-center gap-2.5 w-full sm:w-[206px] h-[52px] px-4 py-[15px] rounded-lg text-white mt-4 ${
//             isEditing && !isUpdating
//               ? "bg-[#205CA5] hover:bg-[#0a458d]"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {isUpdating ? (
//             <>
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               Saving...
//             </>
//           ) : (
//             "Save changes"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;
