// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// http request. await & json parse
// prisma query. await
// params. parseInt
// response. json type

// get, create
// by id: get, update, delete

export async function GET() {
  const allRecords = await prisma.chordQualityVoicing.findMany()
  return NextResponse.json(allRecords)
}

export async function POST(request, { params }) {
  const parseBody = await request.json()
  const newRecord = await prisma.chordQualityVoicing.create({ data: parseBody })
  return NextResponse.json(newRecord)
}
