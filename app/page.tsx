// @ts-nocheck

"use client"
import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import { SvgChord } from "@/components"

export default function Home() {
  const [chordQualityBank, setChordQualityBank] = useState([])
  const [currentChords, setCurrentChords] = useState([])
  const [selectChordQuality, setSelectChordQuality] = useState(1)

  async function getChordAllQuality() {
    const res = await fetch("http://localhost:3000/api/chord-quality/")
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

    console.log(getElement)
    return getElement
  }

  // todo get tones to work, by editing original library. need to change the forked libray and then install that forked library as a npm package. remove the old package
  function renderChord(obj) {
    if (obj) {
      // format data
      // put into object
      // return component

      const { frets } = obj
      const newArray = []

      for (const elem of frets) {
        newArray.push(parseInt(elem))
      }

      console.log(obj)
      console.log(newArray)

      const sendObject = {
        frets: newArray,
        tones: ["", "", "", "", "", ""],
        bar: [],
        baseFret: 0,
        includeBaseFret: false,
      }

      return <SvgChord data={sendObject} />
    } else {
      return "i am undefined"
    }
  }

  useEffect(() => {
    getChordAllQuality()
  }, [])

  return (
    <main className="">
      <h2 className="title">main section</h2>

      <section className="section">
        controls
        <div>
          <form onSubmit={handleAddChord}>
            <button className="button">add chord</button>
          </form>
        </div>
        <div>
          <select
            name="chordQualitySelect"
            onChange={(e) => {
              setSelectChordQuality(e.target.value)
            }}
          >
            {chordQualityBank.map((e) => {
              return (
                <option value={e.id} key={e.id}>
                  {e.id} {e.qualityName}
                </option>
              )
            })}
          </select>
        </div>
      </section>

      <section className="section">
        <h2 className="is-size-3">my chords</h2>

        {/* use the classname is-hidden based on a checkbox trigger to toggle strings */}
        <div>
          {currentChords.map((e) => {
            return (
              <div key={e.id} className="columns box">
                <div className="column box">
                  {e.qualityName}, {e.qualityFormula}
                </div>
                <div className="column">
                  string6: {renderChord(e.formattedVoicings.string6)}
                </div>
                <div className="column">
                  string5: {renderChord(e.formattedVoicings.string5)}
                </div>
                <div className="column">
                  string4: {renderChord(e.formattedVoicings.string4)}
                </div>
                <div className="column">
                  string3: {renderChord(e.formattedVoicings.string3)}
                </div>
                <div className="column">
                  string2: {renderChord(e.formattedVoicings.string2)}
                </div>
                <div className="column">
                  string1: {renderChord(e.formattedVoicings.string1)}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
