// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// http request, await and parse.json request
// model query, await
// params.id, parseint
// response, response.json type

// all route. get create
// id route. get update delete

export async function GET(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chordQuality.findUnique({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function DELETE(request, { params }) {
  const parseId = parseInt(params.id)

  const singleRecord = await prisma.chordQuality.delete({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function PUT(request, { params }) {
  const parseId = parseInt(params.id)
  const parseBody = await request.json()

  const singleRecord = await prisma.chordQuality.update({
    where: { id: parseId },
    data: parseBody,
  })
  return NextResponse.json(singleRecord)
}
