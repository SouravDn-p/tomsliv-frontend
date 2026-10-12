import React from "react";
import { Review } from "./review.type";
import ratingIcon from "../../../assets/cardIcon/rating.svg";
import { motion } from "motion/react";
const ReviewCard: React.FC<Review> = ({
  name,
  company,
  quote,
  rating,
  avatar,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: (index || 0) * 0.2,
        ease: "easeInOut",
      }}
      className="bg-white rounded-lg  p-8 border border-border-primary "
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          >
            <img src={ratingIcon} alt="" />
          </span>
        ))}
      </div>
      <p className="text-[#6B7280] py-10 ">“{quote}”</p>
      <div className="flex items-center gap-4 ">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
