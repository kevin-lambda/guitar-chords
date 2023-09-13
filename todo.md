!!!!!!
9/12/2023 continue from

- app/page line 113
- svgchord line 37

===================================================

- work on the react-chords package in here, to see changes immediately
- then once working, change the custom local repo react-chords to match
- then make sure the custom local repo uploads to github
- then figure out how to install that new updated github version as dependency. (might already be happening, see packagejson)

9/12

- this seems to work for installing npm package as dep from github
  CLI: `npm install --save kevin-lambda/react-chords#main`

resulted in
// package.json
"@tombatossals/react-chords": "github:kevin-lambda/react-chords#main",
somehow it knew the orginal npm package name. beacuse in the actual files... the name is
`"name": "@tombatossals/react-chords",`

---

TO UPDATE npm dep from github
!!! need to do CLI: `npm install --save kevin-lambda/react-chords#main`
NOTES

- src is the source code.
- BUT lib is the compiled code, that is actually used.

- this means, src could be totally deleted, and the svg would still work, at least temporarily. because the lib still exists.

////

- process. yes. works
- edit src
- make sure package has dependencies installed. aka npm install in that package directory
- `npm run build` to compile src, it will output a lib folder

//

react props

- if a value is true, then pass prop
- "short circuit evaluation",
  `<aComponent prop1={ifIamTruthy && thenIWillBePassedAsAProp}>`

// so you got it working in the test environment, with the bable build process, as NOT a node module.
but it isn't working in the full nextjs environment as a node module.

- its likely node module changes after first installation are ignored because they aren't supposed to change often
- the dev mode or build likely compiles and then CACHES a built version of each node module.

- so in the case we want to change something in node modules, we need to DELETE the cache.

STEPS

- make changes as needed to node modules
- DELETE /.next
- `npm run build`

- now changes made in the node modules should be reflected and updating

=====================================
DEV vs PROD reminder:

- change prisma/schema.prisma. database url

=====================================

tbd notes

- !!! to update custom reactchords package, need to use `npm update`

=====================================

REFACTOR TODO LIST on 2nd pass
[later] component/navbar dedicated signed in/out navbar. instead of conditional rendering. page flashing
[later] change functionality on admin page
[later] change functionality on admin dynamic id pages

look into
[later] how to change prisma schema without deleting db data
[later] modularized fetches
[later] api error scaled handling

=====================================
