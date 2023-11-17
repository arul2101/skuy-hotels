import { useLayoutEffect } from "react";

// My Components
import UpdateUserPasswordForm from "../components/UpdateUserPasswordForm";
import Title from "@/components/Title";
import UpdateUserProfile from "../components/UpdateUserProfile";


export default function Profile() {
  useLayoutEffect(() => {
    document.title = "Skuy Hotels | Profile"
  })


  return (
    <div>
      <Title text="Update Your Account" className="text-center mb-5 text-[3rem]" />

      <div className="w-[100%] mx-auto pt-5">
        <UpdateUserProfile />
        <UpdateUserPasswordForm />
      </div>
    </div>
  )
}
