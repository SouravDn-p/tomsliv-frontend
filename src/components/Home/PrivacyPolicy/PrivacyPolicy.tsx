import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto my-6 border border-gray-200 rounded-xl bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
      <div>
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#1868C9] mb-3"
        >
          <IoMdArrowRoundBack className="text-base" />
          <span>Back to Home</span>
        </Link>

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-3">
          <span className="font-semibold">Last Updated:</span> 9 January 2026
        </p>

        <div className=" space-y-3">
          <p className=" text-gray-700">
            Farmlink Limited ({" "}
            <span className=" font-semibold text-black">
              "Farmlink", "we", "us", "our"{" "}
            </span>
            ) is a New Zealand company operating the website{" "}
            <span className="font-semibold underline text-[#467886] cursor-pointer">
              https://farmlink.nz
            </span>{" "}
            associated services (together, the{" "}
            <span className=" font-semibold text-black">"Services"</span>).
          </p>

          <p className=" text-gray-700">
            We are committed to protecting your privacy and handling personal
            information in a transparent, lawful, and secure manner in
            accordance with the{" "}
            <span className=" font-semibold text-black">
              Privacy Act 2020 (NZ)
            </span>
            , including the{" "}
            <span className=" font-semibold text-black">
              Information Privacy Principles (IPPs).
            </span>
          </p>
          <p className=" text-gray-700">
            This Privacy Policy explains how wecollect, use, disclose, store,
            and protect personal information, and the rights you have in
            relation to that information.
          </p>
          <hr className=" text-[#9A9A9A] font-semibold" />
        </div>

        {/* 1. Information We Collect */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          1. Scope of this Policy
        </h2>
        <p className="mb-3 text-gray-700">This Policy applies to:</p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Visitors to our website</li>
          <li>Farmers, employers, and agribusiness clients</li>
          <li>Job applicants, candidates, and workers</li>
          <li>Recruiters, consultants, and contractors</li>
          <li>
            Anyone who interacts with our Services, platforms, tools, or
            communications
          </li>
        </ul>
        <p className="mb-3 text-gray-700">
          This Policy applies regardless of how you access our Services (web,
          mobile, email, or other means).
        </p>
        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 2. Information We Collect*/}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2. PersonalInformation We Collect
        </h2>
        <p className="mb-6 text-gray-700">
          "Personal information" means information about an identifiable
          individual.
        </p>

        {/* 2.1 Information you provide directly */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2.1 Information you provide directly
        </h2>
        <p className="mb-3 text-gray-700">
          We may collect personal information including, but not limited to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Postal address</li>
          <li>Employment history and CVs</li>
          <li>Qualifications, certifications, and references</li>
          <li>Work eligibility and visa status (where relevant)</li>
          <li>Preferences relating to employment or recruitment</li>
          <li>Communications with us (emails, messages, calls)</li>
          <li>Any other information you choose to provide</li>
        </ul>

        {/* 2.2 Information you provide directly */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2.2 Information we collect automatically
        </h2>
        <p className="mb-3 text-gray-700">
          When you use our website or platform, we may collect:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>IP address</li>
          <li>Browser type and device information</li>
          <li>Pages viewed and actions taken</li>
          <li>Date, time, and duration of visits</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        {/* 2.3 Information you provide directly */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2.3 Information from third parties
        </h2>
        <p className="mb-3 text-gray-700">
          We may receive personal information from:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Employers or recruiters</li>
          <li>Referees</li>
          <li>Background checking providers (where permitted by law)</li>
          <li>Publicly available sources (e.g., LinkedIn)</li>
          <li>Integrated third-party platforms you authorise</li>
        </ul>

        <hr className="text-[#9A9A9A] font-semibold" />

        <div>
          {/* 3 Information you provide directly */}
          <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
            3 How We Use Personal Information
          </h2>
          <p className="mb-3 text-gray-700">
            We only collect and use personal information where it is necessary
            for a lawful purpose connected with our functions or activities.
          </p>

          <p className="mb-3 text-gray-700">
            We may use personal information to:
          </p>
          <ul className="mb-6 list-disc pl-6 text-gray-700">
            <li>Provide and operate our Services</li>
            <li>Match candidates with employment opportunities</li>
            <li>Provide recruitment, consultancy, and advisory services</li>
            <li>Communicate with you</li>
            <li>Verify identity, qualifications, and work eligibility</li>
            <li>Improve and personalise our Services</li>
            <li>
              Develop and train AI-driven recruitment tools (using lawful and
              ethical methods)
            </li>
            <li>Meet legal, regulatory, and compliance obligations</li>
            <li>Detect and prevent fraud, misuse, or security threats</li>
            <li>Enforce our terms and protect our legal rights</li>
          </ul>
          <p className=" mb-4">We do not sell personal information</p>
          <hr className="text-[#9A9A9A] font-semibold" />
        </div>

        {/* 4 Information you provide directly */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          4 AI and Automated Processing
        </h2>
        <p className="mb-3 text-gray-700">
          Farmlink uses technology, including artificial intelligence and
          automated systems, to assist with recruitment, matching, and analysis.
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>AI tools may analyse CVs, job requirements, and preferences</li>
          <li>
            Automated processing is used to improve efficiency and accuracy
          </li>
          <li>
            Final recruitment or employment decisions are not made solely by
            automated means where this would be unlawful or unfair
          </li>
        </ul>
        <p className=" mb-4">
          You may request human review of decisions that significantly affect
          you.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 5 Information you provide directly */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          5. Disclosure of Personal Information
        </h2>
        <p className="mb-3 text-gray-700">
          We may disclose personal information to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Employers and clients for recruitment purposes</li>
          <li>Contractors, consultants, and service providers who assist us</li>
          <li>Cloud hosting, IT, analytics, and communications providers</li>
          <li>Professional advisers (including lawyers and accountants)</li>
          <li>Government agencies where required or authorised by law</li>
        </ul>

        <p className=" mb-4">
          We only disclose personal information where necessary and take
          reasonable steps to ensure recipients protect it appropriately.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 6 Overseas Disclosure */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          6. Overseas Disclosure
        </h2>
        <p className="mb-3 text-gray-700">
          Some service providers may store or process personal information
          outside New Zealand.
        </p>
        <p className="mb-3 text-gray-700">
          Where personal information is disclosed overseas, we ensure that:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Comparable privacy safeguards are in place, or</li>
          <li>You have authorised the disclosure, or</li>
          <li>
            The disclosure is otherwise permitted under the Privacy Act 2020
          </li>
        </ul>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 7 Cookies and Tracking Technologies */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          7. Cookies and Tracking Technologies
        </h2>

        <p className="mb-3 text-gray-700">
          We use cookies and similar tracking technologies to:
        </p>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Enable core website functionality</li>
          <li>Analyse traffic and usage</li>
          <li>Improve performance and user experience</li>
        </ul>

        <p className="text-gray-700 mb-4">
          You can control cookies through your browser settings. Disabling
          cookies may affect website functionality.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 8 Storage and Security */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          8. Storage and Security
        </h2>

        <p className="mb-3 text-gray-700">
          We take reasonable steps to protect personal information from :
        </p>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Loss</li>
          <li>Misuse</li>
          <li>Unauthorised access</li>
          <li>Modification or disclosure</li>
        </ul>

        <p className="mb-3 text-gray-700">Security measures include:</p>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Secure servers and cloud infrastructure</li>
          <li>Access controls and authentication</li>
          <li>Encryptionwhere appropriate</li>
          <li>Regular system monitoring</li>
        </ul>

        <p className="text-gray-700 mb-4">
          Despite these measures, no system is completely secure.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 9 Retention of Personal Information */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          9. Retention of Personal Information
        </h2>

        <p className="mb-3 text-gray-700">
          We retain personal information only for as long as it is required for:
        </p>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>The purposes for which it was collected</li>
          <li>Legal, regulatory, or business requirements</li>
        </ul>

        <p className="mb-6 text-gray-700">
          When information is no longer required, we securely delete or
          anonymise it.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 10 Your Rights */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          10. Your Rights
        </h2>

        <p className="mb-3 text-gray-700">
          Under the Privacy Act 2020, you have the right to:
        </p>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Request access to your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Be informed about how your information is used</li>
          <li>Withdraw consent where applicable</li>
          <li>Complain about a breach of your privacy</li>
        </ul>

        <p className="mb-6 text-gray-700">
          Requests can be made using the contact details below. We may need to
          verify your identity before processing your request.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 11. Complaints */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          11. Complaints
        </h2>
        <p className="mb-3 text-gray-700">
          If you believe we have breached your privacy, please contact us first
          so we can try to resolve the issue.
        </p>

        <p className="mb-4 text-gray-700">
          If you are not satisfied, you may complain to the{" "}
          <span className=" font-semibold text-black">
            Office of the Privacy Commissioner (New Zealand).
          </span>
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 12. Third-Party Links */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          12. Third-Party Links
        </h2>
        <p className="mb-4 text-gray-700">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of those websites.
        </p>

        <hr className="text-[#9A9A9A] font-semibold" />

        {/* 13. Changes to this Policy*/}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          13. Changes to this Policy
        </h2>
        <p className="mb-3 text-gray-700">
          We may update this Privacy Policy from time to time.
        </p>

        <p className="mb-3 text-gray-700">
          Changes will be posted on our website with an updated "Last updated"
          date. Continued use of our Services indicates acceptance of the
          updated Policy.
        </p>

        <hr className=" text-[#9A9A9A] font-semibold" />

        {/* 14 Contact Us */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          14. Contact Us
        </h2>

        <p className="mb-3 text-gray-700">
          For privacy-related enquiries, access requests, or complaints, please
          contact:
        </p>

        <div className="mb-6 list-disc pl-6 text-gray-700">
          <p className=" font-semibold">Farmlink Limited</p>
          <div>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:Tom@FarmLink.nz"
              className="text-blue-600 underline"
            >
              Tom@FarmLink.nz
            </a>
          </div>
          <div>
            <strong>Website:</strong>{" "}
            <a
              href="https://farmlink.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://farmlink.nz
            </a>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          This Privacy Policy is governed by the laws of New Zealand
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
