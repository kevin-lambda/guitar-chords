// @ts-nocheck

import ChordPage from "@/app/chord-page/page"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

//get post. delete, put, get single

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

// create a chord page
// and connect it to user
export async function PUT(request, { params }) {
  console.log("====== cleark user PUT =======")
  const userEmail = params.email

  const parseReq = await request.json()
  console.log("parseReq", parseReq)

  const theNumber = parseReq.newChordPageId

  const updateUser = await prisma.user.update({
    where: { email: userEmail },
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
