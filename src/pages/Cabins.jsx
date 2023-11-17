import { useLayoutEffect, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

// Antd
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Image, Popconfirm, Space, Table } from 'antd';

// Custom Hooks
import { useCabins } from '@/hooks/cabins/useCabins';
import { useDeleteCabin } from '@/hooks/cabins/useDeleteCabin';

// My Components
import CreateCabinForm from '@/components/CreateCabinForm';
import UpdateCabinForm from '@/components/UpdateCabinForm';
import Filters from '@/components/Filters';
import Spinner from '../components/Spinner';

// Helper
import { formatCurrency, filterCabins } from '@/util/helper'
import { getColumnSearchProps } from '../util/antdHelper';

export default function Cabins() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [searchParams] = useSearchParams();
  const { cabins, isPending } = useCabins();
  const { deleteCabin } = useDeleteCabin();
  const { openMessage } = useOutletContext();
  const filteredCabins = filterCabins(cabins, searchParams);

  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Cabins";
  });

  if (isPending) return <Spinner />

  const data = filteredCabins.map(item => {
    return {
      image: <Image width={100} src={item.image} />,
      key: item.id,
      cabin: item.name,
      max_capacity: item.max_capacity,
      price: formatCurrency(item.regular_price),
      _price: item.regular_price,
      discount: item.discount === 0 ? "-" : formatCurrency(item.discount),
      description: item.description,
      imageUrl: item.image,
      regular_price: item.regular_price,
      _discount: item.discount,
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
      title: "",
      dataIndex: "image",
      key: "image",
      width: "10%"
    },
    {
      title: 'Cabin',
      dataIndex: 'cabin',
      key: 'cabin',
      width: '10%',
      sorter: (a, b) => a.cabin - b.cabin,
      ...getColumnSearchProps('cabin', searchInput, searchedColumn, searchText, handleSearch),
    },
    {
      title: 'Max Capacity',
      dataIndex: 'max_capacity',
      key: 'max_capacity',
      width: '10%',
      sorter: (a, b) => a.max_capacity - b.max_capacity,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a._price - b._price,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: 'discount',
      sorter: (a, b) => a._discount - b._discount
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <UpdateCabinForm cabin={record} />

          <Popconfirm
            title={`Delete the cabin ${record.cabin}`}
            description="Are you sure to delete this cabin?"
            okType='default'
            icon={<QuestionCircleOutlined />}
            onConfirm={() => {
              deleteCabin(record.key, {
                onSuccess: () => {
                  openMessage("success", "Success delete cabin!");
                },
                onError: () => {
                  openMessage("error", "Failed delete this cabin!")
                }
              })
            }}
          >
            <DeleteOutlined
              className='p-1 cursor-pointer text-red-600 border-red-600 border rounded-md'
            />
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <CreateCabinForm />
        <Filters
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No Discount" },
            { value: "with-discount", label: "With Discount" }
          ]}
        />
      </div>
      <Table columns={columns} dataSource={data} loading={isPending} />
    </>
  )

}
