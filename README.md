7/16/2023 300pm start

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
