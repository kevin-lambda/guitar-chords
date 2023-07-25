#### lessons learned topics

- scaling, useState
- schemas, choosing data type and where to do the formatting (closer to where it is happening, not in the db api)
- workflow pattern, state to function to ui
- scaling, when larger project, harder keep all the data in head. so let typescript handle

#### to look into

- a cleaner way to seed data, probably use the nested create method
- cleaner form data
- figure out drop down menu best UX patterns, default value or instruction

**commit messages organization**

feat: //feature done
fix: //bug fix
mile: //milestone

**prisma modeling basics**

common types:

- Int
- String
- OtherModel
- Boolean
- DateTime
- ? // optional
- [] // list aka array

common attributes:

- @id
- @unique
- @default()
- @relation(fields:[] , references:[] ) //field = current model value to use, references = other model value to use

common functions:

- autoincrement()
- now()

common patterns:
id Int @id @default(autoincrement())
email String @unique
name String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
owner User @relation(fields:[ownerId] , references:[id])
ownerId Int

RELATIONS:
1:1 = User{Profile} ; Profile{User @relation(fields:[], references:[])}
1:m = User{Post[]} ; Post{User @relation(fields:[], references:[])}
m:m = Post{Category[]} ; Category{Post[]}

**prisma client common queries**

BASIC OPERATIONS:

- `findMany`
- `findUnique`
- `create`
- `delete`
- `update`
- `upsert` //if existing record, update. if no record, create

NESTED QUERIES:

- `create` // creates a related record
- `connect` // connects an existing related record by **ID** OR **UNIQUE** record
- `delete`
- `update`

- create example

```tsx
const user = await prisma.user.create({
  data: {
    email: "alice@prisma.io",
    profile: {
      create: { bio: "Hello World" },
    },
  },
})
```

- connect example by **ID** OR **UNIQUE** record

```tsx
const user = await prisma.profile.create({
  data: {
    bio: "Hello World",
    user: {
      connect: { email: "alice@prisma.io" },
    },
  },
})

const user = await prisma.profile.create({
  data: {
    bio: "Hello World",
    user: {
      connect: { id: 42 },
    },
  },
})
```

**seeding data**

CLI:

- To do a force reset seed & sync, which REMOVES all old records use `npx prisma db push --force-reset`
- **DO NOT** seed data with existing IDs, this will cause prisma to get confused later on.

SEEDING MODEL RELATIONS:
using an example owner and pet model for this section. `1 owner : m pets`

- `1:m` or `m:m` during seeding, models with many of something else do not need to have those many something elses defined. like owners can have many pets, do not need to define.

  - NO NEED

  ```tsx
  petsOwned Pet[]
  ```

- `1:1` during seeding, models belonging to a specific other model record needs to be defined. like a pet has one owner, must be defined.

  - NEED

  ```tsx
  myOwner Owner @relation(fields:[ownerId], references:[id])
  ownerId Int
  ```

- issue: seeding models with relation: if we don't seed with ids, how do we make relations with other model records if we dont know the id?
- resolve: 1. Seed to create the owners while creating the pets as a nested create (can get tricky with all the nesting if there are a lot of interconnections), 2. or seed in the correct order using the `connect` (more tedious, will need ids, but orderly).
- 1. Create owners and have a nested create pets at the same time.

  ```tsx
  const newOwner = await prisma.owner.create({
    data: {
      name: "owner 1",
      pets: {
        create: {
          petName: "cody",
          petType: "dog",
        },
      },
    },
  })
  ```

  1. Seeding in order. Will need ids ahead of time.

  ```tsx
  // this owner id will be 1
  const newOwner = await prisma.owner.create({
    data: {
      name: "owner 1",
    },
  })

  const newPets = await prisma.pet.create({
    data: {
      petName: "cody",
      petType: "dog",
      petOwner: {
        connect: [{ id: 1 }],
      },
    },
  })
  ```

**API reference, from backend to frontend**

BACKEND:

- HTTP requests: need to be **await** & **json parsed**. `request.json()`
- MODEL queries: need to be **await**.
- DYNAMIC ROUTES params: need to be **parse int**.
- HTTP RESPONSE: probably be **type json**. `NextResponse.json(data)`

FRONTEND:

- prevent default
- response = **await** `fetch(url, {method: "", body: JSON.stringify( object )})`
- parseResponse = **await** `response.json()`
- `setstate` as needed
- `useEffect` as needed

**STAR: DATA TYPES vs inputs**

problem:

- initially set a data type model as array of strings. because arrays are usually easier to work with for data with multiple things. But when it came to CRUD input for that data, how to input something as an array?
- that made me want to change the model into a string to match the input.

resolve:

- but then that made me realize a method. keep the data in the database in the easiest form to work with in the database. Then parse the data as needed in the code.
- keep database data in as "workable" format as possible. In the code format the data as needed.
- so I kept the model type as array of strings, then parsed the string into an array of strings in the code.

**STAR: SCALING FRONTEND CRUD UI**

problem: state and handlers. making a crud ui with many models with many inputs. if use separate setStates and event handlers to read those inputs would have like **30 setstates and event handlers**. Needed a better **scaling** solution for input state

resolve: use one input state and input event handler for each model. so **5** instead of **30**

STATE:

1. put the whole model object as the state initialized value. with `"" [] 0` for values as needed.
1. use object spread syntax and object key value overwriting

   - object spread syntax.

   ```js
   const obj1 = { key1: "abc", key2: 123 }

   const spreadObj1 = { ...obj1 } // => {key1: "abc" , key2: 123}
   const spreadObj2 = { ...obj1, key2: "overwrite" } // => {key1: "abc" , key2: "overwrite"}
   ```

1. With this method we can handle and update any single input change for an object. But how do we know what the key name is of the event? By giving the input element a `name` property and with `event.target.name` and `event.target.value`.

   - from the input we will get the object property it is changing
   - and the object property value it is changing
   - `[event.target.name]:event.target.value`

1. the input element will want to have these properties as well

- type, to define the input type
- **name**, this should the be `object keyname`, **exactly**
- value, this should the the `object.keyname`, to make it a controlled component
- placeholder, for UX
- onChange, to trigger event

```jsx
const [input, setInput] = useState({
  key1: 123,
  key2: "abc",
  key3: "xyz",
})

function handleInput(event) {
  setInput({ ...input, [event.target.name]: event.target.value })
}

;<form>
  <input
    type="text"
    name="key3"
    value={input.name}
    placeholder="type here"
    onChange={handleInput}
  ></input>
</form>
```

1. SPECIAL CASES - UI FORMS:

different UI form types will have different data. we'll need to handle the event data differently. so we cant use `event.target.value` for everything. We'll need to handle these different too, not just the UI part.

common form UI types properties:

- input type text - `value type name onChange`
- select - `value name onChange`
  - option - `value`
- input type radio - `type value name onChange`
- input type checkbox - `type name checked onChange`

examples:
input text

```jsx
<label>
  name:
  <input
    type="text"
    value={newChordPage.name}
    name="name"
    placeholder="my chord page 1"
    onChange={handleNewChordPage}
  ></input>
</label>
```

select option

```jsx
<select name="ownerId" onChange={handleNewChordPage}>
  {allUsers.map((e) => {
    return (
      <option value={e.id} key={e.id}>
        {e.email}
      </option>
    )
  })}
</select>
```

radio

```jsx
<div className="control">
  <label className="radio">
    <input
      type="radio"
      value="triad"
      name="chordSize"
      onChange={handleInputNewChordQuality}
    ></input>
    Triad
  </label>
</div>
```

checkbox

```jsx
<label className="mx-5">
  <input
    type="checkbox"
    name="isANoteOmitted"
    onChange={handleInputNewChordQualityVoicing}
    checked={newChordQualityVoicing.isANoteOmitted}
  ></input>
  isANoteOmitted
</label>
```

1. SPECIAL CASES - handleing:
   since we can have different event data coming in, OR data not in the right model format, we need to handle it.

- we can match the input type by checking for `event.target.name`. this will tell us what kind of input we are handeling.
- then we can set the data as needed, or format.

```jsx
function handleInput(event){
    // input is a string, but model needs int
    if(event.target.name === "needFormat"){
        const parseId = parseInt(event.target.value)
        setInput(...input, [event.target.name]: parseId)
    // input is a checkbox, need to get target.checked, and not target.value
    } else if(event.target.name === "needCheckValue"){
        const getBoolean = event.target.checked
        setInput(...input, [event.target.name]: getBoolean)
    // otherwise, normal cases
    } else{
        setInput(...input, [event.target.name]: event.target.value)
    }
}
```

== notes - this is still kinda messy, probably could use refactoring.

**form UI select, default value for select**

- if select options is a controlled component, via `value={state}`
- and we want to set a default value for the select, because if the user is on the first option and wants that option, then submits without changing. No event is triggered due to onChange prop.
- so we probably want a default value matching the first option
- to set a default value, go back to the state initialize and set the default select value there.

- this probably is not best practice. figure out drop down menu best UX patterns.
