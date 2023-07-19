// @ts-nocheck

"use client"

import React, { useState, useEffect } from "react"

export default function SingleChordQualityVoicing({ params }) {
  const [quality, setQuality] = useState([])

  const [singleChordQualityVoicing, setSingleChordQualityVoicing] = useState({
    name: "",
    frets: [],
    fretTones: [],
    rootString: "",
    isANoteOmitted: false,
    isMovable: false,
    chordQualityId: 0,
  })

  const [editSingleChordQualityVoicing, setEditSingleChordQualityVoicing] =
    useState({
      name: "",
      frets: [],
      fretTones: [],
      rootString: "",
      isANoteOmitted: false,
      isMovable: false,
      chordQualityId: 0,
    })

  const [chordQuality, setChordQuality] = useState({
    qualityName: "",
    qualityFormula: [],
    optionalNote: [],
    primaryQuality: "",
    isTriad: false,
    isSeventh: false,
    isExtended: false,
  })

  async function getSingleChordQualityVoicing() {
    const res = await fetch(`/api/chord-quality-voicing/${params.id}`, {
      method: "GET",
    })
    const parseRes = await res.json()
    setSingleChordQualityVoicing(parseRes)
  }

  // doesn't work...
  async function getChordQuality() {
    // console.log(singleChordQualityVoicing.chordQualityId)

    const parseId = singleChordQualityVoicing.chordQualityId.toString()

    const res = await fetch(`/api/chord-quality/${parseId}`)
    const parseRes = await res.json()
    setChordQuality(parseRes)
    // console.log(chordQuality)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch(`/api/chord-quality-voicing/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editSingleChordQualityVoicing),
    })
    getSingleChordQualityVoicing()
  }

  function handleEditVoicing(e) {
    console.log(e.target.value)
    console.log(e.target.name)

    if (e.target.name === "frets" || e.target.name === "fretTones") {
      let value = e.target.value.split(",")
      setEditSingleChordQualityVoicing({
        ...editSingleChordQualityVoicing,
        [e.target.name]: value,
      })
    } else if (
      e.target.name === "isANoteOmitted" ||
      e.target.name === "isMovable"
    ) {
      setEditSingleChordQualityVoicing({
        ...editSingleChordQualityVoicing,
        [e.target.name]: e.target.checked,
      })
    } else if (e.target.name === "rootString") {
      let parseId = parseInt(e.target.value)
      setEditSingleChordQualityVoicing({
        ...editSingleChordQualityVoicing,
        [e.target.name]: parseId,
      })
    } else if (e.target.name === "chordQualityId") {
      let parseId = parseInt(e.target.value)
      setEditSingleChordQualityVoicing({
        ...editSingleChordQualityVoicing,
        [e.target.name]: parseId,
      })
    } else {
      setEditSingleChordQualityVoicing({
        ...editSingleChordQualityVoicing,
        [e.target.name]: e.target.value,
      })
    }

    console.log(editSingleChordQualityVoicing)
  }

  async function getChordQuality() {
    const res = await fetch("/api/chord-quality")
    const parseRes = await res.json()
    setQuality(parseRes)
  }

  useEffect(() => {
    getChordQuality()
    getSingleChordQualityVoicing()
  }, [])

  return (
    <div>
      <div>
        <h3>EDIT voicing</h3>
        <form onSubmit={handleSubmit}>
          <label>
            name:
            <input
              type="text"
              name="name"
              value={editSingleChordQualityVoicing.name}
              placeholder="Major, 6th string, standard"
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            frets:
            <input
              type="text"
              name="frets"
              value={editSingleChordQualityVoicing.frets}
              placeholder="1,3,1,4,1,1"
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            fretTones:
            <input
              type="text"
              name="fretTones"
              value={editSingleChordQualityVoicing.fretTones}
              placeholder="1,3,1,4,1,1"
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            root string:
            <input
              type="text"
              name="rootString"
              value={editSingleChordQualityVoicing.rootString}
              placeholder="6"
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            is note omitted:
            <input
              type="checkbox"
              name="isANoteOmitted"
              checked={editSingleChordQualityVoicing.isANoteOmitted}
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            is moveable:
            <input
              type="checkbox"
              name="isMovable"
              checked={editSingleChordQualityVoicing.isMovable}
              onChange={handleEditVoicing}
            ></input>
          </label>
          <label>
            chord quality:
            <select name="chordQualityId" onChange={handleEditVoicing}>
              {quality.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.qualityName}
                  </option>
                )
              })}
            </select>
          </label>
          <button className="button is-small is-warning">submit</button>
        </form>
      </div>
      <br></br>
      single chord quality voicing {params.id}
      <div>
        <p>info</p>
        <p>Name: {singleChordQualityVoicing.name}</p>
        <p>Frets: {singleChordQualityVoicing.frets.toString()}</p>
        <p>Fret tones: {singleChordQualityVoicing.fretTones.toString()}</p>
        <p>Root String: {singleChordQualityVoicing.rootString}</p>
        <p>
          note omitted: {singleChordQualityVoicing.isANoteOmitted.toString()}
        </p>
        <p>Movable: {singleChordQualityVoicing.isMovable.toString()}</p>
        <p>Quality Id:{singleChordQualityVoicing.chordQualityId}</p>

        <br></br>
        {/* {chordQuality ? <p>{chordQuality.qualityName}</p> : null} */}
      </div>
      <a href="/admin">back to admin</a>
    </div>
  )
}
