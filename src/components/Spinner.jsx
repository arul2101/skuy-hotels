import { Spin } from "antd";

export default function Spinner() {
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <Spin size="large" />
    </div>
  )
}
