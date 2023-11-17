import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import { id } from "date-fns/locale";

// Antd
import { HomeOutlined, MessageOutlined, CheckSquareOutlined, CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';

// Helper
import { formatDistanceFromNow, formatCurrency } from "@/util/helper";
import { Alert, Space } from "antd";


export default function BookingDetailBox({ booking }) {
  const {
    created_at,
    cabins: {
      name: cabinName
    },
    guests: {
      full_name: guestName,
      email: guestEmail,
      country_flag,
      national_id,
    },
    start_date,
    end_date,
    num_nights,
    num_guests,
    total_price,
    has_breakfast,
    is_paid,
    observations,
  } = booking;

  return (
    <div
      className="bg-white h-[22rem] w-[70%] mb-4 rounded-xl text-white"
    >
      <div
        className="flex justify-between items-center bg-cyan-950 p-6 rounded-tl-xl rounded-tr-xl text-lg"
      >
        <h3><HomeOutlined /> {num_nights} nights in Cabin {cabinName}</h3>
        <p>{format(new Date(start_date), "EEEE, dd MMM yyyy", { locale: id })} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEEE, dd MMM yyyy", { locale: id })}</p>
      </div>

      <div
        className="px-4 pt-2 text-black"
      >
        <div>
          <Space
            size="small">
            <span className="text-[1.2rem]">{country_flag}</span>
            <p className="font-semibold text-[1rem]">
              {guestName} {num_guests > 1 ? `+ ${num_guests - 1} guests` : ""}
              <span className="text-gray-500"> &bull; {guestEmail} &bull; {national_id}</span>
            </p>
          </Space>
        </div>

        <div className="mt-2">
          <Space>
            <span className="mr-1">
              <MessageOutlined className="text-sky-600" />
            </span>
            <p className="text-[1rem]">
              {observations ? observations : "Nothing"}
            </p>
          </Space>
        </div>

        <div className="mb-4">
          <Space>
            <span className="mr-1">
              <CheckSquareOutlined className="text-green-500" />
            </span>
            <p className="text-[1rem]">
              Breakfast included? <span className="font-bold">{has_breakfast ? "Yes" : "No"}</span>
            </p>
          </Space>
        </div>

        {is_paid
          ? (
            <Alert
              message={<span className="text-green-600 font-bold text-[1rem]"><CheckOutlined /> PAID</span>}
              description={<span className="text-green-600 text-[1.2rem] font-light">{`Total Price : ${formatCurrency(total_price)}`}</span>}
              type="success"
            />
          ) : (
            <Alert
              message={<span className="text-yellow-600 font-bold text-[1rem]"><InfoCircleOutlined /> WILL PAY AT PROPERTY</span>}
              description={<span className="text-yellow-600 text-[1.2rem] font-light">{`Total Price : ${formatCurrency(total_price)}`}</span>}
              type="warning"
            />
          )
        }

        <footer className="mt-4 text-right">
          <p className="font-extralight">Booked at {format(new Date(created_at), "EEEE, dd MMM yyyy, p", { locale: id })} WIB</p>
        </footer>
      </div>
    </div>
  )
}

BookingDetailBox.propTypes = {
  booking: PropTypes.object.isRequired
}
