"use client"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Calendar, Clock, FileText, Trash2, Archive, Loader2, CalendarDays } from "lucide-react"
import type { Event } from "../types/event"
import Swal from "sweetalert2"

interface EventListProps {
  events: Event[]
  loading: boolean
  onEventDeleted: (id: string) => void
  onEventArchived: (id: string) => void
}

const categoryIcons = {
  Work: "💼",
  Personal: "👤",
  Other: "📝",
}

export function EventList({ events, loading, onEventDeleted, onEventArchived }: EventListProps) {
  const handleDelete = async (event: Event) => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      onEventDeleted(event._id)
    }
  }

  const handleArchive = async (event: Event) => {
    const result = await Swal.fire({
      title: "Archive Event?",
      text: `Archive "${event.title}"? You can restore it later.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, archive it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      onEventArchived(event._id)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your events...</p>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays className="h-20 w-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-gray-600 mb-3">No events found</h3>
        <p className="text-gray-500 text-lg">Create your first event to get started!</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div
          key={event._id}
          className={`bg-white rounded-2xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            event.archived ? "opacity-60 border-l-gray-400 bg-gray-50" : "border-l-blue-500 hover:border-l-blue-600"
          }`}
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <h3 className={`text-lg sm:text-xl font-bold ${event.archived ? "text-gray-600" : "text-gray-800"}`}>
                    {event.title}
                  </h3>
                  <Badge
                    variant={event.category.toLowerCase() as "work" | "personal" | "other"}
                    className="font-semibold"
                  >
                    <span className="mr-1">{categoryIcons[event.category]}</span>
                    {event.category}
                  </Badge>
                  {event.archived && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      📦 Archived
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{formatTime(event.time)}</span>
                  </div>
                </div>

                {event.notes && (
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{event.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                {!event.archived && (
                  <Button
                    variant="warning"
                    className="flex items-center justify-center gap-2 px-4 py-2 h-10 text-sm sm:px-3 sm:py-1.5 sm:h-9"
                    onClick={() => handleArchive(event)}
                  >
                    <Archive className="h-4 w-4" />
                    Archive
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="flex items-center justify-center gap-2 px-4 py-2 h-10 text-sm sm:px-3 sm:py-1.5 sm:h-9"
                  onClick={() => handleDelete(event)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
