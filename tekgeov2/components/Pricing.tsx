"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
  gradient?: string
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams just getting started with remote work.",
    features: [
      "Up to 25 employees",
      "Basic geolocation tracking",
      "Standard reports",
      "Email support",
      "1 office location",
    ],
    cta: "Start Free Trial",
    gradient: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  },
  {
    name: "Professional",
    price: "$249",
    description: "Ideal for growing companies with distributed teams.",
    features: [
      "Up to 100 employees",
      "Advanced geolocation tracking",
      "Custom reports & analytics",
      "Priority support",
      "5 office locations",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-blue-600/30 to-indigo-600/30 border-blue-500/40",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations with complex needs.",
    features: [
      "Unlimited employees",
      "Advanced geolocation with AI",
      "Custom integrations",
      "Dedicated account manager",
      "Unlimited office locations",
      "Advanced security features",
      "API access",
    ],
    cta: "Contact Sales",
    gradient: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
  },
]

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" })

  return (
    <section id="pricing" className=" font-custom relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#1a1a3a,_transparent_50%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0f172a,_transparent_50%)] opacity-30"></div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-white via-blue-300 to-blue-600 bg-clip-text text-4xl  tracking-tight text-transparent sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-200/80">
            Choose the plan that fits your team's needs. All plans include a 14-day free trial with no credit card
            required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <Card
                className={cn(
                  "relative h-full overflow-hidden bg-gradient-to-br border backdrop-blur-sm",
                  tier.gradient || "from-blue-950/40 to-indigo-950/40 border-blue-900/30",
                  tier.popular && "shadow-[0_0_30px_-12px_rgba(59,130,246,0.5)]",
                )}
              >
                {tier.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="h-20 w-20 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    <span className="absolute right-0 top-0 mr-2 mt-2 text-xs font-medium text-white">Popular</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="ml-1 text-xl font-semibold">/month</span>}
                  </div>
                  <CardDescription className="mt-2 text-blue-200/70">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="ml-3 text-sm text-blue-100/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={cn(
                      "w-full",
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                        : "bg-blue-950/50 text-white hover:bg-blue-900/50",
                    )}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-16 max-w-3xl rounded-xl border border-blue-900/30 bg-blue-950/20 p-6 text-center backdrop-blur-sm"
        >
          <h3 className="mb-2 text-xl font-semibold text-white ">Need a custom solution?</h3>
          <p className="mb-4 text-blue-200/80">
            Contact our sales team for a personalized demo and custom pricing tailored to your organization's needs.
          </p>
          <Button className="bg-white text-blue-950 hover:bg-blue-100">Contact Sales</Button>
        </motion.div> */}
      </div>
    </section>
  )
}

