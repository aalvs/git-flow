"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/src/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" as `${number}px` })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : 0,
      x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedStagger({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
}: {
  children: React.ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" as `${number}px` })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] } },
}
