import Container from "@/common/Container";
import { motion } from "motion/react";
import ContactForm from "@/components/Contact/ContactForm";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import background from "@/assets/Backgroud/Picture1.jpg";
export default function Contact() {
  return (
    <Container
      variant={"secondary"}
      className="flex flex-col-reverse py-10 lg:flex-row lg:py-24 lg:gap-6 gap-10"
    >
      <motion.div
        className="lg:w-[51%] flex flex-col gap-4  justify-between"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="lg:text-5xl text-2xl md:text-3xl  font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a question? Reach out!
        </motion.h2>
        <motion.img
          className="rounded-2xl w-full h-[350px] object-cover"
          src={background}
          alt="Contact background"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* <p className="mb-8 lg:text-4xl text-paragraph-secondary-gray">
            Need any help direct message or contact with us.
          </p> */}
          <motion.div
            className="bg-[#F9FAFB] py-8 px-10 rounded-2xl flex justify-center items-center  gap-2 flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h5 className="text-2xl font-medium">Or contact Tom:</h5>
            <div className="flex flex-col justify-center text-center  gap-4">
              <div className="flex gap-4">
                <FaPhoneAlt className="text-primary-blue" />
                <a href="tel:+64272657508">+64272657508</a>
              </div>
              <div className="flex gap-4">
                <IoIosMail size={22} className="text-primary-blue" />
                <a href="mailto:tom@farmlink.nz"> tom@farmlink.nz</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* contactForm */}
      <ContactForm />
    </Container>
  );
}
