import { BookOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Stat from "./Stat";
import { formatCurrency } from "../util/helper";

export default function StatsDashboard({ bookings, confirmedStays }) {
  const numBookings = bookings?.length;
  const checkIn = confirmedStays?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.total_price, 0);

  return (
    <div className="flex justify-between mb-5">
      <Stat
        key="1"
        title="BOOKINGS"
        value={numBookings}
        icon={<BookOutlined className="text-[3rem] border rounded-full p-4 bg-sky-400 text-sky-200" />}
      />
      <Stat
        key="2"
        title="SALES"
        value={formatCurrency(sales)}
        icon={<DollarOutlined className="text-[3rem] border rounded-full p-4 bg-green-400 text-green-200" />}
      />

      <Stat
        key="3"
        title="CHECK IN"
        value={checkIn}
        icon={<CalendarOutlined className="text-[3rem] border rounded-full p-4 bg-purple-400 text-purple-200" />}
      />
    </div>
  )
}

StatsDashboard.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array
}
