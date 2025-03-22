"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

interface DistrictStats {
  name: string
  value: number
  color: string
}

interface MapProps {
  districtStats: Record<string, DistrictStats>
  connections?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
    district: string
  }>
  lineColor?: string
  onDistrictSelect?: (district: string) => void
  selectedDistrict?: string | null
}

export function BangladeshMap({
  districtStats,
  connections = [],
  lineColor = "#0ea5e9",
  onDistrictSelect,
  selectedDistrict,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  const [nodeRefs, setNodeRefs] = useState<Record<string, React.RefObject<HTMLDivElement>>>({})
  const centralRef = useRef<HTMLDivElement>(null)

  // Updated coordinates based on the provided Bangladesh map
  // These coordinates are aligned with the actual geographical positions
  const districtCoordinates = {
    // Northern region
    rangpur: { x: 275, y: 40, width: 70, height: 60 },

    // North-eastern region
    sylhet: { x: 450, y: 90, width: 70, height: 60 },
    mymensingh: { x: 360, y: 110, width: 60, height: 50 },

    // Western region
    rajshahi: { x: 230, y: 130, width: 80, height: 60 },

    // Central region
    dhaka: { x: 340, y: 180, width: 70, height: 60 },

    // South-western region
    khulna: { x: 279, y: 260, width: 70, height: 70 },

    // Southern region
    barisal: { x: 360, y: 250, width: 60, height: 60 },

    // South-eastern region
    chittagong: { x: 450, y: 250, width: 70, height: 100 },
  }

  // Initialize refs for each district
  useEffect(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {}

    Object.keys(districtCoordinates).forEach((district) => {
      refs[district] = React.createRef<HTMLDivElement>()
    })

    setNodeRefs(refs)
  }, [])

  // Helper function to get text color based on value
  const getTextColorForValue = (value: number, type: string): string => {
    if (type === "attendance") {
      if (value >= 90) return "text-green-400"
      if (value >= 80) return "text-emerald-400"
      if (value >= 70) return "text-yellow-400"
      return "text-red-400"
    } else if (type === "employees") {
      if (value >= 400) return "text-purple-400"
      if (value >= 300) return "text-indigo-400"
      if (value >= 200) return "text-blue-400"
      if (value >= 100) return "text-cyan-400"
      return "text-teal-400"
    } else {
      // Offices
      if (value >= 8) return "text-amber-400"
      if (value >= 6) return "text-orange-400"
      if (value >= 4) return "text-red-400"
      return "text-pink-400"
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] relative font-sans overflow-hidden"
    >
      {/* Bangladesh map background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/dotted-map.png"
          alt="Bangladesh Map"
          width={800}
          height={800}
          className="w-full h-full object-contain opacity-40"
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
          <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center backdrop-blur-sm">
            <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <span className="mt-2 text-xs font-medium text-blue-400 whitespace-nowrap">Dhaka Hub</span>
        </div>
      </div>

      {/* District nodes */}
      {Object.entries(districtCoordinates).map(([district, coords]) => {
        if (district === "dhaka") return null // Skip Dhaka as we've already rendered it

        const stats = districtStats[district]
        const isSelected = selectedDistrict === district
        const isHovered = hoveredDistrict === district

        // Determine text color based on value
        const valueType = stats?.value <= 100 ? "attendance" : "employees"
        const textColor = getTextColorForValue(stats?.value || 0, valueType)

        return (
          <div
            key={district}
            ref={nodeRefs[district]}
            className="absolute z-10 cursor-pointer transition-all duration-200"
            style={{
              left: `${coords.x + coords.width / 2}px`,
              top: `${coords.y + coords.height / 2}px`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setHoveredDistrict(district)}
            onMouseLeave={() => setHoveredDistrict(null)}
            onClick={() => onDistrictSelect && onDistrictSelect(district)}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border ${isSelected || isHovered ? "border-white/60" : "border-white/20"} flex items-center justify-center transition-all duration-200 ${isSelected ? "scale-110" : ""}`}
              >
                <span className={`text-sm font-bold ${textColor}`}>
                  {stats?.value !== undefined ? (stats.value <= 100 ? `${stats.value}%` : stats.value) : ""}
                </span>
              </div>
              <span
                className={`mt-1 text-xs font-medium ${isSelected || isHovered ? "text-white" : "text-white/70"} whitespace-nowrap`}
              >
                {stats?.name || district}
              </span>
            </div>

            {/* Tooltip on hover */}
            {isHovered && (
              <div className="absolute top-0 left-full ml-2 z-20 bg-black/80 text-white text-xs p-2 rounded shadow-lg pointer-events-none whitespace-nowrap">
                <div className="font-bold">{stats?.name}</div>
                <div>{getTooltipText(district, stats)}</div>
              </div>
            )}
          </div>
        )
      })}

      {/* Animated beams connecting districts to Dhaka */}
      {Object.keys(nodeRefs).map((district) => {
        if (district === "dhaka" || !nodeRefs[district]?.current || !centralRef?.current) return null

        const isActive = selectedDistrict === district || selectedDistrict === null
        if (!isActive) return null

        return (
          <AnimatedBeam
            key={`beam-${district}`}
            containerRef={containerRef}
            fromRef={nodeRefs[district]}
            toRef={centralRef}
            gradientStartColor={getBeamColor(district, districtStats)}
            gradientStopColor="#3b82f6"
            pathColor="#1e293b"
            pathOpacity={0.4}
            delay={Math.random() * 2}
            duration={4 + Math.random() * 2}
          />
        )
      })}
    </div>
  )
}

// Helper function to determine tooltip text based on view mode
function getTooltipText(district: string, stats?: DistrictStats): string {
  if (!stats) return ""

  // Determine what type of data we're showing based on the value
  if (stats.value > 0 && stats.value <= 100) {
    return `Attendance Rate: ${stats.value}%`
  } else if (stats.value > 100) {
    return `Total Employees: ${stats.value}`
  } else {
    return `Office Locations: ${stats.value}`
  }
}

// Helper function to get beam color based on district data
function getBeamColor(district: string, districtStats: Record<string, DistrictStats>): string {
  const stats = districtStats[district]
  if (!stats) return "#3b82f6"

  if (stats.value <= 100) {
    // Attendance percentage
    if (stats.value >= 90) return "#22c55e" // green
    if (stats.value >= 80) return "#10b981" // emerald
    if (stats.value >= 70) return "#eab308" // yellow
    return "#ef4444" // red
  } else {
    // Employee count
    if (stats.value >= 400) return "#a855f7" // purple
    if (stats.value >= 300) return "#6366f1" // indigo
    if (stats.value >= 200) return "#3b82f6" // blue
    if (stats.value >= 100) return "#06b6d4" // cyan
    return "#14b8a6" // teal
  }
}

