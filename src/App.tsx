import { useState, useEffect } from "react"
import { EventForm } from "./components/EventForm"
import { EventList } from "./components/EventList"
import { FilterTabs } from "./components/FilterTabs"
import { Calendar, Sparkles, Database, Wifi, WifiOff } from "lucide-react"
import type { Event, EventCategory } from "./types/event"
import { eventApi } from "./services/api"
import { Toaster } from "react-hot-toast"

function App() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "All">("All")
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await eventApi.getAllEvents()
      setEvents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleEventAdded = () => {
    fetchEvents()
  }

  const handleEventDeleted = async (id: string) => {
    try {
      await eventApi.deleteEvent(id)
      await fetchEvents()
    } catch (err) {
      console.error("Failed to delete event:", err)
    }
  }

  const handleEventArchived = async (id: string) => {
    try {
      await eventApi.updateEvent(id, { archived: true })
      await fetchEvents()
    } catch (err) {
      console.error("Failed to archive event:", err)
    }
  }

  const filteredEvents = events.filter((event) => selectedCategory === "All" || event.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-xl">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
             Smart Event Scheduler
            </h1>
            <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl shadow-xl">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl shadow-xl">
              <Database className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl sm:max-w-3xl mx-auto leading-relaxed">
            Smart event management with AI-powered categorization, beautiful design, and seamless MongoDB integration
          </p>

          {/* Connection Status */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mt-4 ${
              isOnline
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {isOnline ? "Connected" : "Offline"}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 text-center shadow-lg">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-600 font-semibold text-lg mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Event Form */}
          <div className="lg:col-span-1">
            <EventForm onEventAdded={handleEventAdded} />
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                      <span>🎯</span>
                      Your Events
                    </h2>
                    <p className="text-gray-600 text-lg mt-1">
                      {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
                      {selectedCategory !== "All" && ` in ${selectedCategory}`}
                    </p>
                  </div>
                </div>
                <FilterTabs
                  events={events}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
              <div className="p-6">
                <EventList
                  events={filteredEvents}
                  loading={loading}
                  onEventDeleted={handleEventDeleted}
                  onEventArchived={handleEventArchived}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16 text-gray-500">
          <div className="flex items-center justify-center gap-2 text-base sm:text-lg">
            <span>Built with</span>
            <span className="text-red-500">❤️</span>
            <span>using React, TypeScript, Express, MongoDB</span>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
