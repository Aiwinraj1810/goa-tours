import { NextResponse } from "next/server"

type Enquiry = {
  id: string
  name: string
  email: string
  phone: string
  people: number
  startDate: string
  endDate: string
  message?: string
  createdAt: string
}

const store: Enquiry[] = []

export async function GET() {
  return NextResponse.json(store)
}

export async function POST(req: Request) {
  const body = await req.json()
  const required = ["name", "email", "phone", "people", "startDate", "endDate"]
  for (const k of required) {
    if (!body?.[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 })
  }
  const emailOk = /\S+@\S+\.\S+/.test(body.email)
  if (!emailOk) return NextResponse.json({ error: "Invalid email" }, { status: 400 })

  const item: Enquiry = {
    id: crypto.randomUUID(),
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    people: Number(body.people),
    startDate: String(body.startDate),
    endDate: String(body.endDate),
    message: body.message ? String(body.message) : undefined,
    createdAt: new Date().toISOString(),
  }
  store.unshift(item)
  return NextResponse.json(item, { status: 201 })
}
