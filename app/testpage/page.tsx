// @ts-nocheck

"use client"
import { useAuth } from "@clerk/nextjs"

export default function Example() {
  const { isLoaded, userId, sessionId, getToken } = useAuth()

  // In case the user signs out while on the page.
  //   if (!isLoaded || !userId) {
  //     return null
  //   }
  console.log("============= hello")
  console.log(userId)
  console.log(sessionId)
  console.log(isLoaded)
  console.log(getToken())

  if (userId) {
    console.log("user id true")
  }

  return (
    <div>
      Hello, {userId} your current active session is {sessionId}
    </div>
  )
}
