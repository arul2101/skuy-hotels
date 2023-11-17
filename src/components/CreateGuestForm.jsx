import { useState } from "react";
import Button from "./Button";
import { Form, Input, InputNumber, Modal } from "antd";
import { useOutletContext } from "react-router-dom";

import { useCreateGuest } from "@/hooks/guests/useCreateGuest";


export default function CreateGuestForm() {
  const [openModal, setOpenModal] = useState(false);
  const { createGuest, isPending: isCreateGuest } = useCreateGuest();
  const { openMessage } = useOutletContext();
  const [formModal] = Form.useForm();

  const handleCreateGuest = (values) => {
    const request = {
      full_name: values.full_name,
      email: values.email,
      national_id: values.national_id,
      nationality: values.nationality,
      country_flag: values.country_flag,
    };

    createGuest(request, {
      onSuccess: () => {
        openMessage("success", "Successfully create guest!");
        setOpenModal(false);
        formModal.resetFields();
      },
      onError: () => {
        openMessage("error", "Ups, there was an error when create guest!");
      }
    })
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpenModal(true)}
        className="mt-4"
      >Create Guest</Button>

      <Modal
        title="Create new guest"
        open={openModal}
        onOk={formModal.submit}
        confirmLoading={isCreateGuest}
        onCancel={() => {
          formModal.resetFields();
          setOpenModal(false);
        }}
        okType='default'
        okText="Create"
      >
        <Form
          form={formModal}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleCreateGuest}
          onFinishFailed={() => { }}
          autoComplete="off"
          className='mt-10'
        >
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input
              id='full_name'
              disabled={isCreateGuest}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input this field!' },
              { type: "email", message: "Please input valid email address!" }
            ]}
          >
            <Input
              id='email'
              disabled={isCreateGuest}
            />
          </Form.Item>

          <Form.Item
            label="National ID"
            name="national_id"
            rules={[
              { required: true, message: 'Please input this field!' },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (`${value}`.length === 16) {
                      resolve("success");
                    }

                    reject("national id must be 16 digit")
                  })
                }
              }
            ]}
          >
            <InputNumber
              id='national_id'
              name='national_id'
              className='w-full'
              disabled={isCreateGuest}
            />
          </Form.Item>

          <Form.Item
            label="Nationality"
            name="nationality"
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input
              id='nationality'
              disabled={isCreateGuest}
            />
          </Form.Item>

          <Form.Item
            label="Country Flag"
            name="country_flag"
            rules={[{ required: true, message: 'Please input this field!' }]}
          >
            <Input
              id='country_flag'
              disabled={isCreateGuest}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
