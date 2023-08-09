// @ts-nocheck

"use client"
import { useUser } from "@clerk/clerk-react"
import { useState, useEffect } from "react"

export default function UserChordPages() {
  // const DOMAIN_LINK = "https://quality-chords.vercel.app" // ! PRODUCTION MODE =============
  const DOMAIN_LINK = "http://localhost:3000" // ! DEV MODE =============

  const [userData, setUserData] = useState({})
  const { user } = useUser()

  const userEmail = user?.primaryEmailAddress?.emailAddress

  async function getUserData() {
    const res = await fetch(`${DOMAIN_LINK}/api/clerkUser/${userEmail}`)
    const parseRes = await res.json()
    setUserData(parseRes)
    console.log(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <h3>sadf</h3>
      <p>sdfdegfr</p>
      <p>{userData.email}</p>
      {userData.pages.map((e) => (
        <div>
          <p>{e.id}</p>
          <p>{e.name}</p>
        </div>
      ))}
    </div>
  )
}
