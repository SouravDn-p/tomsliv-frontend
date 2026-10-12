import Container from "@/common/Container";
import PersonalInfo from "@/components/CreateCv/PersonalInfo";
import { FormProvider, useForm } from "react-hook-form";
import { CVFormData } from "../../components/CreateCv/CVFormData.type";
import { JobDetailsForm } from "@/components/CreateCv/JobDetailsForm";
import { WorkExperience } from "@/components/CreateCv/WorkExperience";
import { EducationForm } from "@/components/CreateCv/EductionForm";
import Eligibility from "@/components/CreateCv/Eligibility";
import { SubmitSection } from "@/components/CreateCv/SubmitSection";
import { toast } from "sonner";
import { useCreatePublicCVMutation } from "@/redux/features/CV/cv.Api";
import PublicUploadCv from "@/components/CreateCv/PublicUploadCv";

export default function PublicCv() {
  const [handelCv] = useCreatePublicCVMutation();
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

  const onSubmit = async (data: CVFormData) => {
    console.log(data);
    const payloadData = {
      fileId: data.fileId,
      coverLetterFileId: data.coverLetterFileId,
      coreInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        location: data.location,
        summary: data.careerSummary,
        jobTitle: data.jobTitle,
        jobType: data.workType,
        availability: new Date(data.availableFrom).toISOString(),
        hasDrivingLicense: data.hasDriverLicense === "true" ? true : false,
        eligibleToWork: data.eligibleToWork,
        eligibleToWorkInNZ: data.workPermitType === "true" ? true : false,
        workPermitType: data.workPermitType,
      },
      experiences: data.workExperience,
      educations: data.education,
      isPublic: data.isPublic,
    };
    // console.log(payloadData);
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
      <h2 className="text-2xl text-primary-blue font-medium mb-"> Upload CV</h2>
      <p className="text-website-darkGray mb-6">Upload your CV, cover letter</p>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <PersonalInfo />
          <JobDetailsForm />
          <WorkExperience />
          <EducationForm />
          <PublicUploadCv />
          <Eligibility />
          <SubmitSection />
        </form>
      </FormProvider>
    </Container>
  );
}
