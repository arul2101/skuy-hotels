import { Card, Form, Input, Spin } from "antd";
import Title from "@/components/Title";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser"
import { useUser } from "@/hooks/auth/useUser";
import { useOutletContext } from "react-router-dom";
import Button from "./Button";

export default function UpdateUserProfile() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { openMessage } = useOutletContext();
  const {
    user: {
      email,
      user_metadata: {
        full_name
      }
    }
  } = useUser();

  const handleUpdateProfile = (values) => {
    // const request = {
    //   full_name: values.full_name,
    // }

    // updateUser(request, {
    //   onSuccess: () => {
    //     openMessage("success", "Success update user!")
    //   },
    //   onError: () => {
    //     openMessage("error", "Failed update user!")
    //   }
    // });

    openMessage("error", "Sorry, this feature is disable for demo app!")
  }

  return (
    <Card className="w-[50%] mx-auto mb-5">
      <Title text="Update User Profile" className="mb-5" />
      <Form
        name="form"
        onFinish={handleUpdateProfile}
        initialValues={{
          email,
          full_name,
        }}
        labelAlign="left"
        labelCol={{ span: 6 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            id='email'
            name="email"
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input
            id='full_name'
            name="full_name"
            disabled={isUpdating}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button disabled={isUpdating}>
            {isUpdating ? <Spin /> : "Update Profile"}
          </Button>
        </div>
      </Form>
    </Card>
  )
}
