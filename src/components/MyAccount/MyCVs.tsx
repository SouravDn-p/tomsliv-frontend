/* eslint-disable @typescript-eslint/no-explicit-any */
import { CVFormData } from "../CreateCv/CVFormData.type";
import { FormProvider, useForm } from "react-hook-form";
import PersonalInfo from "../CreateCv/PersonalInfo";
import UploadCVForm from "../CreateCv/UploadCVForm";
import Eligibility from "../CreateCv/Eligibility";
import { SubmitSection } from "../CreateCv/SubmitSection";
import { toast } from "sonner";
import { useGetCVQuery, useSubmitCVMutation } from "@/redux/features/CV/cv.Api";
import { useEffect } from "react";
import PageHeader from "../Reuseable/PageHeader";

export default function MyCVs() {
  const [submitCV] = useSubmitCVMutation();
  const { data: cvData } = useGetCVQuery();

  const methods = useForm<CVFormData>({
    defaultValues: {
      workExperience: [{} as any],
      education: [{} as any],
      isPublic: false,
    },
  });

  // Populate form with existing CV data if available
  useEffect(() => {
    if (cvData?.data) {
      const cv = cvData.data;

      // Format date to YYYY-MM-DD for date input
      const formatDate = (dateString: string | null) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
      };

      methods.reset({
        // Personal Information
        firstName: cv.firstName || "",
        lastName: cv.lastName || "",
        email: cv.email || "",
        phone: cv.phone || "",
        location: cv.location || "",

        // Job Details
        jobTitle: cv.jobTitle || "",
        workType: cv.jobType || "",
        // availableFrom: formatDate(cv.availability),
        careerSummary: cv.summary || "",

        // Work Experience
        workExperience:
          cv.experiences?.length > 0
            ? cv.experiences.map((exp: any) => ({
                jobTitle: exp.jobTitle || "",
                jobType: exp.jobType || "",
                company: exp.company || "",
                summary: exp.summary || "",
                startDate: formatDate(exp.startDate),
                endDate: formatDate(exp.endDate),
                isOngoing: exp.isOngoing || false,
              }))
            : [{}],

        // Education
        education:
          cv.educations?.length > 0
            ? cv.educations.map((edu: any) => ({
                degree: edu.degree || "",
                institution: edu.institution || "",
                startDate: formatDate(edu.startDate),
                endDate: formatDate(edu.endDate),
                isOngoing: edu.isOngoing || false,
              }))
            : [{}],

        // Eligibility
        hasDriverLicense: cv.hasDrivingLicense ? "true" : "false",
        eligibleToWork: cv.eligibleToWorkInNZ ? "true" : "false",
        workPermitType: cv.workPermitType || "",

        // Files
        fileId: cv.customCVId || "",
        coverLetterFileId: cv.customCoverLetterId || "",

        // Public status
        isPublic: cv.isSaved || false,

        role: "",
      });
    }
  }, [cvData, methods]);

  const onSubmit = async (data: CVFormData) => {
    const payloadData = {
      fileId: data.fileId,
      coverLetterFileId: data.coverLetterFileId,
      coreInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        location: data.location,
        // summary: data.careerSummary,
        // jobTitle: data.jobTitle,
        // jobType: data.workType,
        // availability: new Date(data.availableFrom).toISOString(),
        hasDrivingLicense: data.hasDriverLicense === "true" ? true : false,
        eligibleToWork: data.eligibleToWork,
        eligibleToWorkInNZ: data.workPermitType === "true" ? true : false,
        workPermitType: data.workPermitType,
      },
      // experiences: data.workExperience,
      // educations: data.education,
      isPublic: data.isPublic,
    };

    try {
      await submitCV(payloadData).unwrap();
      toast.success("CV updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update CV");
    }
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <PageHeader title="My CV" />
        </div>
      </div>
      {/* jobseeker cv form */}
      <div className="my-5">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <PersonalInfo />
            <UploadCVForm />
            <Eligibility />
            <SubmitSection />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
