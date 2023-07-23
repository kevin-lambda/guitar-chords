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
    // chordsByNote: null,
    // chordsByQuality: null,
  })

  // chords

  const [allChords, setAllChords] = useState([])
  const [newChord, setNewChord] = useState({
    name: "",
    noteFormula: [""],
    rootNote: "",
    rootNoteStrings: [""],
    chordQualityId: 1,
  })

  // ===================== end of state
  // ===================== end of state

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

  // CHORD PAGE
  // CHORD PAGE
  // CHORD PAGE
  // CHORD PAGE
  // CHORD PAGE

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

  // chords
  // chords
  // chords
  // chords

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
    <div className="has-background-light">
      <section className="hero" id="admin-hero-background">
        <div className="hero-body">
          <p className="title">ADMIN</p>
        </div>
      </section>
      <nav class="level pt-5">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Users</p>
            <p class="title">{allUsers.length}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Chord Qualities</p>
            <p class="title">{allChordQuality.length}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Chord Voicings</p>
            <p class="title">{allChordQualityVoicing.length}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Chord Pages</p>
            <p class="title">{allChordPages.length}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Chords</p>
            <p class="title">{allChords.length}</p>
          </div>
        </div>
      </nav>

      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>email</th>
            <th>delete</th>
            <th>edit</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>1</th>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                title="Leicester City F.C."
              >
                Leicester City
              </a>{" "}
              <strong>(C)</strong>
            </td>
            <td>38</td>
            <td>38</td>
          </tr>
          <tr>
            <th>1</th>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                title="Leicester City F.C."
              >
                Leicester City
              </a>{" "}
              <strong>(C)</strong>
            </td>
            <td>38</td>
            <td>38</td>
          </tr>
        </tbody>
      </table>

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
                    <a href={`/admin/chord-quality-voicing/${e.id}`}>
                      Name: {e.name} Root String: {e.rootString}
                    </a>
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

      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="is-size-2">Chord Pages</h2>

          <div>
            <h2>create page</h2>

            <form onSubmit={handleNewChordPageSubmit}>
              <label>
                name:
                <input
                  type="text"
                  value={newChordPage.name}
                  name="name"
                  placeholder="my chord page 1"
                  onChange={handleNewChordPage}
                ></input>
              </label>
              <label>
                owner ID:
                <select name="ownerId" onChange={handleNewChordPage}>
                  {allUsers.map((e) => {
                    return (
                      <option value={e.id} key={e.id}>
                        {e.email}
                      </option>
                    )
                  })}
                </select>
              </label>
              <button>submit</button>
            </form>
          </div>

          <br></br>
          {allChordPages.map((e) => {
            return (
              <div key={e.id} className="is-flex">
                <a href={`/admin/chord-page/${e.id}`}>{e.name}</a>
                <form
                  onSubmit={(event) => {
                    handlePageDelete(event, e.id)
                  }}
                >
                  <button className="button mx-5 is-danger is-small">
                    delete
                  </button>
                </form>
              </div>
            )
          })}
        </div>
      </section>

      {/* CRUD */}
      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="is-size-2">Chords</h2>
          <h3>create chord:</h3>

          <form onSubmit={handleNewChordSubmit}>
            <label>
              name:
              <input
                type="text"
                name="name"
                value={newChord.name}
                onChange={handleNewChord}
                placeholder="Am"
              ></input>
            </label>
            <label>
              note Formula:
              <input
                type="text"
                name="noteFormula"
                value={newChord.noteFormula}
                onChange={handleNewChord}
                placeholder="A,C,E"
              ></input>
            </label>
            <label>
              rootNote:
              <input
                type="text"
                name="rootNote"
                value={newChord.rootNote}
                onChange={handleNewChord}
                placeholder="A"
              ></input>
            </label>
            <label>
              rootNoteStrings:
              <input
                type="text"
                name="rootNoteStrings"
                value={newChord.rootNoteStrings}
                onChange={handleNewChord}
                placeholder="5,0,7,2,10,5"
              ></input>
            </label>
            <select
              name="chordQualityId"
              value={newChord.chordQualityId}
              onChange={handleNewChord}
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

          <br></br>
          <h3 className="is-size-4">All chords</h3>
          {allChords.map((e) => {
            return (
              <div key={e.id} className="is-flex">
                <a href={`/admin/chord/${e.id}`}>NAME: {e.name}</a>, note
                formula: {e.noteFormula.toString()}
                <form
                  onSubmit={(event) => {
                    handleChordDelete(event, e.id)
                  }}
                >
                  <button className="button is-danger is-small mx-3">
                    delete
                  </button>
                </form>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
