// Antd
import { Form, Input, Spin, notification } from "antd"

// My Components
import Button from "./Button";

// My Custom Hooks
import { useLogin } from '@/hooks/auth/useLogin';

export default function LoginForm() {
  const [api, contextHolder] = notification.useNotification();
  const { login, isPending } = useLogin();

  const openNotification = (type, message) => {
    api[type]({ message });
  };

  const onSubmit = (values) => {
    const request = {
      email: values.email,
      password: values.password
    }
    login(request, {
      onError: (error) => {
        if (error.message == "Invalid login credentials") {
          openNotification("error", "Email or password is wrong!");
        }
        if (error.message == "Email not confirmed") {
          openNotification("info", "Please verify your email!");
        }
      }
    });
  }
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          email: "demo@example.com",
          password: "demo1234"
        }}
        onFinish={onSubmit}
        onFinishFailed={(errorInfo) => {
          console.log("Failed: ", errorInfo)
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: "Please input valid email address" }
          ]}
        >
          <Input
            id='email'
            name='email'
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            id='password'
            name='password'
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button>{isPending ? <Spin /> : "Login"}</Button>
        </Form.Item>
      </Form>
    </>
  )
}
