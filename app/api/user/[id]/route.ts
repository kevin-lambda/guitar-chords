// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// http request, parse and await
// model query, await
// params, parseInt
// response, type NextResponse.json(data)

// USERS
// get all, create
// by dynamic route id: get, delete, update
export async function GET(request, { params }) {
  const userId = parseInt(params.id)
  const singleUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      pages: true,
    },
  })
  return NextResponse.json(singleUser)
}

export async function DELETE(request, { params }) {
  const userId = parseInt(params.id)
  const singleUser = await prisma.user.delete({
    where: { id: userId },
  })
  return NextResponse.json(singleUser)
}

export async function PUT(request, { params }) {
  const userId = parseInt(params.id)
  const parseBody = await request.json()

  const singleUser = await prisma.user.update({
    where: { id: userId },
    data: parseBody,
  })
  return NextResponse.json(singleUser)
}
