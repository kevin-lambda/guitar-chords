// @ts-nocheck

// MODEL RELATIONSHIPS
// 1 User : M ChordPages. One user can have many pages
// 1 Chord : M ChordVoicings. One chord can have many voicings
// 1 ChordQuality : M Chords. 1 chord quality can belong/have to many chords
// M Chords : M pages. many chords are on many pages

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// each chord quality can go to many chords
const chordQualityBank = [
  {
    qualityName: "Major",
    qualityFormula: ["1", "3", "5"],
    optionalNote: ["null"],
    primaryQuality: "Major",
    isTriad: true,
    isSeventh: false,
    isExtended: false,
  },
  {
    qualityName: "Minor",
    qualityFormula: ["1", "b3", "5"],
    optionalNote: ["null"],
    primaryQuality: "Minor",
    isTriad: true,
    isSeventh: false,
    isExtended: false,
  },
  //   {
  //     qualityName: "Dominant 7th",
  //     qualityFormula: ["1", "3", "5", "b7"],
  //     optionalNote: ["5"],
  //     primaryQuality: "Dominant",
  //     isSeventh: true,
  //     isExtended: false,
  //   },
  //   {
  //     qualityName: "Major 7th",
  //     qualityFormula: ["1", "3", "5", "7"],
  //     optionalNote: ["5"],
  //     primaryQuality: "Major",
  //     isSeventh: true,
  //     isExtended: false,
  //   },
  //   {
  //     qualityName: "Minor 7th",
  //     qualityFormula: ["1", "b3", "5", "b7"],
  //     optionalNote: ["5"],
  //     primaryQuality: "Minor",
  //     isSeventh: true,
  //     isExtended: false,
  //   },
]

// fretting relative to root. where 1 is root across
const chordQualityVoicingBank = [
  {
    name: "Major, 6th string, standard",
    frets: ["1", "3", "3", "2", "1", "1"],
    fretTones: ["1", "5", "1", "3", "5", "1"],
    rootString: 6,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 1,
  },
  {
    name: "Major, 5th string, standard",
    frets: ["X", "1", "3", "3", "3", "1"],
    fretTones: ["X", "1", "5", "1", "3", "1"],
    rootString: 5,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 1,
  },
  {
    name: "Minor, 6th string, standard",
    frets: ["1", "3", "3", "1", "1", "1"],
    fretTones: ["1", "5", "1", "b3", "5", "1"],
    rootString: 6,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 2,
  },
  {
    name: "Minor, 5th string, standard",
    frets: ["X", "1", "3", "3", "2", "1"],
    fretTones: ["X", "1", "5", "1", "b3", "1"],
    rootString: 5,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 2,
  },
]

// each chord can go anywhere

// todo make rootNoteStrings a table

const chordBank = [
  {
    name: "Am",
    noteFormula: ["A", "C", "E"],
    rootNote: "A",
    rootNoteStrings: ["5", "0", "7", "2", "10", "5"],
    chordQualityId: 2,
  },
  {
    name: "B",
    noteFormula: ["B", "D#", "F#"],
    rootNote: "B",
    rootNoteStrings: ["7", "2", "9", "4", "0", "7"],
    chordQualityId: 1,
  },
  //   { name: "C7", noteFormula: ["C", "E", "G", "Bb"] },
  //   { name: "Dm7", noteFormula: ["D", "F", "A", "C"] },
  //   { name: "Emaj7", noteFormula: ["E", "G#", "B", "D#"] },
  //   { name: "F7", noteFormula: ["F", "A", "C", "Eb"] },
  {
    name: "G",
    noteFormula: ["G", "B", "D"],
    rootNote: "G",
    rootNoteStrings: ["3", "10", "5", "0", "8", "3"],
    chordQualityId: 1,
  },
]

const userSeed = [
  { email: "apple@a.com", password: "1234" },
  { email: "banana@a.com", password: "1234" },
  { email: "carrot@a.com", password: "1234" },
]

// each page unique to one user
const chordPageBank = [
  {
    name: "my chord page 1. Am, B",
    // chords: [chordBank[0], chordBank[1]],
    ownerId: 1,
  },
  {
    name: "my chord page 2. Am, B",
    // chords: [chordBank[0], chordBank[1]],
    ownerId: 1,
  },
  {
    name: "my chord page 3, B, G",
    // chords: [chordBank[1], chordBank[2]],
    ownerId: 2,
  },
  {
    name: "my chord page 4, Am, G",
    // chords: [chordBank[0], chordBank[2]],
    ownerId: 2,
  },
]

const seedData = {
  chordQualityBank,
  chordQualityVoicingBank,
  chordBank,
  userSeed,
  chordPageBank,
}

async function seedDb(seedData) {
  try {
    const chordQualities = await prisma.chordQuality.createMany({
      data: seedData.chordQualityBank,
    })
    console.log({ chordQualities })
  } catch (error) {
    console.log(error)
  }
  try {
    const chordVoicings = await prisma.chordQualityVoicing.createMany({
      data: seedData.chordQualityVoicingBank,
    })
    console.log({ chordVoicings })
  } catch (error) {
    console.log(error)
  }
  try {
    const chords = await prisma.chord.createMany({
      data: seedData.chordBank,
    })
    console.log({ chords })
  } catch (error) {
    console.log(error)
  }
  try {
    const users = await prisma.user.createMany({
      data: seedData.userSeed,
    })
    console.log({ users })
  } catch (error) {
    console.log(error)
  }
  try {
    const pages = await prisma.chordPage.createMany({
      data: seedData.chordPageBank,
    })
    console.log({ pages })
  } catch (error) {
    console.log(error)
  }

  try {
    // chord by quality
    const updateChordPage1 = await prisma.chordPage.update({
      where: { id: 1 },
      data: {
        chordsByQuality: {
          connect: [{ id: 1 }],
        },
      },
      include: {
        chordsByQuality: true,
      },
    })
    console.log(updateChordPage1)

    const updateChordPage2 = await prisma.chordPage.update({
      where: { id: 1 },
      data: {
        chordsByQuality: {
          connect: [{ id: 2 }],
        },
      },
      include: {
        chordsByQuality: true,
      },
    })
    console.log(updateChordPage2)

    // chord by note
    const updateChordPage3 = await prisma.chordPage.update({
      where: { id: 1 },
      data: {
        chordsByNote: {
          connect: [{ id: 1 }],
        },
      },
      include: {
        chordsByNote: true,
      },
    })
    console.log(updateChordPage3)
    const updateChordPage4 = await prisma.chordPage.update({
      where: { id: 1 },
      data: {
        chordsByNote: {
          connect: [{ id: 2 }],
        },
      },
      include: {
        chordsByNote: true,
      },
    })
    console.log(updateChordPage4)
    const updateChordPage5 = await prisma.chordPage.update({
      where: { id: 4 },
      data: {
        chordsByNote: {
          connect: [{ id: 1 }],
        },
      },
      include: {
        chordsByNote: true,
      },
    })
    console.log(updateChordPage5)
  } catch (error) {
    console.log(error)
  }
}

seedDb(seedData)
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
