"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/src/lib/utils"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  id: string
  icon: ReactNode
  title: string
  subtitle?: string
  color?: string
  className?: string
}

export function SectionHeader({ id, icon, title, subtitle, color = "text-primary", className }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" as `${number}px` })

  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn("flex items-start gap-4 mb-8", className)}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div
        className={cn("mt-1 p-2.5 rounded-lg bg-muted border border-border", color)}
        initial={{ scale: 0.7, rotate: -8 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.7, rotate: -8 }}
        transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 260 }}
      >
        {icon}
      </motion.div>
      <div>
        <motion.h2
          className={cn("text-2xl font-bold font-mono tracking-tight text-balance", color)}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="mt-1 text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
