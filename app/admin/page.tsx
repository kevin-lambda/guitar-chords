// @ts-nocheck

"use client"

import React, { useState, useEffect } from "react"

export default function Admin() {
  const [allUsers, setAllUsers] = useState([])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [editUserEmail, setEditUserEmail] = useState("")

  const [allChordQuality, setAllChordQuality] = useState([])
  const [newChordQuality, setNewChordQuality] = useState({
    qualityName: "",
    qualityFormula: [],
    optionalNote: [],
    primaryQuality: "",
    isTriad: false,
    isSeventh: false,
    isExtended: false,
  })

  const [allChordQualityVoicing, setAllChordQualityVoicing] = useState([])
  const [newChordQualityVoicing, setNewChordQualityVoicing] = useState({
    name: "",
    frets: [],
    fretTones: [],
    rootString: 0,
    isANoteOmitted: false,
    isMovable: false,
    chordQualityId: 0,
  })

  async function getAllUsers() {
    const res = await fetch("/api/user", {
      method: "GET",
    })
    const parseRes = await res.json()
    parseRes.sort((a, b) => {
      return a.id - b.id
    })
    setAllUsers(parseRes)
  }
  async function handleNewUserSubmit(event) {
    event.preventDefault()
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email: newUserEmail, password: newUserPassword }),
    })
    const parseRes = await res.json()
    getAllUsers()
    setNewUserEmail("")
    setNewUserPassword("")
  }
  async function handleUserDelete(event, id) {
    event.preventDefault()
    const res = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    })
    const parseRes = await res.json()
    getAllUsers()
  }
  async function handleEditUserSubmit(event, id) {
    event.preventDefault()
    const res = await fetch(`api/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ email: editUserEmail }),
    })
    const parseRes = await res.json()
    getAllUsers()
  }

  // e.target.name is from the input, and MATCHES an existing property in the object. name must exactly match the obj property
  // then as the onchange happens, we get a new value. e.target.value

  // onchange we set a new state, this state is the previous state in spread syntax.
  // BUT with a new property. In this case e.target.name matches an existing property and will overwrite the old prop value

  // so we update just that state

  // key things: name property in input, controlled input component with value prop, onChange handler with spread and additional syntax

  async function getAllChordQuality() {
    const res = await fetch("/api/chord-quality", { method: "GET" })
    const parseRes = await res.json()
    setAllChordQuality(parseRes)
  }

  async function handleNewChordQuality(e) {
    e.preventDefault()
    const res = await fetch("/api/chord-quality", {
      method: "POST",
      body: JSON.stringify(newChordQuality),
    })
    const parseRes = await res.json()
    getAllChordQuality()
  }

  async function handleChordQualityDelete(e, id) {
    e.preventDefault()
    const res = await fetch(`/api/chord-quality/${id}`, { method: "DELETE" })
    const parseRes = await res.json()
    getAllChordQuality()
  }

  function handleInputNewChordQuality(e) {
    let value = e.target.value

    // if change is radio handle and set
    if (e.target.name === "chordSize") {
      value = handleChordSizeChange(e)
      setNewChordQuality({ ...newChordQuality, ...value })
    }

    // if input is formula and optional notes, parse those and set
    else if (
      e.target.name === "qualityFormula" ||
      e.target.name === "optionalNote"
    ) {
      value = e.target.value.split(",")
      setNewChordQuality({ ...newChordQuality, [e.target.name]: value })
    }

    // all other cases
    else {
      setNewChordQuality({ ...newChordQuality, [e.target.name]: value })
    }
  }

  function handleChordSizeChange(e) {
    let chordSize = {
      isTriad: false,
      isSeventh: false,
      isExtended: false,
    }
    if (e.target.value === "triad") {
      chordSize = {
        isTriad: true,
        isSeventh: false,
        isExtended: false,
      }
    } else if (e.target.value === "seventh") {
      chordSize = {
        isTriad: false,
        isSeventh: true,
        isExtended: false,
      }
    } else if (e.target.value === "extended") {
      chordSize = {
        isTriad: false,
        isSeventh: false,
        isExtended: true,
      }
    }
    return chordSize
  }

  async function getAllChordQualityVoicing() {
    const res = await fetch("/api/chord-quality-voicing")
    const parseRes = await res.json()
    setAllChordQualityVoicing(parseRes)
  }

  async function handleChordQualityVoicingDelete(e, id) {
    e.preventDefault()
    const res = await fetch(`/api/chord-quality-voicing/${id}`, {
      method: "DELETE",
    })
    const parseRes = await res.json()
    getAllChordQualityVoicing()
  }

  function handleInputNewChordQualityVoicing(e) {
    console.log(e.target.value)
    console.log(e.target.name)

    let value = e.target.value
    let name = e.target.name

    if (name === "frets" || name === "fretTones") {
      let valueAlt = e.target.value.split(",")
      setNewChordQualityVoicing({ ...newChordQualityVoicing, [name]: valueAlt })
    } else if (
      e.target.name === "isMovable" ||
      e.target.name === "isANoteOmitted"
    ) {
      value = e.target.checked
      setNewChordQualityVoicing({ ...newChordQualityVoicing, [name]: value })
    } else if (
      e.target.name === "rootString" ||
      e.target.name === "chordQualityId"
    ) {
      let parseValue = parseInt(e.target.value)

      setNewChordQualityVoicing({
        ...newChordQualityVoicing,
        [name]: parseValue,
      })
    } else {
      setNewChordQualityVoicing({ ...newChordQualityVoicing, [name]: value })
    }
  }

  async function handleNewChordQualityVoicing(e) {
    e.preventDefault()
    console.log(newChordQualityVoicing)

    const res = await fetch(`/api/chord-quality-voicing`, {
      method: "POST",
      body: JSON.stringify(newChordQualityVoicing),
    })
    const parseRes = await res.json()
    getAllChordQualityVoicing()
  }

  useEffect(() => {
    getAllUsers()
    getAllChordQuality()
    getAllChordQualityVoicing()
  }, [])

  return (
    <div className="has-background-light">
      <p>
        <a href="/">back to home</a>
      </p>

      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="title">USERS</h2>
          <form onSubmit={handleNewUserSubmit}>
            <h3>Create user</h3>
            <label>
              email:{" "}
              <input
                type="text"
                value={newUserEmail}
                onChange={(event) => {
                  setNewUserEmail(event.target.value)
                }}
              />
            </label>
            <label>
              password:{" "}
              <input
                type="text"
                value={newUserPassword}
                onChange={(event) => {
                  setNewUserPassword(event.target.value)
                }}
              />
            </label>
            <button>submit</button>
          </form>
          <br></br>
          <h3 className="is-size-5">All Users:</h3>
          <div className="">
            {allUsers.map((e) => (
              <div key={e.id} className="is-flex is-justify-content-flex-start">
                <a href={`/admin/user/${e.id}`}>id: {e.id}</a>
                {"  "}
                email: {e.email}
                {"  "}
                <form
                  onSubmit={(event) => {
                    return handleUserDelete(event, e.id)
                  }}
                >
                  <button className="ml-5 button is-danger is-small">
                    delete
                  </button>
                </form>
                <form
                  onSubmit={(event) => {
                    handleEditUserSubmit(event, e.id)
                  }}
                >
                  <button className="mx-5 button is-small is-warning">
                    submit edit
                  </button>
                  <label>
                    email:
                    <input
                      type="text"
                      onChange={(event) => {
                        setEditUserEmail(event.target.value)
                      }}
                    ></input>
                  </label>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="is-size-2">Chord Quality</h2>
          <form onSubmit={handleNewChordQuality}>
            <h3>Create chord</h3>
            <label>
              Quality Name:
              <input
                type="text"
                placeholder="Major 7th"
                name="qualityName"
                value={newChordQuality.qualityName}
                onChange={handleInputNewChordQuality}
              ></input>
            </label>
            <label>
              Quality Formula:
              <input
                type="text"
                placeholder="1,3,5,7"
                name="qualityFormula"
                value={newChordQuality.qualityFormula}
                onChange={handleInputNewChordQuality}
              ></input>
            </label>
            <label>
              Optional Note:
              <input
                type="text"
                placeholder="5,9"
                name="optionalNote"
                value={newChordQuality.optionalNote}
                onChange={handleInputNewChordQuality}
              ></input>
            </label>
            <label>
              Primary Quality:
              <input
                type="text"
                placeholder="Major"
                name="primaryQuality"
                value={newChordQuality.primaryQuality}
                onChange={handleInputNewChordQuality}
              ></input>
            </label>

            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  value="triad"
                  name="chordSize"
                  onChange={handleInputNewChordQuality}
                ></input>
                Triad
              </label>
              <label className="radio">
                <input
                  type="radio"
                  value="seventh"
                  name="chordSize"
                  onChange={handleInputNewChordQuality}
                ></input>
                Seventh
              </label>
              <label className="radio">
                <input
                  type="radio"
                  value="extended"
                  name="chordSize"
                  onChange={handleInputNewChordQuality}
                ></input>
                Extended
              </label>
            </div>

            <button>submit</button>
          </form>
          <br></br>
          <h3 className="is-size-5">All Chords:</h3>
          {allChordQuality.map((e) => (
            <div key={e.id} className="is-flex is-justify-content-flex-start">
              <div>
                <a href={`/admin/chord-quality/${e.id}`}>
                  Name: {e.qualityName}
                </a>
                Formula: {e.qualityFormula.toString()} Optional note:{" "}
                {e.optionalNote.toString()} Primary Quality: {e.primaryQuality}
              </div>
              <form
                onSubmit={(event) => {
                  handleChordQualityDelete(event, e.id)
                }}
              >
                <button className="button ml-5 is-small is-danger">
                  delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="is-size-2">Chord Quality Voicing</h2>
          <div>
            <h3>create chord quality voicings</h3>
            <form onSubmit={handleNewChordQualityVoicing}>
              <label>
                name:
                <input
                  type="text"
                  name="name"
                  value={newChordQualityVoicing.name}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="Major, 5th string, standard"
                ></input>
              </label>
              <label>
                frets:
                <input
                  type="text"
                  name="frets"
                  value={newChordQualityVoicing.frets}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="1,3,3,2,1,1"
                ></input>
              </label>
              <label>
                fretTones:
                <input
                  type="text"
                  name="fretTones"
                  value={newChordQualityVoicing.fretTones}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="1,5,1,3,5,1"
                ></input>
              </label>
              <label>
                rootString:
                <input
                  type="text"
                  name="rootString"
                  value={newChordQualityVoicing.rootString}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="5"
                ></input>
              </label>

              <label className="mx-5">
                <input
                  type="checkbox"
                  name="isANoteOmitted"
                  onChange={handleInputNewChordQualityVoicing}
                  checked={newChordQualityVoicing.isANoteOmitted}
                ></input>
                isANoteOmitted
              </label>
              <label className="mx-5">
                <input
                  type="checkbox"
                  name="isMovable"
                  onChange={handleInputNewChordQualityVoicing}
                  checked={newChordQualityVoicing.isMovable}
                ></input>
                isMovable
              </label>

              <label>
                Chord Quality
                <select
                  name="chordQualityId"
                  value={newChordQualityVoicing.chordQualityId}
                  onChange={handleInputNewChordQualityVoicing}
                >
                  {allChordQuality.map((e) => (
                    <option key={e.id} value={e.id}>
                      id: {e.id}
                      name: {e.qualityName}
                    </option>
                  ))}
                </select>
              </label>
              <button>submit</button>
            </form>
          </div>
          <div>
            <h3 className="is-size-4">All chord quality voicings</h3>
            <div>
              {allChordQualityVoicing.map((e) => (
                <div key={e.id} className="is-flex">
                  <p>
                    Name: {e.name} Root String: {e.rootString}
                  </p>
                  <form
                    className="mx-3"
                    onSubmit={(event) => {
                      handleChordQualityVoicingDelete(event, e.id)
                    }}
                  >
                    <button className="button is-danger is-small">
                      delete
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
