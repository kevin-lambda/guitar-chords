-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "noteFormula" INTEGER[],
    "noteOptional" INTEGER[],

    CONSTRAINT "Chord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChordVoicing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "frets" INTEGER[],
    "fretTones" TEXT[],
    "rootString" INTEGER NOT NULL,
    "isANoteOmitted" BOOLEAN NOT NULL,
    "isMovable" BOOLEAN NOT NULL,
    "chordId" INTEGER NOT NULL,

    CONSTRAINT "ChordVoicing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChordPage" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "ChordPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChordToChordPage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ChordToChordPage_AB_unique" ON "_ChordToChordPage"("A", "B");

-- CreateIndex
CREATE INDEX "_ChordToChordPage_B_index" ON "_ChordToChordPage"("B");

-- AddForeignKey
ALTER TABLE "ChordVoicing" ADD CONSTRAINT "ChordVoicing_chordId_fkey" FOREIGN KEY ("chordId") REFERENCES "Chord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChordPage" ADD CONSTRAINT "ChordPage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChordToChordPage" ADD CONSTRAINT "_ChordToChordPage_A_fkey" FOREIGN KEY ("A") REFERENCES "Chord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChordToChordPage" ADD CONSTRAINT "_ChordToChordPage_B_fkey" FOREIGN KEY ("B") REFERENCES "ChordPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
