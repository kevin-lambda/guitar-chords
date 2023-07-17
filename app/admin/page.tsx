"use client"

import React, { useState, useEffect } from "react"

export default function Admin() {
  useEffect(() => {
    console.log("hi")
  }, [])

  return (
    <div className="has-background-light">
      <section className="section">
        <div className="has-background-grey-lighter">
          <h2 className="title">USERS</h2>
          <form>
            <h3>Create user</h3>
            <label>
              email: <input type="text" />
            </label>
            <label>
              password: <input type="text" />
            </label>
            <button>submit</button>
          </form>

          <h3 className="is-size-5">All Users: //get all</h3>
          <div>list of all users</div>
          <div className="">
            asfwaef awef waef waef. //link to single, //delete, //update ...
            figure out how UI
          </div>
        </div>
      </section>
      <section className="section">chords and so on</section>
    </div>
  )
}
