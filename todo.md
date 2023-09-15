react to print

PART 1: making the reference

- make a useRef instance
  `const theReference = useRef()`
- attach that useRef instance to the thing we want to print. a component or html-like jsx
  `<div ref={theReference}>{all the content we want to print}</div>`

- if the thing we want to print is a react component. like this `<Navbar />`. we have to do an extra step
- in the component we want to print, it must be a functional component. Go to that component source and make it a functional component. so not a regular function with a jsx return
- `const Navbar = forwardRef((props,ref)=>{ return <nav ref={ref}> {all the navbar stuff} </nav>})`
- remember to export it `ecport default Navbar`

//

- have something that can print, doesn't need to be a pdf
- be able to save that print
- print only the relevant parts. just chord diagrams

PART 2: the print function

- `import ReactToPrint from "react-to-print"`
- somewhere? add the printing component with properties

```jsx
<ReactToPrint
  trigger={() => <button>PRINT ME</button>}
  content={() => targetComponentPrint.current}
/>
```

=====================================
DEV vs PROD reminder:

- change prisma/schema.prisma. database url

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
