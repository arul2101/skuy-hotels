import { Result } from "antd";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Notfound() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#fff";
  });

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="button" onClick={() => navigate("/dashboard")}>Back Home</Button>}
      className="mt-[10%]"
    />
  )
}
