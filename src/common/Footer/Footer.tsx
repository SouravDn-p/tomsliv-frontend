import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Container from "../Container";
import {
  employersLinks,
  jobSeekersLinks,
  legalLinks,
  // socialLinks,
} from "./footerLinks";
import brandLogo from "@/assets/tomslive/Icon/Logo.svg";
import { MdOutlineEmail } from "react-icons/md";
import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="bg-background-darkBlue text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Container className="flex flex-col gap-14 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.img
                className="size-8 rounded-xl"
                src={brandLogo}
                alt="FarmLink Logo"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
              />
              <h4 className="text-2xl font-medium">FarmLink</h4>
            </div>
            <motion.p
              className="text-website-lightGray w-[80%]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connecting skilled workers with your farm
            </motion.p>
            {/* <div className="text-base flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label }, index) => (
                <motion.a
                  key={label}
                  target="_blank"
                  href={href}
                  aria-label={label}
                  className="bg-white w-9 h-9 border flex items-center justify-center rounded-xl text-[#205CA5] hover:bg-blue-50 transition-colors"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2 + index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: "#eff6ff",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Employers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 text-website-lightGray font-light">
              For Employers
            </h4>
            <ul className="space-y-2">
              {employersLinks.map((link, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="hover:underline hover:text-blue-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Job Seekers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-website-lightGray font-light">
              For Job Seekers
            </h4>
            <ul className="space-y-2">
              {jobSeekersLinks.map((link, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="hover:underline hover:text-blue-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 text-website-lightGray font-light">Contact</h4>
            <ul className="space-y-2">
              <motion.li
                className="flex gap-3 items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <MdOutlineEmail size={16} />
                <a
                  href="mailto:tom@farmlink.nz"
                  className="hover:underline hover:text-blue-200 transition-colors"
                >
                  tom@farmlink.nz
                </a>
              </motion.li>
              <motion.li
                className="flex gap-3 items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.45 }}
                whileHover={{ x: 5 }}
              >
                <Phone size={16} />
                <a
                  href="tel:0272657508"
                  className="hover:underline hover:text-blue-200 transition-colors"
                >
                  027 265 7508
                </a>
              </motion.li>
              <li className="flex gap-3 items-center">
                <MapPin size={16} />
                <span>Matamata, New Zealand</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Legal */}
        <motion.div
          className="border-t border-[#E9EFF6] pt-4 text-xs md:text-sm text-[#BCBEBE] flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {new Date().getFullYear()} FarmLink.
          </motion.p>
          <div className="flex text-center flex-wrap justify-center gap-4 mt-2 md:mt-0">
            {legalLinks.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="hover:underline hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
