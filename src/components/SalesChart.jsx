import { Card } from "antd";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PropTypes from "prop-types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatCurrency } from "../util/helper";

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

export default function SalesChart({ bookings, numDays }) {

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  });

  const data = allDates.map(date => {
    return {
      label: format(date, 'dd MMM'),
      totalSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.total_price, 0),
      extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.extras_price, 0),
    }
  })

  console.log(data[0].extrasSales);

  return (
    <Card>
      <h1 className="text-[1.5rem] mb-5">Sales from {format(allDates.at(0), "dd MMM yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "dd MMM yyyy")}{" "}</h1>

      <ResponsiveContainer height={300} width='98%'>
        <AreaChart data={data}>
          <XAxis dataKey='label' tick={{ fill: '#374151' }} tickLine={{ stroke: '#374151' }} />
          {/* <YAxis tick={{ fill: '#374151' }} tickLine={{ stroke: '#374151' }} fontSize='10px' tickFormatter={(value) => formatCurrency(value)} /> */}
          <CartesianGrid strokeDasharray='4' contentStyle={{ backgroundColor: "#fff" }} />
          <Tooltip formatter={value => formatCurrency(value)} />
          <Area dataKey='totalSales' type='monotone' stroke="#4f46e5" fill="#c7d2fe" strokeWidth={2} name="Total Sales" />
          <Area dataKey='extrasSales' type='monotone' stroke="green" fill="#74f7c1" strokeWidth={2} name="Extras Sales" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

SalesChart.propTypes = {
  bookings: PropTypes.array,
  numDays: PropTypes.number
}