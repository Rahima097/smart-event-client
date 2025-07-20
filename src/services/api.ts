import axios from "axios"
import toast from "react-hot-toast"
import type { Event, CreateEventRequest, UpdateEventRequest } from "../types/Event"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message)

    const errorMessage =
      error.response?.data?.message || error.response?.data?.error || error.message || "An unexpected error occurred"

    toast.error(errorMessage)
    throw new Error(errorMessage)
  },
)

export const eventApi = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    const response = await api.get("/events")
    return response.data
  },

  // Get event by ID
  getEventById: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`)
    return response.data
  },

  // Create new event
  createEvent: async (eventData: CreateEventRequest): Promise<Event> => {
    const response = await api.post("/events", eventData)
    toast.success("Event created successfully! 🎉")
    return response.data
  },

  // Update event
  updateEvent: async (id: string, updateData: UpdateEventRequest): Promise<Event> => {
    const response = await api.put(`/events/${id}`, updateData)
    if (updateData.archived) {
      toast.success("Event archived successfully! 📦")
    } else {
      toast.success("Event updated successfully! ✅")
    }
    return response.data
  },

  // Delete event
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`)
    toast.success("Event deleted successfully! 🗑️")
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get("/health")
    return response.data
  },
}
