// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// http request. await & parse.json
// params. parseInt
// model query. await
// response. type json

// all get, create
// by id. get , update, delete

export async function GET(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chordQualityVoicing.findUnique({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function PUT(request, { params }) {
  const parseId = parseInt(params.id)
  const parseBody = await request.json()
  const singleRecord = await prisma.chordQualityVoicing.update({
    where: { id: parseId },
    data: parseBody,
  })
  return NextResponse.json(singleRecord)
}

export async function DELETE(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chordQualityVoicing.delete({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}
