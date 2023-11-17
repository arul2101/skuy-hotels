import { useLayoutEffect } from "react";

// Custom Hooks
import { useRecentBookings } from "@/hooks/bookings/useRecentBookings";
import { useRecentStays } from "@/hooks/bookings/useRecentStays";

// My Components
import StatsDashboard from "@/components/StatsDashboard";
import SalesChart from "@/components/SalesChart";
import Spinner from "../components/Spinner";
import DashboardHeader from "../components/DashboardHeader";

export default function Dashboard() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Dashboard";
  });

  if (isLoading1 || isLoading2) return <Spinner />

  return (
    <>
      <DashboardHeader />
      <StatsDashboard
        bookings={bookings}
        confirmedStays={confirmedStays}
      />
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </>

  )
}
