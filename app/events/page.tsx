"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Event interface
interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "hackathon" | "workshop" | "conference" | "meetup"
  capacity: number
  registered: number
  image: string
  color: string
}

// Sample events data
const events: Event[] = [
  {
    id: "byteburst-2",
    title: "ByteBurst Hackathon 2.0",
    description: "48-hour coding challenge with amazing prizes. Build innovative solutions to real-world problems.",
    date: "June 15-17, 2025",
    time: "10:00 AM - 10:00 AM",
    location: "Virtual",
    type: "hackathon",
    capacity: 200,
    registered: 156,
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-purple-500",
  },
  {
    id: "ai-workshop",
    title: "AI & ML Workshop Series",
    description:
      "Learn the fundamentals of AI and machine learning through hands-on workshops led by industry experts.",
    date: "May 20, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub, Building 4",
    type: "workshop",
    capacity: 50,
    registered: 42,
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-blue-500",
  },
  {
    id: "tech-conference",
    title: "TechNova Annual Conference",
    description:
      "Join us for our annual tech conference featuring keynote speakers, panel discussions, and networking opportunities.",
    date: "July 10, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Main Auditorium",
    type: "conference",
    capacity: 300,
    registered: 210,
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-emerald-500",
  },
  {
    id: "code-meetup",
    title: "Code & Coffee Meetup",
    description:
      "Casual coding session with coffee. Bring your projects, questions, and ideas to share with fellow developers.",
    date: "May 5, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Campus Cafe",
    type: "meetup",
    capacity: 30,
    registered: 22,
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-amber-500",
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Filter events based on active tab
    if (activeTab === "all") {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter((event) => event.type === activeTab))
    }

    // Set loaded state after a short delay for animation purposes
    setTimeout(() => setIsLoaded(true), 500)
  }, [activeTab])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          TechNova Events
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Join our exciting tech events, workshops, hackathons, and meetups to learn, connect, and grow with the
          community.
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="conference">Conferences</TabsTrigger>
          <TabsTrigger value="meetup">Meetups</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <div className="relative h-48">
                <div className={`absolute inset-0 ${event.color} opacity-20`}></div>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <Badge className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {event.registered} / {event.capacity} registered
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                  Register Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
