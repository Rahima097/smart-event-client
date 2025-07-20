import type React from "react"
import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Textarea } from "./ui/Textarea"
import { Loader2, Plus, Sparkles } from "lucide-react"
import { eventApi } from "../services/api"

interface EventFormProps {
  onEventAdded: () => void
}

export function EventForm({ onEventAdded }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await eventApi.createEvent(formData)

      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        notes: "",
      })

      onEventAdded()
    } catch (err) {
      // Error is already handled by the API interceptor
      console.error("Failed to create event:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Plus className="h-6 w-6" />
          Add New Event
        </h2>
        <p className="text-blue-100 mt-2">Create events with AI-powered categorization</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              rows={4}
            />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700 mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">AI Categorization</span>
            </div>
            <p className="text-xs text-purple-600">
              Events are automatically categorized as Work, Personal, or Other based on keywords
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                Create Event
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
