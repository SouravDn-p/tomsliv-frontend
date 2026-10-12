import { useFormContext } from "react-hook-form";
import { CVFormData } from "./CVFormData.type";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function Eligibility() {
  const form = useFormContext<CVFormData>();

  return (
    <section>
      <div className="p-6 border border-border-primary rounded-2xl flex flex-col gap-6">
        {/* Driver’s License */}
        <FormField
          control={form.control}
          name="hasDriverLicense"
          rules={{ required: "Driver’s license is required" }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Driver’s License *</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-[#F9FAFB] py-2 rounded-md pl-2.5"
                >
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Eligible to Work in New Zealand */}
        <FormField
          control={form.control}
          name="eligibleToWork"
          rules={{ required: "Eligibility to work is required" }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Eligible to Work in New Zealand *</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-[#F9FAFB] py-2 rounded-md pl-2.5"
                >
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Work Permit Type */}
        <FormField
          control={form.control}
          name="workPermitType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work Permit Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-[#F9FAFB] py-2 rounded-md pl-2.5"
                >
                  <option value="">Select...</option>
                  <option value="NZ_CITIZEN">New Zealand Citizen</option>
                  <option value="NZ_RESIDENT">New Zealand Resident</option>
                  <option value="WORK_VISA">Work Visa</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Make CV Public */}
      <FormField
        control={form.control}
        name="isPublic"
        render={({ field }) => (
          <FormItem className="flex  mt-6 gap-2">
            <FormControl>
              <input
                type="checkbox"
                className=" accent-[#205CA5]"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </FormControl>
            <FormLabel className="font-normal text-xs md:text-sm text-[#101312]">
              Add to CV search to be publicity visible to users including
              employs who can view you profile including personal details to
              contact you.
            </FormLabel>
          </FormItem>
        )}
      />
    </section>
  );
}
