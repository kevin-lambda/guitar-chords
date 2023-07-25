# Quality Chords

Database of guitar chord shapes by quality generated as chord diagrams.

![cover-page](./public/cover.jpg)
![admin](./public/admin.jpg)

## About

Renders guitar chord shapes by chord quality, and organized by root string. Features an admin console with full CRUD operations on all data. Five database model schema for future integrations of users, pages, by note chords.

Developer journal write up [here](https://github.com/kevin-lambda/kevin-lambda/blob/main/dev_log.md#quality-chords)

## Key Technology

- Next.js 13
- Bulma css
- @tombatossals/react-chords

## Acknowledgements

[David Rubert](https://github.com/tombatossals) react chord svg renderer library

## CHANGE LOG

_July 24 2023: version 0.1.0_  
Features:

- Render svg chord diagrams by quality, toggle by root string
- Basic chord database ~20 chord voicings
- Database architecture of 5 schemas prepped for implementing users, chord pages, chord by note
- Password protected admin console with full CRUD actions over all model records
- Basic browser window print

Feature pipeline:  
[] Supplemental pages for: Help about contact  
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
