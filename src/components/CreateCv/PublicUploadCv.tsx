import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useUploadFileMutation } from "@/redux/features/FileUpload/FileUpload.Api";

export default function PublicUploadCv() {
  const form = useFormContext<CVFormData>();
  const [uploadFile] = useUploadFileMutation();
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [isUploadingCoverLetter, setIsUploadingCoverLetter] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCV(true);

    try {
      // Upload file immediately
      const response = await uploadFile(file).unwrap();

      const fileId = response.data.files[0].id;
      form.setValue("fileId", fileId);
      // console.log("File uploaded successfully, ID set in form:", fileId);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploadingCV(false);
    }
  };

  const handleCoverLetterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCoverLetter(true);

    try {
      // Upload cover letter file
      const response = await uploadFile(file).unwrap();

      const fileId = response.data.files[0].id;
      form.setValue("coverLetterFileId", fileId);
      // console.log(
      //   "Cover letter uploaded successfully, ID set in form:",
      //   fileId
      // );
    } catch (err) {
      console.error("Cover letter upload failed:", err);
    } finally {
      setIsUploadingCoverLetter(false);
    }
  };

  return (
    <div className="p-6 border border-border-primary rounded-2xl flex flex-col gap-4">
      <h2 className="text-xl font-semibold"> Upload CV & Cover Letter </h2>

      {/* CV Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          CV(PDF) <span className="text-red-500">* </span>
        </label>
        <FormField
          control={form.control}
          name="fileId"
          rules={{ required: "Please upload your CV" }}
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e)}
                  disabled={isUploadingCV}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isUploadingCV && (
          <p className="text-sm text-muted-foreground"> Uploading CV...</p>
        )}
      </div>

      {/* Cover Letter Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Cover Letter(PDF) <span className="text-gray-400"> (Optional) </span>
        </label>
        <FormField
          control={form.control}
          name="coverLetterFileId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleCoverLetterChange(e)}
                  disabled={isUploadingCoverLetter}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isUploadingCoverLetter && (
          <p className="text-sm text-muted-foreground">
            Uploading cover letter...
          </p>
        )}
      </div>
    </div>
  );
}
