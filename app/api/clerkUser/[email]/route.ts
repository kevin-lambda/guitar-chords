// @ts-nocheck

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// prisma query returns null if find fails
export async function GET(request, { params }) {
  const userEmail = params.email
  const singleUser = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      pages: true,
    },
  })
  return NextResponse.json(singleUser)
}

export async function PUT(request, { params }) {
  const parseReq = await request.json()

  const clerkUserEmail = params.email
  const theNumber = parseReq.newChordPageId

  const updateUser = await prisma.user.update({
    where: { email: clerkUserEmail },
    data: {
      pages: {
        connect: {
          id: theNumber,
        },
      },
    },
  })

  return NextResponse.json(updateUser)
}
