import { useLayoutEffect } from "react";

// My Components
import Title from "@/components/Title";
import CreateUserForm from "../components/CreateUserForm";

export default function Users() {
  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Users"
  })

  return (
    <>
      <Title text="Create New User" className="text-center mb-5 text-[3rem]" />
      <CreateUserForm />
    </>
  )
}
