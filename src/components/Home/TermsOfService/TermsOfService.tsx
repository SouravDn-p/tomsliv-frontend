import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto my-6 border border-gray-200 rounded-xl bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
      <div>
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#1868C9] mb-3"
        >
          <IoMdArrowRoundBack className="text-base" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Terms of Service
        </h1>

        {/* Last Updated */}
        <p className="mb-3">
          <span className="font-semibold">Last Updated:</span> 9 January 2026
        </p>

        {/* Introduction */}
        <div className="space-y-3">
          <p className="text-gray-700">
            These Terms of Service ({" "}
            <span className=" font-semibold text-black">"Terms"</span>) govern
            your access to and use of the website{" "}
            <span className="font-semibold underline text-[#467886] cursor-pointer">
              https://farmlink.nz
            </span>
            , any related platforms, tools, software, and services (together,
            the <span className="font-semibold text-black">"Services"</span>)
            operated by{" "}
            <span className=" font-semibold text-black">
              {" "}
              Farmlink Limited ("Farmlink", "we", "us", "our")
            </span>{" "}
            .
          </p>
          nb
          <hr className="text-[#9A9A9A] font-semibold" />
        </div>

        {/* 1. Eligibility and Use */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          1. Eligibility and Use
        </h2>
        <p className="text-gray-700 mb-3">
          You must be at least 18 years old to use the Services. You agree to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Use the Services lawfully and in good faith</li>
          <li>Provide accurate, current, and complete information</li>
          <li>Not misuse, interfere with, or disrupt the Services</li>
          <li>
            Not attempt to gain unauthorised access to any systems or data
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          We may suspend or terminate access if we reasonably believe these
          Terms have been breached.
        </p>

        {/* 2. Our Services */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2. Our Services
        </h2>
        <p className="text-gray-700 mb-3">
          Farmlink provides recruitment, matching, consultancy, and
          technology-enabled services for the agricultural sector, including
          AI-assisted tools. We do not:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Guarantee employment outcomes</li>
          <li>Guarantee candidate placement</li>
          <li>Act as an employer unless expressly stated in writing</li>
        </ul>
        <p className="text-gray-700 mb-4">
          All recruitment outcomes depend on third parties, market conditions,
          and individual circumstances.
        </p>

        {/* 3. AI and Automated Tools */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          3. AI and Automated Tools
        </h2>
        <p className="text-gray-700 mb-3">
          Our Services may use artificial intelligence and automated systems to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Analyse CVs, applications, and job requirements</li>
          <li>Assist with matching and ranking</li>
          <li>Improve efficiency and insights</li>
        </ul>
        <p className="text-gray-700 mb-3">You acknowledge that:</p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>AI outputs are decision-support tools only</li>
          <li>
            Final decisions are not solely automated where this would be
            unlawful
          </li>
          <li>AI systems may evolve and improve over time</li>
        </ul>
        <p className="text-gray-700 mb-4">
          You may request human review of decisions that significantly affect
          you.
        </p>

        {/* 4. User Content */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          4. User Content
        </h2>
        <p className="text-gray-700 mb-3">
          You retain ownership of content you submit ("User Content"), including
          CVs and applications. By submitting User Content, you grant Farmlink a
          non-exclusive, worldwide, royalty-free license to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Use, store, process, analyse, and display the content</li>
          <li>Share it with relevant employers or clients</li>
          <li>Use anonymised or aggregated data to improve our Services</li>
        </ul>
        <p className="text-gray-700 mb-4">
          You warrant that you have the right to provide the content, it is
          accurate and lawful, and does not infringe third-party rights.
        </p>

        {/* 5. Fees and Payments */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          5. Fees and Payments
        </h2>
        <p className="text-gray-700 mb-3">
          Some Services may be subject to fees. Unless otherwise agreed in
          writing:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>All fees are stated in New Zealand dollars</li>
          <li>Fees are exclusive of GST (where applicable)</li>
          <li>Payments are non-refundable except as required by law</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We may change pricing with reasonable notice.
        </p>

        {/* 6. Intellectual Property */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          6. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-3">
          All intellectual property in the Services (including software,
          algorithms, branding, and content) is owned by or licensed to
          Farmlink. You must not:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Copy, modify, or reverse engineer any part of the Services</li>
          <li>Use our branding without written consent</li>
          <li>Exploit the Services commercially except as permitted</li>
        </ul>

        {/* 7. Confidentiality */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          7. Confidentiality
        </h2>
        <p className="text-gray-700 mb-4">
          Each party agrees to keep confidential any non-public information
          obtained through the Services, except where disclosure is required by
          law.
        </p>

        {/* 8. Disclaimers */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          8. Disclaimers
        </h2>
        <p className="text-gray-700 mb-3">
          The Services are provided on an "as is" and "as available" basis. To
          the maximum extent permitted by law, we disclaim all warranties,
          including:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Accuracy or completeness of information</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Nothing in these Terms excludes rights under the Consumer Guarantees
          Act 1993 where it applies.
        </p>

        {/* 9. Limitation of Liability */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          9. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-3">
          To the maximum extent permitted by law:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>
            We are not liable for indirect, consequential, or economic loss
          </li>
          <li>
            Our total liability is limited to the fees paid to us in the 12
            months preceding the claim
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          This limitation does not apply to liability that cannot be excluded
          under New Zealand law.
        </p>

        {/* 10. Indemnity */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          10. Indemnity
        </h2>
        <p className="text-gray-700 mb-4">
          You agree to indemnify Farmlink against any claims, losses, or damages
          arising from your breach of these Terms, misuse of the Services, or
          violation of any law or third-party rights.
        </p>

        {/* 11. Suspension and Termination */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          11. Suspension and Termination
        </h2>
        <p className="text-gray-700 mb-4">
          We may suspend or terminate access for breach of these Terms, security
          or legal reasons, or if required by law. Termination does not affect
          accrued rights or obligations.
        </p>

        {/* 12. Privacy */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          12. Privacy
        </h2>
        <p className="text-gray-700 mb-4">
          Personal information is handled in accordance with our Privacy Policy,
          which forms part of these Terms.
        </p>

        {/* 13. Governing Law */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          13. Governing Law
        </h2>
        <p className="text-gray-700 mb-4">
          These Terms are governed by the laws of New Zealand. The New Zealand
          courts have exclusive jurisdiction.
        </p>

        {/* 14. Changes to Terms */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          14. Changes to These Terms
        </h2>
        <p className="text-gray-700 mb-4">
          We may update these Terms from time to time. Continued use of the
          Services after changes are published constitutes acceptance.
        </p>

        {/* 15. Contact */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          15. Contact
        </h2>
        <p className="text-gray-700 mb-3">
          For any queries regarding these Terms, please contact:
        </p>
        <div className="mb-6 text-gray-700">
          <p className="font-semibold">Farmlink Limited</p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:Tom@FarmLink.nz"
              className="text-blue-600 underline"
            >
              Tom@FarmLink.nz
            </a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href="https://farmlink.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://farmlink.nz
            </a>
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          These Terms are intended to be legally binding and enforceable under
          New Zealand law.
        </p>
      </div>
    </section>
  );
};

export default TermsOfService;

// import { IoMdArrowRoundBack } from "react-icons/io";
// import { Link } from "react-router-dom";

// const TermsOfService = () => {
//   return (
//     <section className="w-full max-w-[1440px] mx-auto my-6 border border-gray-200 rounded-xl bg-white p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
//       <div>
//         <Link
//           to="/"
//           className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#1868C9] mb-3"
//         >
//           <IoMdArrowRoundBack className="text-base" />
//           <span>Back to Home</span>
//         </Link>
//         <h1 className="mb-6 text-3xl font-bold text-gray-900">
//           Terms of Service
//         </h1>

//         <p className="mb-6 text-gray-700">
//           These Terms of Service (“Terms”) govern your access to and use of our
//           website and services. By accessing or using our platform, you agree to
//           be bound by these Terms. If you do not agree, you must not use our
//           services.
//         </p>

//         <p className="mb-8 text-gray-700">
//           Our platform connects skilled agricultural workers with trusted farms
//           across New Zealand to facilitate employment opportunities.
//         </p>

//         {/* 1. Eligibility */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           1. Eligibility
//         </h2>
//         <p className="mb-6 text-gray-700">
//           You must be at least 18 years old and legally capable of entering into
//           a binding agreement under New Zealand law to use this website.
//         </p>

//         {/* 2. User Accounts */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           2. User Accounts
//         </h2>
//         <p className="mb-3 text-gray-700">
//           To access certain features, you may be required to create an account.
//           You agree to:
//         </p>
//         <ul className="mb-6 list-disc pl-6 text-gray-700">
//           <li>Provide accurate and complete information</li>
//           <li>Maintain the confidentiality of your login details</li>
//           <li>Accept responsibility for all activities under your account</li>
//         </ul>

//         {/* 3. Use of the Platform */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           3. Use of the Platform
//         </h2>
//         <p className="mb-3 text-gray-700">
//           You agree to use the website only for lawful purposes and in a manner
//           that does not infringe the rights of others.
//         </p>
//         <ul className="mb-6 list-disc pl-6 text-gray-700">
//           <li>Do not submit false or misleading information</li>
//           <li>Do not misuse job listings or user data</li>
//           <li>Do not attempt unauthorised access to our systems</li>
//         </ul>

//         {/* 4. Job Listings & Employment */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           4. Job Listings and Employment
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We act solely as a platform to connect workers and farm employers. We
//           are not a party to any employment agreement and do not guarantee job
//           availability, suitability, or outcomes.
//         </p>

//         {/* 5. Fees */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           5. Fees and Payments
//         </h2>
//         <p className="mb-6 text-gray-700">
//           Certain services may be subject to fees. Any applicable fees will be
//           clearly disclosed before payment. All payments are subject to our
//           posted pricing and refund policies.
//         </p>

//         {/* 6. Intellectual Property */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           6. Intellectual Property
//         </h2>
//         <p className="mb-6 text-gray-700">
//           All content on this website, including text, graphics, logos, and
//           software, is owned by us or licensed to us and is protected under New
//           Zealand intellectual property laws.
//         </p>

//         {/* 7. Privacy */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           7. Privacy
//         </h2>
//         <p className="mb-6 text-gray-700">
//           Your use of our services is also governed by our Privacy Policy, which
//           explains how we collect and use personal information in accordance
//           with the Privacy Act 2020.
//         </p>

//         {/* 8. Limitation of Liability */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           8. Limitation of Liability
//         </h2>
//         <p className="mb-6 text-gray-700">
//           To the maximum extent permitted by law, we are not liable for any
//           indirect, incidental, or consequential losses arising from your use of
//           the website or reliance on job listings.
//         </p>

//         {/* 9. Termination */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           9. Termination
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We may suspend or terminate your access to the website at any time if
//           you breach these Terms or misuse the platform.
//         </p>

//         {/* 10. Governing Law */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           10. Governing Law
//         </h2>
//         <p className="mb-6 text-gray-700">
//           These Terms are governed by and construed in accordance with the laws
//           of New Zealand. Any disputes shall be subject to the exclusive
//           jurisdiction of the New Zealand courts.
//         </p>

//         {/* 11. Changes */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           11. Changes to These Terms
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We may update these Terms from time to time. Continued use of the
//           website after changes are posted constitutes acceptance of the revised
//           Terms.
//         </p>

//         {/* 12. Contact */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           12. Contact Us
//         </h2>
//         <p className="text-gray-700">
//           If you have any questions about these Terms of Service, please contact
//           us using the details provided on our website.
//         </p>

//         <p className="mt-6 text-sm text-gray-500">Last updated: January 2026</p>
//       </div>
//     </section>
//   );
// };

// export default TermsOfService;
