/*
  Warnings:

  - You are about to drop the column `quality` on the `ChordQuality` table. All the data in the column will be lost.
  - Added the required column `qualityName` to the `ChordQuality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChordQuality" DROP COLUMN "quality",
ADD COLUMN     "qualityName" TEXT NOT NULL;
