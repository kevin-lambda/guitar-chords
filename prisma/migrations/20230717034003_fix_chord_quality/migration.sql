/*
  Warnings:

  - You are about to drop the column `baseChordId` on the `ChordQuality` table. All the data in the column will be lost.
  - Added the required column `chordQualityId` to the `Chord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChordQuality" DROP CONSTRAINT "ChordQuality_baseChordId_fkey";

-- DropIndex
DROP INDEX "ChordQuality_baseChordId_key";

-- AlterTable
ALTER TABLE "Chord" ADD COLUMN     "chordQualityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ChordQuality" DROP COLUMN "baseChordId";

-- AddForeignKey
ALTER TABLE "Chord" ADD CONSTRAINT "Chord_chordQualityId_fkey" FOREIGN KEY ("chordQualityId") REFERENCES "ChordQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
