// @ts-nocheck
import { SvgChord } from "@/components"

export default function Test() {
  const testObject = {
    frets: [1, 1, 1, 2, 1, 1],
    tones: ["", "", "", "", "", ""],
    bar: [],
    baseFret: 5,
    includeBaseFret: false,
  }

  return (
    <div>
      <SvgChord obj={testObject} />
    </div>
  )
}
