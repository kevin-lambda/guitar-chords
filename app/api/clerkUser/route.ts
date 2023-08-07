// @ts-nocheck

// search db by clerk email

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const allUsers = await prisma.user.findMany()
  return NextResponse.json(allUsers)
}

export async function POST(request) {
  const parseBody = await request.json()
  const newUser = await prisma.user.create({ data: parseBody })
  return NextResponse.json(newUser)
}
