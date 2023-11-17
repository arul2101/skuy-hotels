import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Pages
import RootLayout from "@/layout/RootLayout";
import Dashboard from "@/pages/Dashboard";
import Cabins from "@/pages/Cabins";
import Login from "@/pages/Login";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Bookings from "@/pages/Bookings";
import BookingDetail from "@/pages/BookingDetail";
import CheckIn from "@/pages/CheckIn";
import CreateBooking from "@/pages/CreateBooking";

// My Components
import NotFound from "@/components/NotFound";

import ErrorFallback from "@/components/ErrorFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "bookings/:id",
        element: <BookingDetail />
      },
      {
        path: "bookings/create",
        element: <CreateBooking />
      },
      {
        path: "checkin/:id",
        element: <CheckIn />
      },
      {
        path: "cabins",
        element: <Cabins />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ],
    errorElement: <ErrorFallback />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "*",
    element: <NotFound />
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}