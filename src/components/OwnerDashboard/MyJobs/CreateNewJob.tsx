/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from "@/redux/features/Farmowner/JobsApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateJobByAIMutation } from "@/redux/features/ai/aiApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobDetailByIdQuery } from "@/redux/features/Job/JobApi";
import PaymentModal from "@/components/Payment/PaymentModal";
import { useState, useEffect } from "react";
import { JOB_TEMPLATES } from "@/constants/jobTemplates";
import { SaveTemplateModal } from "./SaveTemplateModal";

const SAVED_TEMPLATES_KEY = "farmlink_user_templates";

interface JobFormData {
  title: string;
  description: string;
  benefits: string;
  farmSize: string;
  herdSize: string;
  onFarmStaff: string;
  location: string;
  locationType: string;
  jobType: string;
  role: string;
  numberOfPositions: string;
  requiredExperience: string;
  applicationDeadline: string;
  positionStartDate: string;
  hoursPerWeek: string;
  roster: string;
  remunerationPaidBy: string;
  remunerationType: string;
  remunerationStart: string;
  remunerationEnd: string;
  totalPackageValue: string;
  perKgMSDollarValue: string;
  percentageOfMilkCheque: string;
}

const CreateNewJob: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { data: jobDetailData, isLoading: isLoadingJob } =
    useGetJobDetailByIdQuery(id as string, {
      skip: !isEditMode,
    });
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [createJobByAI, { isLoading: isLoadingAI }] =
    useCreateJobByAIMutation();

  const [paymentState, setPaymentState] = useState<{
    isOpen: boolean;
    clientSecret: string;
    amount: number;
  }>({
    isOpen: false,
    clientSecret: "",
    amount: 0,
  });

  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const [selectedTemplateValue, setSelectedTemplateValue] = useState<string>("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [overwriteConfirmOpen, setOverwriteConfirmOpen] = useState(false);
  const [pendingTemplateName, setPendingTemplateName] = useState("");

  // Load user templates from local storage
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_TEMPLATES_KEY);
    if (saved) {
      try {
        setUserTemplates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user templates", e);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    defaultValues: {
      title: "",
      description: "",
      benefits: "",
      locationType: "Single farm",
      farmSize: "",
      herdSize: "",
      onFarmStaff: "",
      location: "",
      jobType: "",
      role: "",
      numberOfPositions: "",
      requiredExperience: "",
      applicationDeadline: "",
      positionStartDate: "",
      hoursPerWeek: "",
      roster: "",
      remunerationPaidBy: "man",
      remunerationType: "",
      remunerationStart: "",
      remunerationEnd: "",
      totalPackageValue: "",
      perKgMSDollarValue: "",
      percentageOfMilkCheque: "",
    },
  });

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  React.useEffect(() => {
    if (jobDetailData?.data && isEditMode) {
      const job = jobDetailData.data;
      reset({
        title: job.title,
        description: job.description,
        benefits: job.benefits,
        farmSize: job.farmSize?.toString(),
        herdSize: job.herdSize?.toString(),
        onFarmStaff: job.onFarmStaff?.toString(),
        location: job.location,
        locationType: job.locationType,
        jobType: job.jobType,
        role: job.role,
        numberOfPositions: job.numberOfPositions?.toString(),
        requiredExperience: job.requiredExperience?.toString(),
        applicationDeadline: formatDateForInput(job.applicationDeadline),
        positionStartDate: formatDateForInput(job.positionStartDate),
        hoursPerWeek: job.hoursPerWeek?.toString(),
        roster: job.roster,
        remunerationPaidBy: job.remunerationPaidBy,
        remunerationType: job.remunerationType,
        remunerationStart: job.remunerationStart?.toString(),
        remunerationEnd: job.remunerationEnd?.toString(),
        totalPackageValue: job.totalPackageValue?.toString(),
        perKgMSDollarValue: job.perKgMSDollarValue?.toString(),
        percentageOfMilkCheque: job.percentageOfMilkCheque?.toString(),
      });
    }
  }, [jobDetailData, reset, isEditMode]);

  const onSubmit = async (data: JobFormData) => {
    const formatToISO = (datetime: string) => {
      if (!datetime) return null;
      const date = new Date(datetime);
      return date.toISOString();
    };

    const formattedData = {
      ...data,
      farmSize: parseInt(data.farmSize) || 0,
      herdSize: parseInt(data.herdSize) || 0,
      onFarmStaff: parseFloat(data.onFarmStaff) || 0,
      numberOfPositions: parseInt(data.numberOfPositions) || 0,
      requiredExperience: parseInt(data.requiredExperience) || 0,
      hoursPerWeek: parseInt(data.hoursPerWeek) || 0,
      remunerationStart: parseFloat(data.remunerationStart) || 0,
      remunerationEnd: parseFloat(data.remunerationEnd) || 0,
      totalPackageValue: parseFloat(data.totalPackageValue) || 0,
      perKgMSDollarValue: parseFloat(data.perKgMSDollarValue) || 0,
      percentageOfMilkCheque: parseFloat(data.percentageOfMilkCheque) || 0,
      applicationDeadline: formatToISO(data.applicationDeadline),
      positionStartDate: formatToISO(data.positionStartDate),
    };

    // console.log("Formatted Data:", formattedData);
    toast.loading(isEditMode ? "Updating job..." : "Creating job...");
    try {
      if (isEditMode) {
        const response = await updateJob({
          id: id as string,
          data: formattedData,
        }).unwrap();
        toast.dismiss();
        toast.success(response.message);
      } else {
        const response = await createJob(formattedData).unwrap();
        toast.dismiss();

        if (response.data?.clientSecret) {
          setPaymentState({
            isOpen: true,
            clientSecret: response.data.clientSecret,
            amount: response.data.pricing?.pricePaid || 250,
          });
          return; // Wait for payment
        }

        toast.success(response.message);
      }
      navigate(-1); // Go back to previous page
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        error.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} job`,
      );
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} job:`,
        error,
      );
    }
  };

  const onCreateAI = async () => {
    const aiRequestBody = {
      basicInformation: {
        jobTitle: watch("title"),
        farmSize_ha: watch("farmSize"),
        peakHerdSize_cows: watch("herdSize"),
        typicalOnFarmStaff: watch("onFarmStaff"),
        closingDateForApplications: watch("applicationDeadline"),
        positionStartDate: watch("positionStartDate"),
      },
      jobDescription: {
        primaryLocation: {
          type: watch("locationType") || "Single farm",
          options: ["Single farm", "Multiple farm", "Corporate farm"],
        },
        role: watch("role"),
        workType: watch("jobType"),
      },
      workingInformation: {
        averageHoursPerWeek: watch("hoursPerWeek"),
        roster: watch("roster"),
        remunerationPaidBy: watch("remunerationPaidBy"),
        remunerationIfHourlyDailyWeeklyMonthlyYearly: {
          from: watch("remunerationStart"),
          to: watch("remunerationEnd"),
          period: watch("remunerationType") || "Yearly",
        },
        remunerationIfTotalPackageValue: watch("totalPackageValue"),
        remunerationIfPerKgMS: watch("perKgMSDollarValue"),
        remunerationIfPercentageOfMilkCheque: watch("percentageOfMilkCheque"),
      },
    };
    console.log(aiRequestBody);
    toast.loading("Generating job description with AI...");
    try {
      const response = await createJobByAI({
        body: aiRequestBody,
        params: {
          jobdescription: watch("description"),
          benefitsAndPerks: watch("benefits"),
        },
      }).unwrap();
      toast.dismiss();
      toast.success("Job description generated successfully");
      setValue("description", response.fullJobDescription);
      setValue("benefits", response.benefitsAndPerks.description);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate job description with AI");
      console.error("Error generating job description with AI:", error);
    }
  };

  const handleApplyTemplate = (templateData: any) => {
    reset({
      ...watch(), // Keep current values for things not in template
      ...templateData,
    });
    toast.success("Template applied successfully");
  };

  const handleSaveAsTemplate = (templateName: string) => {
    const currentData = watch();

    const existingIndex = userTemplates.findIndex((t) => t.name === templateName);
    if (existingIndex !== -1) {
      setPendingTemplateName(templateName);
      setOverwriteConfirmOpen(true);
      return;
    }

    const newTemplate = {
      name: templateName,
      data: currentData,
    };

    const updatedTemplates = [...userTemplates, newTemplate];
    setUserTemplates(updatedTemplates);
    localStorage.setItem(SAVED_TEMPLATES_KEY, JSON.stringify(updatedTemplates));
    toast.success("Template saved successfully");
  };

  const confirmOverwrite = () => {
    const currentData = watch();
    const existingIndex = userTemplates.findIndex((t) => t.name === pendingTemplateName);
    if (existingIndex !== -1) {
      const updatedTemplates = [...userTemplates];
      updatedTemplates[existingIndex] = { name: pendingTemplateName, data: currentData };
      setUserTemplates(updatedTemplates);
      localStorage.setItem(SAVED_TEMPLATES_KEY, JSON.stringify(updatedTemplates));
      toast.success("Template updated successfully");
    }
    setOverwriteConfirmOpen(false);
    setPendingTemplateName("");
  };

  const handleDeleteTemplate = () => {
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedTemplateValue || !selectedTemplateValue.startsWith("user:")) return;
    const index = parseInt(selectedTemplateValue.split(":")[1]);
    
    const updatedTemplates = userTemplates.filter((_, i) => i !== index);
    setUserTemplates(updatedTemplates);
    localStorage.setItem(SAVED_TEMPLATES_KEY, JSON.stringify(updatedTemplates));
    setSelectedTemplateValue("");
    setDeleteConfirmOpen(false);
    toast.success("Template deleted successfully");
  };

  return (
    <>
      {isEditMode && isLoadingJob ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="   ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm text-paragraph-secondary-gray font-medium">
                    Back to applications
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="relative w-full sm:w-auto">
                  <select
                    value={selectedTemplateValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedTemplateValue(val);
                      if (!val) return;
                      const [type, index] = val.split(":");
                      if (type === "premade") {
                        handleApplyTemplate(JOB_TEMPLATES[parseInt(index)].data);
                      } else {
                        handleApplyTemplate(userTemplates[parseInt(index)].data);
                      }
                    }}
                    className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="">Load Template</option>
                    <optgroup label="Premade Templates">
                      {JOB_TEMPLATES.map((t, i) => (
                        <option key={`premade-${i}`} value={`premade:${i}`}>
                          {t.name}
                        </option>
                      ))}
                    </optgroup>
                    {userTemplates.length > 0 && (
                      <optgroup label="My Templates">
                        {userTemplates.map((t, i) => (
                          <option key={`user-${i}`} value={`user:${i}`}>
                            {t.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  {selectedTemplateValue.startsWith("user:") && (
                    <Button
                      type="button"
                      onClick={handleDeleteTemplate}
                      variant="outline"
                      className="text-sm rounded-lg border-red-200 text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => setIsSaveModalOpen(true)}
                    variant="outline"
                    className="text-sm rounded-lg"
                  >
                    Save as Template
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h1 className="text-xl sm:text-2xl text-primary-blue font-medium">
                {isEditMode ? "Edit Job" : "Create New Job"}
              </h1>
              <p className="text-paragraph-secondary-gray text-xs sm:text-sm mt-1">
                {isEditMode
                  ? "Update your job posting"
                  : "Post a dairy job and get a unique shareable link"}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Job title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Farm Manager"
                    className={errors.title ? "border-red-500" : ""}
                    {...register("title", {
                      required: "Job title is required",
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Farm size and Peak herd size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm size (ha) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="500"
                      className={errors.farmSize ? "border-red-500" : ""}
                      {...register("farmSize", {
                        required: "Farm size is required",
                        min: {
                          value: 0,
                          message: "Farm size must be positive",
                        },
                      })}
                    />
                    {errors.farmSize && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.farmSize.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Peak herd size (cows){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="200"
                      className={errors.herdSize ? "border-red-500" : ""}
                      {...register("herdSize", {
                        required: "Herd size is required",
                        min: {
                          value: 0,
                          message: "Herd size must be positive",
                        },
                      })}
                    />
                    {errors.herdSize && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.herdSize.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Number of positions and Required experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of positions{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="3"
                      className={
                        errors.numberOfPositions ? "border-red-500" : ""
                      }
                      {...register("numberOfPositions", {
                        required: "Number of positions is required",
                        min: {
                          value: 1,
                          message: "At least 1 position required",
                        },
                      })}
                    />
                    {errors.numberOfPositions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.numberOfPositions.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred experience (years){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="2"
                      className={
                        errors.requiredExperience ? "border-red-500" : ""
                      }
                      {...register("requiredExperience", {
                        required: "Required experience is needed",
                        min: {
                          value: 0,
                          message: "Experience cannot be negative",
                        },
                      })}
                    />
                    {errors.requiredExperience && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.requiredExperience.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Typical on-farm staff */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Typical on-farm staff{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="5"
                    className={errors.onFarmStaff ? "border-red-500" : ""}
                    {...register("onFarmStaff", {
                      required: "On-farm staff count is required",
                      min: {
                        value: 0,
                        message: "Staff count must be positive",
                      },
                    })}
                  />
                  {errors.onFarmStaff && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.onFarmStaff.message}
                    </p>
                  )}
                </div>

                {/* Application deadline and Position start date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Application deadline{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        className={`cursor-pointer ${
                          errors.applicationDeadline ? "border-red-500" : ""
                        }`}
                        {...register("applicationDeadline", {
                          required: "Application deadline is required",
                        })}
                      />
                    </div>
                    {errors.applicationDeadline && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicationDeadline.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Position start date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        className={`cursor-pointer ${
                          errors.positionStartDate ? "border-red-500" : ""
                        }`}
                        {...register("positionStartDate", {
                          required: "Position start date is required",
                        })}
                      />
                    </div>
                    {errors.positionStartDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.positionStartDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Job Description
              </h2>

              <div className="space-y-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Primary location{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Single farm"
                        className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-2 focus:ring-blue-900 cursor-pointer"
                        {...register("locationType")}
                      />
                      <span className="text-sm text-gray-700">Single farm</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Multiple farm"
                        className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-2 focus:ring-blue-900 cursor-pointer"
                        {...register("locationType")}
                      />
                      <span className="text-sm text-gray-700">
                        Multiple farm
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Corporate farm"
                        className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-2 focus:ring-blue-900 cursor-pointer"
                        {...register("locationType")}
                      />
                      <span className="text-sm text-gray-700">
                        Corporate farm
                      </span>
                    </label>
                  </div>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full bg-[#F9FAFB] px-3 py-2 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent cursor-pointer ${
                          errors.location ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select Region</option>
                        <option value="Northland">Northland</option>
                        <option value="Auckland">Auckland</option>
                        <option value="Waikato">Waikato</option>
                        <option value="Bay of Plenty">Bay of Plenty</option>
                        <option value="Gisborne">Gisborne</option>
                        <option value="Hawke’s Bay">Hawke’s Bay</option>
                        <option value="Taranaki">Taranaki</option>
                        <option value="Manawatū-Whanganui">
                          Manawatū-Whanganui
                        </option>
                        <option value="Wellington">Wellington</option>
                        <option value="Tasman">Tasman</option>
                        <option value="Nelson">Nelson</option>
                        <option value="Marlborough">Marlborough</option>
                        <option value="West Coast">West Coast</option>
                        <option value="Canterbury">Canterbury</option>
                        <option value="Otago">Otago</option>
                        <option value="Southland">Southland</option>
                      </select>
                    )}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Role and Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: "Role is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full bg-[#F9FAFB] px-3 py-2 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent cursor-pointer ${
                            errors.role ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Click to select</option>
                          <option value="Assistant Manager (2IC)">
                            Assistant Manager (2IC)
                          </option>
                          <option value="Calf Rearer">Calf Rearer</option>
                          <option value="Contract Milker">
                            Contract Milker
                          </option>
                          <option value="Farm Assistant">Farm Assistant</option>
                          <option value="Farm Manager">Farm Manager</option>
                          <option value="Herd Manager">Herd Manager</option>
                          <option value="Milk Harvester">Milk Harvester</option>
                          <option value="Relief Milker">Relief Milker</option>
                          <option value="Sharemilker">Sharemilker</option>
                          <option value="50/50 Sharemilker">
                            50/50 Sharemilker
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      )}
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </Label>

                    <Controller
                      name="jobType"
                      control={control}
                      rules={{ required: "Job type is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full bg-[#F9FAFB] px-3 py-2 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent cursor-pointer ${
                            errors.jobType ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select type</option>
                          <option value="FULL_TIME">Fulltime</option>
                          <option value="PART_TIME">Part time</option>
                          <option value="SEASONAL">Seasonal</option>
                          <option value="CONTRACT">Contract</option>
                          <option value="CASUAL">Casual</option>
                          <option value="FIXED_TERM">Fixed Term</option>
                          <option value="TEMPORARY">Temporary</option>
                          <option value="INTERN">Intern</option>
                        </select>
                      )}
                    />
                    {errors.jobType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Full Job Description */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Textarea
                      className={`min-h-[214px] pb-16 sm:pb-4 ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      placeholder="Manage daily farm operations..."
                      {...register("description", {
                        required: "Job description is required",
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                    <Button
                      disabled={isLoadingAI}
                      onClick={onCreateAI}
                      type="button"
                      variant={"outline"}
                      className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E9EFF6] border border-primary-blue/20 text-gray-700 rounded-full hover:bg-gray-50 transition text-xs sm:text-sm font-medium cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-blue animate-pulse" />
                      {isLoadingAI ? "Creating..." : "Create with AI"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Benefits & Perks
              </h2>

              <div>
                <div className="relative">
                  <Textarea
                    placeholder="Housing, Competitive Salary..."
                    rows={6}
                    className="min-h-[214px] pb-16 sm:pb-4"
                    {...register("benefits")}
                  />
                  <button
                    disabled={isLoadingAI}
                    type="button"
                    onClick={onCreateAI}
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E9EFF6] border border-primary-blue/20 text-gray-700 rounded-full hover:bg-gray-50 transition text-xs sm:text-sm font-medium cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-blue animate-pulse" />
                    {isLoadingAI ? "Creating..." : "Create with AI"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Work Description
              </h2>

              <div className="space-y-4">
                {/* Hours per week */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours per week <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    placeholder="40"
                    className={errors.hoursPerWeek ? "border-red-500" : ""}
                    {...register("hoursPerWeek", {
                      required: "Hours per week is required",
                      min: { value: 1, message: "At least 1 hour required" },
                      max: {
                        value: 168,
                        message: "Maximum 168 hours per week",
                      },
                    })}
                  />
                  {errors.hoursPerWeek && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.hoursPerWeek.message}
                    </p>
                  )}
                </div>

                {/* Roster */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Roster <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="5 days on, 2 days off"
                      className={errors.roster ? "border-red-500" : ""}
                      {...register("roster", {
                        required: "Roster is required",
                      })}
                    />
                    {errors.roster && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.roster.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remuneration Type and Range */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-3">
                    Remuneration
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Remuneration Type
                      </Label>
                      <Controller
                        name="remunerationType"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`w-full bg-[#F9FAFB] px-3 py-2 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent cursor-pointer ${
                              errors.remunerationType ? "border-red-500" : ""
                            }`}
                          >
                            <option value="">Select type</option>
                            <option value="YEARLY">Yearly</option>
                            <option value="MONTHLY">Monthly</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="HOURLY">Hourly</option>
                          </select>
                        )}
                      />
                      {errors.remunerationType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.remunerationType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Salary
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="50000"
                          className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                            errors.remunerationStart ? "border-red-500" : ""
                          }`}
                          {...register("remunerationStart", {
                            min: {
                              value: 0,
                              message: "Amount must be positive",
                            },
                          })}
                        />
                      </div>
                      {errors.remunerationStart && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.remunerationStart.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Salary
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="70000"
                          className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                            errors.remunerationEnd ? "border-red-500" : ""
                          }`}
                          {...register("remunerationEnd", {
                            min: {
                              value: 0,
                              message: "Amount must be positive",
                            },
                            validate: (value, { remunerationStart }) => {
                              if (
                                value &&
                                remunerationStart &&
                                parseFloat(value) <
                                  parseFloat(remunerationStart || "0")
                              ) {
                                return "Maximum salary must be greater than or equal to minimum salary";
                              }
                              return true;
                            },
                          })}
                        />
                      </div>
                      {errors.remunerationEnd && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.remunerationEnd.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Remuneration Options */}
                <div className="space-y-3">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Package Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="80000"
                        className="pl-8"
                        
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Per KgMS Dollar Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="0.5"
                        className="pl-8"
                        step="0.01"
                        {...register("perKgMSDollarValue", {
                          min: { value: 0, message: "Value must be positive" },
                        })}
                      />
                    </div>
                    {errors.perKgMSDollarValue && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.perKgMSDollarValue.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentage of Milk Cheque
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="15"
                        {...register("percentageOfMilkCheque", {
                          min: {
                            value: 0,
                            message: "Percentage must be positive",
                          },
                          max: {
                            value: 100,
                            message: "Percentage cannot exceed 100%",
                          },
                        })}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                    {errors.percentageOfMilkCheque && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.percentageOfMilkCheque.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Template Actions */}
            <div className="flex sm:hidden flex-col gap-3 mb-4">
              <Button
                type="button"
                onClick={() => setIsSaveModalOpen(true)}
                variant="outline"
                className="w-full text-sm rounded-xl py-6 border-primary-blue/20 text-primary-md-blue font-semibold hover:bg-blue-50"
              >
                Save current as Template
              </Button>
              {selectedTemplateValue.startsWith("user:") && (
                <Button
                  type="button"
                  onClick={handleDeleteTemplate}
                  variant="outline"
                  className="w-full text-sm rounded-xl py-6 border-red-200 text-red-500 hover:bg-red-50"
                >
                  Delete this Template
                </Button>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pb-6">
              <Button
                variant={"primary"}
                type="submit"
                disabled={isLoading || isUpdating}
                className="md:px-14 w-full md:w-auto"
              >
                {isEditMode
                  ? isUpdating
                    ? "Updating..."
                    : "Update Job"
                  : isLoading
                    ? "Creating..."
                    : "Create Job"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <PaymentModal
        isOpen={paymentState.isOpen}
        onClose={() => setPaymentState((prev) => ({ ...prev, isOpen: false }))}
        clientSecret={paymentState.clientSecret}
        amount={paymentState.amount}
        onSuccess={() => {
          setPaymentState((prev) => ({ ...prev, isOpen: false }));
          navigate("/owner-dashboard/payment-success");
        }}
      />
      <SaveTemplateModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveAsTemplate}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your custom template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={overwriteConfirmOpen} onOpenChange={setOverwriteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overwrite Template?</AlertDialogTitle>
            <AlertDialogDescription>
              A template with this name already exists. Do you want to overwrite it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingTemplateName("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmOverwrite}>
              Overwrite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateNewJob;
