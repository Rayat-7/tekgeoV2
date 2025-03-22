"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AttendanceNotification {
  id: number
  name: string
  status: "Present" | "Late" | "Absent"
  time: string
  location: string
  avatar: string
  initials: string
}

export function AttendanceNotifications() {
  const [notifications, setNotifications] = useState<AttendanceNotification[]>([
    {
      id: 1,
      name: "Kamal Hossain",
      status: "Present",
      time: "08:45 AM",
      location: "Chittagong A",
      avatar: "https://picsum.photos/300?height=100&width=100",
      initials: "AJ",
    },
    {
      id: 2,
      name: "Chowdhury Sajidur Rahman",
      status: "Late",
      time: "09:15 AM",
      location: "Home Office, Dhaka",
      avatar: "https://picsum.photos/270?height=100&width=100",
      initials: "SW",
    },
    {
      id: 3,
      name: "Rahim Chowdhury",
      status: "Present",
      time: "08:30 AM",
      location: "Sylhet B",
      avatar: "https://picsum.photos/290?height=100&width=100",
      initials: "MC",
    },
    {
      id: 4,
      name: "Emily Davis",
      status: "Absent",
      time: "—",
      location: "—",
      avatar: "https://picsum.photos/2100?height=100&width=100",
      initials: "ED",
    },
    {
      id: 5,
      name: "Robert Taylor",
      status: "Present",
      time: "08:52 AM",
      location: "Field Location",
      avatar: "https://picsum.photos/200?height=100&width=100",
      initials: "RT",
    },
    //another id
    {
      id: 6,
      name: "Omar Faruk",
      status: "Present",
      time: "08:45 AM",
      location: "Chittagong A",
      avatar: "https://picsum.photos/2230?height=100&width=100",
      initials: "AJ",
    },
    {
      id: 7,
      name: "Ihsanul Haque",
      status: "Late",
      time: "09:15 AM",
      location: "Home Office, Dhaka",
      avatar: "https://picsum.photos/2020?height=100&width=100",
      initials: "SW",
    },
    
    {
      id: 8,
      name: "Fahim Chowdhury",
      status: "Present",
      time: "08:30 AM",
      location: "Sylhet B",
      //random image of profile to show
      avatar: " https://picsum.photos/2200?height=100&width=100",
      initials: "MC",
    },
    
  ])

  const [visibleNotifications, setVisibleNotifications] = useState<AttendanceNotification[]>([])

  useEffect(() => {
    // Show notifications one by one with a delay
    const showNotifications = async () => {
      for (let i = 0; i < notifications.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setVisibleNotifications((prev) => [...prev, notifications[i]])
      }
    }

    showNotifications()

    // Reset notifications every 15 seconds
    // const interval = setInterval(() => {
    //   setVisibleNotifications([])
    //   setTimeout(() => {
    //     showNotifications()
    //   }, 500)
    // }, 15000)

    // return () => clearInterval(interval)
  }, [notifications])

  return (
    <div className="w-full space-y-2 font-custom ">
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 p-4 backdrop-blur-sm">
        <div className=" font-semibold  text-white">Live Attendance</div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          {visibleNotifications.length}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {visibleNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: index * 0.1,
              }}
              className={cn(
                "flex items-start gap-2 rounded-lg border border-white/5 bg-gradient-to-r p-2 backdrop-blur-sm",
                notification.status === "Present" && "from-green-950/40 to-blue-950/40 border-l-2 border-l-blue-500",
                notification.status === "Late" && "from-amber-950/40 to-blue-950/40 border-l-2 border-l-amber-500",
                notification.status === "Absent" && "from-red-950/40 to-blue-950/40 border-l-2 border-l-red-500",
              )}
            >
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={notification.avatar} alt={notification.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-xs text-white">
                  {notification.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white">{notification.name}</p>
                  <div className="flex items-center gap-1">
                    {notification.status === "Present" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <Icons.check className="h-2 w-2" />
                      </span>
                    )}
                    {notification.status === "Late" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        <Icons.clock className="h-2 w-2" />
                      </span>
                    )}
                    {notification.status === "Absent" && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                        <Icons.x className="h-2 w-2" />
                      </span>
                    )}
                    <span className="text-[10px] text-blue-200/70">{notification.time}</span>
                  </div>
                </div>
                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-[10px] text-blue-200/70">{notification.status}</span>
                  <span className="text-[10px] text-blue-200/50">•</span>
                  <span className="text-[10px] text-blue-200/70">{notification.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

const Icons = {
  check: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  x: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}

