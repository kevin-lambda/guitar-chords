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

TO DO LIST
[] Supplemental pages for: Help about contact (try google forms?)
[] chord page title naming

[] chord diagram tones >>> forking svg chord library, manually configuring to allow tones
[] chord diagram remove nut

[] User authentication log in, sign up
[] User profile page
[] Save chord page to user

[] Alternate same chord root voicing carousel
[] add alternate same chord root voicings

[] Remove, reorder shown chords via drag and drop? else buttons

[] Upgrade print functionality, only show chord page
[] Clean up admin CRUD UX/UI

[] optimize functions  
[] add TS  
[] add unit tests
