// @ts-nocheck

"use client"

import React, { useEffect, useState } from "react"

export default function SingleChord({ params }) {
  const [chord, setChord] = useState({})
  const [editChord, setEditChord] = useState({
    name: "",
    noteFormula: [""],
    rootNote: "",
    rootNoteStrings: [""],
    chordQualityId: 1,
  })
  const [allChordQuality, setAllChordQuality] = useState([])

  async function getChord() {
    const res = await fetch(`/api/chord/${params.id}`, { method: "GET" })
    const parseRes = await res.json()
    setChord(parseRes)
  }
  async function getAllChordQuality() {
    const res = await fetch("/api/chord-quality", { method: "GET" })
    const parseRes = await res.json()
    setAllChordQuality(parseRes)
  }
  async function handleEditChord(event) {
    if (
      event.target.name === "noteFormula" ||
      event.target.name === "rootNoteStrings"
    ) {
      const parseString = event.target.value.split(",")
      setEditChord({
        ...editChord,
        [event.target.name]: parseString,
      })
    } else if (event.target.name === "chordQualityId") {
      // wants an int
      // drop downs, is... e.target.value...? yes

      const parseId = parseInt(event.target.value)

      setEditChord({
        ...editChord,
        [event.target.name]: parseId,
      })
    } else {
      setEditChord({
        ...editChord,
        [event.target.name]: event.target.value,
      })
    }

    console.log(editChord)
  }

  async function handleEditChordSubmit(event) {
    event.preventDefault()
    const res = await fetch(`/api/chord/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editChord),
    })
    getChord()
  }

  useEffect(() => {
    getChord()
    getAllChordQuality()
  }, [])

  return (
    <div>
      <h2>this is a single chord page</h2>
      <h2>edit chord</h2>
      <form onSubmit={handleEditChordSubmit}>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={editChord.name}
            onChange={handleEditChord}
            placeholder="Am"
          ></input>
        </label>
        <label>
          note Formula:
          <input
            type="text"
            name="noteFormula"
            value={editChord.noteFormula}
            onChange={handleEditChord}
            placeholder="A,C,E"
          ></input>
        </label>
        <label>
          rootNote:
          <input
            type="text"
            name="rootNote"
            value={editChord.rootNote}
            onChange={handleEditChord}
            placeholder="A"
          ></input>
        </label>
        <label>
          rootNoteStrings:
          <input
            type="text"
            name="rootNoteStrings"
            value={editChord.rootNoteStrings}
            onChange={handleEditChord}
            placeholder="5,0,7,2,10,5"
          ></input>
        </label>
        <select
          name="chordQualityId"
          value={editChord.chordQualityId}
          onChange={handleEditChord}
        >
          {allChordQuality.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                Id: {e.id} , Name: {e.qualityName}
              </option>
            )
          })}
        </select>

        <button>submit</button>
      </form>

      <h2>chord</h2>
      <p>ID: {chord.id}</p>
      <p>note formula: {chord.noteFormula}</p>
      <p>root note: {chord.rootNote}</p>
      <p>root strings: {chord.rootNoteStrings}</p>
      <p>chord quality id: {chord.chordQualityId}</p>

      <br></br>

      <a href="/admin">back to admin</a>
    </div>
  )
}
