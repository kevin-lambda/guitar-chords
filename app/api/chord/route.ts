// @ts-nocheck

// imports
// http request. await and parse
// params. parseint
// model query. await
// response. json type

// get all, create
// by id. get, update, delete

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const allRecords = await prisma.chord.findMany()
  return NextResponse.json(allRecords)
}

export async function POST(request, { params }) {
  const parseBody = await request.json()
  const newRecord = await prisma.chord.create({ data: parseBody })
  return NextResponse.json(newRecord)
}
