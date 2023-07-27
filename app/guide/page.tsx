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
          for the chord B minor, choose the quality minor from the list. Then
          use the add chord button.
        </p>
        <p>
          Now with a quality added and chord shapes showing, you can choose
          which root string you want the chord shapes for with the string
          checkboxes.
        </p>
        <div className="mt-3 has-text-centered">
          <Image src={"/howto.jpg"} width={700} height={600} alt="howto" />
        </div>
      </section>
      <section className="section pt-5">
        <h2 className="is-size-4 mb-3 is-family-secondary">
          How to read a chord diagram
        </h2>
        <p>asdf</p>
        <p>asdf</p>
        <div className="mt-3 has-text-centered">
          <Image src={"/howto.jpg"} width={700} height={600} alt="howto" />
        </div>
      </section>
    </div>
  )
}
