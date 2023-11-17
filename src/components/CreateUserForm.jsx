import { useOutletContext } from "react-router-dom";
import { Card, Form, Input, Spin } from "antd";
import Button from "./Button";
import { useSignUp } from "../hooks/auth/useSignup";

export default function CreateUserForm() {
  const { signup, isPending } = useSignUp();
  const [form] = Form.useForm();
  const { openMessage } = useOutletContext();

  const onSubmit = (values) => {
    // const request = {
    //   email: values.email,
    //   password: values.password,
    //   full_name: values.full_name
    // }

    // signup(request, {
    //   onSettled: () => {
    //     form.resetFields();
    //   },
    //   onSuccess: () => {
    //     openMessage("success", "Success registered user, Please Verify Your Email!");
    //   },
    //   onError: () => {
    //     openMessage("error", "Failed registered user!");
    //   }
    // });

    openMessage("error", "Sorry, this feature is disable for demo app!")
  }

  return (
    <Card
      className="w-[50%] mx-auto pt-5"
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        onFinish={onSubmit}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Please input this field!" }]}
        >
          <Input
            id="full_name"
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Please input this field!" },
            { type: "email", message: "Please input valid email address" }
          ]}
        >
          <Input
            id="email"
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input.Password
            id='password'
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item
          label="Repeat Password"
          name="repeat-password"
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
            id='repeat-password'
            disabled={isPending}
          />
        </Form.Item>

        <div className="flex justify-end mr-[4%] mt-10">
          <Button disabled={isPending}>
            {isPending ? <Spin /> : "Create New user"}
          </Button>
        </div>
      </Form>
    </Card>
  )
}
