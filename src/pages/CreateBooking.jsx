import { Card } from "antd";
import { useNavigate } from "react-router-dom";

// My Components
import CreateBookingForm from "@/components/CreateBookingForm";
import Button from "@/components/Button";
import Title from "@/components/Title";
import { useLayoutEffect } from "react";

export default function CreateBooking() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Create Booking";
  });

  return (
    <>
      <Button onClick={() => navigate("/bookings", { replace: true, })}>&larr; Back</Button>
      <Title text="Create New Booking" className="text-center mb-5 text-[3rem]" />
      <Card className="w-[60%] mx-auto">
        <CreateBookingForm />
      </Card>
    </>
  )
}
