/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Info, Plus, X, Check, ChevronsUpDown, MapPin } from "lucide-react";
import {
  useGetAllFarmJobsQuery,
  useGetJobIdealCandidateQuery,
  usePostJobIdealCandidateMutation,
} from "@/redux/features/Farmowner/JobsApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PageHeader from "@/components/Reuseable/PageHeader";

// Define the enum values from backend
const PERSONALITY_TRAITS_ENUM = {
  DETAIL_ORIENTED: "DETAIL_ORIENTED",
  TEAM_PLAYER: "TEAM_PLAYER",
  SELF_MOTIVATED: "SELF_MOTIVATED",
  PROBLEM_SOLVER: "PROBLEM_SOLVER",
  ADAPTABLE: "ADAPTABLE",
  RELIABLE: "RELIABLE",
  PATIENT: "PATIENT",
  PHYSICAL_STAMINA: "PHYSICAL_STAMINA",
  HONESTY: "HONESTY",
  LOYALTY: "LOYALTY",
  HARD_WORKING: "HARD_WORKING",
  COMMITTED: "COMMITTED",
  RESILIENT: "RESILIENT",
  POSITIVE_ATTITUDE: "POSITIVE_ATTITUDE",
  INITIATIVE: "INITIATIVE",
  PUNCTUAL: "PUNCTUAL",
} as const;

// User-friendly labels for display
const PERSONALITY_TRAIT_LABELS: Record<
  keyof typeof PERSONALITY_TRAITS_ENUM,
  string
> = {
  DETAIL_ORIENTED: "Attention to Detail",
  TEAM_PLAYER: "Team Player",
  SELF_MOTIVATED: "Self Motivated",
  PROBLEM_SOLVER: "Problem Solver",
  ADAPTABLE: "Adaptable",
  RELIABLE: "Reliable",
  PATIENT: "Patient",
  PHYSICAL_STAMINA: "Physical Stamina",
  HONESTY: "Honesty",
  LOYALTY: "Loyalty",
  HARD_WORKING: "Hard Working",
  COMMITTED: "Committed",
  RESILIENT: "Resilient",
  POSITIVE_ATTITUDE: "Positive Attitude",
  INITIATIVE: "Initiative",
  PUNCTUAL: "Punctual",
};

// Predefined skills based on dairy farming context
const PREDEFINED_SKILLS = [
  "Calf Rearing",
  "Milking Operations",
  "Basic Maintenance",
  "Record Management",
  "Animal Health Care",
  "Feed Management",
  "Equipment Operation",
  "Biosecurity",
  "Pasture Management",
  "Calving Assistance",
  "Milk Quality Testing",
  "Herd Management",
  "Facility Sanitation",
  "Breeding Management",
  "Emergency Response",
];

// Non-negotiable labels mapping
const nonNegotiableLabels = {
  physicalWork: "Able to perform physical work",
  morningShifts: "Available for early morning shifts",
  weekendWork: "Available for weekend work (if needed)",
  driversLicense: "Valid driver's license",
  nzResident: "Available to work in New Zealand",
};

const IdealCandidate = () => {
  // const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState("");
  const [openCombobox, setOpenCombobox] = useState(false);
  const [isCustomSkillOpen, setIsCustomSkillOpen] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const [minExperience, setMinExperience] = useState(4);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Calf Rearing",
    "Milking Operations",
    "Basic Maintenance",
    "Record Management",
  ]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([
    PERSONALITY_TRAITS_ENUM.HONESTY,
    PERSONALITY_TRAITS_ENUM.RELIABLE,
    PERSONALITY_TRAITS_ENUM.HARD_WORKING,
  ]);
  const [nonNegotiables, setNonNegotiables] = useState({
    physicalWork: false,
    morningShifts: false,
    weekendWork: false,
    driversLicense: false,
    nzResident: false,
  });
  const [customNonNegotiables, setCustomNonNegotiables] = useState<string[]>(
    [],
  );
  const [isAddingNonNegotiable, setIsAddingNonNegotiable] = useState(false);
  const [newNonNegotiable, setNewNonNegotiable] = useState("");
  const [recruiterValues, setRecruiterValues] = useState<string[]>([
    "Honesty",
    "Integrity",
  ]);
  const [recruiterHobbies, setRecruiterHobbies] = useState<string[]>([
    "Fishing",
    "Hiking",
  ]);
  const [recruiterPassions, setRecruiterPassions] = useState<string[]>([
    "Sustainability",
    "Community",
  ]);
  const [availableSkills, setAvailableSkills] = useState(PREDEFINED_SKILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "value" | "hobby" | "passion" | null
  >(null);
  const [modalInput, setModalInput] = useState("");

  // Fetch jobs
  const { data: jobs, isLoading: isLoadingJobs } = useGetAllFarmJobsQuery({
    search: "",
    page: 1,
    limit: 10,
    status: "ACTIVE",
  });

  // Fetch ideal candidate data when job is selected
  const {
    data: candidateData,
    isLoading: isLoadingCandidate,
    isError: isErrorCandidate,
    error,
    refetch: refetchCandidate,
  } = useGetJobIdealCandidateQuery(selectedJob, {
    skip: !selectedJob,
  });

  // Post mutation
  const [postJobIdealCandidate, { isLoading: isSaving }] =
    usePostJobIdealCandidateMutation();
  const resetToDefaults = () => {
    setMinExperience(4);
    setSelectedSkills([
      "Calf Rearing",
      "Milking Operations",
      "Basic Maintenance",
      "Record Management",
    ]);
    setSelectedTraits([
      PERSONALITY_TRAITS_ENUM.HONESTY,
      PERSONALITY_TRAITS_ENUM.RELIABLE,
      PERSONALITY_TRAITS_ENUM.HARD_WORKING,
    ]);
    setNonNegotiables({
      physicalWork: false,
      morningShifts: false,
      weekendWork: false,
      driversLicense: false,
      nzResident: false,
    });
    setCustomNonNegotiables([]);
    setRecruiterValues(["Honesty", "Integrity"]);
    setRecruiterHobbies(["Fishing", "Hiking"]);
    setRecruiterPassions(["Sustainability", "Community"]);
  };

  const handleJobSelect = (jobId: string) => {
    if (jobId !== selectedJob) {
      setSelectedJob(jobId);
      // We don't reset immediately here because the query will trigger.
      // If it's a new job that hasn't been loaded, isLoading will become true.
    }
  };

  // Load candidate data when fetched OR Handle 404 (reset)
  useEffect(() => {
    if (candidateData?.data) {
      const data = candidateData.data;
      setMinExperience(data.minimumExperienceYears || 4);
      setSelectedSkills(data.coreSkills || []);

      // Ensure traits are from the enum
      const validTraits = (data.desiredPersonalityTraits || []).filter(
        (trait: string) =>
          Object.values(PERSONALITY_TRAITS_ENUM).includes(trait as any),
      );
      setSelectedTraits(validTraits);

      // Parse non-negotiables from API data
      const nonNegotiableSkills = data.nonNegotiableSkills || [];
      const predefinedValues = Object.values(nonNegotiableLabels);

      setNonNegotiables({
        physicalWork: nonNegotiableSkills.includes(
          "Able to perform physical work",
        ),
        morningShifts:
          nonNegotiableSkills.includes("Available for early morning shifts") ||
          nonNegotiableSkills.includes(
            "Available for early morning shifts (4-5 AM)",
          ),
        weekendWork: nonNegotiableSkills.includes(
          "Available for weekend work (if needed)",
        ),
        driversLicense: nonNegotiableSkills.includes("Valid driver's license"),
        nzResident:
          nonNegotiableSkills.includes("Available to work in New Zealand") ||
          nonNegotiableSkills.includes("Local resident or willing to relocate"),
      });

      // Extract custom non-negotiables (those not in predefined list)
      const customNonNeg = nonNegotiableSkills.filter(
        (skill: string) => !predefinedValues.includes(skill),
      );
      setCustomNonNegotiables(customNonNeg);

      setRecruiterValues(data.recruiterValues || ["Honesty", "Integrity"]);
      setRecruiterHobbies(data.recruiterHobbies || ["Fishing", "Hiking"]);
      setRecruiterPassions(
        data.recruiterPassions || ["Sustainability", "Community"],
      );
    } else if (isErrorCandidate && (error as any)?.status === 404) {
      // Handle 404 specifically: Reset to defaults for a fresh start
      console.log("No profile found - resetting defaults");
      resetToDefaults();
    }
  }, [candidateData, isErrorCandidate, error]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleTrait = (trait: keyof typeof PERSONALITY_TRAITS_ENUM) => {
    const traitValue = PERSONALITY_TRAITS_ENUM[trait];
    if (selectedTraits.includes(traitValue)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== traitValue));
    } else {
      setSelectedTraits([...selectedTraits, traitValue]);
    }
  };
  if (selectedTraits.length > 5) {
    setSelectedTraits(selectedTraits.slice(0, 5));
    toast.error("You can only select 5 traits");
  }

  const addCustomSkill = () => {
    const trimmedSkill = customSkill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      setSelectedSkills([...selectedSkills, trimmedSkill]);
      // Add to available skills if not already there
      if (!availableSkills.includes(trimmedSkill)) {
        setAvailableSkills([...availableSkills, trimmedSkill]);
      }
      setCustomSkill("");
      setIsCustomSkillOpen(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove),
    );
  };

  const removeValue = (valueToRemove: string) => {
    setRecruiterValues(
      recruiterValues.filter((value) => value !== valueToRemove),
    );
  };

  const addValue = () => {
    setModalType("value");
    setModalInput("");
    setIsModalOpen(true);
  };

  const removeHobby = (hobbyToRemove: string) => {
    setRecruiterHobbies(
      recruiterHobbies.filter((hobby) => hobby !== hobbyToRemove),
    );
  };

  const addHobby = () => {
    setModalType("hobby");
    setModalInput("");
    setIsModalOpen(true);
  };

  const removePassion = (passionToRemove: string) => {
    setRecruiterPassions(
      recruiterPassions.filter((passion) => passion !== passionToRemove),
    );
  };

  const addPassion = () => {
    setModalType("passion");
    setModalInput("");
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    const value = modalInput.trim();
    if (!value) return;

    if (modalType === "value" && !recruiterValues.includes(value)) {
      setRecruiterValues([...recruiterValues, value]);
    } else if (modalType === "hobby" && !recruiterHobbies.includes(value)) {
      setRecruiterHobbies([...recruiterHobbies, value]);
    } else if (modalType === "passion" && !recruiterPassions.includes(value)) {
      setRecruiterPassions([...recruiterPassions, value]);
    }

    setIsModalOpen(false);
    setModalInput("");
    setModalType(null);
  };

  const addCustomNonNegotiable = () => {
    const value = newNonNegotiable.trim();
    if (value && !customNonNegotiables.includes(value)) {
      setCustomNonNegotiables([...customNonNegotiables, value]);
      setNewNonNegotiable("");
      setIsAddingNonNegotiable(false);
    }
  };

  const removeCustomNonNegotiable = (item: string) => {
    setCustomNonNegotiables(customNonNegotiables.filter((n) => n !== item));
  };

  const handleSave = async () => {
    if (!selectedJob) {
      alert("Please select a job first");
      return;
    }

    const nonNegotiableSkillsArray = Object.entries(nonNegotiables)
      .filter(([, value]) => value)
      .map(
        ([key]) => nonNegotiableLabels[key as keyof typeof nonNegotiableLabels],
      );

    // Combine predefined and custom non-negotiables
    const allNonNegotiables = [
      ...nonNegotiableSkillsArray,
      ...customNonNegotiables,
    ];

    const payload = {
      minimumExperienceYears: minExperience,
      coreSkills: selectedSkills,
      desiredPersonalityTraits: selectedTraits, // Already using enum values
      nonNegotiableSkills: allNonNegotiables,
      recruiterValues: recruiterValues,
      recruiterHobbies: recruiterHobbies,
      recruiterPassions: recruiterPassions,
    };

    // console.log("Saving payload:", payload); // For debugging

    try {
      await postJobIdealCandidate({
        jobId: selectedJob,
        data: payload,
      }).unwrap();

      toast.success("Preferences saved successfully!");
      refetchCandidate();
    } catch (error: any) {
      console.error("Failed to save preferences:", error);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to save preferences";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  // Filter available skills to show only those not already selected
  const availableSkillsToShow = availableSkills.filter(
    (skill) => !selectedSkills.includes(skill),
  );

  return (
    <div className="w-full space-y-6">
      {/* Back Button */}
      {/* <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to applications</span>
      </button> */}

      {/* Header Section */}
      <PageHeader
        title="Define Ideal Candidate"
        description="Set your criteria to help AI match the best applicants for your dairy farm"
      />

      {/* Info Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <p className="text-sm text-red-800">
          These preferences help AI calculate fit scores for applicants. The
          more specific you are, the better the matching will be. You can update
          these anytime.
        </p>
      </div>

      {/* Job Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block text-lg font-medium text-gray-900 mb-3">
          Select one from your active jobs
        </label>

        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className="w-full justify-between h-auto py-3 px-4 text-left font-normal bg-white border-gray-300 hover:bg-gray-50 rounded-xl"
              disabled={isLoadingJobs}
            >
              {selectedJob
                ? jobs?.data.find((job: any) => job.id === selectedJob)
                    ?.title || "Select a job"
                : "Select a job to define ideal candidate..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) border border-border-primary bg-white p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search jobs..." />
              <CommandList>
                <CommandEmpty>No job found.</CommandEmpty>
                <CommandGroup>
                  {jobs?.data.map((job: any) => (
                    <CommandItem
                      key={job.id}
                      value={job.title}
                      onSelect={() => {
                        handleJobSelect(job.id);
                        setOpenCombobox(false);
                      }}
                      className="flex flex-col items-start gap-1 py-3"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={cn(
                            "font-medium",
                            selectedJob === job.id && "text-blue-700",
                          )}
                        >
                          {job.title}
                        </span>
                        {selectedJob === job.id && (
                          <Check className="h-4 w-4 text-blue-700" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 w-full">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>
                          {job._count?.jobApplications || 0} applicants
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {isLoadingCandidate && selectedJob && (
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            Loading candidate preferences...
          </p>
        )}

        {/* Info message when no profile exists (404) */}
        {isErrorCandidate && (error as any)?.status === 404 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                No ideal candidate profile set
              </p>
              <p className="text-xs text-blue-700 mt-0.5">
                Define your preferences below to help AI find the best match for
                this job.
              </p>
            </div>
          </div>
        )}

        {/* Generic error message for other errors */}
        {isErrorCandidate && (error as any)?.status !== 404 && (
          <p className="text-sm text-red-500 mt-2">
            Failed to load preferences. Please try again.
          </p>
        )}
      </div>

      {/* Preferred Experience */}
      {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Preferred experience
        </h2>

        <p className="text-sm text-gray-500">
          List the preferred experience you are looking for in a candidate. This
          will help AI match relevant profiles.
        </p>
      </div> */}

      {/* Required Skills */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Required Skills
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Selected Core Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSkills.map((skill) => (
              <div key={skill} className="relative group">
                <button
                  onClick={() => toggleSkill(skill)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition cursor-pointer pr-8"
                >
                  {skill}
                </button>
                <button
                  onClick={() => removeSkill(skill)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white hover:text-red-300" />
                </button>
              </div>
            ))}
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Skills (Click to add)
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {availableSkillsToShow.slice(0, 10).map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
              >
                {skill}
              </button>
            ))}
          </div>

          {isCustomSkillOpen ? (
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Enter custom skill name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
              />
              <button
                onClick={addCustomSkill}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsCustomSkillOpen(false);
                  setCustomSkill("");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCustomSkillOpen(true)}
              className="flex items-center gap-2 text-blue-900 hover:text-blue-700 text-sm font-medium transition cursor-pointer mt-4"
            >
              <Plus className="w-4 h-4" />
              <span>Add custom skill</span>
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          AI will prioritise candidates with these skills when calculating fit
          scores.
        </p>
      </div>

      {/* Desired Personality Traits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Desired Personality Traits
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Select 5 of the below personality traits.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(PERSONALITY_TRAIT_LABELS).map(([enumKey, label]) => {
            const traitValue =
              PERSONALITY_TRAITS_ENUM[
                enumKey as keyof typeof PERSONALITY_TRAITS_ENUM
              ];
            const isSelected = selectedTraits.includes(traitValue);

            return (
              <button
                key={enumKey}
                onClick={() =>
                  toggleTrait(enumKey as keyof typeof PERSONALITY_TRAITS_ENUM)
                }
                className={`px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-blue-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title={traitValue}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected traits {selectedTraits.length}/5 :</strong>{" "}
            {selectedTraits.length > 0
              ? selectedTraits
                  .map(
                    (trait) =>
                      PERSONALITY_TRAIT_LABELS[
                        trait as keyof typeof PERSONALITY_TRAIT_LABELS
                      ] || trait,
                  )
                  .join(", ")
              : "No traits selected"}
          </p>
        </div>
      </div>

      {/* Non-Negotiables */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Non-Negotiables
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          These are absolute requirements. Applicants without these will receive
          lower fit scores.
        </p>

        <div className="space-y-3">
          {Object.entries(nonNegotiableLabels).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={nonNegotiables[key as keyof typeof nonNegotiables]}
                onChange={(e) =>
                  setNonNegotiables({
                    ...nonNegotiables,
                    [key]: e.target.checked,
                  })
                }
                className="w-5 h-5 text-blue-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-900 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition">
                {label}
              </span>
            </label>
          ))}

          {/* Custom Non-Negotiables */}
          {customNonNegotiables.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer group p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <input
                type="checkbox"
                checked={true}
                onChange={() => removeCustomNonNegotiable(item)}
                className="w-5 h-5 text-blue-900 border-gray-300 rounded focus:ring-2 focus:ring-blue-900 cursor-pointer"
              />
              <span className="flex-1 text-gray-700 group-hover:text-gray-900 transition">
                {item}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeCustomNonNegotiable(item);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </label>
          ))}

          {/* Add Custom Non-Negotiable */}
          {isAddingNonNegotiable ? (
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newNonNegotiable}
                onChange={(e) => setNewNonNegotiable(e.target.value)}
                placeholder="Enter custom non-negotiable"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                onKeyPress={(e) =>
                  e.key === "Enter" && addCustomNonNegotiable()
                }
              />
              <button
                onClick={addCustomNonNegotiable}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingNonNegotiable(false);
                  setNewNonNegotiable("");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingNonNegotiable(true)}
              className="flex items-center gap-2 text-blue-900 hover:text-blue-700 text-sm font-medium transition cursor-pointer mt-4"
            >
              <Plus className="w-4 h-4" />
              <span>Add custom non-negotiable</span>
            </button>
          )}
        </div>
      </div>

      {/* Recruiter Preferences Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Your Values & Interests
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This helps match candidates who share similar values and interests.
        </p>

        {/* Recruiter Values */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Core Values
            </label>
            <button
              onClick={addValue}
              className="flex items-center gap-1 text-blue-900 hover:text-blue-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Value
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recruiterValues.map((value) => (
              <div key={value} className="relative group">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {value}
                </span>
                <button
                  onClick={() => removeValue(value)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-0.5 shadow"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Hobbies */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Hobbies
            </label>
            <button
              onClick={addHobby}
              className="flex items-center gap-1 text-green-900 hover:text-green-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Hobby
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recruiterHobbies.map((hobby) => (
              <div key={hobby} className="relative group">
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {hobby}
                </span>
                <button
                  onClick={() => removeHobby(hobby)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-0.5 shadow"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Passions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Passions
            </label>
            <button
              onClick={addPassion}
              className="flex items-center gap-1 text-purple-900 hover:text-purple-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Passion
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recruiterPassions.map((passion) => (
              <div key={passion} className="relative group">
                <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                  {passion}
                </span>
                <button
                  onClick={() => removePassion(passion)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-0.5 shadow"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              How These Criteria Influence AI Matching
            </h3>
            <ul className="text-sm text-blue-900 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Experience range:</strong> Candidates within your
                  range get higher scores
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Required skills:</strong> Each matching skill boosts
                  the fit score
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Personality traits:</strong> AI analyzes application
                  materials for these qualities
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Non-negotiables:</strong> Missing items significantly
                  reduce fit score
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!selectedJob || isSaving}
          className={`px-8 py-3 font-semibold rounded-xl transition shadow-sm hover:shadow-md cursor-pointer ${
            !selectedJob || isSaving
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-900 text-white hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      {/* Modal for Values & Interests */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Add{" "}
              {modalType === "value"
                ? "Core Value"
                : modalType === "hobby"
                  ? "Hobby"
                  : "Passion"}
            </h3>
            <input
              type="text"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder={`Enter a ${modalType}...`}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 mb-4"
              onKeyPress={(e) => e.key === "Enter" && handleModalSubmit()}
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalInput("");
                  setModalType(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-6 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdealCandidate;
