export type EventCategory = "Work" | "Personal" | "Other"

export interface Event {
  id: string
  title: string
  date: string
  time: string
  notes?: string
  category: EventCategory
  archived: boolean
  createdAt: string
}

export interface CreateEventRequest {
  title: string
  date: string
  time: string
  notes?: string
}

export interface UpdateEventRequest {
  archived?: boolean
}
