import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// Antd
import { Alert, Checkbox, DatePicker, Form, Input, InputNumber, Select, Space, Spin } from "antd";

// Custom Hooks
import { useCreateBooking } from "@/hooks/bookings/useCreateBooking";
import { useCabins } from "@/hooks/cabins/useCabins";
import { useGuests } from "@/hooks/guests/useGuests";

// My Components
import Spinner from "./Spinner";
import Button from "./Button";

// Helper
import { formatCurrency } from "@/util/helper";
import { useSettings } from "../hooks/useSettings";
import CreateGuestForm from "./CreateGuestForm";

const { RangePicker } = DatePicker;

export default function CreateBookingForm() {
  const [checkPrice, setCheckPrice] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cabinSelectedId, setCabinSelectedId] = useState(null);
  const [guestSelectedId, setGuestSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { openMessage } = useOutletContext();
  const [form] = Form.useForm();
  const [date, setDate] = useState(null);
  const { createBooking, isPending: isCreateBooking } = useCreateBooking();
  const { guests, isPending: isFetchingGuests } = useGuests();
  const { cabins, isPending: isFetchingCabins } = useCabins();
  const { settings, isPending: isFetchingSettings } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    if (cabinSelectedId) {
      const selectedCabin = cabins.find(cabin => cabin.id === cabinSelectedId);
      form.setFieldValue("cabin_price", selectedCabin.regular_price);
    }
  }, [cabinSelectedId, form, cabins])

  if (isFetchingGuests || isFetchingCabins || isFetchingSettings) return <Spinner />


  const guestsOptions = guests.map(guest => {
    return {
      value: guest.id,
      label: `${guest.full_name} - ${guest.email} - ${guest.national_id}`
    }
  })

  const cabinsOptions = cabins.map(cabin => {
    return {
      value: cabin.id,
      label: `Cabin ${cabin.name} - Max ${cabin.max_capacity} Guest - ${formatCurrency(cabin.regular_price)}`
    }
  })

  const handleOk = (value) => {
    if (!date || !cabinSelectedId || !guestSelectedId) {
      openMessage("error", "Please complete all the fields!")
      return;
    }

    const startDate = new Date(date[0].$d.toUTCString()).toISOString();
    const endDate = new Date(date[1].$d.toUTCString()).toISOString();
    const extrasPrice = breakfast ? (settings.breakfast_price * value.num_nights * value.num_guests) : 0;

    // Generate Unik Id
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const uniqId = `SKY${currentDay}${currentMonth}${currentYear}` + Math.floor(Math.random() * 999999);

    const request = {
      id: uniqId,
      start_date: startDate,
      end_date: endDate,
      num_nights: value.num_nights,
      num_guests: value.num_guests,
      cabin_price: value.cabin_price,
      extras_price: extrasPrice,
      total_price: value.cabin_price + extrasPrice,
      status: selectedStatus,
      has_breakfast: breakfast,
      is_paid: isPaid,
      observations: value.observations,
      cabin_id: cabinSelectedId,
      guest_id: guestSelectedId,
    }

    createBooking(request, {
      onSuccess: () => {
        openMessage("success", "Successfully create booking");
        navigate("/bookings");
      },
      onError: () => {
        openMessage("error", "Ups, there was an error when create a new booking");
      }
    })
  }



  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleOk}
      onFinishFailed={() => openMessage("error", "Please complete all the fields!")}
      autoComplete="off"
      className='mt-10'
    >
      <Form.Item
        label="Guest"
        name="guest"
        id="guest"
      >
        <Space
          className="block"
        >
          <Select
            id="guest"
            showSearch
            placeholder="Select a guest"
            optionFilterProp="children"
            onChange={(value) => setGuestSelectedId(value)}
            filterOption={filterOption}
            options={guestsOptions}
          />
          <CreateGuestForm />
        </Space>
      </Form.Item>

      <Form.Item
        label="Cabin"
        name="cabin"
        id="cabin"
      >
        <Select
          showSearch
          placeholder="Select a cabin"
          optionFilterProp="children"
          onChange={(value) => {
            setCabinSelectedId(value)
          }}
          filterOption={filterOption}
          options={cabinsOptions}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        id="date"
      >
        <RangePicker
          id="date"
          name="date"
          showTime={{
            format: 'HH:mm',
          }}
          format="DD-MM-YYYY HH:mm"
          onOk={(value) => setDate(value)}
          popupClassName="rangepicker"
        />
      </Form.Item>
      <Form.Item
        label="Num Guests"
        name="num_guests"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <InputNumber
          id='num_guests'
          name='num_guests'
          className='w-full'
          disabled={isCreateBooking}
        />
      </Form.Item>
      <Form.Item
        label="Num Nights"
        name="num_nights"
        rules={[{ required: true, message: "Please input this field!" }]}
      >
        <InputNumber
          id='num_nights'
          name='num_nights'
          className='w-full'
          disabled={isCreateBooking}
        />
      </Form.Item>

      <Form.Item
        className="ml-[21%]"
      >
        <Checkbox
          checked={breakfast}
          value={breakfast}
          onChange={e => {
            setBreakfast(e.target.checked)
          }}
          name="has_breakfast"
          id="has_breakfast"
        >Has Breakfast?</Checkbox>

        <Checkbox
          checked={isPaid}
          value={isPaid}
          onChange={e => {
            setIsPaid(e.target.checked)
          }}
          name="is_paid"
          id="is_paid"
        >Has Paid?</Checkbox>
      </Form.Item>
      <Form.Item
        label="Cabin Price"
        name="cabin_price"
      >
        <InputNumber
          id='cabin_price'
          name='cabin_price'
          className='w-full'
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\\s?|(,*)/g, '')}
          disabled={true}
        />
      </Form.Item>

      <Form.Item
        label="Observations"
        name="observations"
      >
        <Input
          id='observations'
          disabled={isCreateBooking}
        />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please input this field!' }]}
      >
        <Select
          id="status"
          className="w-full"
          onChange={(value) => setSelectedStatus(value)}
          options={[
            {
              value: 'unconfirmed',
              label: 'Unconfirmed',
            },
            {
              value: 'checked-in',
              label: 'Check In',
            },
          ]}
        />
      </Form.Item>

      {checkPrice &&
        <Alert
          className="w-[68%] ml-[20%] mb-10"
          description={
            <span className="text-green-600 text-[1.2rem] font-light">
              {`Total Price : 
                  ${formatCurrency(form.getFieldValue("cabin_price") +
                (breakfast ? settings.breakfast_price * form.getFieldValue("num_guests") * form.getFieldValue("num_nights") : 0))}`}
            </span>
          }
          type="success"
        />
      }

      <div className="flex justify-end gap-2 mr-[12%]">
        <Button
          style="info"
          onClick={() => {
            if (!form.getFieldValue("cabin_price") || !form.getFieldValue("num_guests") || !form.getFieldValue("num_nights")) {
              openMessage("error", "Please Complete all the fields before check total price!")
            }

            if (form.getFieldValue("cabin_price") && form.getFieldValue("num_guests") && form.getFieldValue("num_nights")) {
              setCheckPrice(true)
              console.log(form.getFieldValue("num_guests"))
            }
          }}
          type="button"
        >Check Total Price</Button>
        <Button>{isCreateBooking ? <Spin /> : "Create"}</Button>
      </div>
    </Form >
  )
}
