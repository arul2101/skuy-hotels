import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../util/helper";
import { Checkbox, Modal } from "antd";
import { useCheckin } from "../hooks/bookings/useCheckin";
import { useOutletContext } from "react-router-dom";
import Button from "./Button";
import { ExclamationCircleFilled } from '@ant-design/icons';

export default function CheckInAction({ booking, settings }) {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { checkIn, isPending: isCheckingIn } = useCheckin();
  const { openMessage } = useOutletContext();

  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);


  const { breakfast_price } = settings;

  const {
    id,
    guests: { full_name },
    has_breakfast,
    total_price,
    num_nights,
    num_guests,
  } = booking;

  const optionalBreakfastPrice = breakfast_price * num_nights * num_guests;

  const handleCheckIn = () => {
    if (!confirmPaid) {
      setOpenModal(false);
      return;
    }

    let request = {
      id,
      status: "checked-in",
      is_paid: true,
    };

    if (!addBreakfast) {
      checkIn(request, {
        onSuccess: () => {
          openMessage("success", `Successfully checked in booking #${id}`)
        },
        onError: () => {
          openMessage("error", 'Ups, there was an error checked in booking!');
        }
      });
    }

    if (addBreakfast) {
      request.breakfast = {
        has_breakfast: true,
        extras_price: optionalBreakfastPrice,
        total_price: total_price + optionalBreakfastPrice
      };

      checkIn(request, {
        onSuccess: () => {
          openMessage("success", `Successfully checked in booking #${id}`)
        },
        onError: () => {
          openMessage("error", 'Ups, there was an error checked in booking!');
        }
      });
    }
  }

  return (
    <>
      {!has_breakfast && (
        <div
          className="bg-white w-[70%] mb-4 rounded-xl p-4"
        >
          <Checkbox
            checked={addBreakfast}
            onChange={e => {
              setAddBreakfast(e.target.checked)
              setConfirmPaid(false);
            }}
          >
            {`Want to add breakfast for => ${formatCurrency(breakfast_price)}`}
          </Checkbox>
        </div>
      )}

      <div
        className="bg-white w-[70%] mb-4 rounded-xl p-4"
      >
        <Checkbox
          checked={confirmPaid}
          onChange={e => setConfirmPaid(e.target.checked)}
          disabled={confirmPaid}
        >
          {`I Confirm that ${full_name} has paid the total amount of =>`}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(total_price + optionalBreakfastPrice)} on detail ( ${formatCurrency(total_price)} cabin price + ${formatCurrency(optionalBreakfastPrice)} breakfast price )`
          }
        </Checkbox>
      </div>

      <div className="flex w-[70%] gap-2 justify-end">
        <Button
          type="button"
          onClick={() => setOpenModal(true)}
          className={`${!confirmPaid || isCheckingIn ? 'cursor-not-allowed' : ''}`}
          disabled={!confirmPaid || isCheckingIn}
        >
          {`Check In Booking #${id}`}
        </Button>
        <Modal
          title={<span><ExclamationCircleFilled className="text-yellow-500" /> Are You sure to Check In this booking?</span>}
          centered
          open={openModal}
          onOk={handleCheckIn}
          onCancel={() => setOpenModal(false)}
          okType="default"
          confirmLoading={isCheckingIn}
        >
        </Modal>

        <Button style="danger">Delete Booking</Button>
      </div>
    </>
  )
}

CheckInAction.propTypes = {
  booking: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}
