"use client"

import { motion } from "framer-motion"
import { cn } from "@/src/lib/utils"
import type { ReactNode } from "react"

interface StepCardProps {
  step: number
  title: string
  children: ReactNode
  color?: string
  className?: string
}

export const stepCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export function StepCard({ step, title, children, color = "border-primary/30", className }: StepCardProps) {
  return (
    <motion.div
      className={cn("relative rounded-xl border bg-card p-5 flex gap-4", color, className)}
      variants={stepCardVariants}
      custom={step - 1}
      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="shrink-0">
        <motion.div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-sans bg-muted border",
            color,
          )}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: (step - 1) * 0.1 + 0.2, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          {step}
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground mb-2 text-sm font-sans">{title}</h4>
        <div className="space-y-2">{children}</div>
      </div>
    </motion.div>
  )
}
