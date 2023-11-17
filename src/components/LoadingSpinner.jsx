import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';


export default function LoadingSpinner() {
  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 z-50">
      <Spin className='relative top-[40%] left-[50%]' indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
    </div>
  )
}