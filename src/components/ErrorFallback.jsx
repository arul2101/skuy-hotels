import { Result } from "antd";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

export default function ErrorFallback() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#fff";
  });
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="button" onClick={() => navigate("/dashboard")}>Back Home</Button>}
      className="mt-[10%]"
    />
  )
}
