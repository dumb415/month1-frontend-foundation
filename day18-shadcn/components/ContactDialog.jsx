"use client"; // ← needed: this file uses hooks + event handlers (you proved this on Day 18, Break B)

import { useState } from "react"; // ← tracks whether the dialog is open
import { useForm, Controller } from "react-hook-form"; // ← useForm = form brain; Controller = bridge to controlled UI components
import { zodResolver } from "@hookform/resolvers/zod"; // ← adapter: lets react-hook-form run a Zod schema as its validator
import { z } from "zod"; // ← Zod = schema/validation library

import { Button } from "@/components/ui/button";
import {
  Dialog, // ← root: owns open/closed behavior
  DialogContent, // ← the modal box itself (portaled to <body>)
  DialogDescription, // ← subtitle; Radix warns in console if missing (accessibility)
  DialogFooter,
  DialogHeader,
  DialogTitle, // ← required for screen readers; Radix warns if missing
  DialogTrigger, // ← the element that opens the dialog
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"; // ← Field = label + control + error wrapper
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Schema = the single source of truth for "what valid data looks like".
// C++ analogy: a struct definition + a validate() function fused together.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"), // ← .trim() strips spaces BEFORE .min() checks
  email: z.email("Enter a valid email address"), // ← Zod v4: top-level z.email() replaces z.string().email()
  topic: z.string().min(1, "Pick a topic"), // ← "" (the default) fails min(1) => "required" behavior
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be 500 characters or fewer"),
});

export default function ContactDialog() {
  const [open, setOpen] = useState(false); // ← like a bool isOpen flag; Dialog is "controlled" by it

  const form = useForm({
    resolver: zodResolver(contactSchema), // ← run the schema on submit; errors land in fieldState.error
    defaultValues: { name: "", email: "", topic: "", message: "" }, // ← like a C++ constructor initializer list; REQUIRED for controlled inputs
  });

  // Runs ONLY if validation passes. handleSubmit(onSubmit) is a wrapper:
  // like passing a callback (function pointer) that the library calls after the checks.
  async function onSubmit(values) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // ← fake API call; Week 2+ you replace this with a real request
    console.log("Submitted:", values);
    form.reset(); // ← back to defaultValues
    setOpen(false); // ← close the dialog
  }

  // Dialog calls this whenever it wants to open/close (Esc, overlay click, X button)
  function handleOpenChange(next) {
    setOpen(next);
    if (!next) form.reset(); // ← don't show stale errors next time it opens
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {/* asChild = don't render an extra <button>; give this Button the trigger behavior instead */}
        <Button>Contact me</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact me</DialogTitle>
          <DialogDescription>Tell me about your project. I reply within 24 hours.</DialogDescription>
        </DialogHeader>

        {/* noValidate = turn off the browser's own popups so Zod is the only validator */}
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {/* NAME */}
            <Controller
              name="name" // ← which key in the schema/defaultValues
              control={form.control} // ← connects this Controller to the form brain
              render={({ field, fieldState }) => (
                // field = { name, value, onChange, onBlur, ref }, fieldState = { invalid, error }
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                  <Input
                    {...field} // ← spread: wires value + onChange + onBlur + ref in one go
                    id="contact-name"
                    aria-invalid={fieldState.invalid} // ← red styling + accessibility flag
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* EMAIL */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="contact-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* TOPIC (Select) */}
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
                  {/* Select is NOT a native input: it can't take {...field}, so wire each piece by hand */}
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    {/* ← onValueChange gives the VALUE directly (not an event like Input's onChange) */}
                    <SelectTrigger
                      id="contact-topic"
                      aria-invalid={fieldState.invalid}
                      onBlur={field.onBlur}
                    >
                      <SelectValue placeholder="Select a topic" />
                      {/* ← shown while value is "" */}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">New project</SelectItem>
                      <SelectItem value="bug">Bug fix</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* MESSAGE */}
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <Textarea
                    {...field}
                    id="contact-message"
                    aria-invalid={fieldState.invalid}
                    placeholder="What do you need built?"
                    rows={4}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          {/* form="contact-form" = submit button lives OUTSIDE <form> but still submits it */}
          <Button type="submit" form="contact-form" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}