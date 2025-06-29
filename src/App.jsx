import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Components/Homecomponents/Home";
import OpportunityDetails, {
  loader as deatilsLoader,
} from "./Components/Volanteringcomponent/OpportunityDetails";
import ErrorPage from "./Pages/ErrorPage";
import Singup from "./Components/singup/Singup";
import ResetPasswordForm from "./Components/Login/ResetPasswordForm";
import EditProfilePage from "./Components/OrganizatonProfile/EditProfilePage";
import Organization, {
  Loader as organizationLoader,
} from "./Components/Charity/Organization";
import Charity, { Loader as charityLoader } from "./Components/Charity/Charity";
import VolunteerForm, {
  formAction,
} from "./Components/Volanteringcomponent/VolunteerForm";
import Login, { action as loginaction } from "./Components/Login/Loginpage";
import ForgotPassword, {
  forgotPasswordAction,
} from "./Components/Login/ForgotPasswordForm";
import Volantering, { loader as opportunityLoader } from "./Pages/Volantering";
import Profile, {
  Loader as profileLoader,
} from "./Components/OrganizatonProfile/Profile";
import Help from "./Components/HelpComponent/Help";
import Donation from "./Components/DonationsComponent/DonationPage";
import OrganizationDonations from "./Components/DonationsComponent/OrganizationDonations";
import LostAndFoundPage from "./Components/LostitemsComponent/LostAndFoundPage";
import AddReportPage, {
  addReportAction,
} from "./Components/LostitemsComponent/AddReportPage";
import ChangePassword from "./Components/Dashboard/ChangePassword";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import Statisticsdashoard from "./Components/Dashboard/Statisticsdashoard";
import AddDonationForm from "./Components/Dashboard/AddDonationForm";
import AddVolunteeringForm from "./Components/Dashboard/AddVolunteeringForm";
import UserProfileModern from "./Components/user/UserProfileModern";
import Volunteering, {
  Loader as volanteringLoader,
} from "./Components/Dashboard/Volunteering";
import Donationbranch, {
  Loader as donationLoader,
} from "./Components/Dashboard/Donationbranch";
import DonateNow from "./Components/DonationsComponent/Donatenow";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/Volantering",
        element: <Volantering />,
        loader: opportunityLoader,
      },
      {
        path: "/Donation",
        element: <Donation />,
      },
      {
        path: "/UserProfileModern",
        element: <UserProfileModern />,
      },
      {
        path: "/LostAndFoundPage",
        element: <LostAndFoundPage />,
      },
      {
        path: "/LostAndFoundPage/AddReportPage",
        element: <AddReportPage />,
        action: addReportAction,
      },
      {
        path: "/Donation/OrganizationDonations",
        element: <OrganizationDonations />,
      },
      {
        path: "/Donation/DonateNow",
        element: <DonateNow />,
      },
      {
        path: "/Volantering/:opportunityId",
        element: <OpportunityDetails />,
        loader: deatilsLoader,
      },
      {
        path: "/Volantering/:opportunityId/form",
        element: <VolunteerForm />,
        action: formAction,
      },

      {
        path: "/charity",
        element: <Charity />,
        loader: charityLoader,
      },
      {
        path: "/DashboardLayout",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Statisticsdashoard />,
          },

          {
            path: "editprofile",
            element: <EditProfilePage />,
          },
          {
            path: "Volunteering",
            element: <Volunteering />,
            loader: volanteringLoader,
          },
          {
            path: "Donationbranch",
            element: <Donationbranch />,
            loader: donationLoader,
          },
          {
            path: "ChangePassword",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "/Help",
        element: <Help />,
      },
      {
        path: "/charity/:organizationId",
        element: <Organization />,
        loader: organizationLoader,
      },
      {
        path: "/charitydashboard",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "/charitydashboard/edit",
        element: <EditProfilePage />,
      },

      { path: "/singup", element: <Singup /> },
      { path: "/login", element: <Login />, action: loginaction },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path: "/ResetPassword",
        element: <ResetPasswordForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
