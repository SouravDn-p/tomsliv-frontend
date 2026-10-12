import React from "react";

interface JobDescriptionProps {
  title?: string;
  description: string;
  bulletPoints: string[];
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  title = "Job Description",
  description,
  bulletPoints,
}) => {
  return (
    <div className="border border-border-primary p-6 rounded-2xl mt-6">
      <h4>{title}</h4>
      <p className="text-paragraph-secondary-gray my-6">{description}</p>
      <ul className="list-disc list-outside ml-5 space-y-2 text-paragraph-secondary-gray">
        {bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};
