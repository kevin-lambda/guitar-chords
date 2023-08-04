import Image from "next/image"

export default function Help() {
  return (
    <div className="container">
      <section className="section mb-0 pb-4">
        <h1 className="title is-family-secondary">About</h1>
      </section>
      <section className="section pb-0">
        <h2 className="is-size-4 mb-3 is-family-secondary">Why</h2>

        <div className="content">
          <p>
            My goal is to share the enjoyment of musical expression. I made this
            website because I wish this was the framework I learned when I first
            started playing guitar. This is a method for the foundation of a
            musical journey. By approaching in terms of chord quality shapes, it
            does two things. It unlocks all the chords of a quality right away
            and just gets you playing. Then it gets you thinking about chords in
            terms of quality.
          </p>
          <p className="mt-3">
            Seeing chords presented in this way might get you asking:
          </p>
          <ul className="">
            <li>
              If there's many ways to play the same chord, which should I use?
            </li>
            <li>
              Why do major and minor chord shapes only have one note difference?
            </li>
            <li>
              When do you want to use a major or minor chord, or any of the
              other ones?
            </li>
          </ul>
          <p className="mt-3">
            I leave it up to you to explore these questions. Or in the future,
            I'll incorporate these concepts into a tool.
          </p>
        </div>
      </section>
      <section className="section pb-0">
        <h2 className="is-size-4 mb-3 is-family-secondary">About me</h2>
        <div className="content">
          <ul>
            <li>
              I've been playing guitar since{" "}
              <a href="https://en.wikipedia.org/wiki/2005">2005</a>.
            </li>
            <li>I'm a perpetual beginner in jazz.</li>
            <li>
              Outside of music I'm a software developer and mechanical engineer.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="is-size-4 mb-3 is-family-secondary">Built with</h2>

        <div className="content">
          <ul>
            <li>Nextjs</li>
            <li>Bulma css</li>
            <li>Prisma</li>
            <li>Postgres</li>
            <li>
              <a href="https://github.com/tombatossals/react-chords">
                @tombatossals/react-chords
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
