// @ts-nocheck

"use client"

import React, { useEffect, useState } from "react"

export default function SingleChordPage({ params }) {
  const [singlePage, setSinglePage] = useState({})

  async function getSinglePage() {
    const res = await fetch(`/api/chord-page/${params.id}`)
    const parseRes = await res.json()
    setSinglePage(parseRes)
  }

  useEffect(() => {
    getSinglePage()
  }, [])

  return (
    <div>
      <h3>single chord page for ID: {params.id}</h3>

      <p>{singlePage.name}</p>
      <p>{singlePage.ownerId}</p>

      <a href="/admin"> back to admin</a>
    </div>
  )
}
