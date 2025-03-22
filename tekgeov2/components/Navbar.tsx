"use client"
import { useState, useEffect, useRef } from "react"
import { Menu, X, MapPin, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// Navigation items with dropdown menus
const navItems = [
  {
    label: "Features",
    href: "#features",
    current: false,
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Geo Tracking",
        description: "Real-time location tracking with advanced analytics",
        href: "#maps-integration",
      },
      {
        title: "Maps Integration",
        description: "Seamless integration with multiple map providers",
        href: "#maps-integration",
      },
      {
        title: "Custom Markers",
        description: "Create and customize location markers",
        href: "#maps-integration",
      },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    current: false,
    hasDropdown: true,
    dropdownItems: [
      {
        title: "For Businesses",
        description: "Enterprise-grade location services",
        href: "#business-solutions",
      },
      {
        title: "For Developers",
        description: "APIs and SDKs for custom implementations",
        href: "#business-solutions",
      },
      {
        title: "For Industries",
        description: "Specialized solutions for different sectors",
        href: "#business-solutions",
      },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    current: false,
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Documentation",
        description: "Comprehensive guides and API references",
        href: "#documentation",
      },
      {
        title: "Blog",
        description: "Latest updates and tech insights",
        href: "#blog",
      },
      {
        title: "Case Studies",
        description: "Success stories from our customers",
        href: "#case-studies",
      },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
    current: false,
    hasDropdown: false,
  },
  {
    label: "Contact",
    href: "#contact",
    current: false,
    hasDropdown: false,
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [dropdownDirection, setDropdownDirection] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Initial check
    handleScroll()

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null) {
        const dropdownContent = document.getElementById(`dropdown-content-${activeDropdown}`)
        const dropdownTrigger = document.getElementById(`dropdown-trigger-${activeDropdown}`)

        if (
          dropdownContent &&
          !dropdownContent.contains(event.target as Node) &&
          dropdownTrigger &&
          !dropdownTrigger.contains(event.target as Node)
        ) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleDropdownClick = (index: number) => {
    if (activeDropdown === index) {
      // If clicking the same dropdown trigger, close it
      setActiveDropdown(null)
      setDropdownDirection(null)
    } else {
      // If clicking a different dropdown trigger
      if (typeof activeDropdown === "number" && typeof index === "number") {
        setDropdownDirection(activeDropdown > index ? "r" : "l")
      }
      setActiveDropdown(index)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out py-4",
        scrolled ? "bg-blue-950/70 backdrop-blur-md border-b border-blue-900/30 py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">TekGeo</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={item.label} className="relative">
              {item.hasDropdown ? (
                <button
                  id={`dropdown-trigger-${index}`}
                  onClick={() => handleDropdownClick(index)}
                  className={cn(
                    "text-sm transition-all duration-200 hover:text-white flex items-center",
                    item.current ? "text-white font-medium" : "text-gray-300",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("ml-1 h-4 w-4 transition-transform", activeDropdown === index ? "rotate-180" : "")}
                  />
                </button>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    "text-sm transition-all duration-200 hover:text-white",
                    item.current ? "text-white font-medium" : "text-gray-300",
                  )}
                >
                  {item.label}
                </a>
              )}

              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === index && (
                    <div className="relative">
                      <motion.div
                        id={`dropdown-content-${index}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 top-[calc(100%_+_12px)] w-80 rounded-lg bg-blue-950/80 backdrop-blur-md border border-blue-500/20 p-4 shadow-xl shadow-blue-900/20"
                      >
                        {/* Dropdown arrow/nub */}
                        <NubElement index={index} />

                        <motion.div
                          initial={{
                            opacity: 0,
                            x: dropdownDirection === "l" ? 100 : dropdownDirection === "r" ? -100 : 0,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="grid gap-3">
                            {item.dropdownItems?.map((dropItem, idx) => (
                              <a
                                key={idx}
                                href={dropItem.href}
                                className="block p-2 hover:bg-blue-600/10 rounded-md transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <h3 className="text-white text-sm font-medium">{dropItem.title}</h3>
                                <p className="text-gray-400 text-xs mt-1">{dropItem.description}</p>
                              </a>
                            ))}
                          </div>

                          <div className="mt-3 pt-2 border-t border-blue-500/20">
                            <a
                              href={item.href}
                              className="flex items-center text-blue-400 text-sm hover:text-blue-300 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>View all {item.label}</span>
                              <ChevronDown className="ml-1 h-4 w-4 -rotate-90" />
                            </a>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 text-sm font-medium"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className={cn(
            "md:hidden p-2 z-[110] relative",
            isMenuOpen ? "text-white bg-blue-600 rounded-full" : "text-white",
          )}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[105] bg-gradient-to-br from-blue-950 to-black overflow-y-auto"
            style={{ height: "100vh" }} // Force full viewport height
          >
            <div className="pt-20 pb-10 container mx-auto px-4">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <div className="mb-4">
                        <div
                          className="flex items-center justify-between py-3 text-white text-lg font-medium border-b border-blue-800/30 cursor-pointer"
                          onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${activeDropdown === index ? "rotate-180" : ""}`}
                          />
                        </div>

                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 ml-4 space-y-3 py-2">
                                {item.dropdownItems?.map((dropItem, idx) => (
                                  <a
                                    key={idx}
                                    href={dropItem.href}
                                    className="block py-2 text-gray-300 hover:text-white"
                                    onClick={() => {
                                      setActiveDropdown(null)
                                      setIsMenuOpen(false)
                                    }}
                                  >
                                    <div className="text-sm font-medium">{dropItem.title}</div>
                                    <div className="text-xs text-gray-400">{dropItem.description}</div>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-white text-lg font-medium border-b border-blue-800/30"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block mt-6 px-5 py-3 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-medium shadow-lg shadow-blue-900/20"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Component for the dropdown arrow/nub
const NubElement = ({ index }: { index: number }) => {
  const [left, setLeft] = useState(25) // Default position

  useEffect(() => {
    const positionNub = () => {
      const triggerElement = document.getElementById(`dropdown-trigger-${index}`)
      const dropdownElement = document.getElementById(`dropdown-content-${index}`)

      if (!triggerElement || !dropdownElement) return

      const triggerRect = triggerElement.getBoundingClientRect()
      const dropdownRect = dropdownElement.getBoundingClientRect()

      // Calculate the center of the trigger relative to the dropdown
      const triggerCenter = triggerRect.left + triggerRect.width / 2
      const dropdownLeft = dropdownRect.left

      // Set the nub position to align with the center of the trigger
      setLeft(triggerCenter - dropdownLeft)
    }

    positionNub()
    window.addEventListener("resize", positionNub)

    return () => {
      window.removeEventListener("resize", positionNub)
    }
  }, [index])

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        left,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-blue-500/20 bg-blue-950"
    />
  )
}

