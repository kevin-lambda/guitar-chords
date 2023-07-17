// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// get single , update, delete

export async function GET(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chord.findUnique({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function DELETE(request, { params }) {
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chord.delete({
    where: { id: parseId },
  })
  return NextResponse.json(singleRecord)
}

export async function PUT(request, { params }) {
  const parseBody = await request.json()
  const parseId = parseInt(params.id)
  const singleRecord = await prisma.chord.update({
    where: { id: parseId },
    data: parseBody,
  })
  return NextResponse.json(singleRecord)
}
