"use client"

import type React from "react"
import { useState } from "react"
import { BangladeshMap } from "@/components/ui/bd-map"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { AttendanceNotifications } from "./notification"

// Sample attendance data for Bangladesh districts
const attendanceData = {
  dhaka: { present: 87, absent: 5, late: 8, total: 450 },
  chittagong: { present: 82, absent: 8, late: 10, total: 320 },
  sylhet: { present: 91, absent: 3, late: 6, total: 180 },
  rajshahi: { present: 85, absent: 7, late: 8, total: 210 },
  khulna: { present: 79, absent: 12, late: 9, total: 190 },
  barisal: { present: 83, absent: 9, late: 8, total: 150 },
  rangpur: { present: 88, absent: 6, late: 6, total: 170 },
  mymensingh: { present: 81, absent: 10, late: 9, total: 140 },
}

type DistrictKey = keyof typeof attendanceData

interface DistrictStats {
  name: string
  value: number
  color: string
}

export default function BangladeshAttendanceMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey | null>(null)
  const [viewMode, setViewMode] = useState<"employees" | "attendance" | "offices">("employees")

  // Generate district stats based on view mode
  const getDistrictStats = (): Record<DistrictKey, DistrictStats> => {
    const stats: Record<DistrictKey, DistrictStats> = {} as Record<DistrictKey, DistrictStats>

    Object.entries(attendanceData).forEach(([district, data]) => {
      const key = district as DistrictKey

      if (viewMode === "attendance") {
        stats[key] = {
          name: district.charAt(0).toUpperCase() + district.slice(1),
          value: data.present,
          color: getColorForPercentage(data.present),
        }
      } else if (viewMode === "employees") {
        stats[key] = {
          name: district.charAt(0).toUpperCase() + district.slice(1),
          value: data.total,
          color: getColorForEmployeeCount(data.total),
        }
      } else {
        // Offices view - just a sample calculation
        const officeCount = Math.ceil(data.total / 50)
        stats[key] = {
          name: district.charAt(0).toUpperCase() + district.slice(1),
          value: officeCount,
          color: getColorForOfficeCount(officeCount),
        }
      }
    })

    return stats
  }

  const districtStats = getDistrictStats()

  // Color functions
  function getColorForPercentage(percentage: number): string {
    if (percentage >= 90) return "from-green-500 to-green-600"
    if (percentage >= 80) return "from-emerald-500 to-teal-600"
    if (percentage >= 70) return "from-yellow-500 to-amber-600"
    return "from-red-500 to-red-600"
  }

  function getColorForEmployeeCount(count: number): string {
    if (count >= 400) return "from-purple-500 to-indigo-600"
    if (count >= 300) return "from-indigo-500 to-blue-600"
    if (count >= 200) return "from-blue-500 to-cyan-600"
    if (count >= 100) return "from-cyan-500 to-teal-600"
    return "from-teal-500 to-green-600"
  }

  function getColorForOfficeCount(count: number): string {
    if (count >= 8) return "from-amber-500 to-orange-600"
    if (count >= 6) return "from-orange-500 to-red-600"
    if (count >= 4) return "from-red-500 to-pink-600"
    return "from-pink-500 to-rose-600"
  }

  return (
    <section id="maps-integration" className="py-16 bg-black font-custom text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-transparent">
            Nationwide Attendance Tracking
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Real-time attendance data visualization across Bangladesh. Monitor employee attendance, track office
            locations, and analyze regional performance.
          </p>
        </div>

        <div className="  grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className=" hidden sm:block bg-black/40 border border-blue-800/30  overflow-hidden rounded-xl">
              <div className=" mb-2 ml-3">
                <Tabs defaultValue="employees"  className="p-4" onValueChange={(v) => setViewMode(v as any)}>
                  <TabsList className="bg-slate-900  ">
                    <TabsTrigger value="employees" >Employee Count</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance Rate</TabsTrigger>
                    <TabsTrigger value="offices">Office Locations</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="relative p-2 md:p-4 bg-gradient-to-r from-gray-950 via-black to-slate-950 ">
                <TooltipProvider>
                  <BangladeshMap
                    districtStats={districtStats}
                    onDistrictSelect={(district) => setSelectedDistrict(district as DistrictKey)}
                    selectedDistrict={selectedDistrict}
                    lineColor="#3b82f6"
                  />
                </TooltipProvider>
              </div>
            </Card>
          </div>

          <div>
            <Card className=" hidden bg-black/40 border border-blue-900/30 backdrop-blur-sm rounded-xl h-full">
              <div className=" ml-3 mb-2 border-b border-blue-900/30">
                <h3 className="text-lg text-white font-medium">
                  {selectedDistrict
                    ? `${selectedDistrict.charAt(0).toUpperCase() + selectedDistrict.slice(1)} Statistics`
                    : "Regional Statistics"}
                </h3>
              </div>

              <div className="p-4">
                {selectedDistrict ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm text-blue-200/70 mb-2">Attendance Overview</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <AttendanceCard
                          title="Present"
                          value={`${attendanceData[selectedDistrict].present}%`}
                          color="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30"
                          icon={<Icons.check className="h-4 w-4 text-green-500" />}
                        />
                        <AttendanceCard
                          title="Late"
                          value={`${attendanceData[selectedDistrict].late}%`}
                          color="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/30"
                          icon={<Icons.clock className="h-4 w-4 text-amber-500" />}
                        />
                        <AttendanceCard
                          title="Absent"
                          value={`${attendanceData[selectedDistrict].absent}%`}
                          color="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30"
                          icon={<Icons.x className="h-4 w-4 text-red-500" />}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-blue-200/70 mb-2">Employee Distribution</h4>
                      <div className="bg-blue-950/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Total Employees</span>
                          <span className="font-medium">{attendanceData[selectedDistrict].total}</span>
                        </div>
                        <div className="h-3 bg-blue-950/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                            style={{ width: `${(attendanceData[selectedDistrict].total / 450) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-blue-200/70 mb-2">Recent Activity</h4>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs p-2 rounded-lg bg-blue-950/20 border border-blue-900/20"
                          >
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center">
                              <Icons.user className="h-3 w-3 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white/90">Employee #{Math.floor(Math.random() * 1000)}</p>
                              <p className="text-blue-200/60">
                                Checked in at {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Icons.map className="h-12 w-12 text-blue-500/50 mb-4" />
                    <p className="text-blue-200/70">Select a region on the map to view detailed statistics</p>
                  </div>
                )}
              </div>
            </Card>
            <div className="mt-2 hidden sm:block">
            <AttendanceNotifications/>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value="1,810"
            change="+12%"
            icon={<Icons.users className="h-5 w-5" />}
            color="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20"
          />
          <StatCard
            title="Avg. Attendance"
            value="84.5%"
            change="+3.2%"
            icon={<Icons.check className="h-5 w-5" />}
            color="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"
          />
          <StatCard
            title="Office Locations"
            value="32"
            change="+2"
            icon={<Icons.building className="h-5 w-5" />}
            color="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/20"
          />
          <StatCard
            title="Remote Workers"
            value="425"
            change="+45"
            icon={<Icons.laptop className="h-5 w-5" />}
            color="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20"
          />
        </div>
      </div>
    </section>
  )
}

interface AttendanceCardProps {
  title: string
  value: string
  color: string
  icon: React.ReactNode
}

function AttendanceCard({ title, value, color, icon }: AttendanceCardProps) {
  return (
    <div className={cn("rounded-lg p-2 border", color)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-blue-200/70">{title}</span>
        {icon}
      </div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <div className={cn("rounded-lg p-4 border", color)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-blue-200/70">{title}</span>
        <div className="h-8 w-8 rounded-full bg-blue-950/30 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-xl font-medium">{value}</div>
      <div className="text-xs text-green-400">{change}</div>
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
  users: () => (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
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
  laptop: ({ className }: { className?: string }) => (
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
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
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
  map: () => {
    return (
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
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" x2="9" y1="3" y2="18" />
        <line x1="15" x2="15" y1="6" y2="21" />
      </svg>
    )
  },
}

