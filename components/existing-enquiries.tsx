"use client"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function ExistingEnquiries() {
  const { data, isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async (): Promise<Enquiry[]> => {
      const res = await api.get("/api/inquiries")
      return res.data
    },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Recent Enquiries</h2>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid gap-3">
          {(data ?? []).slice(0, 5).map((e) => (
            <Card key={e.id} className="bg-card">
              <CardHeader>
                <CardTitle className="text-base">
                  {e.name} • {e.people} people
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {e.startDate} → {e.endDate} • {e.email} • {e.phone}
                {e.message ? <div className="mt-1">{e.message}</div> : null}
              </CardContent>
            </Card>
          ))}
          {(data ?? []).length === 0 && <p className="text-muted-foreground">No enquiries yet.</p>}
        </div>
      )}
    </div>
  )
}
