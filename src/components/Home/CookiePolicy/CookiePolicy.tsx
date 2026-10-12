import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto my-6 border border-gray-200 rounded-xl bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
      <div>
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#1868C9] mb-3"
        >
          <IoMdArrowRoundBack className="text-base" />
          <span>Back to Home</span>
        </Link>

        {/* Heading */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Cookie Policy</h1>

        <p className="mb-3 text-gray-700">
          <span className="font-semibold">Last Updated:</span> 9 January 2026
        </p>

        {/* Introduction */}
        <p className="mb-3 text-gray-700">
          This Cookie Policy explains how{" "}
          <span className="font-semibold">Farmlink Limited</span> ({" "}
          <span className=" font-semibold text-black">
            "Farmlink", "we", "us", "our"
          </span>
          ) uses cookies and similar technologies on{" "}
          <span className="font-semibold underline text-[#467886] cursor-pointer">
            https://farmlink.nz
          </span>{" "}
          (the <span className=" font-semibold text-black">"Website"</span> )
          and related services. This Policy should be read together with our{" "}
          <span className=" font-semibold text-black">Privacy Policy</span> and{" "}
          <span className=" font-semibold text-black">Terms of Service</span> .
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 1. What Are Cookies */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          1. What Are Cookies?
        </h2>
        <p className="mb-3 text-gray-700">
          Cookies are small text files stored on your device when you visit a
          website. They help websites function efficiently, improve user
          experience, and provide information to site operators.
        </p>
        <p className="mb-3 text-gray-700">Cookies may be:</p>
        <ul className="mb-3 list-disc pl-6 text-gray-700">
          <li>
            {" "}
            <span className=" font-semibold text-black">
              Session cookies
            </span>{" "}
            (deleted when you close your browser)
          </li>
          <li>
            {" "}
            <span className=" font-semibold text-black">
              Persistent cookies{" "}
            </span>{" "}
            (remain until deleted or expired)
          </li>
        </ul>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 2. Types of Cookies */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          2. Types of Cookies We Use
        </h2>

        {/* 2.1 Strictly Necessary */}
        <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-900">
          2.1 Strictly Necessary Cookies
        </h3>
        <p className="mb-3 text-gray-700">
          These cookies are essential for the Website to function and cannot be
          switched off in our systems. They are usually set in response to
          actions made by you, such as:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Logging into secure areas</li>
          <li>Submitting forms</li>
          <li>Managing session security</li>
        </ul>
        <p className="mb-3 text-gray-700">
          Without these cookies, parts of the Website may not work correctly.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 2.2 Functional */}
        <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-900">
          2.2 Functional Cookies
        </h3>
        <p className="mb-3 text-gray-700">
          These cookies enable enhanced functionality and personalisation, such
          as:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Remembering preferences</li>
          <li>Improving user experience</li>
          <li>Supporting interactive features</li>
        </ul>
        <p className="mb-3 text-gray-700">
          If you do not allow these cookies, some functionality may be affected.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 2.3 Analytics */}
        <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-900">
          2.3 Analytics and Performance Cookies
        </h3>
        <p className="mb-3 text-gray-700">
          These cookies help us understand how users interact with the Website
          by collecting information such as:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Pages visited</li>
          <li>Time spent on pages</li>
          <li>Error messages</li>
          <li>Traffic sources</li>
        </ul>
        <p className="mb-6 text-gray-700">
          This information is aggregated and anonymised where possible and is
          used to improve performance and usability.
        </p>
        <p className="mb-3 text-gray-700">
          Examples may include tools such as Google Analytics or similar
          services.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 2.4 Marketing */}
        <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-900">
          2.4 Marketing and Advertising Cookies
        </h3>
        <p className="mb-3 text-gray-700">We may use marketing cookies to:</p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Measure the effectiveness of marketing campaigns</li>
          <li>Deliver relevant content or advertising</li>
        </ul>
        <p className="mb-2 text-gray-700">
          These cookies may be set by us or by third-party providers.
        </p>
        <p>
          We do not use marketing cookies without appropriate consent where
          required by law.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 3. Third-Party Cookies */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          3. Third-Party Cookies
        </h2>
        <p className="mb-3 text-gray-700">
          Some cookies may be placed by third-party services that appear on our
          Website, including:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Analytics providers</li>
          <li>Cloud and hosting services</li>
          <li>Security and performance tools</li>
        </ul>
        <p className="mb-3 text-gray-700">
          These third parties may collect information directly from your browser
          and process it according to their own privacy policies.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 4. Managing Cookies */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          4. Managing Cookies
        </h2>
        <p className="mb-3 text-gray-700">
          You can control and manage cookies through your browser settings. Most
          browsers allow you to:
        </p>
        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>View cookies</li>
          <li>Delete cookies</li>
          <li>Block cookies</li>
          <li>Set preferences for certain websites</li>
        </ul>
        <p className="mb-3 text-gray-700">
          Please note that disabling cookies may impact the functionality of the
          Website.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />
        {/* 5. Consent */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          5. Consent
        </h2>
        <p className="mb-2 text-gray-700">
          By using our Website, you consent to the use of cookies as described
          in this Policy, unless you disable them through your browser or cookie
          settings.
        </p>
        <p>
          Where required by law, we will seek explicit consent before placing
          non-essential cookies.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-6" />

        {/* 6. Updates */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          6. Updates to This Policy
        </h2>
        <p className="mb-3 text-gray-700">
          We may update this Cookie Policy from time to time to reflect changes
          in technology, law, or our practices.
        </p>
        <p>
          The updated version will be published on our Website with a revised
          "Last updated" date.
        </p>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        {/* 7. Contact */}
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
          7. Contact Us
        </h2>
        <p className="mb-3 text-gray-700">
          If you have questions about our use of cookies, please contact:
        </p>
        <div className="mb-3 list-disc pl-6 text-gray-700">
          <p className="font-semibold">Farmlink Limited</p>
          <div>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:Tom@FarmLink.nz"
              className="text-[#205CA5] underline"
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
              className="text-[#205CA5] underline"
            >
              https://farmlink.nz
            </a>
          </div>
        </div>

        <hr className="text-[#9A9A9A] font-semibold my-3" />

        <p className="mt-6 text-sm text-gray-500 italic">
          This Cookie Policy is governed by the laws of New Zealand
        </p>
      </div>
    </section>
  );
};

export default CookiePolicy;

// import { IoMdArrowRoundBack } from "react-icons/io";
// import { Link } from "react-router-dom";

// const CookiePolicy = () => {
//   return (
//     <section className="w-full max-w-[1440px] mx-auto my-6 border border-gray-200 rounded-xl bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
//       <div className="">
//         <Link
//           to="/"
//           className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#1868C9] mb-3"
//         >
//           <IoMdArrowRoundBack className="text-base" />
//           <span>Back to Home</span>
//         </Link>
//         <h1 className="mb-6 text-3xl font-bold text-gray-900">Cookie Policy</h1>

//         <p className="mb-6 text-gray-700">
//           This Cookie Policy explains how our website uses cookies and similar
//           technologies when you visit or use our services. This policy should be
//           read together with our Privacy Policy and Terms of Service.
//         </p>

//         <p className="mb-8 text-gray-700">
//           Our platform connects skilled agricultural workers with trusted farms
//           across New Zealand, and cookies help us deliver a safe and efficient
//           user experience.
//         </p>

//         {/* 1. What Are Cookies */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           1. What Are Cookies?
//         </h2>
//         <p className="mb-6 text-gray-700">
//           Cookies are small text files stored on your device when you visit a
//           website. They help websites function properly, remember user
//           preferences, and improve overall performance.
//         </p>

//         {/* 2. Types of Cookies We Use */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           2. Types of Cookies We Use
//         </h2>

//         <h3 className="mb-2 font-medium text-gray-800">Essential Cookies</h3>
//         <p className="mb-4 text-gray-700">
//           These cookies are necessary for the website to operate correctly. They
//           enable core functionality such as secure login, account management,
//           and navigation.
//         </p>

//         <h3 className="mb-2 font-medium text-gray-800">
//           Performance and Analytics Cookies
//         </h3>
//         <p className="mb-4 text-gray-700">
//           These cookies help us understand how users interact with the website
//           by collecting anonymous usage data. This information helps us improve
//           performance and user experience.
//         </p>

//         <h3 className="mb-2 font-medium text-gray-800">
//           Functionality Cookies
//         </h3>
//         <p className="mb-6 text-gray-700">
//           These cookies remember your preferences, such as language or location
//           settings, to provide a more personalised experience.
//         </p>

//         {/* 3. Third-Party Cookies */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           3. Third-Party Cookies
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We may allow trusted third-party service providers, such as analytics
//           or security providers, to place cookies on your device. These cookies
//           are governed by the respective providers’ privacy policies.
//         </p>

//         {/* 4. Managing Cookies */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           4. Managing Cookies
//         </h2>
//         <p className="mb-6 text-gray-700">
//           You can manage or disable cookies through your browser settings.
//           Please note that disabling certain cookies may affect the
//           functionality of the website and your ability to use some features.
//         </p>

//         {/* 5. Legal Compliance */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           5. Legal Compliance
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We use cookies in compliance with the New Zealand Privacy Act 2020.
//           Where required, we will obtain your consent before placing
//           non-essential cookies on your device.
//         </p>

//         {/* 6. Changes */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           6. Changes to This Cookie Policy
//         </h2>
//         <p className="mb-6 text-gray-700">
//           We may update this Cookie Policy from time to time. Any changes will
//           be posted on this page, and continued use of the website indicates
//           acceptance of the updated policy.
//         </p>

//         {/* 7. Contact */}
//         <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900">
//           7. Contact Us
//         </h2>
//         <p className="text-gray-700">
//           If you have any questions about this Cookie Policy or our use of
//           cookies, please contact us through the details provided on our
//           website.
//         </p>

//         <p className="mt-6 text-sm text-gray-500">Last updated: January 2026</p>
//       </div>
//     </section>
//   );
// };

// export default CookiePolicy;
