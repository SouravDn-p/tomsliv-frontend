import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CVFormData } from "@/components/CreateCv/CVFormData.type";
import { useFormContext } from "react-hook-form";

export default function PersonalInfo() {
  const form = useFormContext<CVFormData>();

  return (
    <section className="p-6 border border-border-primary rounded-2xl flex flex-col gap-6">
      {/* First + Last Name */}
      <div className="flex md:flex-row flex-col gap-4">
        <FormField
          control={form.control}
          name="firstName"
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          rules={{ required: "Last name is required" }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Phone + Email */}
      <div className="flex md:flex-row flex-col gap-4">
        <FormField
          control={form.control}
          name="phone"
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input placeholder="(+64 000 123 456)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail *</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Location */}
      <FormField
        control={form.control}
        name="location"
        rules={{ required: "Location is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location *</FormLabel>
            <FormControl>
              <Input placeholder="Auckland, New Zealand" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
