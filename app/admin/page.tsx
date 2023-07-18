// @ts-nocheck

"use client"

import React, { useState, useEffect } from "react"

export default function Admin() {
  const [allUsers, setAllUsers] = useState([])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [editUserEmail, setEditUserEmail] = useState("")

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

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="has-background-light">
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
          <h2 className="is-size-2">Chords</h2>
          <form>
            <h3>Create chord</h3>
          </form>
          <h3 className="is-size-5">All Chords:</h3>
        </div>
      </section>
    </div>
  )
}
