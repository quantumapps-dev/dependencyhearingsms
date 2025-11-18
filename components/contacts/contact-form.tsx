"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Contact } from "./contacts-client"
import { toast } from "sonner"
import { useState, useEffect } from "react"

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  relationship: z.enum(["mother", "father", "guardian", "foster-parent", "relative", "other"]),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  alternatePhoneNumber: z.string().optional(),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  preferredContactMethod: z.enum(["sms", "phone", "email"]),
  consentToContact: z.boolean(),
  consentDate: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  linkedCases: z.array(z.string()),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  emergencyContact: z.boolean().optional(),
  notes: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  initialData?: Contact
  onSubmit: (data: ContactFormValues) => void
  onCancel: () => void
}

export function ContactForm({ initialData, onSubmit, onCancel }: ContactFormProps) {
  const [cases, setCases] = useState<Array<{ id: string; docketNumber: string }>>([])
  const [caseInput, setCaseInput] = useState("")

  useEffect(() => {
    const savedCases = localStorage.getItem("dhsms_cases")
    if (savedCases) {
      const parsedCases = JSON.parse(savedCases)
      setCases(parsedCases.map((c: any) => ({ id: c.id, docketNumber: c.docketNumber })))
    }
  }, [])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      relationship: "mother",
      phoneNumber: "",
      alternatePhoneNumber: "",
      email: "",
      preferredContactMethod: "sms",
      consentToContact: false,
      consentDate: "",
      language: "English",
      linkedCases: [],
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContact: false,
      notes: "",
    },
  })

  const watchConsent = form.watch("consentToContact")

  useEffect(() => {
    if (watchConsent && !form.getValues("consentDate")) {
      form.setValue("consentDate", new Date().toISOString().split('T')[0])
    }
  }, [watchConsent, form])

  const handleSubmit = (data: ContactFormValues) => {
    onSubmit(data)
    toast.success(initialData ? "Contact updated successfully" : "Contact added successfully")
  }

  const addCase = (caseId: string) => {
    const currentCases = form.getValues("linkedCases")
    if (!currentCases.includes(caseId)) {
      form.setValue("linkedCases", [...currentCases, caseId])
    }
    setCaseInput("")
  }

  const removeCase = (caseId: string) => {
    const currentCases = form.getValues("linkedCases")
    form.setValue("linkedCases", currentCases.filter(id => id !== caseId))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Relationship */}
          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="foster-parent">Foster Parent</SelectItem>
                    <SelectItem value="relative">Relative</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Language</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., English, Spanish" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alternate Phone Number */}
          <FormField
            control={form.control}
            name="alternatePhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternate Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 987-6543" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Contact Method */}
          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sms">SMS / Text Message</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Pittsburgh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="PA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="15219" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Consent Section */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Consent and Preferences</h3>
          
          <FormField
            control={form.control}
            name="consentToContact"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Consent to Contact
                  </FormLabel>
                  <FormDescription>
                    Contact has provided consent to receive communications via their preferred method
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {watchConsent && (
            <FormField
              control={form.control}
              name="consentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consent Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>Date consent was obtained</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Emergency Contact
                  </FormLabel>
                  <FormDescription>
                    Mark as emergency contact for urgent situations
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Linked Cases */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Linked Cases</h3>
          <FormField
            control={form.control}
            name="linkedCases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Associate with Cases</FormLabel>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Select value={caseInput} onValueChange={setCaseInput}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a case to link" />
                      </SelectTrigger>
                      <SelectContent>
                        {cases.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.docketNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => caseInput && addCase(caseInput)}
                      disabled={!caseInput}
                    >
                      Add
                    </Button>
                  </div>
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((caseId) => {
                        const caseData = cases.find(c => c.id === caseId)
                        return (
                          <div key={caseId} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md">
                            <span className="text-sm">{caseData?.docketNumber || caseId}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => removeCase(caseId)}
                            >
                              ×
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                <FormDescription>Link this contact to specific cases</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this contact..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional notes and observations</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Contact" : "Add Contact"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
