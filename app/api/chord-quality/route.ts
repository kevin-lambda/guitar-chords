// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// http request method(request,{params}). await & parse
// model query. await
// return response. define json type
// params.id. parseint

// USERS
// get all, create
// by dynamic route id: get, delete, update
export async function GET() {
  const allRecords = await prisma.chordQuality.findMany({
    include: {
      baseChord: true,
      pages: true,
      chordQualityVoicing: true,
    },
  })
  return NextResponse.json(allRecords)
}

// handle all the body formatting on the frontend. just let the backend be simple
// since all the info is on the frontend anyway, handle it there
export async function POST(request) {
  const parseBody = await request.json()
  const newRecord = await prisma.chordQuality.create({ data: parseBody })
  return NextResponse.json(newRecord)
}
