// copy ALL this into a component
// import that new component into this non logged in page.tsx
// make a new route and page for signed in users, import the same new component into that route page
// ..... public non signed in layout. signed in layout....
// further thinking...

// ! nah do this later. want to do chord stuff first

// @ts-nocheck
"use client"

import React, { useState, useEffect } from "react"
import { SvgChord } from "@/components"
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/clerk-react"
import CookieConsent from "react-cookie-consent"

export default function Home() {
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_LINK
  const STRING_NUMBERS = [6, 5, 4, 3, 2, 1]

  const { isLoaded, userId, isSignedIn, sessionId, getToken } = useAuth()
  const { user } = useUser()

  const [allChordQualities, setAllChordQualities] = useState([])
  const [selectedChordQualities, setSelectedChordQualities] = useState("")

  const [currentChords, setCurrentChords] = useState([])
  const [currentUserId, setCurrentUserId] = useState(0)
  const [pageTitle, setPageTitle] = useState("My chords")

  const [noteLabelSelect, setNoteLabelSelect] = useState("None")

  const [stringVisibility, setStringVisibility] = useState({
    showString6: true,
    showString5: true,
    showString4: false,
    showString3: false,
    showString2: false,
    showString1: false,
  })

  // * ==========================
  // * === USER AUTH CHECK ======
  // * ==========================
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
    let getElement = allChordQualities.find((e) => {
      return e.id === parseId
    })

    let voicingsObj = {}
    for (let i = 1; i <= 6; i++) {
      let curString = getElement.chordQualityVoicing.find((e) => {
        return e.rootString === i
      })
      voicingsObj[`string${i}`] = curString
    }
    getElement.formattedVoicings = voicingsObj
    return getElement
  }

  // * ==========================
  // * === RENDERING FUNCTION ===
  // * ==========================
  function renderChord(chordDataObject) {
    if (chordDataObject) {
      const { frets } = chordDataObject
      const newArray = []
      let isShowingTones = false

      if (noteLabelSelect === "Tones") {
        isShowingTones = true
      }

      for (const elem of frets) {
        newArray.push(parseInt(elem))
      }

      const sendObject = {
        frets: newArray,
        tones: chordDataObject.fretTones,
        bar: [],
        baseFret: 1,
        includeBaseFret: true,
        isShowingTones: isShowingTones,
      }

      return <SvgChord data={sendObject} />
    } else {
      return "No chord shape available"
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

  userCheckClerkToDatabase()
  useEffect(() => {
    fetchAllChordQualities()
  }, [])

  return (
    <main className="container is-max-desktop">
      <section id="chord-page-title" className="section mb-0 pb-0 ">
        <h1 className="title is-family-secondary">Quality Chords</h1>
        <h2 className="subtitle">For movable guitar chord shapes</h2>
      </section>

      <section
        id="chord-page-controls"
        className="section pt-5 pb-2 is-flex is-justify-content-space-between is-flex-direction-row"
      >
        <div className="is-flex is-flex-direction-row">
          <div className="px-5">
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
          <div>
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
        </div>

        <div className="is-flex">
          <div className="select px-2">
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
          <form className="px-2" onSubmit={handleAddChord}>
            <button className="button has-background-success">add chord</button>
          </form>
        </div>
      </section>

      <section id="chord-page-render" className="section pt-0 px-5 box">
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
                      {renderChord(e.formattedVoicings[`string${sub_e}`])}
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
      <form onSubmit={handlePrintPage}>
        <button className="button mb-6 mr-5 has-background-white-ter is-pulled-right">
          Print Page
        </button>
      </form>

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </main>
  )
}
