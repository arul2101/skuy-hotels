import { Card } from "antd";
import PropTypes from "prop-types";

export default function Stat({ title, value, icon }) {
  return (
    <Card
      className="w-[400px]"
    >
      <div className="flex items-center gap-2 flex-wrap">
        {icon}
        <div>
          <h2 className="text-gray-500 font-semibold">{title}</h2>
          <p className="font-semibold text-[1.8rem] w-[70%]">{value}</p>
        </div>
      </div>
    </Card>
  )
}

Stat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.element
}
