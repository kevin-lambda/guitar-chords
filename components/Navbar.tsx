// @ts-nocheck
"use client"
import React, { useState } from "react"

export default function Navbar() {
  const [isActive, setisActive] = useState(false)

  return (
    <nav
      className="navbar p-2 has-text-weight-semibold"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          href="/"
          className="navbar-item is-size-3 p-1 is-family-secondary has-text-weight-normal"
        >
          QCS
        </a>
        <a
          onClick={() => {
            setisActive(!isActive)
          }}
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu is-size-6 ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="/">Help</a>
          </div>
          <div className="navbar-item">
            <a href="/">About</a>
          </div>
          <div className="navbar-item">
            <a href="/">Contact</a>
          </div>

          {/* <div className="navbar-item">
            <a href="/">Experimental</a>
          </div> */}

          {isActive ? (
            <div className="navbar-end">
              <div className="navbar-item">
                <a href="/">Sign up</a>
              </div>
              <div className="navbar-item">
                <a href="/">Log in</a>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-grey-lighter is-size-6" href="/">
                  Sign up
                </a>
                <a className="button is-size-6" href="/">
                  <strong>Log in</strong>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
