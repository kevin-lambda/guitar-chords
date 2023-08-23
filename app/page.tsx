// @ts-nocheck

"use client"
import React, { useState, useEffect } from "react"
import { SvgChord } from "@/components"
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/clerk-react"
import CookieConsent from "react-cookie-consent"

export default function Home() {
  const DOMAIN_LINK_CODE = process.env.NEXT_PUBLIC_DOMAIN_LINK
  const STRING_NUMBERS = [6, 5, 4, 3, 2, 1]

  const { isLoaded, userId, isSignedIn, sessionId, getToken } = useAuth()
  const { user } = useUser()

  const [chordQualityBank, setChordQualityBank] = useState([])
  const [currentChords, setCurrentChords] = useState([])
  const [selectChordQuality, setSelectChordQuality] = useState("")
  const [currentUserId, setCurrentUserId] = useState(0)
  const [pageTitle, setPageTitle] = useState("My chords")

  const [isShapeByStringVisible, setIsShapeByStringVisible] = useState({
    showString6: true,
    showString5: true,
    showString4: false,
    showString3: false,
    showString2: false,
    showString1: false,
  })

  async function handleNewChordPage(e) {
    e.preventDefault()
    console.log("===== handle new chord page =======")
    const userEmail = user?.primaryEmailAddress?.emailAddress

    const placeholderTitle = pageTitle
    const placeholderOwner = 1
    const placeholderObject = {
      name: placeholderTitle,
      ownerId: placeholderOwner,
    }

    const resChordPage = await fetch(`${DOMAIN_LINK_CODE}/api/chord-page`, {
      method: "POST",
      body: JSON.stringify(placeholderObject),
    })

    const parseResChordPage = await resChordPage.json()
    const newChordPageId = parseResChordPage.id

    const currentChordIds = []
    for (const elem of currentChords) {
      currentChordIds.push({ id: elem.id })
    }

    const resConnectChordPage = await fetch(
      `${DOMAIN_LINK_CODE}/api/chord-page/${newChordPageId}`,
      {
        method: "PUT",
        body: JSON.stringify(currentChordIds),
      }
    )

    const resUser = await fetch(
      `${DOMAIN_LINK_CODE}/api/clerkUser/${userEmail}`,
      {
        method: "PUT",
        body: JSON.stringify({ newChordPageId }),
      }
    )
  }

  // later... create logged in user UI only. with ability to save pages, view pages

  checkUserAuthToDatabase()

  async function checkUserAuthToDatabase() {
    if (isSignedIn) {
      const userEmail = user?.primaryEmailAddress?.emailAddress

      const res = await fetch(`${DOMAIN_LINK_CODE}/api/clerkUser/${userEmail}`)
      const parseRes = await res.json()

      const newUserObj = { email: userEmail, password: user?.id }

      if (parseRes === null) {
        try {
          const res = await fetch(`${DOMAIN_LINK_CODE}/api/clerkUser`, {
            method: "POST",
            body: JSON.stringify(newUserObj),
          })
          const parseRes = await res.json()
        } catch (error) {
          console.log(error)
        }
      }

      const getUserDatabaseId = await fetch(
        `${DOMAIN_LINK_CODE}/api/clerkUser/${userEmail}`
      )
      const parseUser = await getUserDatabaseId.json()
      const userDatabaseId = parseUser.id
      setCurrentUserId(userDatabaseId)
    }
  }

  async function getChordAllQuality() {
    try {
      const res = await fetch(`${DOMAIN_LINK_CODE}/api/chord-quality/`)
      const parseRes = await res.json()
      setChordQualityBank(parseRes)
    } catch (error) {
      console.log(error)
    }
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
    // checkUserAuthToDatabase()
    getChordAllQuality()
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
        <div>
          <h3>Show chord shape for string</h3>
          <form className="is-flex is-justify-content-space-between">
            {STRING_NUMBERS.map((e) => (
              <label>
                <input
                  type="checkbox"
                  name={`showString${e}`}
                  onChange={handleVisibleChords}
                  value={isShapeByStringVisible[`showString${e}`]}
                  defaultChecked={isShapeByStringVisible[`showString${e}`]}
                />{" "}
                {e}{" "}
              </label>
            ))}
          </form>
        </div>

        <div className="is-flex">
          <div className="select px-2">
            <select
              name="chordQualitySelect"
              onChange={(e) => setSelectChordQuality(e.target.value)}
              defaultValue={"prompt"}
            >
              <option value={"prompt"} disabled hidden>
                Choose Chord Quality
              </option>
              {chordQualityBank.map((e) => (
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
              <>
                {isShapeByStringVisible[`showString${e}`] ? (
                  <div className="column">Root {e}th String</div>
                ) : null}
              </>
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
                <>
                  {isShapeByStringVisible[`showString${sub_e}`] ? (
                    <div className="column">
                      {renderChord(e.formattedVoicings[`string${sub_e}`])}
                    </div>
                  ) : null}
                </>
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
