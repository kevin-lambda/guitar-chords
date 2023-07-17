/*
  Warnings:

  - You are about to drop the column `noteOptional` on the `Chord` table. All the data in the column will be lost.
  - You are about to drop the `ChordVoicing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rootNote` to the `Chord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChordVoicing" DROP CONSTRAINT "ChordVoicing_chordId_fkey";

-- AlterTable
ALTER TABLE "Chord" DROP COLUMN "noteOptional",
ADD COLUMN     "rootNote" TEXT NOT NULL,
ADD COLUMN     "rootNoteStrings" TEXT[];

-- DropTable
DROP TABLE "ChordVoicing";

-- CreateTable
CREATE TABLE "ChordQualityVoicing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "frets" TEXT[],
    "fretTones" TEXT[],
    "rootString" INTEGER NOT NULL,
    "isANoteOmitted" BOOLEAN NOT NULL,
    "isMovable" BOOLEAN NOT NULL,
    "chordQualityId" INTEGER NOT NULL,

    CONSTRAINT "ChordQualityVoicing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChordQualityVoicing" ADD CONSTRAINT "ChordQualityVoicing_chordQualityId_fkey" FOREIGN KEY ("chordQualityId") REFERENCES "ChordQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
