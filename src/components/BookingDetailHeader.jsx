import { Tag } from "antd";
import PropTypes from "prop-types";

export default function BookingDetailHeader({ booking }) {
  const { status, id } = booking;

  return (
    <div className="flex mt-5 mb-2 items-center gap-2">
      <h1 className="font-bold text-[2rem]">Booking #{id}</h1>
      <span className="font-bold">
        <Tag
          bordered={false}
          color={
            status === "unconfirmed"
              ? "processing"
              : status === "checked-in" ? "success" : "default"
          }>
          {status.replace("-", " ").toUpperCase()}
        </Tag>
      </span>
    </div>
  )
}

BookingDetailHeader.propTypes = {
  booking: PropTypes.object.isRequired
}
