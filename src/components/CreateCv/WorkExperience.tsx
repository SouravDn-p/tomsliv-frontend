import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export const WorkExperience = () => {
  const { control, watch, setValue } = useFormContext<CVFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  // Convert date string to ISO string
  const convertToISO = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString();
  };

  // Format ISO string for input type="date"
  const formatForInput = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  return (
    <section className="p-6 border border-border-primary rounded-2xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

      {fields.map((field, index) => {
        const isPresent = watch(`workExperience.${index}.isOngoing`);

        return (
          <div key={field.id} className="flex flex-col gap-4 relative">
            {/* Company Name */}
            <FormField
              control={control}
              name={`workExperience.${index}.company`}
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm / Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`workExperience.${index}.jobTitle`}
              rules={{ required: "Job title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Work Type */}
            <FormField
              control={control}
              name={`workExperience.${index}.jobType`}
              rules={{ required: "Work type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="input py-2 pl-2.5 rounded-md bg-[#F9FAFB]"
                    >
                      <option disabled value="">
                        Work type
                      </option>
                      <option value="FULL_TIME">Full time</option>
                      <option value="PART_TIME">Part time</option>
                      <option value="CONTRACT">Contract</option>
                      <option value="SEASONAL">Seasonal</option>
                      <option value="TEMPORARY">Temporary</option>
                      <option value="INTERN">Intern</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates with ISO conversion */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Start Date */}
              <FormField
                control={control}
                name={`workExperience.${index}.startDate`}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={formatForInput(field.value || "")}
                        onChange={(e) => {
                          const isoDate = convertToISO(e.target.value);
                          field.onChange(isoDate);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date - only show if not present */}
              {!isPresent && (
                <FormField
                  control={control}
                  name={`workExperience.${index}.endDate`}
                  rules={!isPresent ? { required: "End date is required" } : {}}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={formatForInput(field.value || "")}
                          onChange={(e) => {
                            const isoDate = convertToISO(e.target.value);
                            field.onChange(isoDate);
                          }}
                          disabled={isPresent}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Present Checkbox */}
            <FormField
              control={control}
              name={`workExperience.${index}.isOngoing`}
              render={({ field }) => (
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="accent-[#205CA5]"
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      // Clear end date when marking as present
                      if (e.target.checked) {
                        setValue(`workExperience.${index}.endDate`, "");
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                  Present
                </label>
              )}
            />

            {/* Summary */}
            <FormField
              control={control}
              name={`workExperience.${index}.summary`}
              rules={{ required: "Summary is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Experience summary"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remove Button */}
            <Button
              variant="default"
              type="button"
              className="self-end border-[#E33A4B] text-[#E33A4B] border mt-2"
              onClick={() => remove(index)}
            >
              <X size={16} />
              Remove
            </Button>
          </div>
        );
      })}

      {/* Add New Experience */}
      <Button
        className="md:self-start"
        variant="outline"
        type="button"
        onClick={() =>
          append({
            company: "",
            jobTitle: "",
            jobType: "",
            startDate: "", // This will be converted when user selects date
            endDate: "", // This will be converted when user selects date
            isOngoing: false,
            summary: "",
          })
        }
      >
        + Add Work Experience
      </Button>
    </section>
  );
};
