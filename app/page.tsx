// @ts-nocheck

"use client"
import React, { useState, useEffect } from "react"
import { SvgChord } from "@/components"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  // const DOMAIN_LINK = "https://quality-chords.vercel.app" // ! PRODUCTION MODE =============
  const DOMAIN_LINK = "http://localhost:3000" // ! DEV MODE =============

  const [chordQualityBank, setChordQualityBank] = useState([])
  const [currentChords, setCurrentChords] = useState([])
  const [selectChordQuality, setSelectChordQuality] = useState("")

  const { isLoaded, userId, isSignedIn, sessionId, getToken } = useAuth()

  const [isShapeByStringVisible, setIsShapeByStringVisible] = useState({
    showString6: true,
    showString5: true,
    showString4: false,
    showString3: false,
    showString2: false,
    showString1: false,
  })

  console.log("============")
  console.log("userId: ", userId)
  console.log("isSignedIn: ", isSignedIn)

  async function getChordAllQuality() {
    const res = await fetch(`${DOMAIN_LINK}/api/chord-quality/`)
    const parseRes = await res.json()
    setChordQualityBank(parseRes)
  }

  function handleAddChord(event) {
    event.preventDefault()
    const chord = getChordFromArray(selectChordQuality)
    setCurrentChords([...currentChords, chord])
  }

  function getChordFromArray(qualityId) {
    const parseId = parseInt(qualityId)
    let getElement = chordQualityBank.find((e) => {
      return e.id === parseId
    })

    let tempObj = {}

    for (let i = 1; i <= 6; i++) {
      let curString = getElement.chordQualityVoicing.find((e) => {
        return e.rootString === i
      })
      tempObj[`string${i}`] = curString
    }
    getElement.formattedVoicings = tempObj
    return getElement
  }

  // todo get tones to work, by editing original library. need to change the forked libray and then install that forked library as a npm package. remove the old package
  function renderChord(obj) {
    if (obj) {
      const { frets } = obj
      const newArray = []

      for (const elem of frets) {
        newArray.push(parseInt(elem))
      }

      const sendObject = {
        frets: newArray,
        tones: ["", "", "", "", "", ""],
        bar: [],
        baseFret: 0,
        includeBaseFret: false,
      }

      return <SvgChord data={sendObject} />
    } else {
      return "No chord shape available"
    }
  }

  function handleVisibleChords(event) {
    setIsShapeByStringVisible({
      ...isShapeByStringVisible,
      [event.target.name]: event.target.checked,
    })
  }

  function handlePrintPage(e) {
    e.preventDefault()
    window.print()
  }

  useEffect(() => {
    getChordAllQuality()
  }, [])

  return (
    <main className="container is-max-desktop">
      <section className="section mb-0 pb-0">
        <h1 className="title is-family-secondary">Quality Chords</h1>
        <h2 className="subtitle">For movable guitar chord shapes</h2>
      </section>

      <section className="section pt-5 pb-2 is-flex is-justify-content-space-between is-flex-direction-row">
        <div>
          <h3>Show chord shape for string</h3>
          <form className="is-flex is-justify-content-space-between">
            <label>
              <input
                type="checkbox"
                name="showString6"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString6}
                defaultChecked={isShapeByStringVisible.showString6}
              />{" "}
              6{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="showString5"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString5}
                defaultChecked={isShapeByStringVisible.showString5}
              />{" "}
              5{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="showString4"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString4}
                defaultChecked={isShapeByStringVisible.showString4}
              />{" "}
              4{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="showString3"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString3}
                defaultChecked={isShapeByStringVisible.showString3}
              />{" "}
              3{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="showString2"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString2}
                defaultChecked={isShapeByStringVisible.showString2}
              />{" "}
              2{" "}
            </label>
            <label>
              <input
                type="checkbox"
                name="showString1"
                onChange={handleVisibleChords}
                value={isShapeByStringVisible.showString1}
                defaultChecked={isShapeByStringVisible.showString1}
              />{" "}
              1{" "}
            </label>
          </form>
        </div>

        <div className="is-flex">
          <div className="select px-2">
            <select
              name="chordQualitySelect"
              onChange={(e) => {
                setSelectChordQuality(e.target.value)
              }}
              defaultValue={"prompt"}
            >
              <option value={"prompt"} disabled hidden>
                Choose Chord Quality
              </option>
              {chordQualityBank.map((e) => {
                return (
                  <option value={e.id} key={e.id}>
                    {e.qualityName}
                  </option>
                )
              })}
            </select>
          </div>
          <form className="px-2" onSubmit={handleAddChord}>
            <button className="button has-background-success">add chord</button>
          </form>
        </div>
      </section>

      <section className="section pt-0 px-5 box">
        <h2 className="is-size-3 has-text-centered pb-5">My chords</h2>

        {/* hide on mobile view */}
        <div className="">
          <div
            className="columns has-text-centered py-0 is-size-5"
            id="chord-page-heading"
          >
            <div className="column">Chord Quality</div>
            {isShapeByStringVisible.showString6 ? (
              <div className="column">Root 6th String</div>
            ) : null}
            {isShapeByStringVisible.showString5 ? (
              <div className="column">Root 5th String</div>
            ) : null}
            {isShapeByStringVisible.showString4 ? (
              <div className="column">Root 4th String</div>
            ) : null}
            {isShapeByStringVisible.showString3 ? (
              <div className="column">Root 3rd String</div>
            ) : null}
            {isShapeByStringVisible.showString2 ? (
              <div className="column">Root 2nd String</div>
            ) : null}
            {isShapeByStringVisible.showString1 ? (
              <div className="column">Root 1st String</div>
            ) : null}
          </div>

          <div>
            {currentChords.map((e) => {
              return (
                <div
                  key={e.id}
                  className="columns has-text-centered py-3"
                  id="chord-view-row"
                >
                  <div className="column has-text-left is-size-5">
                    <p>{e.qualityName}</p>
                    {/* <p>{e.qualityFormula}</p> */}
                    {/* hide quality formula for now */}
                  </div>
                  {isShapeByStringVisible.showString6 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string6)}
                    </div>
                  ) : null}
                  {isShapeByStringVisible.showString5 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string5)}
                    </div>
                  ) : null}
                  {isShapeByStringVisible.showString4 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string4)}
                    </div>
                  ) : null}
                  {isShapeByStringVisible.showString3 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string3)}
                    </div>
                  ) : null}
                  {isShapeByStringVisible.showString2 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string2)}
                    </div>
                  ) : null}
                  {isShapeByStringVisible.showString1 ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings.string1)}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TODO: upgrade to only chords element */}
      <form onSubmit={handlePrintPage}>
        <button className="button mb-6 mr-5 has-background-white-ter is-pulled-right">
          Print Page
        </button>
      </form>
    </main>
  )
}
