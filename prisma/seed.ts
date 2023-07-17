// todo make seed file

// @ts-nocheck

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// prisma data create here
const userSeed = [
  { email: "apple@a.com" },
  { email: "banana@a.com" },
  { email: "carrot@a.com" },
]

const seedData = { userSeed }

async function seedDb(seedData) {
  const users = await prisma.user.createMany({
    data: seedData.userSeed,
  })
  console.log({ users })
}

seedDb(seedData)
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
