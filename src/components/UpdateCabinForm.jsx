import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

// Antd
import { Button, Form, Input, InputNumber, Modal, Tooltip, Upload } from "antd";
import { UploadOutlined, EditOutlined } from '@ant-design/icons';

// Custom Hooks
import { useUpdateCabin } from "@/hooks/cabins/useUpdateCabin";



export default function UpdateCabinForm({ cabin }) {
  const {
    key: cabinId,
    cabin: name,
    max_capacity,
    regular_price,
    _discount: discount,
    description,
    imageUrl
  } = cabin;

  const imageName = imageUrl.split("/").slice(-1)[0];
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { openMessage } = useOutletContext();
  const { updateCabin, isPending } = useUpdateCabin();



  const handleOk = (values) => {
    let request = {
      id: cabinId,
      name: values.name,
      max_capacity: values.max_capacity,
      regular_price: values.regular_price,
      discount: values.discount,
      description: values.description,
    }

    if (typeof values.cabin_image === "string") request.imageName = values.cabin_image;

    if (typeof values.cabin_image === "object") {
      request.imageName = values.cabin_image.file.name;
      request.image = values.cabin_image.file.originFileObj;
    }

    updateCabin(request, {
      onSuccess: () => {
        openMessage("success", "Success Update!");
        setOpen(false);
        form.resetFields();
      },
      onError: () => {
        openMessage("error", "Error Update!");
      }
    });
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  return (
    <>
      <Tooltip title="Edit Cabin">
        <EditOutlined
          className="p-1 cursor-pointer border-sky-600 text-sky-600 border rounded-md"
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Update cabin"
        open={open}
        onOk={form.submit}
        confirmLoading={isPending}
        onCancel={handleCancel}
        okText="Update"
        okType="default"
      >
        <Form
          form={form}
          name="update"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            name,
            max_capacity,
            regular_price,
            discount,
            description,
            cabin_image: imageUrl,
          }}
          onFinish={handleOk}
          autoComplete="off"
          className='mt-10'

        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name cabin!' }]}
          >
            <Input
              id='name'
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Max Capacity"
            name="max_capacity"
            rules={[
              { required: true, message: 'Please input the max capacity!' },
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (value > 8) {
                      reject("maximum capacity must be less than 8")
                    }

                    resolve("success");
                  })
                }
              }
            ]}
          >
            <InputNumber
              id='max_capacity'
              name='max_capacity'
              className='w-full'
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Regular Price"
            name="regular_price"
            rules={[{ required: true, message: 'Please input the regular price!' }]}
          >
            <InputNumber
              id='regular_price'
              name='regular_price'
              className='w-full'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\\s?|(,*)/g, '')}
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (value > form.getFieldValue("regular_price")) {
                      reject("discount must be less than price!")
                    }

                    resolve("success");
                  })
                }
              }
            ]}
          >
            <InputNumber
              id='discount'
              name='discount'
              className='w-full'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\\s?|(,*)/g, '')}
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input
              id='description'
              name='description'
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label="Cabin Image"
            name="cabin_image"
            rules={[
              { required: true, message: "Please upload cabin image!" },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {

                    if (typeof fileList === 'object') {
                      // Check type file
                      const isImg = fileList?.file.type === 'image/jpeg' || fileList?.file.type === 'image/jpg' || fileList?.file.type === 'image/png' || fileList?.file.type === 'image/gif';
                      if (!isImg) {
                        reject("You can upload image only!");
                      }

                      // check file size
                      const isLessThan2mb = (fileList?.file.size / 1024 / 1024) <= 3;
                      if (!isLessThan2mb) {
                        reject("Image must smaller than 2mb");
                      }

                      resolve("success");
                    }

                    if (typeof fileList === "string") {
                      resolve("Success");
                    }

                  });
                },
              }
            ]}
          >
            <Upload.Dragger
              id='cabin_image'
              name='cabin_image'
              maxCount={1}
              listType='picture'
              disabled={isPending}
              defaultFileList={[{
                uid: cabinId,
                url: imageUrl,
                name: imageName,
              }]}
            >
              <Button icon={<UploadOutlined />}>Upload Here</Button>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

UpdateCabinForm.propTypes = {
  cabin: PropTypes.object
}
