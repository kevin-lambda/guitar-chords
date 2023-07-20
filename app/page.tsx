import Image from "next/image"

export default async function Home() {
  async function getChordAllQuality() {
    const res = await fetch("http://localhost:3000/api/chord-quality/")
    const parseRes = await res.json()
    return parseRes
  }

  const chordQuality = await getChordAllQuality()

  // actually... need to
  // 1. include the chord quality voicings to the chord quality fetch api
  // 2. then can... SSELECT  by quality, but then SHOW all the associated voicings with that quality

  // getting ["1","3","2"...] to render...

  return (
    <main>
      <section className="section">
        <h2 className="title">main section</h2>
        <p>{chordQuality[0].qualityName}</p>
      </section>
    </main>
  )
}
