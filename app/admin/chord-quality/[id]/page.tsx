// @ts-nocheck

"use client"

import React, { useState, useEffect } from "react"

export default function SingleChordQuality({ params }) {
  const [singleChordQuality, setSingleChordQuality] = useState({
    qualityName: "",
    qualityFormula: [],
    optionalNote: [],
    primaryQuality: "",
    isTriad: false,
    isSeventh: false,
    isExtended: false,
  })

  const [inputEditChordQuality, setInputEditChordQuality] = useState({
    qualityName: "",
    qualityFormula: [],
    optionalNote: [],
    primaryQuality: "",
    isTriad: false,
    isSeventh: false,
    isExtended: false,
  })

  async function getSingleChordQuality() {
    const res = await fetch(`/api/chord-quality/${params.id}`, {
      method: "GET",
    })
    const parseRes = await res.json()
    setSingleChordQuality(parseRes)
  }

  async function handleEditChordQuality(e) {
    let value = e.target.value
    let name = e.target.name

    const jankObject = {
      isTriad: false,
      isSeventh: false,
      isExtended: false,
    }

    if (
      e.target.name === "qualityFormula" ||
      e.target.name === "optionalNote"
    ) {
      value = e.target.value.split(",")
      setInputEditChordQuality({
        ...inputEditChordQuality,
        [name]: value,
      })
    } else if (e.target.name === "chordSize") {
      name = e.target.value
      value = true
      setInputEditChordQuality({
        ...inputEditChordQuality,
        ...jankObject,
        [name]: value,
      })
    } else {
      setInputEditChordQuality({
        ...inputEditChordQuality,
        [name]: value,
      })
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    const res = await fetch(`/api/chord-quality/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(inputEditChordQuality),
    })
    const parseRes = await res.json()
    getSingleChordQuality()
  }

  useEffect(() => {
    getSingleChordQuality()
  }, [])

  return (
    <div>
      <h3>edit chord quality</h3>
      <form onSubmit={handleEditSubmit}>
        <label>
          Quality name:
          <input
            type="text"
            name="qualityName"
            value={inputEditChordQuality.qualityName}
            onChange={handleEditChordQuality}
            placeholder="major 7th"
          ></input>
        </label>
        <label>
          Quality formula:
          <input
            type="text"
            name="qualityFormula"
            value={inputEditChordQuality.qualityFormula}
            onChange={handleEditChordQuality}
            placeholder="1,3,5,7"
          ></input>
        </label>
        <label>
          Optional Note:
          <input
            type="text"
            name="optionalNote"
            value={inputEditChordQuality.optionalNote}
            onChange={handleEditChordQuality}
            placeholder="5"
          ></input>
        </label>
        <label>
          Primary Quality:
          <input
            type="text"
            name="primaryQuality"
            value={inputEditChordQuality.primaryQuality}
            onChange={handleEditChordQuality}
            placeholder="Major"
          ></input>
        </label>

        <div className="control">
          <label>
            <input
              type="radio"
              name="chordSize"
              value={"isTriad"}
              onChange={handleEditChordQuality}
            ></input>{" "}
            triad
          </label>
          <label>
            <input
              type="radio"
              name="chordSize"
              value={"isSeventh"}
              onChange={handleEditChordQuality}
            ></input>{" "}
            seventh
          </label>
          <label>
            <input
              type="radio"
              name="chordSize"
              value={"isExtended"}
              onChange={handleEditChordQuality}
            ></input>{" "}
            extended
          </label>
        </div>

        <button className="button is-small is-warning">submit edit</button>
      </form>

      <br></br>
      <h2>this is single page for chord quality {params.id}</h2>
      <p>quality name: {singleChordQuality.qualityName}</p>
      <p>quality formula: {singleChordQuality.qualityFormula.toString()}</p>
      <p>optional note: {singleChordQuality.optionalNote.toString()}</p>
      <p>primary quality: {singleChordQuality.primaryQuality}</p>
      <p>is triad: {singleChordQuality.isTriad.toString()}</p>
      <p>is seventh: {singleChordQuality.isSeventh.toString()}</p>
      <p>is extended: {singleChordQuality.isExtended.toString()}</p>
    </div>
  )
}
