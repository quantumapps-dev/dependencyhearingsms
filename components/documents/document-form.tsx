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
import { Document } from "./documents-client"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { X } from 'lucide-react'

const documentFormSchema = z.object({
  documentName: z.string().min(1, "Document name is required"),
  documentType: z.enum(["court-order", "medical-record", "school-record", "evaluation", "case-plan", "evidence", "correspondence", "legal-filing", "photo", "other"]),
  caseId: z.string().min(1, "Case is required"),
  docketNumber: z.string().min(1, "Docket number is required"),
  uploadedBy: z.string().min(1, "Uploader name is required"),
  uploadDate: z.string().min(1, "Upload date is required"),
  fileSize: z.string().min(1, "File size is required"),
  fileType: z.string().min(1, "File type is required"),
  description: z.string().optional(),
  confidential: z.boolean(),
  tags: z.array(z.string()),
  relatedParticipants: z.array(z.string()).optional(),
  expirationDate: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["active", "archived", "pending-review"]),
})

type DocumentFormValues = z.infer<typeof documentFormSchema>

interface DocumentFormProps {
  initialData?: Document
  onSubmit: (data: DocumentFormValues) => void
  onCancel: () => void
}

export function DocumentForm({ initialData, onSubmit, onCancel }: DocumentFormProps) {
  const [cases, setCases] = useState<Array<{ id: string; docketNumber: string }>>([])
  const [participants, setParticipants] = useState<Array<{ id: string; firstName: string; lastName: string }>>([])
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    const savedCases = localStorage.getItem("dhsms_cases")
    if (savedCases) {
      const parsedCases = JSON.parse(savedCases)
      setCases(parsedCases.map((c: any) => ({ id: c.id, docketNumber: c.docketNumber })))
    }

    const savedParticipants = localStorage.getItem("dhsms_participants")
    if (savedParticipants) {
      const parsedParticipants = JSON.parse(savedParticipants)
      setParticipants(parsedParticipants.map((p: any) => ({ 
        id: p.id, 
        firstName: p.firstName, 
        lastName: p.lastName 
      })))
    }
  }, [])

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: initialData || {
      documentName: "",
      documentType: "court-order",
      caseId: "",
      docketNumber: "",
      uploadedBy: "Current User",
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: "0 KB",
      fileType: "PDF",
      description: "",
      confidential: false,
      tags: [],
      relatedParticipants: [],
      expirationDate: "",
      notes: "",
      status: "active",
    },
  })

  const watchCaseId = form.watch("caseId")

  useEffect(() => {
    const caseData = cases.find(c => c.id === watchCaseId)
    if (caseData) {
      form.setValue("docketNumber", caseData.docketNumber)
    }
  }, [watchCaseId, cases, form])

  const handleSubmit = (data: DocumentFormValues) => {
    onSubmit(data)
    toast.success(initialData ? "Document updated successfully" : "Document added successfully")
  }

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags")
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags")
    form.setValue("tags", currentTags.filter(t => t !== tag))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Document Name */}
          <FormField
            control={form.control}
            name="documentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Court Order - Custody" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Document Type */}
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="court-order">Court Order</SelectItem>
                    <SelectItem value="medical-record">Medical Record</SelectItem>
                    <SelectItem value="school-record">School Record</SelectItem>
                    <SelectItem value="evaluation">Evaluation</SelectItem>
                    <SelectItem value="case-plan">Case Plan</SelectItem>
                    <SelectItem value="evidence">Evidence</SelectItem>
                    <SelectItem value="correspondence">Correspondence</SelectItem>
                    <SelectItem value="legal-filing">Legal Filing</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Case */}
          <FormField
            control={form.control}
            name="caseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Associated Case</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cases.map((caseItem) => (
                      <SelectItem key={caseItem.id} value={caseItem.id}>
                        {caseItem.docketNumber}
                      </SelectItem>
                    ))}
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
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="pending-review">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Uploaded By */}
          <FormField
            control={form.control}
            name="uploadedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uploaded By</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Date */}
          <FormField
            control={form.control}
            name="uploadDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Size */}
          <FormField
            control={form.control}
            name="fileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2.5 MB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Type */}
          <FormField
            control={form.control}
            name="fileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., PDF, DOCX, JPG" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiration Date */}
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the document..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <div key={tag} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md">
                        <span className="text-sm">{tag}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FormDescription>Add tags to categorize and search documents</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confidential Checkbox */}
        <FormField
          control={form.control}
          name="confidential"
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
                  Mark as Confidential
                </FormLabel>
                <FormDescription>
                  Restrict access to authorized personnel only (HIPAA/FERPA compliance)
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Internal Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any internal notes about this document..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional notes (not visible to external parties)</FormDescription>
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
            {initialData ? "Update Document" : "Add Document"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
