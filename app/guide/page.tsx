import Image from "next/image"

export default function Help() {
  return (
    <div className="container">
      <section className="section mb-0 pb-4">
        <h1 className="title is-family-secondary">Guide</h1>
      </section>
      <section className="section pb-0 pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          How to get chord diagrams
        </h2>
        <p>
          Choose a chord quality from the drop down menu. If you were looking
          for the chord B minor, choose the quality <strong>minor</strong> from
          the list. Then use the add chord button.
        </p>
        <p>
          Now with a quality added and chord shapes showing, use the string
          checkboxes to choose which root string you want the chord shapes for.
        </p>
        <div className="mt-3 has-text-centered">
          <Image src={"/howto.jpg"} width={700} height={600} alt="howto" />
        </div>
      </section>
      <section className="section pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          How to read a chord diagram
        </h2>
        <p>
          All chords are in standard tuning. From the 6th string to the first
          string, EADGBe. The thickest (lowest pitch) string is the 6th string,
          the thinnest (highest pitch) string is the 1st string.
        </p>
        <p>
          The dots on the chord diagrams represent an upright guitar. The
          fingering placement of the chord is up to you. If you need help,{" "}
          <a
            target="_blank"
            href="https://jguitar.com/chordsearch?chordsearch=G&labels=finger"
          >
            <strong>jguitar</strong>
          </a>{" "}
          is an amazing resource for details on chord shapes and a lot else.
        </p>
        <div className="mt-5 has-text-centered">
          <Image
            src={"/shape_root_6.png"}
            width={350}
            height={300}
            alt="diagram"
            id="image-border"
          />
          <Image
            src={"/shape_root_5.png"}
            width={350}
            height={300}
            alt="diagram"
          />
          <Image
            src={"/shape_root_1.png"}
            width={350}
            height={300}
            alt="diagram"
          />
        </div>
      </section>
      <section className="section pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          How movable chord shapes work
        </h2>
        <p>
          All chord diagrams on this site are <i>movable</i> chord shapes.
        </p>
        <p className="pt-3">
          This means you can <strong>learn one</strong> chord quality shape like
          the major chord, and you can now <strong>play all</strong> the major
          quality for all root notes. Like F#maj, Amaj, or C#maj. For a root
          string such as the 6th string, you can keep the same shape and move up
          or down the neck. That's why chords are defined by chord quality and
          not specific root note chords.
        </p>

        <div className="mt-5 has-text-centered">
          <Image
            src={"/notes.png"}
            width={350}
            height={300}
            alt="diagram"
            id="image-border"
          />
          <Image
            src={"/6shapes.png"}
            width={350}
            height={300}
            alt="diagram"
            id="image-border"
          />
          <Image
            src={"/5shapes.png"}
            width={350}
            height={300}
            alt="diagram"
            id="image-border"
          />
        </div>
      </section>
    </div>
  )
}
