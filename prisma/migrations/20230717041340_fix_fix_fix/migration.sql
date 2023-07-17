/*
  Warnings:

  - You are about to drop the column `primary` on the `ChordQuality` table. All the data in the column will be lost.
  - Added the required column `primaryQuality` to the `ChordQuality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChordQuality" DROP COLUMN "primary",
ADD COLUMN     "primaryQuality" TEXT NOT NULL,
ADD COLUMN     "qualityFormula" TEXT[];
