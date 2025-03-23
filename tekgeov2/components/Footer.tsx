"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "./hooks/use-mobile"
import TekGeoLogo from "./logo"
// import { useIsMobile } from "@/hooks/use-mobile"

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" })
  const isMobile = useIsMobile()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Demo", href: "#" },
        { name: "API", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ]

  return (
    <footer id="contact" ref={containerRef} className="relative overflow-hidden bg-black">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a1a3a,_transparent_50%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0f172a,_transparent_50%)] opacity-20"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="mb-4 flex items-center">
              <TekGeoLogo/>
              {/* <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TekGeo</span> */}
            </div>
            <p className="mb-6 max-w-md text-blue-200/80">
              Revolutionizing attendance tracking with geolocation technology. Empower your distributed teams with
              accurate, real-time attendance management across the globe.
            </p>
            <div className="mb-8 space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-blue-500" />
                <span className="text-sm text-blue-200/80">House-56, Road-16, sector-14 Uttara Dhaka 1230,Bangladesh</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-blue-500" />
                <span className="text-sm text-blue-200/80">info@teksoi.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-blue-500" />
                <span className="text-sm text-blue-200/80">+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook className="h-4 w-4" />} />
              <SocialIcon icon={<Twitter className="h-4 w-4" />} />
              <SocialIcon icon={<Instagram className="h-4 w-4" />} />
              <SocialIcon icon={<Linkedin className="h-4 w-4" />} />
              <SocialIcon icon={<Github className="h-4 w-4" />} />
            </div>
          </motion.div>

          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * (columnIndex + 1) }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-blue-200/80 transition hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Newsletter subscription - now properly responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12  "
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <span className="text-sm font-medium text-blue-200/80"></span>
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 md:w-auto">
              <span className="text-sm mr-6 font-medium text-blue-200/80">Subscribe to our newsletter</span>
              <Input
                type="email"
                placeholder="Enter your email"
                className={`${isMobile ? 'w-full' : 'w-64'} border-blue-900/30 bg-blue-950/30 text-white placeholder:text-blue-200/40 focus-visible:ring-blue-500 ${!isMobile && 'rounded-r-none'}`}
              />
              <Button className={`${!isMobile && 'rounded-l-none'} bg-blue-600 hover:bg-blue-700  text-white ${isMobile && 'w-full'}`}>
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="py-3 text-center"
        >
          <h2 
            className="bg-gradient-to-b from-white via-blue-500 to-blue-700 bg-clip-text text-transparent 
                      font-bold 
                      tracking-tight  
                      text-6xl 
                      sm:text-7xl 
                      md:text-8xl 
                      lg:text-9xl">
            TEKGEO
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-blue-900/30 py-8"
        >
          <div className="flex flex-col items-center justify-center text-center md:flex-row md:justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <span className="text-sm text-blue-200/60">© 2025 TekGeo. All rights reserved.</span>
              <div className="hidden sm:block h-4 w-px bg-blue-900/50"></div>
              <Link href="#" className="text-sm text-blue-200/60 hover:text-white">
                Privacy Policy
              </Link>
              <div className="hidden sm:block h-4 w-px bg-blue-900/50"></div>
              <Link href="#" className="text-sm text-blue-200/60 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950/50 text-blue-400 transition hover:bg-blue-900/50 hover:text-white"
    >
      {icon}
    </a>
  )
}









// "use client"

// import type React from "react"

// import { useRef } from "react"
// import Link from "next/link"
// import { motion, useInView } from "motion/react"
// import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function Footer() {
//   const containerRef = useRef<HTMLElement>(null)
//   const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" })

//   const footerLinks = [
//     {
//       title: "Product",
//       links: [
//         { name: "Features", href: "#" },
//         { name: "Integrations", href: "#" },
//         { name: "Pricing", href: "#" },
//         { name: "Demo", href: "#" },
//         { name: "API", href: "#" },
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { name: "Documentation", href: "#" },
//         { name: "Guides", href: "#" },
//         { name: "Case Studies", href: "#" },
//         { name: "Blog", href: "#" },
//         { name: "Support", href: "#" },
//       ],
//     },
//     {
//       title: "Company",
//       links: [
//         { name: "About Us", href: "#" },
//         { name: "Careers", href: "#" },
//         { name: "Press", href: "#" },
//         { name: "Partners", href: "#" },
//         { name: "Contact", href: "#" },
//       ],
//     },
    
//   ]

//   return (
//     <footer id="contact" ref={containerRef} className="relative overflow-hidden bg-black">
//       {/* Background gradients */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a1a3a,_transparent_50%)] opacity-30"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0f172a,_transparent_50%)] opacity-20"></div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        
//         <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 lg:grid-cols-5 ">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-2"
//           >
//             <div className="mb-6 flex items-centerc ">
//               <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
//                 <MapPin className="h-5 w-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">TekGeo</span>
//             </div>
//             <p className="mb-6 max-w-md text-blue-200/80">
//               Revolutionizing attendance tracking with geolocation technology. Empower your distributed teams with
//               accurate, real-time attendance management across the globe.
//             </p>
//             <div className="mb-8 space-y-3">
//               <div className="flex items-center">
//                 <MapPin className="mr-3 h-5 w-5 text-blue-500" />
//                 <span className="text-sm text-blue-200/80">House-56, Road-16, sector-14 Uttara Dhaka 1230,Bangladesh</span>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="mr-3 h-5 w-5 text-blue-500" />
//                 <span className="text-sm text-blue-200/80">info@teksoi.com</span>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="mr-3 h-5 w-5 text-blue-500" />
//                 <span className="text-sm text-blue-200/80">+1 (555) 123-4567</span>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <SocialIcon icon={<Facebook className="h-4 w-4" />} />
//               <SocialIcon icon={<Twitter className="h-4 w-4" />} />
//               <SocialIcon icon={<Instagram className="h-4 w-4" />} />
//               <SocialIcon icon={<Linkedin className="h-4 w-4" />} />
//               <SocialIcon icon={<Github className="h-4 w-4" />} />
//             </div>
//           </motion.div>

//           {footerLinks.map((column, columnIndex) => (
//             <motion.div
//               key={column.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//               transition={{ duration: 0.5, delay: 0.1 * (columnIndex + 1) }}
//               className=" h-54"
//             >
//               <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">{column.title}</h3>
//               <ul className="space-y-3">
//                 {column.links.map((link) => (
//                   <li key={link.name}>
//                     <Link href={link.href} className="text-blue-200/80 transition hover:text-white ">
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
              
//             </motion.div>
//           ))}
//           <div className="relative bg-black w-full">
//           <div className="flex items-center absolute bottom-2 right-0  gap-2 mb-10">
//               <span className="text-sm  text-blue-200/60">Subscribe for newsletter</span>
//               <div className="flex">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-64 rounded-r-none border-blue-900/30 bg-blue-950/30 text-white placeholder:text-blue-200/40 focus-visible:ring-blue-500"
//                 />
//                 <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Subscribe</Button>
//               </div>
//             </div>
//             </div>
//         </div>
        
        
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="py-3 text-center"
//         >
//              {/* from-blue-400 via-indigo-500 to-purple-600 text-transparent */}
//              <h2 
//   className="bg-gradient-to-b from-white via-blue-500 to-blue-700 bg-clip-text text-transparent 
//              font-extrabold 
//              font-custom
//              tracking-tight  
//              text-8xl 
//              sm:text-6xl 
//              md:text-7xl 
//              lg:text-9xl">
//   TEKGEO
// </h2>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="border-t border-blue-900/30 py-8"
//         >
//           <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
//             <div className=" flex-wrap items-center gap-6 text-sm hidden sm:block">
//               <span className="text-sm text-blue-200/60">© 2025 TekGeo. All rights reserved.</span>
//               <div className="h-4 w-px bg-blue-900/50 "></div>
//               <Link href="#" className="text-sm text-blue-200/60 hover:text-white">
//                 Privacy Policy
//               </Link>
//               <div className="h-4 w-px bg-blue-900/50"></div>
//               <Link href="#" className="text-sm text-blue-200/60 hover:text-white">
//                 Terms of Service
//               </Link>
//             </div>
//             {/* <div className="flex items-center gap-2">
//               <span className="text-sm hidden sm:block text-blue-200/60">Subscribe for newsletter</span>
//               <div className="flex">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-64 rounded-r-none border-blue-900/30 bg-blue-950/30 text-white placeholder:text-blue-200/40 focus-visible:ring-blue-500"
//                 />
//                 <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Subscribe</Button>
//               </div>
//             </div> */}
//           </div>
//         </motion.div>

//         {/* <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="py-16 text-center"
//         >
//           <h2 className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl md:text-9xl">
//             TEKGEO
//           </h2>
//         </motion.div> */}
//       </div>
      
//     </footer>
//   )
// }

// function SocialIcon({ icon }: { icon: React.ReactNode }) {
//   return (
//     <a
//       href="#"
//       className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950/50 text-blue-400 transition hover:bg-blue-900/50 hover:text-white"
//     >
//       {icon}
//     </a>
//   )
// }

