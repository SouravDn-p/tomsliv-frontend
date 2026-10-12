import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    try {
      await createContact(formData).unwrap();
      toast.success("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      console.log(error)
      toast.error("Failed to send message");
    }
  };

  return (
    <div  className=" lg:w-[49%] w-full bg-[#F9FAFB] py-7 lg:py-[60px] px-7 lg:px-12  rounded-[20px]">
      {/* <h3 className="md:text-3xl text-2xl text-center mb-5 font-medium lg:mb-12">
        Submit Your Query
      </h3> */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:grid md:grid-cols-2 gap-2.5"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            className="bg-white"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            name="email"
            className="bg-white"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            className="bg-white"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            className="bg-white"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Your subject"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            className="bg-white lg:min-h-[163px]"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
          />
        </div>

        <Button variant="primary" type="submit" className="w-full col-span-2">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
