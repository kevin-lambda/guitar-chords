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
    id: 1,
    qualityName: "Major",
    qualityFormula: ["1", "3", "5"],
    optionalNote: [""],
    primaryQuality: "Major",
    isTriad: true,
    isSeventh: false,
    isExtended: false,
  },
  {
    id: 2,
    qualityName: "Minor",
    qualityFormula: ["1", "b3", "5"],
    optionalNote: [""],
    primaryQuality: "Minor",
    isTriad: true,
    isSeventh: false,
    isExtended: false,
  },
  //   {
  //     id: 3,
  //     qualityName: "Dominant 7th",
  //     qualityFormula: ["1", "3", "5", "b7"],
  //     optionalNote: ["5"],
  //     primaryQuality: "Dominant",
  //     isSeventh: true,
  //     isExtended: false,
  //   },
  //   {
  //     id: 4,
  //     qualityName: "Major 7th",
  //     qualityFormula: ["1", "3", "5", "7"],
  //     optionalNote: ["5"],
  //     primaryQuality: "Major",
  //     isSeventh: true,
  //     isExtended: false,
  //   },
  //   {
  //     id: 5,
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
    id: 1,
    name: "Major, 6th string, standard",
    frets: ["1", "3", "3", "2", "1", "1"],
    fretTones: ["1", "5", "1", "3", "5", "1"],
    rootString: 6,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 1,
  },
  {
    id: 2,
    name: "Major, 5th string, standard",
    frets: ["X", "1", "3", "3", "3", "1"],
    fretTones: ["X", "1", "5", "1", "3", "1"],
    rootString: 5,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 1,
  },
  {
    id: 3,
    name: "Minor, 6th string, standard",
    frets: ["1", "3", "3", "1", "1", "1"],
    fretTones: ["1", "5", "1", "b3", "5", "1"],
    rootString: 6,
    isANoteOmitted: false,
    isMovable: true,
    chordQualityId: 2,
  },
  {
    id: 4,
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
    id: 1,
    name: "Am",
    noteFormula: ["A", "C", "E"],
    rootNote: "A",
    rootNoteStrings: ["5", "0", "7", "2", "10", "5"],
    chordQualityId: 2,
  },
  {
    id: 2,
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
    id: 3,
    name: "G",
    noteFormula: ["G", "B", "D"],
    rootNote: "G",
    rootNoteStrings: ["3", "10", "5", "0", "8", "3"],
    chordQualityId: 1,
  },
]

const userSeed = [
  { id: 1, email: "apple@a.com", password: 1234 },
  { id: 2, email: "banana@a.com", password: 1234 },
  { id: 3, email: "carrot@a.com", password: 1234 },
]

// each page unique to one user
const chordPageBank = [
  {
    id: 1,
    name: "my chord page 1. Am, B",
    chords: [chordBank[0], chordBank[1]],
    ownerId: 1,
  },
  {
    id: 2,
    name: "my chord page 2. Am, B",
    chords: [chordBank[0], chordBank[1]],
    ownerId: 1,
  },
  {
    id: 3,
    name: "my chord page 3, B, G",
    chords: [chordBank[1], chordBank[2]],
    ownerId: 2,
  },
  {
    id: 4,
    name: "my chord page 4, Am, G",
    chords: [chordBank[0], chordBank[2]],
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
  const chordQualities = await prisma.chordQuality.createMany({
    data: seedData.chordQualityBank,
  })
  console.log({ chordQualities })

  const chordVoicings = await prisma.chordQualityVoicing.createMany({
    data: seedData.chordQualityVoicingBank,
  })
  console.log({ chordVoicings })

  const chords = await prisma.chord.createMany({
    data: seedData.chordBank,
  })
  console.log({ chords })

  const users = await prisma.user.createMany({
    data: seedData.userSeed,
  })
  console.log({ users })

  const pages = await prisma.chordPage.createMany({
    data: seedData.chordPageBank,
  })
  console.log({ pages })
}

seedDb(seedData)
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
