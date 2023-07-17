-- CreateTable
CREATE TABLE "ChordQuality" (
    "id" SERIAL NOT NULL,
    "quality" TEXT NOT NULL,
    "majorOrMinor" TEXT NOT NULL,
    "isSeventh" BOOLEAN NOT NULL,
    "isExtended" BOOLEAN NOT NULL,
    "baseChordId" INTEGER NOT NULL,

    CONSTRAINT "ChordQuality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChordQuality_baseChordId_key" ON "ChordQuality"("baseChordId");

-- AddForeignKey
ALTER TABLE "ChordQuality" ADD CONSTRAINT "ChordQuality_baseChordId_fkey" FOREIGN KEY ("baseChordId") REFERENCES "Chord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
