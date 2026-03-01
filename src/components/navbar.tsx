"use client"

import { useState } from "react"
import { GitBranch, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#instalacao", label: "Instalação" },
  { href: "#iniciando", label: "Iniciando" },
  { href: "#features", label: "Features" },
  { href: "#releases", label: "Releases" },
  { href: "#hotfixes", label: "Hotfixes" },
  { href: "#comandos", label: "Comandos" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-mono font-bold text-foreground hover:text-primary transition-colors"
        >
          <motion.span
            animate={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            className="inline-flex"
          >
            <GitBranch className="size-5 text-primary" />
          </motion.span>
          <span className="text-sm">git-flow</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
            cheatsheet
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              whileHover={{ scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="size-4" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-border bg-background overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
