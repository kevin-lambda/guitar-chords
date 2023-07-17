/*
  Warnings:

  - You are about to drop the column `majorOrMinor` on the `ChordQuality` table. All the data in the column will be lost.
  - Added the required column `primary` to the `ChordQuality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChordQuality" DROP COLUMN "majorOrMinor",
ADD COLUMN     "primary" TEXT NOT NULL;
