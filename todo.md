MEGA reminder:

SWITCH BACK

x - app/user-chord-pages/page. domain
x - app/chordpage/id/page. domain
x - app/page. domain

!!!!!!! STILL NEED TO CHANGE DATADASE URL FOR NOW. OR FIGURE IT OUT

- prisma/schema.prisma. database url

- WHILE in dev mode
  - schema.prisma datasource db is toggled to use env("DATABASE_URL"), while is DEV mode postgres db. local
  - app/page.tsx is fetching localhost domain_link
- SWITCH BOTH BACK BEFORE PUSHING a
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
  -abca

Notes:

- ERR_SSL_PROTOCOL_ERROR when trying to access localhost fetch http.
  - fix: make sure the fetch url for localhost is `http` and NOT `https`
  - ✔️ `http://localhost:3000`
  - ❌ `https://localhost:3000`

Questions:

- prisma env(), how does this work? does it know .env from env.development.local?
- how to easily switch between dev and prod db environments

LOG
8/4/2023

- looked at everything for refactoring. main page could be refactored, but its mostly fine. Admin page is very messy, and needs cleaning. But would need to learn how to break it apart. Its dealing with fetch calls, state, UI, forms all at once. How to do all that but modularize it.
- otherwise, everything else looks okay!

8/9/2023

- auth user working. but it's not very performant. page flashing while it is loading. probably need to make a whole user signed in only page.
- chord pages working, and showing chord qualities. but not rendering yet. either, probably just wait until pages can be saved as a pdf, then load those pdf files. and or render the chords again. but wait until a refactor so the rendering function can be used easily.

[X] Supplemental pages for: Help about contact (try google forms?)

[x] User authentication log in, sign up
[x] Save chord page to user

8/9/2023

[x] user page, that shows chord pages
[x] on user chord page click
[x] make dynamic route chord pages
[x] show chords sheet on individual chord pages

8/17/2023

- merged auth branch
- added basic user cookie consent component
- needed to add the public publishable key for clerk, see layout

8/20/2023

- next run dev.... loads .env.development.local varialbles
- next run start.... loads .env.production.local varialbles
- duh
- process.env.NODE_ENV automatically reads which environment we are in. production or development. maybe test as well?

- for environ variables in vercel, don't use quotes. quotes okay for local env variables

[x] fix: https://quality-chords.vercel.app/chord-page/1

NEXT:

x - figure out prod, dev env variable switching

- Change page title, allow input

  - on hover, show box

- refactor!

TO DO LIST
Major:
[] Alternate same chord root voicing carousel
[] Remove, reorder shown chords via drag and drop? else buttons

[] chord diagram tones >>> forking svg chord library, manually configuring to allow tones
[] chord diagram remove nut

Minor:
[] chord page title naming
[] UI confirm on logged in user page save

[] Upgrade print functionality, only show chord page
[] stretch: render chords per chord page, wait for refactor though

Clean up:
[] Clean up admin CRUD UX/UI
[] optimize functions

Dev ops:
[] add TS  
[] add unit tests
