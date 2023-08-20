// @ts-nocheck

// display chord page data by fetching from api chordpage/[id]

// todo actually render the chords, but only after refactoring the main rendering page to be reusable
export default async function SingleChordPage({ params }) {
  const parseParams = parseInt(params.id)

  async function getChordData() {
    // const DOMAIN_LINK = "http://localhost:3000" // ! DEV MODE =============
    const DOMAIN_LINK = "https://quality-chords.vercel.app" // ! PRODUCTION MODE =============
    const DOMAIN_LINK_CODE = process.env.DOMAIN_LINK

    const res = await fetch(`${DOMAIN_LINK_CODE}/api/chord-page/${parseParams}`)
    const parseRes = await res.json()
    return parseRes
  }

  const chordData = await getChordData()
  console.log(chordData)

  return (
    <div className="container">
      <section className="section mb-0 pb-4">
        <h1 className="title is-family-secondary">Chord Page</h1>
      </section>
      <section className="section pb-0 pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          Page Name: {chordData.name}
        </h2>
        <p>Id: {chordData.id}</p>
        <div>
          Chord qualities:{" "}
          {chordData.chordsByQuality.length > 0 ? (
            <span>
              {chordData.chordsByQuality.map((e) => (
                <span key={e.id}>{e.qualityName}, </span>
              ))}
            </span>
          ) : (
            <> none saved</>
          )}
        </div>
      </section>
    </div>
  )
}
