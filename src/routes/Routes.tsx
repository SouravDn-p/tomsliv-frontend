import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import SettingsPage from "@/pages/Owner/SettingsPage";
import ClientDashboardPage from "@/pages/Client/ClientDashboardPage";
import ClientLayout from "@/Layout/ClientLayout";
import FindJobs from "@/pages/JobSeeker/FindJobs";
import JobDetails from "@/components/FindJobs/JobDetails";
import JoinLogin from "@/pages/JoinLogin";
import MyJobsPage from "@/pages/Owner/MyJobsPage";
import CreateCv from "@/pages/JobSeeker/CreateCv";
import Contact from "@/pages/JobSeeker/Contact";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import MyApplication from "@/components/MyAccount/MyAppliction/MyApplication";
import MyCVs from "@/components/MyAccount/MyCVs";
import SaveJobs from "@/components/MyAccount/SaveJobs";
import MyAccount from "@/pages/JobSeeker/MyAccount";
import UserAccountSettings from "@/components/MyAccount/UserAccountSettings";
import UserProfile from "@/components/MyAccount/UserSettings/UserProfile";
import UserNotification from "@/components/MyAccount/UserSettings/UserNotification";
import UserSecurity from "@/components/MyAccount/UserSettings/UserSecurity";
import AllApplicantPage from "@/pages/Owner/AllApplicantPage";
import IdealCandidatePage from "@/pages/Owner/IdealCandidatePage";
import FarmOwnerSignup from "@/pages/FarmOwnerSignup";
import PrivateRoute from "./PrivateRoute";
import OwnerDashboardPage from "@/pages/Owner/OwnerDashboardPage";
import PaymentSuccess from "@/pages/Owner/PaymentSuccess";
import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import AllUsersPage from "@/pages/Admin/AllUsersPage";
import OwnerLayout from "@/Layout/OwnerLayout";
import AdminLayout from "@/Layout/AdminLayout";
import AllJobsPage from "@/pages/Admin/AllJobsPage";
import PaymentsPage from "@/pages/Admin/PaymentsPage";
import SupportPage from "@/pages/Admin/SupportPage";
import SettingsPages from "@/pages/Admin/SettingsPages";
import CreateNewJob from "@/components/OwnerDashboard/MyJobs/CreateNewJob";
import ApplicantDetailsPage from "@/pages/Owner/ApplicantDetailsPage";
import Notifications from "@/pages/Notifications/Notifications";
import ContractPage from "@/pages/Admin/ContractPage";
import JobSeeker from "@/components/AdminDashboard/AllUsers/JobSeeker";
import Employer from "@/components/AdminDashboard/AllUsers/Employer";
import EmployerDetails from "@/components/AdminDashboard/AllUsers/EmployerDetails";
import UserDetails from "@/components/AdminDashboard/AllUsers/UserDetails";
import AdminRoute from "./AdminRoutes";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import CookiePolicy from "@/components/Home/CookiePolicy/CookiePolicy";
import FarmOwnerRoute from "./FarmOwnerRoute";
import JobSeekerLogin from "@/pages/JobSeeker/JobSeekerLogin";
import PublicCv from "@/pages/JobSeeker/PublicCv";
import AboutUs from "@/pages/JobSeeker/AboutUs";
import Pricing from "@/pages/Pricing";
import HowItWorksPage from "@/pages/HowItWorksPage";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <FindJobs />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/upload-cv",
        element: <PublicCv />,
      },
      {
        path: "/create-cv",
        element: <CreateCv />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfServicePage />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/my-account",
        element: (
          <PrivateRoute requiredRole="USER">
            <MyAccount />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="applications" replace /> },
          {
            path: "applications",
            children: [
              { index: true, element: <MyApplication /> },
              {
                path: ":id",
                // element:  <MyApplicationDetails />,
                element: <JobDetails />,
              },
            ],
          },
          { path: "cvs", element: <MyCVs /> },
          {
            path: "support",
            element: <div className="text-red-600">Support</div>,
          },
          {
            path: "saved-jobs",
            children: [
              { index: true, element: <SaveJobs /> },
              {
                path: ":id",
                element: <JobDetails />,
              },
            ],
          },
          {
            path: "settings",
            element: <UserAccountSettings />,
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              {
                path: "profile",
                element: <UserProfile />,
              },
              {
                path: "notifications",
                element: <UserNotification />,
              },
              {
                path: "security",
                element: <UserSecurity />,
              },
            ],
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/job-seeker-login",
        element: <JobSeekerLogin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signup/farm-owner",
        element: <FarmOwnerSignup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/create-account",
        element: <JoinLogin />,
      },
    ],
  },

  /* Client Dashboard */
  {
    path: "/client-dashboard",
    element: <ClientLayout />,
    children: [
      { index: true, element: <ClientDashboardPage /> },
      { path: "dashboard", element: <ClientDashboardPage /> },
    ],
  },

  /* Owner Dashboard */
  {
    path: "/owner-dashboard",
    element: (
      <FarmOwnerRoute requiredRole="FARM_OWNER">
        <OwnerLayout />
      </FarmOwnerRoute>
    ),

    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      { path: "dashboard", element: <OwnerDashboardPage /> },
      { path: "all-applicant", element: <AllApplicantPage /> },
      {
        path: "all-applicant/:id",
        element: <ApplicantDetailsPage />,
      },
      { path: "nonfiction", element: <Notifications /> },
      { path: "my-jobs", element: <MyJobsPage /> },
      { path: "my-jobs/applicants/:jobId", element: <AllApplicantPage /> },
      { path: "my-jobs/create", element: <CreateNewJob /> },
      { path: "my-jobs/edit/:id", element: <CreateNewJob /> },
      { path: "ideal-candidate", element: <IdealCandidatePage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      {
        path: "all-users",
        element: <AllUsersPage />,
        children: [
          { index: true, element: <Navigate to="job-seekers" replace /> },
          {
            path: "job-seekers",
            element: <JobSeeker />,
          },
          {
            path: "employers",
            element: <Employer />,
          },
        ],
      },
      {
        path: "all-users/job-seekers/:id",
        element: <UserDetails />,
      },
      {
        path: "all-users/employers/:id",
        element: <EmployerDetails />,
      },
      { path: "all-jobs", element: <AllJobsPage /> },
      { path: "all-jobs/:id", element: <JobDetails /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "settings", element: <SettingsPages /> },
      { path: "notifications", element: <Notifications /> },
      {
        path: "contracts",
        element: <ContractPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
