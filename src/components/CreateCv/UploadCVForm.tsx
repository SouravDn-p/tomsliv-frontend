import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useUploadFileMutation } from "@/redux/features/FileUpload/FileUpload.Api";
import { useGetCVQuery } from "@/redux/features/CV/cv.Api";
import { Download, FileText } from "lucide-react";

export default function UploadCVForm() {
  const form = useFormContext<CVFormData>();
  const [uploadFile] = useUploadFileMutation();
  const { data: cvData } = useGetCVQuery();
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [isUploadingCoverLetter, setIsUploadingCoverLetter] = useState(false);

  // Get existing file data
  const existingCV = cvData?.data?.customCV;
  const existingCoverLetter = cvData?.data?.customCoverLetter;

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

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
      <h2 className="text-xl font-semibold">Upload CV & Cover Letter</h2>

      {/* CV Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          CV (PDF or Word){" "}
          {existingCV ? (
            <span className="text-gray-400">(Optional)</span>
          ) : (
            <span className="text-red-500">*</span>
          )}
        </label>
        <FormField
          control={form.control}
          name="fileId"
          rules={{ required: existingCV ? false : "Please upload your CV" }}
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  required={!existingCV}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => handleFileChange(e)}
                  disabled={isUploadingCV}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isUploadingCV && (
          <p className="text-sm text-muted-foreground">Uploading CV...</p>
        )}
        {existingCV && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Current CV: {existingCV.originalFilename}
                </p>
                <p className="text-xs text-green-600">
                  Size: {formatFileSize(existingCV.size)}
                </p>
              </div>
            </div>
            <a
              href={existingCV.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-green-700 hover:text-green-900 hover:underline"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        )}
      </div>

      {/* Cover Letter Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Cover Letter (PDF or Word){" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <FormField
          control={form.control}
          name="coverLetterFileId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
        {existingCoverLetter && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Current Cover Letter: {existingCoverLetter.originalFilename}
                </p>
                <p className="text-xs text-blue-600">
                  Size: {formatFileSize(existingCoverLetter.size)}
                </p>
              </div>
            </div>
            <a
              href={existingCoverLetter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 hover:underline"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
