// @ts-nocheck

import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"

export default function SvgChord(props) {
  const { frets, tones, bar, baseFret, includeBaseFret, isShowingTones } =
    props.data

  const MyChord = () => {
    let chord
    if (includeBaseFret) {
      chord = {
        frets: frets,
        fingers: tones,
        barres: bar,
        capo: false,
        baseFret: baseFret,
      }
    } else {
      chord = {
        frets: frets,
        fingers: tones,
        // barres: bar,
        // capo: false,
      }
    }
    const instrument = {
      strings: 6, // 4 - 6
      fretsOnChord: 4, //1 - 4
      name: "Guitar",
      keys: ["C"],
      tunings: {
        standard: ["", "", "", "", "", ""], //per string notes
      },
    }

    const lite = !isShowingTones // defaults to false if omitted

    return <Chord chord={chord} instrument={instrument} lite={lite} />
  }
  return <MyChord />
}
