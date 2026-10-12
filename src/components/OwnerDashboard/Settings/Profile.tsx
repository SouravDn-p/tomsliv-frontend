import React, { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

interface ProfileProps {
  user?: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Sync state when user prop changes
  useEffect(() => {
    if (user) {
      setProfileImage(user.profilePictureUrl || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setFullName(user.name || "");
    }
  }, [user]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB!");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Handle save
  const handleSave = async () => {
    try {
      await updateUser({
        name: fullName,
        phone,
        image: imageFile || undefined,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      {/* Profile Photo */}
      <div className="flex items-center gap-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full text-3xl text-gray-600">
            {user?.name
              .split(" ")
              .map((n: string) => n.charAt(0))
              .join("")}
          </div>
        )}

        <div>
          <input
            type="file"
            id="profile-photo"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="profile-photo"
            className="inline-block px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Change Photo
          </label>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG or GIF. Max size 2MB
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          readOnly
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
