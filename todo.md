REFACTOR CHECKLIST 8/22/23
[] component/navbar dedicated signed in/out navbar. instead of conditional rendering. page flashing
[] component/navbar misc unused items

[] change app/user-chord-pages/page to server component, similar to chord-page

app/page
[x] handleNewChordPage placeholder items
[x] getchordfromarray clean up logic

[x] organize placement of helper functions

[x] map checkboxes
[x] map root xth string headings
[x] map chord renders
[x] give semantic names to sections

admin
[] organize all the state placements
[] so many fetches
[] give semantic naming

TBD
[] change functionality on admin page
[] change functionality on admin dynamic id pages

minor to do
[x] center sign in and log in user auth components

look into
[] how to change prisma schema without deleting db data
[] modularized fetches
[] api error scaled handling

=====================================
DEV vs PROD reminder:

- prisma/schema.prisma. database url

=====================================
8/22/23
Main topics:

- user auth, public clerk key
- env variables
- db wiping
- cookies
- user input page title
- refactoring... TBD
- project management. sprint, then review and document
- object property using bracket. but instead of using a full variable, using a template literal... so it seems like bracket uses the evaluated variable

misc

- tried map within a map. it works!

  Detailed notes:

- ERR_SSL_PROTOCOL_ERROR when trying to access localhost fetch http.

  - fix: make sure the fetch url for localhost is `http` and NOT `https`
  - ✔️ `http://localhost:3000`
  - ❌ `https://localhost:3000`

- cleaning up

- how to easily switch between dev and prod db environments
- next run dev.... loads .env.development.local varialbles
- next run start.... loads .env.production.local varialbles
- duh
- process.env.NODE_ENV automatically reads which environment we are in. production or development. maybe test as well?

- for environ variables in vercel, don't use quotes. quotes okay for local env variables

- prisma env(), how does this work? does it know .env from env.development.local?

=====================================
LOG
8/4/2023 - first pass refactor

- refactored. targets for larger refactoring >>> admin page modularize fetches

8/9/2023 - user auth

- feat: user auth login & signup, but with page flashes. >>> to make dedicated logged in view
- feat: saved user chord pages, but not full render. >>> either abstact out the rendering function or get pdf saved pages function
- feat: guide and about pages content

8/17/2023 - user auth prod & cookies

- merged auth branch
- added basic user cookie consent component
- needed to add the public publishable key for clerk, see layout

8/20/2023 - env variable workflow & page title input
feat: production and development env variable workflow
feat: User input page title

========================

TO DO LIST
Major:
[] Alternate same chord root voicing carousel
[] Remove, reorder shown chords via drag and drop? else buttons

[] chord diagram tones >>> forking svg chord library, manually configuring to allow tones
[] chord diagram remove nut

Minor:
[] UI confirm on logged in user page save

[] Upgrade print functionality, only show chord page
[] stretch: render chords per chord page, wait for refactor though

Clean up:
[] Clean up admin CRUD UX/UI
[] optimize functions

Dev ops:
[] add TS  
[] add unit tests
