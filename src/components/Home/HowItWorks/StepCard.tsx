import { motion } from "motion/react";
import { Step } from "./Step.type";

type StepCardProps = {
  step: Step;
  itChange?: boolean;
  index?: number;
};

export default function StepCard({
  step,
  itChange = true,
  index = 0,
}: StepCardProps) {
  const Icon = step.icon;

  return (
    <motion.div
      className="px-8 rounded-2xl py-10 flex flex-col bg-white relative gap-4 shadow-sm hover:shadow-md" // Removed transition-all
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* <div
        className={`flex items-center justify-center text-black border py-1 text-sm px-3 rounded-full mb-3 absolute -top-4 right-4 ${
          itChange
            ? "bg-[#E0EEFF] border-[#6A92C3]"
            : "bg-[#E6F0F1] border-primary-Darkcyan"
        }`}
      >
        #Step 0{step.step}
      </div> */}

      {/* Icon with hover animation */}
      <motion.div
        className={`flex items-center justify-center rounded-full w-[50px] h-[50px] text-white ${
          itChange ? "bg-light-blue" : "bg-primary-Darkcyan"
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          rotate: 360,
          scale: 1.1,
        }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {typeof Icon === "string" ? (
          <img src={Icon} alt={step.title} className="w-6 h-6 object-contain" />
        ) : (
          <Icon className="text-2xl" />
        )}
      </motion.div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>

      {/* Description */}
      <p className="text-paragraph-gray text-sm">{step.description}</p>
    </motion.div>
  );
}
