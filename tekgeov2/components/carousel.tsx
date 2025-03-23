"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useMotionValue } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// YouTube video IDs
const videos = [
  "KJz5f_9mV7E", // Replace with your actual YouTube video IDs
  "iu8MoLlS_aI",
  "fIA1wtEF8Yc",
  "4CZ_1LHeBu8",
  "e56wGv6K8SI",
]

// Video titles
const videoTitles = [
  "TekGeo Attendance System Overview",
  "Remote Work Geolocation Tracking Demo",
  "How TekGeo Improves Workforce Management",
  "TekGeo Mobile App Features",
  "Customer Success Stories with TekGeo",
]

const ONE_SECOND = 1000
const AUTO_DELAY = ONE_SECOND * 180
const DRAG_BUFFER = 50

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
}

export default function VideoCarousel() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const dragX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Handle autoplay
  useEffect(() => {
    if (autoplayPaused) return

    intervalRef.current = setInterval(() => {
      const x = dragX.get()

      if (x === 0 && !isPlaying) {
        setVideoIndex((prev) => {
          if (prev === videos.length - 1) {
            return 0
          }
          return prev + 1
        })
      }
    }, AUTO_DELAY)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplayPaused, dragX, isPlaying])

  // Pause autoplay when a video is playing
  useEffect(() => {
    if (isPlaying) {
      setAutoplayPaused(true)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } else {
      setAutoplayPaused(false)
    }
  }, [isPlaying])

  // Stop all videos when changing slides
  useEffect(() => {
    // When videoIndex changes, set isPlaying to false to stop any playing videos
    setIsPlaying(false);
  }, [videoIndex]);

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && videoIndex < videos.length - 1) {
      setVideoIndex((prev) => prev + 1)
    } else if (x >= DRAG_BUFFER && videoIndex > 0) {
      setVideoIndex((prev) => prev - 1)
    }
  }

  const handlePrevious = () => {
    if (videoIndex > 0) {
      setVideoIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (videoIndex < videos.length - 1) {
      setVideoIndex((prev) => prev + 1)
    }
  }

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a1a3a,_transparent_50%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0f172a,_transparent_50%)] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            See TekGeo in Action
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-200/80">
            Explore our video gallery to see how TekGeo transforms attendance tracking for distributed teams worldwide.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={cn(
            "relative mx-auto overflow-hidden rounded-2xl border bg-black/40 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] backdrop-blur-sm transition-colors duration-300",
            isHovering ? "border-blue-500" : "border-blue-900/30"
          )}
        >
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            style={{
              x: dragX,
            }}
            animate={{
              translateX: `-${videoIndex * 100}%`,
            }}
            transition={SPRING_OPTIONS}
            onDragEnd={onDragEnd}
            className="flex cursor-grab items-center active:cursor-grabbing"
          >
            <VideoFrames
              videoIndex={videoIndex}
              videos={videos}
              videoTitles={videoTitles}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </motion.div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-6">
            <button
              onClick={handlePrevious}
              disabled={videoIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-6">
            <button
              onClick={handleNext}
              disabled={videoIndex === videos.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50 md:h-12 md:w-12"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </button>
          </div>

          <Dots videoIndex={videoIndex} setVideoIndex={setVideoIndex} videos={videos} />
          {/* <GradientEdges /> */}
        </div>
      </div>
    </section>
  )
}

const VideoFrames = ({
  videoIndex,
  videos,
  videoTitles,
  isPlaying,
  setIsPlaying,
}: {
  videoIndex: number
  videos: string[]
  videoTitles: string[]
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // Reset iframe references when videoIndex changes
  const [activeIframeId, setActiveIframeId] = useState<string | null>(null);

  return (
    <>
      {videos.map((videoId, idx) => {
        const isActive = videoIndex === idx

        return (
          <div id="business-solutions" key={idx} className="w-full min-w-full">
            <div className="h-full w-full">
              <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
                <LazyVideo
                  videoId={videoId}
                  title={videoTitles[idx]}
                  isActive={isActive}
                  isPlaying={isPlaying && isActive}
                  setIsPlaying={setIsPlaying}
                  activeIframeId={activeIframeId}
                  setActiveIframeId={setActiveIframeId}
                  uniqueId={`video-${idx}-${videoId}`}
                />
                {/* <div className="absolute top-0  right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h3 className="text-lg font-semibold md:text-xl">{videoTitles[idx]}</h3>
                </div> */}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

const LazyVideo = ({
  videoId,
  title,
  isActive,
  isPlaying,
  setIsPlaying,
  activeIframeId,
  setActiveIframeId,
  uniqueId,
}: {
  videoId: string
  title: string
  isActive: boolean
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  activeIframeId: string | null
  setActiveIframeId: React.Dispatch<React.SetStateAction<string | null>>
  uniqueId: string
}) => {
  const [showVideo, setShowVideo] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Only load the iframe when the video is active
  useEffect(() => {
    if (isActive) {
      setShowVideo(true)
    }
  }, [isActive])

  // Stop video when it's no longer active
  useEffect(() => {
    if (!isActive && iframeRef.current) {
      // Reset iframe src to stop the video
      if (iframeRef.current.src) {
        const currentSrc = iframeRef.current.src;
        iframeRef.current.src = currentSrc.split('?')[0] + '?rel=0&modestbranding=1';
        
        if (activeIframeId === uniqueId) {
          setActiveIframeId(null);
          setIsPlaying(false);
        }
      }
    }
  }, [isActive, activeIframeId, uniqueId, setActiveIframeId, setIsPlaying]);

  const handlePlay = () => {
    setShowVideo(true)
    setIsPlaying(true)
    setActiveIframeId(uniqueId);

    // Add autoplay parameter to URL
    if (iframeRef.current && iframeRef.current.src && !iframeRef.current.src.includes("autoplay=1")) {
      iframeRef.current.src += "&autoplay=1"
    }
  }

  return (
    <div className="absolute inset-0 h-full w-full bg-black">
      {showVideo ? (
        <iframe
          ref={iframeRef}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => {
            if (isActive && !isPlaying) {
              // If this is the active video and not already playing, show the thumbnail
            }
          }}
        ></iframe>
      ) : (
        <div className="absolute inset-0 h-full w-full cursor-pointer" onClick={handlePlay}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Thumbnail for ${title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 md:h-20 md:w-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 translate-x-0.5 md:h-10 md:w-10"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const Dots = ({
  videoIndex,
  setVideoIndex,
  videos,
}: { videoIndex: number; setVideoIndex: React.Dispatch<React.SetStateAction<number>>; videos: string[] }) => {
  return (
    <div className="absolute bottom-4 left-0 right-0">
      <div className="flex justify-center gap-2">
        {videos.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setVideoIndex(idx)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 md:h-3 md:w-3",
                idx === videoIndex ? "bg-blue-500 scale-110" : "bg-white/30 hover:bg-white/50",
              )}
              aria-label={`Go to video ${idx + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-black/80 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-black/80 to-transparent" />
    </>
  )
}














// "use client"

// import type React from "react"
// import { useEffect, useState, useRef } from "react"
// import { motion, useMotionValue } from "motion/react"
// import { ChevronLeft, ChevronRight, Play } from "lucide-react"
// import { cn } from "@/lib/utils"

// // YouTube video IDs
// const videos = [
//   "KJz5f_9mV7E", // Replace with your actual YouTube video IDs
//   "iu8MoLlS_aI",
//   "fIA1wtEF8Yc",
//   "4CZ_1LHeBu8",
//   "e56wGv6K8SI",
// ]

// // Video titles
// const videoTitles = [
//   "TekGeo Attendance System Overview",
//   "Remote Work Geolocation Tracking Demo",
//   "How TekGeo Improves Workforce Management",
//   "TekGeo Mobile App Features",
//   "Customer Success Stories with TekGeo",
// ]

// const ONE_SECOND = 1000
// const AUTO_DELAY = ONE_SECOND * 120
// const DRAG_BUFFER = 50

// const SPRING_OPTIONS = {
//   type: "spring",
//   mass: 3,
//   stiffness: 400,
//   damping: 50,
// }

// export default function YouTubeVideoCarousel() {
//   const [videoIndex, setVideoIndex] = useState(0)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [autoplayPaused, setAutoplayPaused] = useState(false)
//   const dragX = useMotionValue(0)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const carouselRef = useRef<HTMLDivElement>(null)
//   const intervalRef = useRef<NodeJS.Timeout | null>(null)

//   // Handle autoplay
//   useEffect(() => {
//     if (autoplayPaused) return

//     intervalRef.current = setInterval(() => {
//       const x = dragX.get()

//       if (x === 0 && !isPlaying) {
//         setVideoIndex((prev) => {
//           if (prev === videos.length - 1) {
//             return 0
//           }
//           return prev + 1
//         })
//       }
//     }, AUTO_DELAY)

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//       }
//     }
//   }, [autoplayPaused, dragX, isPlaying])

//   // Pause autoplay when a video is playing
//   useEffect(() => {
//     if (isPlaying) {
//       setAutoplayPaused(true)
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//       }
//     } else {
//       setAutoplayPaused(false)
//     }
//   }, [isPlaying])

//   const onDragEnd = () => {
//     const x = dragX.get()

//     if (x <= -DRAG_BUFFER && videoIndex < videos.length - 1) {
//       setVideoIndex((prev) => prev + 1)
//     } else if (x >= DRAG_BUFFER && videoIndex > 0) {
//       setVideoIndex((prev) => prev - 1)
//     }
//   }

//   const handlePrevious = () => {
//     if (videoIndex > 0) {
//       setVideoIndex((prev) => prev - 1)
//     }
//   }

//   const handleNext = () => {
//     if (videoIndex < videos.length - 1) {
//       setVideoIndex((prev) => prev + 1)
//     }
//   }

//   return (
//     <section id="business-solutions" className="relative overflow-hidden bg-tekgeo-darker py-24 md:py-18">
//       {/* Background gradients */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#1a1a3a,_transparent_50%)] opacity-40"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0f172a,_transparent_50%)] opacity-30"></div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto mb-8 max-w-3xl text-center">
//           <h2 className="mb-6 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-4xl  tracking-tight text-transparent sm:text-5xl">
//             Our solutions
//           </h2>
//           <p className="mx-auto max-w-2xl text-lg text-blue-200/80">
//             Watch how our revolutionary geolocation attendance tracking system transforms workforce management for
//             distributed teams across the globe.
//           </p>
//         </div>

//         <div
//           ref={containerRef}
//           className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-blue-900/30 bg-black/40 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] backdrop-blur-sm"
//         >
//           <div ref={carouselRef} className="relative w-full">
//             <motion.div
//               drag="x"
//               dragConstraints={{
//                 left: 0,
//                 right: 0,
//               }}
//               style={{
//                 x: dragX,
//               }}
//               animate={{
//                 translateX: `-${videoIndex * 100}%`,
//               }}
//               transition={SPRING_OPTIONS}
//               onDragEnd={onDragEnd}
//               className="flex cursor-grab items-center active:cursor-grabbing"
//             >
//               <VideoFrames
//                 videoIndex={videoIndex}
//                 videos={videos}
//                 videoTitles={videoTitles}
//                 isPlaying={isPlaying}
//                 setIsPlaying={setIsPlaying}
//               />
//             </motion.div>

//             <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 md:left-6">
//               <button
//                 onClick={handlePrevious}
//                 disabled={videoIndex === 0}
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50 md:h-12 md:w-12"
//                 aria-label="Previous video"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 md:right-6">
//               <button
//                 onClick={handleNext}
//                 disabled={videoIndex === videos.length - 1}
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:opacity-50 md:h-12 md:w-12"
//                 aria-label="Next video"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
//             </div>

//             <Dots videoIndex={videoIndex} setVideoIndex={setVideoIndex} videos={videos} />
            
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// const VideoFrames = ({
//   videoIndex,
//   videos,
//   videoTitles,
//   isPlaying,
//   setIsPlaying,
// }: {
//   videoIndex: number
//   videos: string[]
//   videoTitles: string[]
//   isPlaying: boolean
//   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
// }) => {
//   return (
//     <>
//       {videos.map((videoId, idx) => {
//         const isActive = videoIndex === idx

//         return (
//           <div key={idx} className="w-full flex-shrink-0 aspect-video" style={{ width: "100%" }}>
//             <LazyVideo
//               videoId={videoId}
//               title={videoTitles[idx]}
//               isActive={isActive}
//               isPlaying={isPlaying}
//               setIsPlaying={setIsPlaying}
//             />
//           </div>
//         )
//       })}
//     </>
//   )
// }

// const LazyVideo = ({
//   videoId,
//   title,
//   isActive,
//   isPlaying,
//   setIsPlaying,
// }: {
//   videoId: string
//   title: string
//   isActive: boolean
//   isPlaying: boolean
//   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
// }) => {
//   const [showVideo, setShowVideo] = useState(false)
//   const iframeRef = useRef<HTMLIFrameElement>(null)

//   // Only load the iframe when the video is active
//   useEffect(() => {
//     if (isActive) {
//       setShowVideo(true)
//     }
//   }, [isActive])

//   const handlePlay = () => {
//     setShowVideo(true)
//     setIsPlaying(true)

//     // Add autoplay parameter to URL
//     if (iframeRef.current && iframeRef.current.src && !iframeRef.current.src.includes("autoplay=1")) {
//       iframeRef.current.src += "&autoplay=1"
//     }
//   }

//   return (
//     <div className="relative w-full h-full overflow-hidden rounded-lg">
//       {showVideo ? (
//         <div className="relative w-full h-full">
//           <iframe
//             ref={iframeRef}
//             className="absolute inset-0 w-full h-full"
//             src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             loading="lazy"
//           ></iframe>

//           {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white pointer-events-none">
//             <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
//           </div> */}
//         </div>
//       ) : (
//         <div className="relative h-full w-full cursor-pointer group" onClick={handlePlay}>
//           <img
//             src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
//             alt={`Thumbnail for ${title}`}
//             className="h-full w-full object-cover"
//             loading="lazy"
//           />
//           <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
//             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition transform group-hover:scale-110 group-hover:bg-blue-700 md:h-20 md:w-20">
//               <Play className="h-8 w-8 fill-current" />
//             </div>
//           </div>

//           {/* 
//            */}
//         </div>
//       )}
//     </div>
//   )
// }

// const Dots = ({
//   videoIndex,
//   setVideoIndex,
//   videos,
// }: { videoIndex: number; setVideoIndex: React.Dispatch<React.SetStateAction<number>>; videos: string[] }) => {
//   return (
//     <div className="absolute bottom-4 left-0 right-0 z-10">
//       <div className="flex justify-center gap-2">
//         {videos.map((_, idx) => {
//           return (
//             <button
//               key={idx}
//               onClick={() => setVideoIndex(idx)}
//               className={cn(
//                 "h-2.5 w-2.5 rounded-full transition-all duration-300 md:h-3 md:w-3",
//                 idx === videoIndex ? "bg-blue-500 scale-110" : "bg-white/30 hover:bg-white/50",
//               )}
//               aria-label={`Go to video ${idx + 1}`}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// const GradientEdges = () => {
//   return (
//     <>
//       <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-black/80 to-transparent z-10" />
//       <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-black/80 to-transparent z-10" />
//     </>
//   )
// }

