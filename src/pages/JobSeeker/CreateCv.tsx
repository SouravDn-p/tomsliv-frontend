/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/common/Container";
import PersonalInfo from "@/components/CreateCv/PersonalInfo";
import { FormProvider, useForm } from "react-hook-form";
import { CVFormData } from "../../components/CreateCv/CVFormData.type";
import UploadCVForm from "@/components/CreateCv/UploadCVForm";
import Eligibility from "@/components/CreateCv/Eligibility";
import { SubmitSection } from "@/components/CreateCv/SubmitSection";
import { toast } from "sonner";
import { useSubmitCVMutation } from "@/redux/features/CV/cv.Api";
import { useGetCVQuery } from "@/redux/features/CV/cv.Api";
import { useEffect } from "react";

export default function CreateCv() {
  const [handelCv] = useSubmitCVMutation();
  const { data: cvData } = useGetCVQuery();
  // console.log("cvData", cvData?.data);
  const methods = useForm<CVFormData>({
    defaultValues: {
      workExperience: [{}],
      education: [{}],
      isPublic: false,
      hasDriverLicense: "",
      jobTitle: "",
      role: "",
      workType: "",
      availableFrom: "",
      careerSummary: "",
      eligibleToWork: "",
      workPermitType: "",
      fileId: "",
      coverLetterFileId: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      location: "",
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
        availableFrom: formatDate(cv.availability),
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
    // console.log(data);
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
      experiences: data.workExperience,
      educations: data.education,
      isPublic: data.isPublic,
    };
    console.log(payloadData);
    try {
      await handelCv(payloadData).unwrap();
      toast.success("CV created successfully");
    } catch (error) {
      console.log(error);
      toast.error("CV creation failed");
    }

    // methods.reset();
  };
  return (
    <Container className="max-w-[1240px] pb-[68px]" variant={"secondary"}>
      <h2 className="text-2xl text-primary-blue font-medium mb-">
        Create a New CV
      </h2>
      <p className="text-website-darkGray mb-6">
        Create your CV, upload quickly
      </p>
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
    </Container>
  );
}
