"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Case } from "./cases-client"
import { toast } from "sonner"

const caseFormSchema = z.object({
  docketNumber: z.string().min(1, "Docket number is required"),
  caseTitle: z.string().min(1, "Case title is required"),
  caseType: z.enum(["dependency", "abuse", "neglect", "termination"]),
  status: z.enum(["active", "pending", "closed", "appealed"]),
  county: z.string().min(1, "County is required"),
  assignedJudge: z.string().min(1, "Assigned judge is required"),
  assignedCaseWorker: z.string().min(1, "Assigned case worker is required"),
  filingDate: z.string().min(1, "Filing date is required"),
  nextHearingDate: z.string().optional(),
  hearingType: z.string().optional(),
  courtroom: z.string().optional(),
  notes: z.string().optional(),
})

type CaseFormValues = z.infer<typeof caseFormSchema>

interface CaseFormProps {
  initialData?: Case
  onSubmit: (data: CaseFormValues) => void
  onCancel: () => void
}

export function CaseForm({ initialData, onSubmit, onCancel }: CaseFormProps) {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: initialData || {
      docketNumber: "",
      caseTitle: "",
      caseType: "dependency",
      status: "active",
      county: "",
      assignedJudge: "",
      assignedCaseWorker: "",
      filingDate: new Date().toISOString().split('T')[0],
      nextHearingDate: "",
      hearingType: "",
      courtroom: "",
      notes: "",
    },
  })

  const handleSubmit = (data: CaseFormValues) => {
    onSubmit(data)
    toast.success(initialData ? "Case updated successfully" : "Case created successfully")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Docket Number */}
          <FormField
            control={form.control}
            name="docketNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docket Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., JV-2024-001234" {...field} />
                </FormControl>
                <FormDescription>Unique case identifier</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Case Title */}
          <FormField
            control={form.control}
            name="caseTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., In re: Minor Child" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Case Type */}
          <FormField
            control={form.control}
            name="caseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dependency">Dependency</SelectItem>
                    <SelectItem value="abuse">Abuse</SelectItem>
                    <SelectItem value="neglect">Neglect</SelectItem>
                    <SelectItem value="termination">Termination</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="appealed">Appealed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* County */}
          <FormField
            control={form.control}
            name="county"
            render={({ field }) => (
              <FormItem>
                <FormLabel>County</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Allegheny County" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assigned Judge */}
          <FormField
            control={form.control}
            name="assignedJudge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Judge</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Hon. Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assigned Case Worker */}
          <FormField
            control={form.control}
            name="assignedCaseWorker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Case Worker</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Filing Date */}
          <FormField
            control={form.control}
            name="filingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filing Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Next Hearing Date */}
          <FormField
            control={form.control}
            name="nextHearingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Hearing Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hearing Type */}
          <FormField
            control={form.control}
            name="hearingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hearing Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Initial, Review, Permanency" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Courtroom */}
          <FormField
            control={form.control}
            name="courtroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Courtroom</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Courtroom 5B" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
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
              <FormLabel>Case Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes or information about this case..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional case notes and observations</FormDescription>
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
            {initialData ? "Update Case" : "Create Case"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
