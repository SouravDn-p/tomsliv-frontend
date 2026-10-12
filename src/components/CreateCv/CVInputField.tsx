import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useUploadFileMutation } from "@/redux/features/FileUpload/FileUpload.Api";

export default function UploadCVForm() {
  const form = useFormContext<CVFormData>();
  const [uploadFile] = useUploadFileMutation();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Upload file immediately
      const response = await uploadFile(file).unwrap();

      // Set the uploaded file's ID in the form state
      const fileId = response.data.files[0].id;
      form.setValue("fileId", fileId);

      // console.log("File uploaded successfully, ID set in form:", fileId);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 border border-border-primary rounded-2xl flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Upload CV</h2>
      <FormField
        control={form.control}
        name="fileId" // this should match the form state field that stores the file ID
        rules={{ required: "Please upload your CV" }}
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                required
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e)}
                disabled={isUploading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}
    </div>
  );
}
