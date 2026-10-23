"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
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
  isAfterToday,
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
  packageName?: string;
  destination: "goa" | "kerala";
  /** Honeypot: people never see or fill this, bots usually do. */
  company?: string;
};

export default function EnquiryForm({
  packageName,
  destination,
  onSuccess,
  variant = "default",
}: {
  packageName?: string;
  destination: "goa" | "kerala";
  onSuccess?: () => void;
  /** "editorial" is the refined look used on package detail pages; the
   *  surrounding panel is supplied by the page. "default" is unchanged. */
  variant?: "default" | "editorial";
}) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const editorial = variant === "editorial";

  const today = new Date().toISOString().split("T")[0];

  const {
    control,
    handleSubmit,
    reset,
    setValue,
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
      packageName: packageName ?? "",
      destination,
      company: "",
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
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      reset();
      onSuccess?.();
      router.push(`/thank-you?destination=${destination}`);
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

  // Styling only: the editorial variant uses larger, warmer, indigo-focused fields.
  const labelCls = editorial ? "mb-2 text-sm font-medium text-foreground" : undefined;
  const inputCls = editorial
    ? "h-12 rounded-xl border-border bg-background px-4 text-base shadow-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
    : undefined;
  const errorCls = editorial
    ? "mt-1.5 text-sm text-destructive"
    : "text-sm text-red-500 mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={editorial ? "space-y-5" : "space-y-5 rounded-lg border bg-card p-5 shadow-sm"}
    >
      {packageName &&
        (editorial ? (
          // A wrapping read-only block, so long package names are never cut off.
          <div>
            <span id="package-label" className={cn(labelCls, "block")}>
              Package
            </span>
            <div
              aria-labelledby="package-label"
              className="rounded-xl border border-primary/25 bg-background px-4 py-3 text-base font-medium leading-snug text-foreground"
            >
              {packageName}
            </div>
          </div>
        ) : (
          <div>
            <Label htmlFor="packageName">Package</Label>
            <Input
              id="packageName"
              value={packageName}
              disabled
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>
        ))}
      <div className={cn("grid grid-cols-1 md:grid-cols-2", editorial ? "gap-5" : "gap-4")}>
        {/* --- Name --- */}
        <div>
          <Label htmlFor="name" className={labelCls}>
            Name
          </Label>
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
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputCls}
                {...field}
              />
            )}
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errorCls}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* --- Email --- */}
        <div>
          <Label htmlFor="email" className={labelCls}>
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: isValidEmail,
            }}
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputCls}
                {...field}
              />
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errorCls}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* --- Phone --- */}
        <div>
          <Label htmlFor="phone" className={labelCls}>
            Phone
          </Label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: isValidIndianPhone,
            }}
            render={({ field }) => (
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="e.g., 9876543210"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputCls}
                {...field}
              />
            )}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className={errorCls}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* --- People --- */}
        <div>
          <Label htmlFor="people" className={labelCls}>
            Number of People
          </Label>
          <Controller
            name="people"
            control={control}
            rules={{
              required: "Please specify number of people",
              validate: isPositiveNumber,
            }}
            render={({ field }) => (
              <Input
                id="people"
                type="number"
                inputMode="numeric"
                min={1}
                aria-invalid={!!errors.people}
                aria-describedby={errors.people ? "people-error" : undefined}
                className={inputCls}
                {...field}
              />
            )}
          />
          {errors.people && (
            <p id="people-error" role="alert" className={errorCls}>
              {errors.people.message}
            </p>
          )}
        </div>

        {/* --- Start Date --- */}
        <div>
          <Label htmlFor="startDate" className={labelCls}>
            Travel Start
          </Label>
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: "Start date is required",
              validate: { isAfterToday },
            }}
            render={({ field }) => (
              <Input
                id="startDate"
                type="date"
                min={today}
                aria-invalid={!!errors.startDate}
                aria-describedby={errors.startDate ? "startDate-error" : undefined}
                className={inputCls}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("endDate", "", { shouldValidate: false });
                }}
              />
            )}
          />
          {errors.startDate && (
            <p id="startDate-error" role="alert" className={errorCls}>
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* --- End Date --- */}
        <div>
          <Label htmlFor="endDate" className={labelCls}>
            Travel End
          </Label>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date is required",
              validate: () => isAfterDate(startDate, endDate),
            }}
            render={({ field }) => (
              <Input
                id="endDate"
                type="date"
                min={startDate || today}
                aria-invalid={!!errors.endDate}
                aria-describedby={errors.endDate ? "endDate-error" : undefined}
                className={inputCls}
                {...field}
              />
            )}
          />
          {errors.endDate && (
            <p id="endDate-error" role="alert" className={errorCls}>
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      {/* --- Message --- */}
      <div>
        <Label htmlFor="message" className={labelCls}>
          Message
        </Label>
        <Controller
          name="message"
          control={control}
          rules={{ validate: isSafeMessage }}
          render={({ field }) => (
            <Textarea
              id="message"
              placeholder="Tell us your preferences..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={
                editorial
                  ? "min-h-28 rounded-xl border-border bg-background px-4 py-3 text-base shadow-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                  : undefined
              }
              {...field}
            />
          )}
        />
        {errors.message && (
          <p id="message-error" role="alert" className={errorCls}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot (spam trap): hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this empty)</label>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...field}
              value={field.value ?? ""}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        className={cn(
          "bg-primary text-primary-foreground hover:opacity-90 w-full",
          editorial && "h-12 rounded-full text-sm font-medium"
        )}
        disabled={mutation.isPending || !isValid}
      >
        {mutation.isPending ? (
          <>
            {editorial ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>
    </form>
  );
}
