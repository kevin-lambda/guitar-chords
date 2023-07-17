/*
  Warnings:

  - Added the required column `isTriad` to the `ChordQuality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChordQuality" ADD COLUMN     "isTriad" BOOLEAN NOT NULL;
