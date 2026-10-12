import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { X } from "lucide-react";

export const EducationForm = () => {
  const { control, watch, setValue } = useFormContext<CVFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  // Convert date string to ISO string
  const convertToISO = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString();
  };

  // Format ISO string for input type="date" (YYYY-MM-DD)
  const formatForInput = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  return (
    <section className="p-6 border border-border-primary rounded-2xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-2">Education</h2>

      {fields.map((field, index) => {
        const isPresent = watch(`education.${index}.isOngoing`);

        return (
          <div key={field.id} className="flex flex-col gap-4 relative">
            {/* Degree / Specialty */}
            <FormField
              control={control}
              name={`education.${index}.degree`}
              rules={{ required: "Degree or specialty is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree / Specialty</FormLabel>
                  <FormControl>
                    <Input placeholder="Degree or specialty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Institution */}
            <FormField
              control={control}
              name={`education.${index}.institution`}
              rules={{ required: "Institution is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University or Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Institution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates with ISO conversion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <FormField
                control={control}
                name={`education.${index}.startDate`}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={formatForInput(field.value || "")}
                        onChange={(e) => {
                          const isoDate = convertToISO(e.target.value);
                          field.onChange(isoDate);
                        }}
                        onBlur={field.onBlur}
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
                  name={`education.${index}.endDate`}
                  rules={!isPresent ? { required: "End date is required" } : {}}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={formatForInput(field.value || "")}
                          onChange={(e) => {
                            const isoDate = convertToISO(e.target.value);
                            field.onChange(isoDate);
                          }}
                          onBlur={field.onBlur}
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
              name={`education.${index}.isOngoing`}
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
                        setValue(`education.${index}.endDate`, "");
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

      <Button
        className="md:w-fit"
        variant="outline"
        type="button"
        onClick={() =>
          append({
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
            isOngoing: false,
          })
        }
      >
        + Add Education
      </Button>
    </section>
  );
};
