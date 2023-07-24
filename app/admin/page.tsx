// @ts-nocheck
"use client"

import React, { useState, useEffect } from "react"

export default function Admin() {
  const [allUsers, setAllUsers] = useState([])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [editUserEmail, setEditUserEmail] = useState("")
  const [allChordQuality, setAllChordQuality] = useState([])
  const newChordQualityInit = {
    qualityName: "",
    qualityFormula: [],
    optionalNote: [],
    primaryQuality: "",
    isTriad: false,
    isSeventh: false,
    isExtended: false,
  }
  const [newChordQuality, setNewChordQuality] = useState(newChordQualityInit)
  const [allChordQualityVoicing, setAllChordQualityVoicing] = useState([])
  const newChordQualityVoicingInit = {
    name: "",
    frets: [],
    fretTones: [],
    rootString: "",
    isANoteOmitted: false,
    isMovable: false,
    chordQualityId: 1,
  }
  const [newChordQualityVoicing, setNewChordQualityVoicing] = useState(
    newChordQualityVoicingInit
  )
  const [allChordPages, setAllChordPages] = useState([])
  const [newChordPage, setNewChordPage] = useState({
    name: "",
    ownerId: "1",
  })
  const [allChords, setAllChords] = useState([])
  const [newChord, setNewChord] = useState({
    name: "",
    noteFormula: [""],
    rootNote: "",
    rootNoteStrings: [""],
    chordQualityId: 1,
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
  async function getAllChordQuality() {
    const res = await fetch("/api/chord-quality", { method: "GET" })
    const parseRes = await res.json()
    setAllChordQuality(parseRes)
  }
  function getChordLengthName(element) {
    if (element.isTriad) {
      return "Triad"
    } else if (element.isSeventh) {
      return "Seventh"
    } else if (element.isExtended) {
      return "Extended"
    } else {
      return "Other"
    }
  }
  async function handleNewChordQuality(e) {
    e.preventDefault()
    if (newChordQuality.optionalNote[0] === undefined) {
      newChordQuality.optionalNote = ["-"]
    }
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
    // console.log(e.target.value)
    // console.log(e.target.name)

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
    // console.log(newChordQualityVoicing)

    const res = await fetch(`/api/chord-quality-voicing`, {
      method: "POST",
      body: JSON.stringify(newChordQualityVoicing),
    })
    const parseRes = await res.json()
    getAllChordQualityVoicing()

    setNewChordQualityVoicing(newChordQualityVoicingInit)
  }
  async function getAllChordPages() {
    const res = await fetch("/api/chord-page", { method: "GET" })
    const parseRes = await res.json()
    setAllChordPages(parseRes)
  }
  async function handlePageDelete(event, id) {
    event.preventDefault()
    const res = await fetch(`/api/chord-page/${id}`, { method: "DELETE" })
    getAllChordPages()
  }
  function handleNewChordPage(event) {
    console.log(event.target.name)
    console.log(event.target.value)

    if (event.target.name === "ownerId") {
      setNewChordPage({
        ...newChordPage,
        [event.target.name]: parseInt(event.target.value),
      })
    } else {
      setNewChordPage({
        ...newChordPage,
        [event.target.name]: event.target.value,
      })
    }

    console.log(newChordPage)
  }
  async function handleNewChordPageSubmit(event) {
    event.preventDefault()
    const res = await fetch(`/api/chord-page`, {
      method: "POST",
      body: JSON.stringify(newChordPage),
    })
    getAllChordPages()
  }
  async function getAllChords() {
    const res = await fetch(`/api/chord`, { method: "GET" })
    const parseRes = await res.json()

    setAllChords(parseRes)
  }
  async function handleNewChord(event) {
    if (
      event.target.name === "noteFormula" ||
      event.target.name === "rootNoteStrings"
    ) {
      const parseString = event.target.value.split(",")
      setNewChord({
        ...newChord,
        [event.target.name]: parseString,
      })
    } else if (event.target.name === "chordQualityId") {
      // wants an int
      // drop downs, is... e.target.value...? yes

      const parseId = parseInt(event.target.value)

      setNewChord({
        ...newChord,
        [event.target.name]: parseId,
      })
    } else {
      setNewChord({
        ...newChord,
        [event.target.name]: event.target.value,
      })
    }

    console.log(newChord)
  }
  async function handleNewChordSubmit(event) {
    event.preventDefault()
    const res = await fetch("/api/chord/", {
      method: "POST",
      body: JSON.stringify(newChord),
    })
    getAllChords()
  }
  async function handleChordDelete(event, id) {
    event.preventDefault()
    const res = await fetch(`/api/chord/${id}`, { method: "DELETE" })
    getAllChords()
  }

  useEffect(() => {
    getAllUsers()
    getAllChordQuality()
    getAllChordQualityVoicing()
    getAllChordPages()
    getAllChords()
  }, [])

  return (
    <div className="">
      <section className="hero" id="admin-hero-background">
        <div className="hero-body">
          <p className="title">ADMIN</p>
        </div>
      </section>

      <div className="container">
        <nav className="level pt-5">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Users</p>
              <p className="title">{allUsers.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Chord Qualities</p>
              <p className="title">{allChordQuality.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Chord Voicings</p>
              <p className="title">{allChordQualityVoicing.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Chord Pages</p>
              <p className="title">{allChordPages.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Chords</p>
              <p className="title">{allChords.length}</p>
            </div>
          </div>
        </nav>

        <section className="section box">
          <div className="">
            <h2 className="title">CHORD QUALITY</h2>
            <h3 className="is-size-5">Create chord</h3>
            <form onSubmit={handleNewChordQuality}>
              <p>
                <label className="mr-5">
                  Quality Name:
                  <input
                    className="ml-2"
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
                    className="ml-2"
                    type="text"
                    placeholder="1,3,5,7"
                    name="qualityFormula"
                    value={newChordQuality.qualityFormula}
                    onChange={handleInputNewChordQuality}
                  ></input>
                </label>
              </p>

              <p>
                <label className="mr-5">
                  Optional Note:
                  <input
                    className="ml-1"
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
                    className="ml-2"
                    type="text"
                    placeholder="Major"
                    name="primaryQuality"
                    value={newChordQuality.primaryQuality}
                    onChange={handleInputNewChordQuality}
                  ></input>
                </label>
              </p>

              <div className="control my-2">
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

              <button className="button is-small is-success is-light">
                Submit
              </button>
            </form>

            <table className="table mt-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Formula</th>
                  <th>Optional Note</th>
                  <th>Primary Quality</th>
                  <th>Length</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allChordQuality.map((e) => (
                  <tr key={e.id} className="">
                    <th>{e.id}</th>
                    <td>
                      <a href={`/admin/chord-quality/${e.id}`}>
                        {e.qualityName}
                      </a>
                    </td>
                    <td> {e.qualityFormula.toString()} </td>
                    <td>{e.optionalNote.toString()}</td>
                    <td>{e.primaryQuality}</td>
                    <td>{getChordLengthName(e)}</td>
                    <td>
                      <form
                        onSubmit={(event) => {
                          handleChordQualityDelete(event, e.id)
                        }}
                      >
                        <button className="button is-small is-danger is-light">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section box">
          <h2 className="title">CHORD QUALITY VOICING</h2>
          <h3 className="is-size-5">Create chord quality voicing</h3>
          <form className="mb-5" onSubmit={handleNewChordQualityVoicing}>
            <p>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newChordQualityVoicing.name}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="Major, 5th string, standard"
                  className="ml-1"
                ></input>
              </label>
              <label className="ml-3">
                Fret tones:
                <input
                  type="text"
                  name="fretTones"
                  value={newChordQualityVoicing.fretTones}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="1,5,1,3,5,1"
                  className="ml-2"
                ></input>
              </label>
            </p>

            <p>
              <label className="">
                Frets:
                <input
                  type="text"
                  name="frets"
                  value={newChordQualityVoicing.frets}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="1,3,3,2,1,1"
                  className="ml-2"
                ></input>
              </label>
              <label className="ml-3">
                Root string:
                <input
                  type="text"
                  name="rootString"
                  value={newChordQualityVoicing.rootString}
                  onChange={handleInputNewChordQualityVoicing}
                  placeholder="5"
                  className="ml-1"
                ></input>
              </label>
            </p>

            <p className="ml-2 mt-2">
              <label className="">
                <input
                  className="mx-1"
                  type="checkbox"
                  name="isANoteOmitted"
                  onChange={handleInputNewChordQualityVoicing}
                  checked={newChordQualityVoicing.isANoteOmitted}
                ></input>
                is a note omitted
              </label>
              <label className="ml-5">
                <input
                  className="mx-1"
                  type="checkbox"
                  name="isMovable"
                  onChange={handleInputNewChordQualityVoicing}
                  checked={newChordQualityVoicing.isMovable}
                ></input>
                is movable
              </label>
            </p>

            <p className="mb-2">
              <label>
                Chord Quality
                <select
                  name="chordQualityId"
                  value={newChordQualityVoicing.chordQualityId}
                  onChange={handleInputNewChordQualityVoicing}
                  className="mx-2"
                >
                  {allChordQuality.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.id}, {e.qualityName}
                    </option>
                  ))}
                </select>
              </label>
            </p>

            <button className="button is-small is-success is-light">
              Submit
            </button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Frets</th>
                <th>Fret Tones</th>
                <th>
                  <abbr title="Root String">Root Str</abbr>
                </th>
                <th>Note Omitted</th>
                <th>Movable</th>
                <th>
                  <abbr title="Chord Quality ID">Chord Qual ID</abbr>
                </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allChordQualityVoicing.map((e) => (
                <tr key={e.id} className="">
                  <th>{e.id}</th>
                  <td>
                    <a href={`/admin/chord-quality-voicing/${e.id}`}>
                      {e.name}
                    </a>
                  </td>
                  <td> {e.frets.toString()}</td>
                  <td> {e.fretTones.toString()}</td>
                  <td> {e.rootString}</td>
                  <td> {e.isANoteOmitted.toString()}</td>
                  <td> {e.isMovable.toString()}</td>
                  <td> {e.chordQualityId}</td>
                  <td>
                    <form
                      className=""
                      onSubmit={(event) => {
                        handleChordQualityVoicingDelete(event, e.id)
                      }}
                    >
                      <button className="button is-danger is-light is-small">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section box">
          <h2 className="title">CHORD PAGES</h2>
          <h3 className="is-size-5">Create page</h3>
          <form onSubmit={handleNewChordPageSubmit} className="mb-5">
            <label>
              Name:
              <input
                type="text"
                value={newChordPage.name}
                name="name"
                placeholder="my chord page 1"
                onChange={handleNewChordPage}
                className="ml-1"
              ></input>
            </label>
            <label className="ml-3">
              Owner ID:
              <select
                name="ownerId"
                onChange={handleNewChordPage}
                className="ml-1"
              >
                {allUsers.map((e) => {
                  return (
                    <option value={e.id} key={e.id}>
                      {e.email}
                    </option>
                  )
                })}
              </select>
            </label>
            <button className="button is-small ml-3 is-success is-light">
              Submit
            </button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Owner ID</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allChordPages.map((e) => {
                return (
                  <tr key={e.id}>
                    <th>{e.id}</th>
                    <td className="">
                      <a href={`/admin/chord-page/${e.id}`}>{e.name}</a>
                    </td>
                    <td>{e.ownerId}</td>
                    <td>
                      <form
                        onSubmit={(event) => {
                          handlePageDelete(event, e.id)
                        }}
                      >
                        <button className="button is-danger is-light is-small">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="section box">
          <h2 className="title">CHORDS</h2>
          <h3 className="is-size-5">Create chord</h3>
          <form onSubmit={handleNewChordSubmit}>
            <p>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newChord.name}
                  onChange={handleNewChord}
                  placeholder="Am"
                  className="ml-5 mr-5"
                ></input>
              </label>
              <label>
                Note Formula:
                <input
                  type="text"
                  name="noteFormula"
                  value={newChord.noteFormula}
                  onChange={handleNewChord}
                  placeholder="A,C,E"
                  className="ml-5"
                ></input>
              </label>
            </p>

            <p>
              <label>
                Root note:
                <input
                  type="text"
                  name="rootNote"
                  value={newChord.rootNote}
                  onChange={handleNewChord}
                  placeholder="A"
                  className="ml-1 mr-4"
                ></input>
              </label>
              <label>
                Root note strings:
                <input
                  type="text"
                  name="rootNoteStrings"
                  value={newChord.rootNoteStrings}
                  onChange={handleNewChord}
                  placeholder="5,0,7,2,10,5"
                  className="ml-1"
                ></input>
              </label>
            </p>

            <p className="my-3">
              <select
                name="chordQualityId"
                value={newChord.chordQualityId}
                onChange={handleNewChord}
              >
                {allChordQuality.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.id}, {e.qualityName}
                    </option>
                  )
                })}
              </select>
              <button className="button is-small is-success is-light mx-2">
                submit
              </button>
            </p>
          </form>

          <table className="table">
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Note Formula</th>
              <th>Root Note</th>
              <th>Root Note Strings</th>
              <th>
                <abbr title="Chord Quality ID">Chord Qual ID</abbr>
              </th>
              <th>Delete</th>
            </thead>
            <tbody>
              {allChords.map((e) => {
                return (
                  <tr key={e.id} className="">
                    <th>{e.id}</th>
                    <td>
                      <a href={`/admin/chord/${e.id}`}> {e.name}</a>
                    </td>
                    <td>{e.noteFormula.toString()}</td>
                    <td> {e.rootNote}</td>
                    <td> {e.rootNoteStrings.toString()}</td>
                    <td> {e.chordQualityId}</td>
                    <td>
                      <form
                        onSubmit={(event) => {
                          handleChordDelete(event, e.id)
                        }}
                      >
                        <button className="button is-danger is-light is-small">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="section box">
          <h2 className="title">USERS</h2>
          <form onSubmit={handleNewUserSubmit}>
            <h3 className="is-size-5">Create user</h3>
            <label>
              Email:{" "}
              <input
                type="text"
                value={newUserEmail}
                onChange={(event) => {
                  setNewUserEmail(event.target.value)
                }}
              />
            </label>
            <label className="pl-3">
              Password:{" "}
              <input
                type="text"
                value={newUserPassword}
                onChange={(event) => {
                  setNewUserPassword(event.target.value)
                }}
              />
            </label>
            <button className="button is-small is-success is-light ml-3">
              Submit
            </button>
          </form>

          <table className="table mt-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((e) => (
                <tr key={e.id} className="">
                  <th>{e.id}</th>
                  <td>
                    <a href={`/admin/user/${e.id}`}>{e.email}</a>
                  </td>
                  <td>
                    <form
                      onSubmit={(event) => {
                        handleEditUserSubmit(event, e.id)
                      }}
                    >
                      <button className="button is-small is-light is-warning">
                        Submit edit
                      </button>
                      <label className="pl-3">
                        email:
                        <input
                          type="text"
                          onChange={(event) => {
                            setEditUserEmail(event.target.value)
                          }}
                        ></input>
                      </label>
                    </form>
                  </td>
                  <td>
                    <form
                      onSubmit={(event) => {
                        return handleUserDelete(event, e.id)
                      }}
                    >
                      <button className="button is-danger is-light is-small">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
