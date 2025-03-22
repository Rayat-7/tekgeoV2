"use client"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AnimatedList } from "@/components/magicui/animated-list"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const Node = React.forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    label?: string
    position?: "left" | "center" | "right"
  }
>(({ className, children, label, position = "left" }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className,
        )}
      >
        {children}
      </div>
      {label && (
        <span
          className={cn(
            "text-xs font-medium text-muted-foreground",
            position === "left" && "text-left",
            position === "center" && "text-center",
            position === "right" && "text-right",
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
})

Node.displayName = "Node"

export default function GeoAttendanceTracker({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const officeARef = useRef<HTMLDivElement>(null)
  const officeBRef = useRef<HTMLDivElement>(null)
  const officeCRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const centralSystemRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

 
  return (
    <div className="space-y-8">
      <div
        className={cn("relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10", className)}
        ref={containerRef}
      >
        <div className="flex size-full max-w-4xl flex-row items-stretch justify-between gap-18">
          <div className="flex flex-col justify-between py-8">
            <Node ref={officeARef} label="Remote Office A">
              <Icons.building />
            </Node>
            <Node ref={officeBRef} label="Remote Office B">
              <Icons.building2 />
            </Node>
            <Node ref={officeCRef} label="Home Office">
              <Icons.home />
            </Node>
            <Node ref={mobileRef} label="Mobile App">
              <Icons.smartphone />
            </Node>
            <Node ref={fieldRef} label="Field Location">
              <Icons.mapPin />
            </Node>
          </div>
          <div className="flex flex-col justify-center">
            <Node
              ref={centralSystemRef}
              className="size-20 bg-gradient-to-br from-blue-500 to-purple-600"
              label="GeoTrack AI System"
              position="center"
            >
              <Icons.server className="h-10 w-10 text-white" />
            </Node>
          </div>
          <div className="flex flex-col justify-center">
            <Node ref={dashboardRef} className="size-16" label="Management Dashboard" position="right">
              <Icons.pieChart />
            </Node>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={officeARef}
          toRef={centralSystemRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#8b5cf6"
          pathColor="#e2e8f0"
          delay={0}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={officeBRef}
          toRef={centralSystemRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#8b5cf6"
          pathColor="#e2e8f0"
          delay={0.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={officeCRef}
          toRef={centralSystemRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#8b5cf6"
          pathColor="#e2e8f0"
          delay={1}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={mobileRef}
          toRef={centralSystemRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#8b5cf6"
          pathColor="#e2e8f0"
          delay={1.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={fieldRef}
          toRef={centralSystemRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#8b5cf6"
          pathColor="#e2e8f0"
          delay={2}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={centralSystemRef}
          toRef={dashboardRef}
          gradientStartColor="#8b5cf6"
          gradientStopColor="#3b82f6"
          pathColor="#e2e8f0"
          reverse={true}
          delay={2.5}
          pathWidth={3}
        />
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Real-time Attendance Tracking</h3>
        <AnimatedList className="space-y-3">
          {attendanceData.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Icons.user className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm">{employee.time}</p>
                <Badge
                  className={cn(
                    employee.status === "Present" && "bg-green-500",
                    employee.status === "Late" && "bg-amber-500",
                    employee.status === "Absent" && "bg-red-500",
                  )}
                >
                  {employee.status}
                </Badge>
              </div>
            </div>
          ))}
        </AnimatedList>
      </Card>
    </div>
  )
}

const Icons = {
  building: () => (
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  building2: () => (
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
      <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
      <path d="M18 11h.01" />
      <path d="M18 14h.01" />
      <path d="M18 17h.01" />
      <path d="M18 20h.01" />
      <path d="M9 5h3" />
      <path d="M9 9h3" />
      <path d="M9 13h3" />
      <path d="M9 17h3" />
      <path d="M1 22h22" />
    </svg>
  ),
  home: () => (
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  smartphone: () => (
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  mapPin: () => (
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  server: () => (
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
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  pieChart: () => (
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  user: () => (
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}

