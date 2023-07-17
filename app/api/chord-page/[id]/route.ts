// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// get single, update, delete

export async function GET(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chordPage.findUnique({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function PUT(request, { params }) {
  const parseId = parseInt(params.id)
  const parseBody = await request.json()
  const singleRecord = await prisma.chordPage.update({
    where: { id: parseId },
    data: parseBody,
  })
  return NextResponse.json(singleRecord)
}

export async function DELETE(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chordPage.delete({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}
