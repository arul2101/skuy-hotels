import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

// Ant
import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

// Custom Hooks
import { useCheckout } from "../hooks/bookings/useCheckout";

// My Components
import Button from "./Button";


export default function BookingDetailAction({ booking }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { checkOut, isPending: isCheckingOut } = useCheckout();
  const { status, id } = booking;
  const { openMessage } = useOutletContext();

  const handleCheckOut = () => {
    checkOut(id, {
      onSuccess: () => {
        openMessage("success", `Successfully checked out booking #${id}`);
        navigate("/bookings");
      },
      onError: () => {
        openMessage("error", "Ups, there was an error checked out booking!");
      }
    });
  }

  return (
    <div className="flex w-[70%] gap-2 justify-end">
      {status === "unconfirmed" && (
        <Button
          onClick={() => navigate(`/checkin/${id}`)}
        >Check In</Button>
      )}

      {status === "checked-in" && (
        <>
          <Button
            onClick={() => setOpenModal(true)}
          >Check Out</Button>

          <Modal
            title={<span><ExclamationCircleFilled className="text-yellow-500" /> Are You sure to Check Out this booking?</span>}
            centered
            open={openModal}
            onOk={handleCheckOut}
            onCancel={() => setOpenModal(false)}
            okType="default"
            confirmLoading={isCheckingOut}
          >
          </Modal>
        </>
      )}
      <Button style="danger">Delete Booking</Button>
    </div>
  )
}

BookingDetailAction.propTypes = {
  booking: PropTypes.object.isRequired
}
