"use client"
import { useForm, Controller } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type Enquiry = {
  name: string
  email: string
  phone: string
  people: number
  startDate: string
  endDate: string
  message?: string
}

export default function EnquiryForm() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { control, handleSubmit, reset } = useForm<Enquiry>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      people: 2,
      startDate: "",
      endDate: "",
      message: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Enquiry) => {
      const res = await api.post("/api/inquiries", data)
      return res.data
    },
    onSuccess: () => {
      toast({ title: "Enquiry sent", description: "We will get back to you shortly." })
      queryClient.invalidateQueries({ queryKey: ["inquiries"] })
      reset()
    },
    onError: () => {
      toast({ title: "Submission failed", description: "Please try again later.", variant: "destructive" })
    },
  })

  const onSubmit = (data: Enquiry) => mutation.mutate(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-lg border bg-card p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input id="name" placeholder="Your name" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
            render={({ field }) => <Input id="email" type="email" placeholder="you@example.com" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input id="phone" placeholder="+91 ..." {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="people">Number of People</Label>
          <Controller
            name="people"
            control={control}
            rules={{ required: true, min: 1 }}
            render={({ field }) => <Input id="people" type="number" min={1} {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="startDate">Travel Start</Label>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input id="startDate" type="date" {...field} />}
          />
        </div>
        <div>
          <Label htmlFor="endDate">Travel End</Label>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input id="endDate" type="date" {...field} />}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => <Textarea id="message" placeholder="Tell us your preferences..." {...field} />}
        />
      </div>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:opacity-90"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  )
}
