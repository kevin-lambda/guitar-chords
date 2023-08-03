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
            src={"/read_root_6.png"}
            width={350}
            height={300}
            alt="diagram"
          />
          <Image
            src={"/read_root_5.png"}
            width={350}
            height={300}
            alt="diagram"
          />
          <Image
            src={"/read_root_1.png"}
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
          or down the neck.
        </p>

        <div className="mt-5 has-text-centered">
          <Image src={"/notes.png"} width={350} height={300} alt="diagram" />
          <Image
            src={"/6_root_majors.png"}
            width={350}
            height={300}
            alt="diagram"
          />
          <Image
            src={"/5_root_majors.png"}
            width={350}
            height={300}
            alt="diagram"
          />
        </div>
      </section>
      <section className="section pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          How to be efficient with chord changes distance
        </h2>
        <p>
          While you can learn just one chord shape for one root string, you'll
          need to move a lot of frets to cover all the root notes. It won't be
          an efficient use of your movement. A recommended approach is to learn
          the <strong>chord shapes for both 6th and 5th root strings</strong>.
          This will cover whatever root notes you'll need to play in a
          reasonable fret distance.
        </p>
        <p className="pt-3">
          In the example below instead of moving <strong>8 frets</strong> to
          play F major and C# major on the 6th string. The two chords can be
          played moving <strong>1 string and 3 frets</strong>.
        </p>

        <div className="mt-5 has-text-centered">
          <Image
            src={"/F_to_Csharp_1.png"}
            width={350}
            height={300}
            alt="diagram"
          />
          <Image
            src={"/F_to_Csharp_3.png"}
            width={350}
            height={300}
            alt="diagram"
          />
        </div>
      </section>
      <section className="section pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">Next steps</h2>
        <p>
          Once you've learned the chord shapes for the 6th and 5th strings,
          you've covered the basics. Try out the chord voicings for different
          strings and see the differences in how they are expressed. The 4th and
          1st string chord shapes are common next steps to try. Beyond that,
          below are other resources I've found useful.
        </p>
        <ul className="mt-3">
          <li>
            <a href="https://www.fretjam.com/">Fretjam</a> - Approachable guitar
            theory and technique guides
          </li>
          <li>
            <a href="https://jguitar.com/">jGuitar</a> - Chords and scales tool
          </li>
          <li>
            <a href="https://www.jazzguitar.be/">jazzguitar</a> - Jazz guitar
            resources
          </li>
        </ul>
      </section>
    </div>
  )
}
