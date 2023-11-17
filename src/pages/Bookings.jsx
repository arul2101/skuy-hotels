import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { format, isToday } from "date-fns";

// Antd
import { Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { EyeOutlined, QuestionCircleOutlined, DeleteOutlined, CheckOutlined, LogoutOutlined } from '@ant-design/icons';

// Custom Hooks
import { useDeleteBooking } from "@/hooks/bookings/useDeleteBooking";
import { useCheckout } from "@/hooks/bookings/useCheckout";
import { useBookings } from "@/hooks/bookings/useBookings";

// My Components
import Filters from "@/components/Filters";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

// Helper
import { filterBooking, formatDistanceFromNow, formatCurrency } from "@/util/helper";
import { getColumnSearchProps } from "../util/antdHelper";

export default function Bookings() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [searchParams] = useSearchParams();
  const { bookings, isPending } = useBookings();
  const { checkOut } = useCheckout();
  const { deleteBooking } = useDeleteBooking();
  const { openMessage } = useOutletContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Bookings";
  });

  if (isPending) return <Spinner />

  const filteredBookings = filterBooking(bookings, searchParams);

  const data = filteredBookings.map((item, index) => {
    return {
      // Additional
      key: index,
      _status: item.status,
      id: item.id,
      cabin: item.cabins.name,
      _guest: item.guests.full_name,
      _amount: item.total_price,
      _start_date: new Date(item.start_date),

      // Compponents
      guest: (
        <>
          <span className="font-semibold text-[.9rem] block">{item.guests.full_name}</span>
          <span className="font-extralight">{item.guests.email}</span>
        </>
      ),
      dates: (
        <>
          <div>
            <span className="font-semibold">{isToday(new Date(item.start_date))
              ? "Today"
              : formatDistanceFromNow(item.start_date)}{" "}
              &rarr; {item.num_nights} night stay</span>
          </div>
          <span className="font-extralight">
            {format(new Date(item.start_date), "dd MMM yyyy")} &mdash;{" "}
            {format(new Date(item.end_date), "dd MMM yyyy")}
          </span>
        </>
      ),
      status: (
        <Tag
          key={index}
          bordered={false}
          color={
            item.status === "unconfirmed"
              ? "processing"
              : item.status === "checked-in" ? "success" : "default"
          }>
          {item.status.replace("-", " ").toUpperCase()}
        </Tag>
      ),
      amount: formatCurrency(item.total_price)
    }
  })

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const columns = [
    {
      title: "Cabin",
      dataIndex: "cabin",
      key: "cabin",
      width: "13%",
      ...getColumnSearchProps('cabin', searchInput, searchedColumn, searchText, handleSearch),
    },
    {
      title: 'Guest',
      dataIndex: 'guest',
      key: 'guest',
      width: '20%',
    },
    {
      title: 'Dates',
      dataIndex: 'dates',
      key: 'dates',
      width: '20%',
      sorter: (a, b) => a._start_date - b._start_date,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: 'amount',
      sorter: (a, b) => a._amount - b._amount,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Detail Booking">
            <EyeOutlined
              className='p-1 cursor-pointer text-sky-600 border-sky-600 border rounded-md'
              onClick={() => {
                navigate(`/bookings/${record.id}`);
              }}
            />
          </Tooltip>

          {record._status === "unconfirmed" && (
            <Tooltip title="Check In">
              <CheckOutlined
                className='p-1 cursor-pointer text-green-600 border-green-600 border rounded-md'
                onClick={() => {
                  navigate(`/checkin/${record.id}`)
                }}
              />
            </Tooltip>
          )}

          {record._status === "checked-in" && (
            <Popconfirm
              title={`Check Out the booking #${record.id}`}
              description="Are you sure to Check Out status this booking?"
              okType='default'
              icon={<QuestionCircleOutlined />}
              onConfirm={() => {
                checkOut(record.id, {
                  onSuccess: () => {
                    openMessage("success", `Successfully checked out booking #${record.id}`);
                    navigate("/bookings");
                  },
                  onError: () => {
                    openMessage("error", "Ups, there was an error checked out booking!");
                  }
                });
              }}
            >
              <LogoutOutlined
                className='p-1 cursor-pointer text-gray-600 border-gray-600 border rounded-md'
              />
            </Popconfirm>
          )}

          <Popconfirm
            title={`Delete the booking #${record.id}`}
            description="Are you sure to delete this booking?"
            okType='default'
            icon={< QuestionCircleOutlined />}
            onConfirm={() => {
              deleteBooking(record.id, {
                onSuccess: () => openMessage("success", `Booking #${record.id} has been deleted!`),
                onError: () => openMessage("error", "Ups, there was an error in action delete booking!")
              })
            }}
          >
            <DeleteOutlined
              className='p-1 cursor-pointer text-red-600 border-red-600 border rounded-md'
            />
          </Popconfirm >
        </Space >
      ),
    }
  ];

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={() => navigate("/bookings/create")}>Create Booking</Button>
        <Filters
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "checked-in", label: "Checked In" },
            { value: "checked-out", label: "Checked Out" },
            { value: "unconfirmed", label: "Unconfirmed" },
          ]}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isPending}
      />
    </>
  )
}
