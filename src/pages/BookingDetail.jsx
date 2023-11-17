import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useBooking } from "@/hooks/bookings/useBooking"

// My Components
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import BookingDetailHeader from "@/components/BookingDetailHeader";
import BookingDetailBox from "@/components/BookingDetailBox";
import BookingDetailAction from "@/components/BookingDetailAction";
import { useLayoutEffect } from "react";

export default function BookingDetail() {
  const { booking, isPending: isFetchingBooking } = useBooking();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isFetchingBooking) document.title = `Skuy Hotels | Booking Detail #${booking.id}`;
  });

  if (isFetchingBooking) return <Spinner />

  return (
    <div className="px-[5rem]">
      <Button onClick={() => navigate("/bookings", { replace: true, })}>&larr; Back</Button>
      <BookingDetailHeader booking={booking} />
      <BookingDetailBox booking={booking} />
      <BookingDetailAction booking={booking} />
    </div>
  )
}
