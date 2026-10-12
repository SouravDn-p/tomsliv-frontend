import React, { useState, useEffect } from "react";
import { useUpdateFarmProfileMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

interface FarmProps {
  user?: any; // optional, for pre-filling fields if needed
}

const Farm: React.FC<FarmProps> = ({ user }) => {
  const [farmLogo, setFarmLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [herdSize, setHerdSize] = useState<number | "">("");
  const [farmType, setFarmType] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const [updateFarmProfile, { isLoading }] = useUpdateFarmProfileMutation();
  // Prefill form fields when user prop changes
  useEffect(() => {
    if (user) {
      setName(user.farm.name || "");
      setLocation(user.farm.location || "");
      setHerdSize(user.farm.herdSize || "");
      setFarmType(user.farm.farmType || "");
      setDescription(user.farm.description || "");
      setWebsite(user.farm.website || "");
      setLogoPreview(
        user.farm.logo?.url || user.farm.logo || user.logoUrl || null
      );
    }
  }, [user]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFarmLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateFarmProfile({
        name,
        location,
        herdSize: herdSize === "" ? undefined : herdSize,
        farmType,
        description,
        website,
        image: farmLogo || undefined,
      }).unwrap();
      toast.success("Farm profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update farm profile.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Farm Details</h3>

      {/* Upload Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Logo
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="farm-logo"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <label
            htmlFor="farm-logo"
            className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors overflow-hidden"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Farm Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-400">📷</span>
            )}
          </label>
          <div>
            <p className="text-xs text-gray-500">
              JPG, PNG or GIF. Max size 2MB
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Farm Name
        </label>
        <input
          type="text"
          placeholder="Green Valley Dairy Farm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Green Valley, Wisconsin"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Herd Size
          </label>
          <input
            type="number"
            placeholder="250"
            value={herdSize}
            onChange={(e) =>
              setHerdSize(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Farm Type
          </label>
          <input
            type="text"
            placeholder="Dairy"
            value={farmType}
            onChange={(e) => setFarmType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Farm Description
        </label>
        <textarea
          rows={4}
          placeholder="Describe your farm..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website (Optional)
        </label>
        <input
          type="url"
          placeholder="https://your-farm.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Farm;
