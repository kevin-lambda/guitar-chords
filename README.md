//////////write up sections

- prisma model basics
- relations
- seed data
  - creating record with related records. include syntax
  - m:m records, make separately, then CONNECT. include syntax

\*\*\* SEEDING & ID: dont seed data with ids. just let prisma take care of it all. otherwise there will be errors when trying to create later
SEEDING: resets and schema syncs the db. REMOVES ALL RECORDS `npx prisma db push --force-reset`

commit messages types:
feat:
fix:
mile:

### API cheatsheet

```tsx
export async function PUT(request, { params }) {
  const parseBody = await request.json()
  const parseId = parseInt(params.id)
  const updatedUser = await prisma.user.update({
    where: {
      id: parseId,
    },
    data: parseBody,
  })
  return NextResponse.json(updatedUser)
}
```

BACKEND

- HTTP requests: need to be **await** & **json parsed**. `request.json()`
- MODEL queries: need to be **await**.
- DYNAMIC ROUTES params: need to be **parse int**.
- HTTP RESPONSE: probably be **type json**. `NextResponse.json(data)`

### front end fetch

on event

- prevent default
- response = await fetch(url, {method: "", body: JSON.stringify( object )})
- parseResponse = await response.json()
- setstate as needed

=================================================

7/16/2023 300pm start
7/17 930am start

- prisma model
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

seed data:

- when making seed data, model relations that can have many of a model don't need to define those things. it can have many.
- when making an instance of a model with a field that must have one owner, it must be defined at that time.

so...
// NO NEED define
pages ChordPage[]

// YES NEED define. by giving chordQualityId an Id
chordQuality ChordQuality @relation(fields:[chordQualityId],references:[id])
chordQualityId Int

////////////////
big brain time

- okay theres create read(find) update delete. but these only are the top level actions. such as crud owner details. or crud pet details.

- we know about include. which can return all the things an owner owns.

// ???

- but what about giving an owner an existing pet? >>>> connect, under an update query. data:{model:{connect ARRAYofOBJECTS}}
- or what about creating an owner with new pets at the same time? >>>> create, under a create query. data:{model:{create ARRAYofOBJECTS}}.

  - prisma should know to create ids automatically as defined. and
  - prisma should know that the nested create will belong to that record...

- probably for what we're trying to do here. it is best to create the model records separately, then connect. because we'd be trying to track down ids and stuff.

//////////////////

admin UI

7/18
needing to adjust schema after starting to implement things.

- quality formula was array of strings, so it would be easier to work with later.
  ["1", "3", "5"],
  - but to create it via UI, would need to have a bunch of inputs for separate element. input 1 ; input 3 ; input 5
  - ACTUALLY, can just input it as a string, but with spaces. 1 3 5. then parse it on the frontend into an array of strings, which would save into db.
    !

problem: SCALING
desc: having a bunch of object properties to create. many inputs. dont want to make a setstate for each one. so trying to handle all inputs on one setstate
handleing multiple inputs on one setstate

- learning about spread operator object with setstate. started writing it out,

- spread syntax. {...obj1, ...obj2} will spread out the properties of both objects, then combine to one object.
  This can work with single properties too. { ...obj1, prop9: "value"}

  // e.target.name is from the input, and MATCHES an existing property in the object. name must exactly match the obj property
  // then as the onchange happens, we get a new value. e.target.value

  // onchange we set a new state, this state is the previous state in spread syntax.
  // BUT with a new property. In this case e.target.name matches an existing property and will overwrite the old prop value

  // so we update just that state

  // key things: name property in input, controlled input component with value prop, onChange handler with spread and additional syntax
