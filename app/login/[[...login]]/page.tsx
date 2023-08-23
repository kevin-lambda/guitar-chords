import React from "react"
import { SignIn } from "@clerk/nextjs"

function Login() {
  return (
    <div className="is-flex is-justify-content-center py-6">
      <SignIn />
    </div>
  )
}

export default Login
