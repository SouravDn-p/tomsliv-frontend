import React from "react";
import { cn } from "@/lib/utils";
import defultPhoto from "@/assets/icon/Picture2.png"
import { HiUser } from "react-icons/hi";

type DefaultProfileCardProps = {
  name?: string;
  role?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const DefaultProfileCard: React.FC<DefaultProfileCardProps> = ({
  imageUrl,
  size = "sm",
  className,
}) => {
  const avatarSize = cn(
    "rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden",
    size === "sm" && "w-10 h-10",
    size === "md" && "w-12 h-12",
    size === "lg" && "w-16 h-16"
  );

  return (
     <div className={ cn( className,avatarSize) }>
       <img
            src={imageUrl?? defultPhoto}
            alt={"profile"}
            
          />
          <HiUser className="size-10 object-fit rounded-full" />
      </div>
  );
};

export default DefaultProfileCard;
