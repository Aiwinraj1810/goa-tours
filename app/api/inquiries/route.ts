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

// Basic abuse protection: a small per-IP rate limit. This lives in memory, so it
// resets on restart and is per server instance; it is a first line of defence,
// not a replacement for a CAPTCHA or an edge/WAF rule.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function GET() {
  return NextResponse.json(store)
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  // Only limit clients we can identify; without an IP we would throttle everyone together.
  if (ip !== "unknown" && isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again in a few minutes." },
      { status: 429 },
    )
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field. Pretend it worked so
  // bots get no signal, but store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

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
