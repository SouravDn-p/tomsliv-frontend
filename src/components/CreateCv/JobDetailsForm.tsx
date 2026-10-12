import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { useFormContext } from "react-hook-form";

export const JobDetailsForm = () => {
  const form = useFormContext<CVFormData>();

  return (
    <section className="p-6 border border-border-primary rounded-2xl flex flex-col gap-6">
      {/* Job Title */}
      <FormField
        control={form.control}
        name="jobTitle"
        rules={{ required: "Job title is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title for Cv *</FormLabel>
            <FormControl>
              <Input placeholder="Job title for CV" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Role + Work Type */}
      <div className="">
        {/* <FormField
          control={form.control}
          name="role"
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input py-2 pl-2.5 rounded-md bg-[#F9FAFB]"
                >
                  <option value="">Select role</option>
                  <option value="farm_assistant">Farm Assistant</option>
                  <option value="farm_manager">Farm Manager</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="workType"
          rules={{ required: "Work type is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Type *</FormLabel>
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
      </div>

      {/* Available From */}
      <FormField
        control={form.control}
        name="availableFrom"
        rules={{ required: "Available date is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Available From *</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Career Summary */}
      <FormField
        control={form.control}
        name="careerSummary"
        rules={{ required: "Career summary is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Career Summary *</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-[219px]"
                placeholder="Type your carrier summary......"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};
