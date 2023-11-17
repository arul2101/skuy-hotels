import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useBooking } from "../hooks/bookings/useBooking";
import { useSettings } from "../hooks/useSettings";

// My Components
import Spinner from "../components/Spinner";
import BookingDetailBox from "../components/BookingDetailBox";
import Button from "../components/Button";
import BookingDetailHeader from "../components/BookingDetailHeader";
import CheckInAction from "../components/CheckinAction";
import { useLayoutEffect } from "react";

export default function CheckIn() {
  const { booking, isPending } = useBooking();
  const { settings, isPending: isFetchingSettings } = useSettings();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Skuy Hotels | CheckIn";
  });

  if (isPending || isFetchingSettings) return <Spinner />

  if (booking.status === 'checked-in' || booking.status === 'checked-out') navigate("/bookings")

  return (
    <div className="px-[5rem]">
      <Button onClick={() => navigate("/bookings", { replace: true, })}>&larr; Back</Button>
      <BookingDetailHeader booking={booking} />
      <BookingDetailBox booking={booking} />
      <CheckInAction booking={booking} settings={settings} />
    </div>
  )
}