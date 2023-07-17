// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// get all, create
// id, get, update, delete

export async function GET() {
  const allRecords = await prisma.chordPage.findMany()
  return NextResponse.json(allRecords)
}

export async function POST(request, { params }) {
  const parseBody = await request.json()
  const singleRecord = await prisma.chordPage.create({
    data: parseBody,
  })
  return NextResponse.json(singleRecord)
}
