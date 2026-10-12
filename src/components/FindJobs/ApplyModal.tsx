/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogContentProps,
} from "@/components/animate-ui/components/radix/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useApplyWithNewCVMutation,
  useApplyWithSavedCVMutation,
  type CoreInfo,
  type Experience,
  type Education,
} from "@/redux/features/jobApplication/jobAppliction.Api";
import { useUploadFileMutation } from "@/redux/features/FileUpload/FileUpload.Api";
import { toast } from "sonner";
import { useState } from "react";

interface RadixDialogDemoProps {
  from?: DialogContentProps["from"];
  showCloseButton?: boolean;
  jobId?: string;
}

type ApplicationStep = "choice" | "newCVForm";

export const ApplyModal = ({
  from,
  showCloseButton,
  jobId,
}: RadixDialogDemoProps) => {
  const [step, setStep] = useState<ApplicationStep>("choice");
  const [open, setOpen] = useState(false);

  const [applyWithSavedCV, { isLoading: isApplying }] =
    useApplyWithSavedCVMutation();
  const [applyWithNewCV, { isLoading: isApplyingNew }] =
    useApplyWithNewCVMutation();
  const [uploadFile] = useUploadFileMutation();
  const [isUploading, setIsUploading] = useState(false);

  // Form state for new CV application
  const [formData, setFormData] = useState<{
    coreInfo: Partial<CoreInfo>;
    experiences: Experience[];
    educations: Education[];
    cvFile: File | null;
    coverLetterFile: File | null;
  }>({
    coreInfo: {
      jobType: "FULL_TIME",
      hasDrivingLicense: false,
      eligibleToWorkInNZ: false,
      workPermitType: "WORK_VISA",
    },
    experiences: [],
    educations: [],
    cvFile: null,
    coverLetterFile: null,
  });

  const handleApplyWithSavedCV = async () => {
    if (!jobId) {
      toast.error("Job ID is required");
      return;
    }
    try {
      await applyWithSavedCV(jobId as string).unwrap();
      toast.success("Application submitted successfully");
      setOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.data?.message || "Application submission failed");
    }
  };

  const handleNewCVClick = () => {
    setStep("newCVForm");
  };

  const handleBackToChoice = () => {
    setStep("choice");
  };

  const resetForm = () => {
    setStep("choice");
    setFormData({
      coreInfo: {
        jobType: "FULL_TIME",
        hasDrivingLicense: false,
        eligibleToWorkInNZ: false,
        workPermitType: "WORK_VISA",
      },
      experiences: [],
      educations: [],
      cvFile: null,
      coverLetterFile: null,
    });
  };

  const handleCoreInfoChange = (field: keyof CoreInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      coreInfo: { ...prev.coreInfo, [field]: value },
    }));
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadFile(file).unwrap();
      // Assuming the response structure based on UploadCVForm.tsx
      // response.data.files[0].id
      if (
        response &&
        response.data &&
        response.data.files &&
        response.data.files.length > 0
      ) {
        return response.data.files[0].id;
      }
      throw new Error("File upload failed: No ID returned");
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  };

  const handleSubmitNewCV = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobId) {
      toast.error("Job ID is required");
      return;
    }

    // Validation
    const { coreInfo, experiences, educations, cvFile } = formData;

    if (
      !coreInfo.firstName ||
      !coreInfo.lastName ||
      !coreInfo.email ||
      !coreInfo.phone
    ) {
      toast.error("Please fill in all required core information fields");
      return;
    }

    if (!cvFile) {
      toast.error("Please upload your CV/Resume");
      return;
    }

    try {
      setIsUploading(true);

      // Upload files first
      let fileId = "";
      try {
        fileId = await handleFileUpload(cvFile);
      } catch (uploadError) {
        console.error("CV upload error:", uploadError);
        setIsUploading(false);
        toast.error("Failed to upload CV. Please try again.");
        return;
      }

      let coverLetterFileId: string | undefined;

      if (formData.coverLetterFile) {
        try {
          coverLetterFileId = await handleFileUpload(formData.coverLetterFile);
        } catch (uploadError) {
          console.error("Cover Letter upload error:", uploadError);
          setIsUploading(false);
          toast.error("Failed to upload Cover Letter. Please try again.");
          return;
        }
      }

      // Prepare application data
      const applicationData = {
        fileId,
        coverLetterFileId,
        coreInfo: coreInfo as CoreInfo,
        experiences,
        educations,
      };

      await applyWithNewCV({ jobId, data: applicationData }).unwrap();
      toast.success("Application submitted successfully");
      setIsUploading(false);
      setOpen(false);
      resetForm();
    } catch (error: any) {
      setIsUploading(false);
      toast.error(error.data?.message || "Application submission failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="lg:w-fit md:w-fit w-full rounded-xl" variant={"primary"}>
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent
        from={from}
        showCloseButton={showCloseButton}
        className="w-[95vw] max-w-full sm:max-w-[520px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white border-none sm:p-6 md:p-8"
      >
        {step === "choice" ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply for this job</DialogTitle>
              <DialogDescription>
                Choose how you'd like to apply for this position
              </DialogDescription>
            </DialogHeader>
            <div className="flex mt-4 flex-col md:flex-row mb-4 items-center gap-4">
              <Button
                onClick={handleApplyWithSavedCV}
                className="flex-1 w-full"
                variant={"primary"}
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply with saved CV"}
              </Button>
              <Button
                onClick={handleNewCVClick}
                className="flex-1 w-full"
                variant={"outline"}
              >
                Apply with new CV
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitNewCV}>
            <DialogHeader>
              <DialogTitle>Apply with New CV</DialogTitle>
              <DialogDescription>
                Fill in your information to apply for this position
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Core Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.coreInfo.firstName || ""}
                      onChange={(e) =>
                        handleCoreInfoChange("firstName", e.target.value)
                      }
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.coreInfo.lastName || ""}
                      onChange={(e) =>
                        handleCoreInfoChange("lastName", e.target.value)
                      }
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.coreInfo.email || ""}
                      onChange={(e) =>
                        handleCoreInfoChange("email", e.target.value)
                      }
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.coreInfo.phone || ""}
                      onChange={(e) =>
                        handleCoreInfoChange("phone", e.target.value)
                      }
                      placeholder="+64 21 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 w-full">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.coreInfo.location || ""}
                    onChange={(e) =>
                      handleCoreInfoChange("location", e.target.value)
                    }
                    placeholder="Auckland, New Zealand"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    id="hasDrivingLicense"
                    checked={formData.coreInfo.hasDrivingLicense || false}
                    onChange={(e) =>
                      handleCoreInfoChange(
                        "hasDrivingLicense",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="hasDrivingLicense" className="cursor-pointer">
                    I have a driving license
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    id="eligibleToWorkInNZ"
                    checked={formData.coreInfo.eligibleToWorkInNZ || false}
                    onChange={(e) =>
                      handleCoreInfoChange(
                        "eligibleToWorkInNZ",
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor="eligibleToWorkInNZ"
                    className="cursor-pointer"
                  >
                    Eligible to work in New Zealand
                  </label>
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documents</h3>

                <div className="grid gap-3 w-full">
                  <Label htmlFor="cvFile">CV/Resume * (PDF, DOC, DOCX) </Label>
                  <Input
                    id="cvFile"
                    type="file"
                    accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cvFile: e.target.files?.[0] || null,
                      }))
                    }
                    className="file:text-[#4D7DB7]"
                    required
                  />
                  {formData.cvFile && (
                    <p className="text-sm text-gray-600">
                      Selected: {formData.cvFile.name}
                    </p>
                  )}
                </div>
                <div className="grid gap-3 w-full">
                  <Label htmlFor="coverLetterFile">Cover Letter (PDF, DOC, DOCX)</Label>
                  <Input
                    id="coverLetterFile"
                    type="file"
                    accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        coverLetterFile: e.target.files?.[0] || null,
                      }))
                    }
                    className="file:text-[#4D7DB7]"
                  />
                  {formData.coverLetterFile && (
                    <p className="text-sm text-gray-600">
                      Selected: {formData.coverLetterFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <Button
                type="button"
                onClick={handleBackToChoice}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isApplyingNew || isUploading}
              >
                {isUploading
                  ? "Uploading files..."
                  : isApplyingNew
                  ? "Submitting..."
                  : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
