"use client"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import type { Event, EventCategory } from "../types/event"

interface FilterTabsProps {
  selectedCategory: EventCategory | "All"
  onCategoryChange: (category: EventCategory | "All") => void
  events: Event[]
}

export function FilterTabs({ selectedCategory, onCategoryChange, events }: FilterTabsProps) {
  const categories: (EventCategory | "All")[] = ["All", "Work", "Personal", "Other"]

  const getCategoryCount = (category: EventCategory | "All") => {
    if (category === "All") return events.filter((e) => !e.archived).length
    return events.filter((event) => event.category === category && !event.archived).length
  }

  const categoryIcons = {
    All: "📅",
    Work: "💼",
    Personal: "👤",
    Other: "📝",
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
      {categories.map((category) => {
        const count = getCategoryCount(category)
        const isSelected = selectedCategory === category

        return (
          <Button
            key={category}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center gap-2 px-4 py-2 h-10 text-sm sm:px-6 sm:py-3 sm:h-12 sm:text-base ${
              isSelected ? "shadow-lg" : "hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            <span className="text-base sm:text-lg">{categoryIcons[category]}</span>
            <span className="font-medium sm:font-semibold">{category}</span>
            <Badge
              variant="secondary"
              className={`ml-0.5 sm:ml-1 ${isSelected ? "bg-blue-500 text-white border-blue-400" : "bg-gray-100 text-gray-600"}`}
            >
              {count}
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}
