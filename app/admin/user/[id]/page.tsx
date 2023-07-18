// @ts-nocheck

"use client"

import React, { useState, useEffect } from "react"

export default function SingleUser({ params }) {
  const [singleUser, setSingleUser] = useState({})

  const parseId = parseInt(params.id)

  async function getSingleUser(id) {
    const res = await fetch(`/api/user/${id}`, { method: "GET" })
    const parseRes = await res.json()
    setSingleUser(parseRes)
  }

  useEffect(() => {
    getSingleUser(parseId)
  }, [])

  return (
    <div>
      <h2>single user page</h2>
      <p>user id: {singleUser.id}</p>
      <p>user email: {singleUser.email}</p>
    </div>
  )
}
