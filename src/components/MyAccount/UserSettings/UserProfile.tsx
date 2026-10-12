import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";
import BorderWrapper from "@/components/Reuseable/BorderWrapper";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";

export default function UserProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Image
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data: user } = useGetCurrentUserQuery();
  const [upadateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user?.data) {
      setFullName(user.data.name);
      setEmail(user.data.email);
      setPhoneNumber(user.data.phone);
      setPreview(user.data.profilePictureUrl);
      setFile(null);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size >= 2 * 1024 * 1024) {
      return toast.error("File size should be less than 2MB");
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      fullName,
      email,
      phoneNumber,
      file,
    };
    toast.loading("Updating profile...");
    try {
      const res = await upadateUser({
        name: formData.fullName,
        phone: formData.phoneNumber,
        image: formData.file ? formData.file : undefined,
      }).unwrap();
      toast.dismiss();
      toast.success(res.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    // You can send `formData` to your API here
  };

  return (
    <BorderWrapper className=" md:p-6 p-4">
      <h2 className="text-xl">Personal Information</h2>
      <div className="border border-divider-lightBlue h-[0.5px] my-8" />

      {/* user image */}
      <div className="flex gap-4 items-center justify-between ">
        <div className="text-secondary-CobaltBlue bg-[#E9EFF6] rounded-full overflow-hidden flex items-center justify-center size-16">
          {preview ? (
            <img
              className="size-full object-cover"
              src={preview}
              alt="preview"
            />
          ) : (
            <ImageUp />
          )}
        </div>
        <div className="space-y-3.5">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            className="border border-[#E9EFF6]"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="default"
          >
            Upload Image
          </Button>
          <p className="text-paragraph-secondary-gray">
            JPG, PNG or GIF. Max size 2MB
          </p>
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-8">
        <div className="col-span-2">
          <Label>Full Name</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John"
          />
        </div>
        {/* <div>
          <Label>Last Name</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div> */}
        <div className="col-span-2">
          <Label>Email</Label>
          <Input
            value={email}
            readOnly={true}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="john@dairy.farm"
          />
        </div>
        <div className="col-span-2">
          <Label>Phone Number</Label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="(+64 000 123 456)"
          />
        </div>

        <Button
          type="submit"
          disabled={isUpdating}
          className="col-span-2 ml-auto w-fit"
          variant="primary"
        >
          {isUpdating ? "Saving..." : "Save & Changes"}
        </Button>
      </form>
    </BorderWrapper>
  );
}
