"use client"

import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/src/lib/utils"

interface CommandTooltipProps {
  children: React.ReactNode
  tooltip: string
  className?: string
}

export function CommandTooltip({ children, tooltip, className }: CommandTooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 120)
  }

  return (
    <span
      className={cn("relative inline-flex items-center cursor-help", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-[260px] pointer-events-none"
          >
            <div className="rounded-lg border border-border bg-card shadow-xl px-3 py-2">
              <p className="text-xs text-foreground leading-relaxed font-sans text-center">{tooltip}</p>
            </div>
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-card border-r border-b border-border rotate-45 -mt-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
