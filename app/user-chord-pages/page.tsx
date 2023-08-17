// @ts-nocheck

"use client"
import { useUser } from "@clerk/clerk-react"
import { useState, useEffect } from "react"

export default function UserChordPages() {
  const DOMAIN_LINK = "https://quality-chords.vercel.app" // ! PRODUCTION MODE =============
  // const DOMAIN_LINK = "http://localhost:3000" // ! DEV MODE =============

  const [userData, setUserData] = useState({})

  const { user } = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress

  async function getUserData() {
    const res = await fetch(`${DOMAIN_LINK}/api/clerkUser/${userEmail}`)
    const parseRes = await res.json()
    setUserData(parseRes)
  }

  useEffect(() => {
    getUserData()
  }, [userEmail])

  return (
    <div className="container">
      <section className="section mb-0 pb-4">
        <h1 className="title is-family-secondary">Saved Chord Pages</h1>
      </section>

      <section className="section pb-0 pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          Pages saved: {userData?.pages?.length}
        </h2>

        {userData?.pages?.map((e) => (
          <div key={e.id}>
            <p>
              <a href={`${DOMAIN_LINK}/chord-page/${e.id}`}>{e.name}</a>
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
