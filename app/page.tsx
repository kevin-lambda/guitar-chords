// @ts-nocheck
"use client"

import React, { useState, useEffect, useRef } from "react"
import { SvgChord } from "@/components"
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/clerk-react"
import CookieConsent from "react-cookie-consent"
import ReactToPrint from "react-to-print"

export default function Home() {
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_LINK
  const STRING_NUMBERS = [6, 5, 4, 3, 2, 1]

  const { isLoaded, userId, isSignedIn, sessionId, getToken } = useAuth()
  const { user } = useUser()
  const printReference = useRef()

  // Fetches all chord qualities
  const [allChordQualities, setAllChordQualities] = useState([])

  // Controls
  const [selectedChordQualities, setSelectedChordQualities] = useState("")
  const [showAltChords, setShowAltChords] = useState("true")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [noteLabelSelect, setNoteLabelSelect] = useState("None")
  const [stringVisibility, setStringVisibility] = useState({
    showString6: true,
    showString5: true,
    showString4: false,
    showString3: false,
    showString2: false,
    showString1: false,
  })

  // Data for rendered chord page
  const [currentChords, setCurrentChords] = useState([])
  const [currentUserId, setCurrentUserId] = useState(0)
  const [pageTitle, setPageTitle] = useState("My chords")
  const [shapeVariationList, setShapeVariationList] = useState({})

  // * ==========================
  // * === USER AUTH CHECK ======
  // * ==========================

  // todo try attaching user signed in check to usecontext
  async function userCheckClerkToDatabase() {
    if (isSignedIn) {
      const userEmail = user?.primaryEmailAddress?.emailAddress
      const res = await fetch(`${DOMAIN_URL}/api/clerkUser/${userEmail}`)
      const isUserInDatabase = await res.json()

      // if user not found in database, create user
      if (isUserInDatabase === null) {
        try {
          const newUserObj = { email: userEmail, password: user?.id }
          const res = await fetch(`${DOMAIN_URL}/api/clerkUser`, {
            method: "POST",
            body: JSON.stringify(newUserObj),
          })
        } catch (error) {
          console.log(error)
        }
      }

      const getUserDatabaseId = await fetch(
        `${DOMAIN_URL}/api/clerkUser/${userEmail}`
      )
      const parseUser = await getUserDatabaseId.json()
      setCurrentUserId(parseUser.id)
    }
  }

  async function fetchAllChordQualities() {
    try {
      const res = await fetch(`${DOMAIN_URL}/api/chord-quality/`)
      const parseRes = await res.json()
      setAllChordQualities(parseRes)
    } catch (error) {
      console.log(error)
    }
  }

  function getChordFromArray(qualityId) {
    const parseId = parseInt(qualityId)
    let getMatchingChordQualityData = allChordQualities.find((e) => {
      return e.id === parseId
    })

    let voicingsObj = {}

    for (let i = 1; i <= 6; i++) {
      let curStringArray =
        getMatchingChordQualityData.chordQualityVoicing.filter((e) => {
          return e.rootString === i
        })
      voicingsObj[`string${i}`] = curStringArray
    }
    getMatchingChordQualityData.formattedVoicings = voicingsObj
    return getMatchingChordQualityData
  }

  // * ==========================
  // * === RENDERING FUNCTION ===
  // * ==========================
  function renderChord(chordDataArray) {
    let numberOfShapes = chordDataArray.length

    // Render based on number of chords. No chords, one chord, or many chords
    if (numberOfShapes === 0) {
      return "No chord shape available"
    } else {
      // todo maybe separate all this parsing logic into it's own function, returning just the data object
      const currentQuality = chordDataArray[0].name
      const currentString = chordDataArray[0].rootString
      const numberOfShapes = chordDataArray?.length

      // * This is the count that pulls from the shapeVariation state chooses the index from an array of available shapes for the string and quality
      const currentShapeIndex =
        shapeVariationList[`${currentQuality}`][`string${currentString}`]
      const FOR_UI_currentShapeNumber =
        shapeVariationList[`${currentQuality}`][`string${currentString}`] + 1

      const filteredForCurrentQualityArray = chordDataArray.filter((e) => {
        return e.name == currentQuality
      })

      // * USES the shape variation list as the index to select the chosen shape variation from the array of available shapes
      const getCurrentChosenQualityShape =
        filteredForCurrentQualityArray[currentShapeIndex]

      const getCurrentQualityShapeFrets = getCurrentChosenQualityShape.frets
      const parsedFretArray = []

      for (const elem of getCurrentQualityShapeFrets) {
        parsedFretArray.push(parseInt(elem))
      }

      let isShowingTones = false

      if (noteLabelSelect === "Tones") {
        isShowingTones = true
      }

      const sendObject = {
        frets: parsedFretArray,
        tones: getCurrentChosenQualityShape.fretTones,
        bar: [],
        baseFret: 1,
        includeBaseFret: true,
        isShowingTones: isShowingTones,
      }

      if (showAltChords === "false") {
        return <SvgChord data={sendObject} />
      } else {
        return (
          <div>
            <SvgChord data={sendObject} />
            <div className="columns is-centered is-gapless">
              <button
                id="alternate-chord-shape"
                className="column is-one-fifth"
                value={"previous"}
                onClick={(e) =>
                  handleNextChordShape(
                    e,
                    currentQuality,
                    currentString,
                    numberOfShapes,
                    currentShapeIndex,
                    getCurrentChosenQualityShape
                  )
                }
              >
                ◀
              </button>{" "}
              <div className="column is-two-fifths">
                {FOR_UI_currentShapeNumber} of {numberOfShapes}{" "}
              </div>
              <button
                className="column is-one-fifth"
                id="alternate-chord-shape"
                value={"next"}
                onClick={(e) =>
                  handleNextChordShape(
                    e,
                    currentQuality,
                    currentString,
                    numberOfShapes,
                    currentShapeIndex,
                    getCurrentChosenQualityShape
                  )
                }
              >
                ▶
              </button>
            </div>
          </div>
        )
      }
    }
  }

  // * ==========================
  // * ==== event handlers ======
  // * ==========================

  async function handleNewChordPage(e) {
    e.preventDefault()
    const userEmail = user?.primaryEmailAddress?.emailAddress

    const newChordPageData = {
      name: pageTitle,
      ownerId: currentUserId,
    }

    //  create new chord page
    const resChordPage = await fetch(`${DOMAIN_URL}/api/chord-page`, {
      method: "POST",
      body: JSON.stringify(newChordPageData),
    })
    const newChordPage = await resChordPage.json()
    const newChordPageId = newChordPage.id

    const currentChordIds = []
    for (const elem of currentChords) {
      currentChordIds.push({ id: elem.id })
    }

    // connect current chords to newly created page
    const resConnectChordPage = await fetch(
      `${DOMAIN_URL}/api/chord-page/${newChordPageId}`,
      {
        method: "PUT",
        body: JSON.stringify(currentChordIds),
      }
    )

    // connect page with chords to current clerk user
    const resUser = await fetch(`${DOMAIN_URL}/api/clerkUser/${userEmail}`, {
      method: "PUT",
      body: JSON.stringify({ newChordPageId }),
    })
  }

  function handleAddChord(event) {
    event.preventDefault()
    const chord = getChordFromArray(selectedChordQualities)

    const toAdd = shapeVariationList
    toAdd[`${chord.qualityName}`] = {
      string6: 0,
      string5: 0,
      string4: 0,
      string3: 0,
      string2: 0,
      string1: 0,
    }

    setShapeVariationList(toAdd)
    setCurrentChords([...currentChords, chord])
  }

  function handleVisibleChords(event) {
    setStringVisibility({
      ...stringVisibility,
      [event.target.name]: event.target.checked,
    })
  }

  function handlePrintPage(e) {
    e.preventDefault()
    window.print()
  }

  function handleAltControl(e) {
    setShowAltChords(e.target.value)
  }

  function handleShowAdvancedOptions(e) {
    setShowAdvancedOptions((previous) => {
      return !previous
    })
  }

  function handleNextChordShape(
    e,
    currentQuality,
    currentString,
    numberOfShapes,
    currentShapeIndex
  ) {
    e.preventDefault()

    let stepDirection
    if (e.target.value === "next") {
      stepDirection = 1
    } else {
      stepDirection = -1
    }

    const updatedObject = { ...shapeVariationList }

    // restart shape cycle at index 0 if about to exceed max shapes
    if (
      currentShapeIndex + stepDirection < numberOfShapes &&
      currentShapeIndex + stepDirection > -1
    ) {
      updatedObject[`${currentQuality}`][`string${currentString}`] +=
        stepDirection
    } else if (currentShapeIndex + stepDirection < 0) {
      updatedObject[`${currentQuality}`][`string${currentString}`] =
        numberOfShapes - 1
    } else {
      updatedObject[`${currentQuality}`][`string${currentString}`] = 0
    }

    setShapeVariationList(updatedObject)
  }

  // * ==========================
  // * ======== effects =========
  // * ==========================

  userCheckClerkToDatabase()
  useEffect(() => {
    fetchAllChordQualities()
  }, [])

  return (
    <main className="container is-max-desktop">
      <section id="chord-page-title" className="section mb-0 pb-0 ">
        <h1 className="title is-family-secondary">Quality Chords</h1>
        <h2 className="subtitle">Learn guitar with movable chord shapes</h2>
      </section>

      <section
        id="chord-page-controls"
        className="section pt-5 pb-2 is-flex is-justify-content-space-between is-flex-direction-row"
      >
        <div className="is-flex is-flex-direction-row" id="controls-left-side">
          <div className="px-3" id="controls-show-string">
            <h3>Show chord shape for string</h3>
            <form className="is-flex is-justify-content-space-between">
              {STRING_NUMBERS.map((e) => (
                <label key={e}>
                  <input
                    type="checkbox"
                    name={`showString${e}`}
                    onChange={handleVisibleChords}
                    value={stringVisibility[`showString${e}`]}
                    defaultChecked={stringVisibility[`showString${e}`]}
                  />{" "}
                  {e}{" "}
                </label>
              ))}
            </form>
          </div>
        </div>

        <div className="is-flex" id="controls-right-side">
          <div className="select px-2" id="controls-select-chord-qualities">
            <select
              name="chordQualitySelect"
              onChange={(e) => setSelectedChordQualities(e.target.value)}
              defaultValue={"prompt"}
            >
              <option value={"prompt"} disabled hidden>
                Choose Chord Quality
              </option>
              {allChordQualities.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.qualityName}
                </option>
              ))}
            </select>
          </div>

          <form
            className="pl-2"
            id="controls-submit-add-chord"
            onSubmit={handleAddChord}
          >
            <button className="button has-background-success">Add chord</button>
          </form>
        </div>
      </section>
      <section className="section pt-0 pb-2 is-flex is-justify-content-space-between is-flex-direction-row">
        <div className="is-flex is-flex-direction-row">
          {showAdvancedOptions ? (
            <>
              <div className="px-3" id="controls-alternate-chords">
                <h3>Choose Alt Chords</h3>
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="alternateControl"
                      value="true"
                      checked={showAltChords === "true"}
                      onChange={handleAltControl}
                    ></input>
                    On
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="alternateControl"
                      value="false"
                      checked={showAltChords === "false"}
                      onChange={handleAltControl}
                    ></input>
                    Off
                  </label>
                </div>
              </div>

              <div className="px-3" id="controls-note-labels">
                <h3>Note Label</h3>
                <div className="select is-normal">
                  <select
                    name="noteLabelSelect"
                    onChange={(e) => setNoteLabelSelect(e.target.value)}
                    defaultValue={"None"}
                  >
                    <option value={"None"}>None</option>
                    <option value={"Tones"}>Tones</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <div>
          <button className="button" onClick={handleShowAdvancedOptions}>
            ⚙️
          </button>
        </div>
      </section>

      <section
        id="chord-page-render"
        className="section pt-5 px-5 box"
        ref={printReference}
      >
        <form className="has-text-centered pb-5">
          <input
            className="chord-page-title "
            type="text"
            name="pageTitle"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </form>

        {/*TODO mobile view */}
        <div>
          <div
            className="columns has-text-centered py-0 is-size-5"
            id="chord-page-heading"
          >
            <div className="column">Chord Quality</div>
            {STRING_NUMBERS.map((e) => (
              <React.Fragment key={e}>
                {stringVisibility[`showString${e}`] ? (
                  <div className="column">Root {e}th String</div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
          {currentChords.map((e) => (
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
              {STRING_NUMBERS.map((sub_e) => (
                <React.Fragment key={sub_e}>
                  {stringVisibility[`showString${sub_e}`] ? (
                    <div className="column">
                      {renderChord(
                        e.formattedVoicings[`string${sub_e}`],
                        sub_e
                      )}
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {isSignedIn ? (
        <form onSubmit={handleNewChordPage}>
          <button className="button mb-6 mr-5 has-background-success is-pulled-right">
            Save chord page
          </button>
        </form>
      ) : null}
      <ReactToPrint
        trigger={() => (
          <button className="button mb-6 mr-5 has-background-white-ter is-pulled-right">
            Print
          </button>
        )}
        content={() => printReference.current}
      />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </main>
  )
}
