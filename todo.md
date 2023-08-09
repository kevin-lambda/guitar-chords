MEGA reminder:

- WHILE in dev mode
  - schema.prisma datasource db is toggled to use env("DATABASE_URL"), while is DEV mode postgres db. local
  - app/page.tsx is fetching localhost domain_link
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING
- SWITCH BOTH BACK BEFORE PUSHING

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

TO DO LIST
[X] Supplemental pages for: Help about contact (try google forms?)
[] chord page title naming

[] chord diagram tones >>> forking svg chord library, manually configuring to allow tones
[] chord diagram remove nut

[x] User authentication log in, sign up
[x] Save chord page to user

[x] user page, that shows chord pages
[] on user chord page click
[] make dynamic route chord pages
[] render chords sheet on individual chord pages

[] Alternate same chord root voicing carousel
[] add alternate same chord root voicings

[] Remove, reorder shown chords via drag and drop? else buttons

[] Upgrade print functionality, only show chord page
[] Clean up admin CRUD UX/UI

[] optimize functions  
[] add TS  
[] add unit tests
