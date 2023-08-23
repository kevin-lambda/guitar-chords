import React from "react"
import { SignUp } from "@clerk/nextjs"

function Page() {
  return (
    <div className="is-flex is-justify-content-center py-6">
      <SignUp />
    </div>
  )
}

export default Page
