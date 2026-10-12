import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaLinkedin, FaPinterestSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface ShareJobProps {
  jobTitle?: string;
  jobUrl: string;
}

const ShareJob: React.FC<ShareJobProps> = ({ jobTitle, jobUrl }) => {
  const encodedUrl = encodeURIComponent(jobUrl);
  const encodedTitle = encodeURIComponent(jobTitle || "");

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const pinterestShare = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;

  return (
    <div className="flex gap-1.5 items-center">
      <span className="text-paragraph-secondary-gray">Share job on: </span>
      <a href={facebookShare} target="_blank" rel="noopener noreferrer">
        <BiLogoFacebookSquare size={25} className="text-[#205CA5]" />
      </a>
      <a href={linkedinShare} target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={22} className="text-[#205CA5]" />
      </a>
      <a href={twitterShare} target="_blank" rel="noopener noreferrer">
        <FaSquareXTwitter size={22} className="text-black" />
      </a>
      <a href={pinterestShare} target="_blank" rel="noopener noreferrer">
        <FaPinterestSquare size={22} className="text-[#e33a4b]" />
      </a>
    </div>
  );
};

export default ShareJob;
