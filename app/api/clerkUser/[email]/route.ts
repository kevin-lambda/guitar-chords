// @ts-nocheck

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
