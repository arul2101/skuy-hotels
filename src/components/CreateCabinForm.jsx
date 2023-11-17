import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Antd
import { Button as ButtonAntd, Form, Input, InputNumber, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Custom Hooks
import { useCreateCabins } from '@/hooks/cabins/useCreateCabins';

// My Components
import Button from './Button';


export default function CreateCabinForm() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { createCabin, isPending } = useCreateCabins();
  const { openMessage } = useOutletContext();

  const handleOk = (values) => {
    const request = {
      name: values.name,
      max_capacity: values.max_capacity,
      regular_price: values.regular_price,
      discount: values.discount,
      description: values.description,
      imageName: values.cabin_image.file.name,
      image: values.cabin_image.file.originFileObj,
    }

    createCabin(request, {
      onSuccess: () => {
        openMessage("success", "Success create cabin!");
        setOpen(false);
        form.resetFields();
      },
      onError: () => {
        openMessage("error", "Failed create cabin!");
      },
    });
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Cabin</Button>
      <Modal
        title="Create new cabin"
        open={open}
        onOk={form.submit}
        confirmLoading={isPending}
        onCancel={handleCancel}
        okType='default'
        okText="Create"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={handleOk}
          onFinishFailed={() => { }}
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

                    // Check type file
                    const isImg = fileList?.file.type === 'image/jpeg' || fileList?.file.type === 'image/jpg' || fileList?.file.type === 'image/png' || fileList?.file.type === 'image/gif';
                    if (!isImg) {
                      reject("You can upload image only!");
                      return;
                    }

                    // check file size
                    const isLessThan2mb = (fileList?.file.size / 1024 / 1024) <= 3;
                    if (!isLessThan2mb) {
                      reject("Image must smaller than 2mb");
                      return;
                    }

                    resolve("Success");

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
            >
              <ButtonAntd icon={<UploadOutlined />}>Upload Here</ButtonAntd>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}