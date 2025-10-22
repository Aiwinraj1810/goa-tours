"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  isNotBlank,
  isValidName,
  isValidEmail,
  isValidIndianPhone,
  isPositiveNumber,
  isSafeMessage,
  isAfterDate,
} from "@/lib/form-validations";

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  people: number;
  startDate: string;
  endDate: string;
  message?: string;
};

export default function EnquiryForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<Enquiry>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      people: 2,
      startDate: "",
      endDate: "",
      message: "",
    },
  });

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const mutation = useMutation({
    mutationFn: async (data: Enquiry) => {
      const res = await api.post("/api/inquiries", data);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Enquiry sent",
        description: "We will get back to you shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      reset();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: Enquiry) => {
    const cleaned = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ])
    ) as Enquiry;
    mutation.mutate(cleaned);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-lg border bg-card p-5 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* --- Name --- */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              validate: {
                isNotBlank,
                isValidName,
              },
            }}
            render={({ field }) => <Input id="name" placeholder="Your name" {...field} />}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* --- Email --- */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: isValidEmail,
            }}
            render={({ field }) => <Input id="email" type="email" placeholder="you@example.com" {...field} />}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* --- Phone --- */}
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: isValidIndianPhone,
            }}
            render={({ field }) => <Input id="phone" placeholder="e.g., 9876543210" {...field} />}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* --- People --- */}
        <div>
          <Label htmlFor="people">Number of People</Label>
          <Controller
            name="people"
            control={control}
            rules={{
              required: "Please specify number of people",
              validate: isPositiveNumber,
            }}
            render={({ field }) => <Input id="people" type="number" min={1} {...field} />}
          />
          {errors.people && <p className="text-sm text-red-500 mt-1">{errors.people.message}</p>}
        </div>

        {/* --- Start Date --- */}
        <div>
          <Label htmlFor="startDate">Travel Start</Label>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field }) => <Input id="startDate" type="date" {...field} />}
          />
          {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate.message}</p>}
        </div>

        {/* --- End Date --- */}
        <div>
          <Label htmlFor="endDate">Travel End</Label>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date is required",
              validate: () => isAfterDate(startDate, endDate),
            }}
            render={({ field }) => <Input id="endDate" type="date" {...field} />}
          />
          {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* --- Message --- */}
      <div>
        <Label htmlFor="message">Message</Label>
        <Controller
          name="message"
          control={control}
          rules={{ validate:  isSafeMessage }}
          render={({ field }) => (
            <Textarea id="message" placeholder="Tell us your preferences..." {...field} />
          )}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:opacity-90 w-full"
        disabled={mutation.isPending || !isValid}
      >
        {mutation.isPending ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
