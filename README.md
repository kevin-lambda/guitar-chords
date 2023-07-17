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
1:1 = User{Profile} ; Profile{User @relation(field:[], references:[])}
1:m = User{Post[]} ; Post{User @relation(field:[], references:[])}
m:m = Post{Category[]} ; Category{Post[]}

1 User : M pages
M chords : M pages
