//////////write up sections

- prisma model basics
- relations
- seed data
  - creating record with related records. include syntax
  - m:m records, make separately, then CONNECT. include syntax

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
