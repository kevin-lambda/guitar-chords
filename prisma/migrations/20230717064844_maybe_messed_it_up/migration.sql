-- CreateTable
CREATE TABLE "_ChordPageToChordQuality" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChordPageToChordQuality_AB_unique" ON "_ChordPageToChordQuality"("A", "B");

-- CreateIndex
CREATE INDEX "_ChordPageToChordQuality_B_index" ON "_ChordPageToChordQuality"("B");

-- AddForeignKey
ALTER TABLE "_ChordPageToChordQuality" ADD CONSTRAINT "_ChordPageToChordQuality_A_fkey" FOREIGN KEY ("A") REFERENCES "ChordPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChordPageToChordQuality" ADD CONSTRAINT "_ChordPageToChordQuality_B_fkey" FOREIGN KEY ("B") REFERENCES "ChordQuality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
