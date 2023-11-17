import { Card, Form, Input, Spin } from "antd";
import Button from "./Button";
import Title from "@/components/Title";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { useOutletContext } from "react-router-dom";

export default function UpdateUserPasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { openMessage } = useOutletContext();

  const handleUpdatePassword = (values) => {
    // const request = {
    //   password: values.password
    // }

    // updateUser(request, {
    //   onSuccess: () => {
    //     openMessage("success", "Success update user password!");
    //   },
    //   onError: () => {
    //     openMessage("error", "Failed update user password");
    //   }
    // });

    openMessage("error", "Sorry, this feature is disable for demo app!")
  }

  return (
    <Card className="w-[50%] mx-auto">
      <Title text="Update User Password" className="mb-5" />
      <Form
        name="basic"
        onFinish={handleUpdatePassword}
        labelCol={{ span: 6 }}
        labelAlign="left"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input.Password
            id='password'
            name="password"
            disabled={isUpdating}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm-password"
          dependencies={["password"]}
          rules={[
            { required: true, message: 'Please input this field!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            id='conifrm-password'
            disabled={isUpdating}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button disabled={isUpdating}>
            {isUpdating ? <Spin /> : "Update Password"}
          </Button>
        </div>
      </Form>
    </Card>
  )
}
