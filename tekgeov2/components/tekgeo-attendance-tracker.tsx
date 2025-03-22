"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AttendanceNotifications } from "./notification"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion,useInView } from "framer-motion"

// Add this new component before the main TekGeoAttendanceTracker component
function SimplifiedBangladeshMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centralRef = useRef<HTMLDivElement>(null)
  const [nodeRefs, setNodeRefs] = useState<Record<string, React.RefObject<HTMLDivElement>>>({})

  // District coordinates (simplified for the hero section)
  const districtCoordinates = {
    rangpur: { x: 140, y: 60, width: 35, height: 30 },
    sylhet: { x: 240, y: 75, width: 35, height: 30 },
    mymensingh: { x: 190, y: 85, width: 30, height: 25 },
    rajshahi: { x: 100, y: 100, width: 40, height: 30 },
    dhaka: { x: 175, y: 115, width: 35, height: 30 },
    khulna: { x: 125, y: 150, width: 35, height: 35 },
    barisal: { x: 165, y: 165, width: 30, height: 30 },
    chittagong: { x: 225, y: 150, width: 35, height: 50 },
  }

  // Initialize refs for each district
  useEffect(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {}

    Object.keys(districtCoordinates).forEach((district) => {
      refs[district] = React.createRef<HTMLDivElement>()
    })

    setNodeRefs(refs)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative font-sans overflow-hidden">
      {/* Bangladesh map background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/dotted-map.png"
          alt="Bangladesh Map"
          width={300}
          height={300}
          className="w-full h-full object-contain opacity-30"
          priority
        />
      </div>

      {/* Central Dhaka node */}
      <div
        ref={centralRef}
        className="absolute z-10"
        style={{
          left: `${districtCoordinates.dhaka.x + districtCoordinates.dhaka.width / 2}px`,
          top: `${districtCoordinates.dhaka.y + districtCoordinates.dhaka.height / 2}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* District nodes */}
      {Object.entries(districtCoordinates).map(([district, coords]) => {
        if (district === "dhaka") return null // Skip Dhaka as we've already rendered it

        // Random values for visual variety
        const value = Math.floor(Math.random() * 30) + 70
        const textColor =
          value >= 90
            ? "text-green-400"
            : value >= 80
              ? "text-emerald-400"
              : value >= 70
                ? "text-yellow-400"
                : "text-red-400"

        return (
          <div
            key={district}
            ref={nodeRefs[district]}
            className="absolute z-10"
            style={{
              left: `${coords.x + coords.width / 2}px`,
              top: `${coords.y + coords.height / 2}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className={`text-xs font-bold ${textColor}`}>{value}</span>
              </div>
            </div>
          </div>
        )
      })}

      {/* Animated beams connecting districts to Dhaka */}
      {Object.keys(nodeRefs).map((district) => {
        if (district === "dhaka" || !nodeRefs[district]?.current || !centralRef?.current) return null

        // Random colors for beams
        const colors = ["#22c55e", "#10b981", "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#f97316", "#eab308"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        return (
          <AnimatedBeam
            key={`beam-${district}`}
            containerRef={containerRef}
            fromRef={nodeRefs[district]}
            toRef={centralRef}
            gradientStartColor={randomColor}
            gradientStopColor="#3b82f6"
            pathColor="#1e293b"
            pathOpacity={0.4}
            delay={Math.random() * 2}
            duration={4 + Math.random() * 2}
            pathWidth={1}
          />
        )
      })}
    </div>
  )
}

const Node = React.forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    label?: string
    position?: "left" | "center" | "right"
    gradient?: string
  }
>(({ className, children, label, position = "left", gradient = "from-blue-500 to-purple-600" }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br p-3 shadow-[0_0_20px_-5px_rgba(120,120,255,0.5)] text-white",
          gradient,
          className,
        )}
      >
        {children}
      </div>
      {label && (
        <span
          className={cn(
            "text-xs font-medium text-white/70 drop-shadow-sm",
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

export default function TekGeoAttendanceTracker({
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
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" })

  return (
  <div className=" font-custom relative overflow-hidden bg-black px-4 py-16 md:px-8 md:py-18">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a1a3a,_transparent_50%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0f172a,_transparent_50%)] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className=" max-w-full mx-auto ml-20"
          >
            <h2 className="mb-6 sm:pl-18 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-4xl  tracking-tight text-transparent sm:text-5xl">
              TekGeo Attendance System
            </h2>
            <p className=" mb-2  sm:pl-18 max-w-2xl text-lg text-blue-200/80">
              Revolutionize how you track attendance for remote and distributed teams with geolocation technology
            </p>
          </motion.div>

        <div className="relative mx-auto left-0  mt-10 max-w-5xl">
        
          {/* Main visualization container */}
          <div
            className={cn(
              "relative mx-auto h-[500px] w-full overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm  border-blue-400 border-2",
              className,
            )}
            ref={containerRef}
          >
            
            
            <div className="flex size-full flex-row items-stretch justify-between p-8">
            

              <div className="flex flex-col justify-between py-8">
                <Node ref={officeARef} label="Remote Office A" gradient="from-blue-500 to-cyan-500">
                  <Icons.building />
                </Node>
                <Node ref={officeBRef} label="Remote Office B" gradient="from-indigo-500 to-blue-600">
                  <Icons.building2 />
                </Node>
                <Node ref={officeCRef} label="Home Office" gradient="from-violet-500 to-indigo-600">
                  <Icons.home />
                </Node>
                <Node ref={mobileRef} label="Mobile App" gradient="from-fuchsia-500 to-violet-600">
                  <Icons.smartphone />
                </Node>
                <Node ref={fieldRef} label="Field Location" gradient="from-pink-500 to-fuchsia-600">
                  <Icons.mapPin />
                </Node>
              </div>
              <div className="flex flex-col justify-center">
                <Node
                  ref={centralSystemRef}
                  className="size-20"
                  label="TekGeo Attendance System"
                  position="center"
                  gradient="from-blue-600 to-indigo-600"
                >
                  <Icons.server className="h-10 w-10" />
                </Node>
              </div>
              <div className="flex flex-col justify-center">
                <Node
                  ref={dashboardRef}
                  className="size-16"
                  label="Management Dashboard"
                  position="right"
                  gradient="from-amber-500 to-orange-600"
                >
                  <Icons.pieChart />
                </Node>
              </div>
            </div>

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={officeARef}
              toRef={centralSystemRef}
              gradientStartColor="#38bdf8"
              gradientStopColor="#818cf8"
              pathColor="#1e293b"
              pathOpacity={0.4}
              delay={0}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={officeBRef}
              toRef={centralSystemRef}
              gradientStartColor="#818cf8"
              gradientStopColor="#8b5cf6"
              pathColor="#1e293b"
              pathOpacity={0.4}
              delay={0.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={officeCRef}
              toRef={centralSystemRef}
              gradientStartColor="#8b5cf6"
              gradientStopColor="#a78bfa"
              pathColor="#1e293b"
              pathOpacity={0.4}
              delay={1}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={mobileRef}
              toRef={centralSystemRef}
              gradientStartColor="#a78bfa"
              gradientStopColor="#c084fc"
              pathColor="#1e293b"
              pathOpacity={0.4}
              delay={1.5}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={fieldRef}
              toRef={centralSystemRef}
              gradientStartColor="#c084fc"
              gradientStopColor="#e879f9"
              pathColor="#1e293b"
              pathOpacity={0.4}
              delay={2}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centralSystemRef}
              toRef={dashboardRef}
              gradientStartColor="#8b5cf6"
              gradientStopColor="#f59e0b"
              pathColor="#1e293b"
              pathOpacity={0.4}
              reverse={true}
              delay={2.5}
              pathWidth={3}
            />
             
          </div>
          

          {/* Stats section */}
          <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg border border-blue-900/30 bg-blue-950/20 p-4 backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                98%
              </div>
              <div className="text-sm text-blue-200/70">Attendance Accuracy</div>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-blue-900/30 bg-blue-950/20 p-4 backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                50+
              </div>
              <div className="text-sm text-blue-200/70">Companies</div>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-blue-900/30 bg-blue-950/20 p-4 backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                1000+
              </div>
              <div className="text-sm text-blue-200/70">Employees Tracked</div>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-blue-900/30 bg-blue-950/20 p-4 backdrop-blur-sm">
              <div className="mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-3xl font-bold text-transparent">
                30%
              </div>
              <div className="text-sm text-blue-200/70">Time Saved</div>
            </div>
          </div>
          
        </div>
      </div>
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
}

