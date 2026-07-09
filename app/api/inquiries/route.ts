import { NextResponse } from "next/server"
// TODO: Uncomment the line below once RESEND_API_KEY is added to .env.local
// import { sendEnquiryEmails } from "@/lib/mailer"

type Enquiry = {
  id: string
  name: string
  email: string
  phone: string
  people: number
  startDate: string
  endDate: string
  message?: string
  packageName?: string
  destination: "goa" | "kerala"
  createdAt: string
}

const store: Enquiry[] = []

export async function GET() {
  return NextResponse.json(store)
}

export async function POST(req: Request) {
  const body = await req.json()
  const required = ["name", "email", "phone", "people", "startDate", "endDate", "destination"]
  for (const k of required) {
    if (!body?.[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 })
  }

  const emailOk = /\S+@\S+\.\S+/.test(body.email)
  if (!emailOk) return NextResponse.json({ error: "Invalid email" }, { status: 400 })

  const validDestinations = ["goa", "kerala"]
  if (!validDestinations.includes(body.destination)) {
    return NextResponse.json({ error: "Invalid destination" }, { status: 400 })
  }

  const item: Enquiry = {
    id: crypto.randomUUID(),
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    people: Number(body.people),
    startDate: String(body.startDate),
    endDate: String(body.endDate),
    message: body.message ? String(body.message) : undefined,
    packageName: body.packageName ? String(body.packageName) : undefined,
    destination: body.destination as "goa" | "kerala",
    createdAt: new Date().toISOString(),
  }
  store.unshift(item)

  // TODO: Uncomment once RESEND_API_KEY is in .env.local and domain DNS is verified
  // Subject will be: `New ${item.destination} Enquiry — ${item.name}`
  // await sendEnquiryEmails(item)

  return NextResponse.json(item, { status: 201 })
}
