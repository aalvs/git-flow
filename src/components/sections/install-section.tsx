"use client"

import { useState } from "react"
import { Download, Apple, Terminal, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"
import { AnimatedSection } from "@/src/components/animated-section"
import { cn } from "@/src/lib/utils"

type Platform = "macos" | "linux" | "windows"

const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: "macos", label: "macOS", icon: <Apple className="size-4" /> },
  { id: "linux", label: "Linux", icon: <Terminal className="size-4" /> },
  { id: "windows", label: "Windows", icon: <Monitor className="size-4" /> },
]

const installCommands: Record<Platform, { title: string; commands: { cmd: string; desc: string }[] }[]> = {
  macos: [
    {
      title: "Homebrew (recomendado)",
      commands: [{ cmd: "brew install git-flow-avh", desc: "Instala a versão AVH do git-flow via Homebrew" }],
    },
    {
      title: "MacPorts",
      commands: [{ cmd: "port install git-flow-avh", desc: "Instala via MacPorts" }],
    },
  ],
  linux: [
    {
      title: "APT (Debian/Ubuntu)",
      commands: [{ cmd: "apt-get install git-flow", desc: "Instala via apt no Debian/Ubuntu" }],
    },
    {
      title: "Script de instalação",
      commands: [
        {
          cmd: "wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash",
          desc: "Script universal para instalação manual",
        },
      ],
    },
  ],
  windows: [
    {
      title: "Cygwin",
      commands: [
        {
          cmd: "wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash",
          desc: "Execute este comando no terminal Cygwin",
        },
      ],
    },
    {
      title: "Git for Windows",
      commands: [{ cmd: "git flow", desc: "Git Flow já vem incluído no Git for Windows (msysgit)" }],
    },
  ],
}

export function InstallSection() {
  const [platform, setPlatform] = useState<Platform>("macos")

  return (
    <section id="instalacao" className="py-14 border-b border-border">
      <SectionHeader
        id="instalacao-title"
        icon={<Download className="size-5" />}
        title="Instalação"
        subtitle="Você precisa ter o Git instalado como pré-requisito. O git-flow funciona em macOS, Linux e Windows."
        color="text-foreground"
      />

      <AnimatedSection delay={0.1}>
        <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-sans transition-colors",
                platform === p.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {platform === p.id && (
                <motion.span
                  layoutId="platform-pill"
                  className="absolute inset-0 rounded-md bg-card border border-border shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {p.icon}
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      <AnimatePresence mode="wait">
        <motion.div
          key={platform}
          className="space-y-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {installCommands[platform].map((group, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border bg-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="px-4 py-2.5 border-b border-border bg-muted">
                <span className="text-xs font-sans text-muted-foreground">{group.title}</span>
              </div>
              <div className="divide-y divide-border">
                {group.commands.map((item, j) => (
                  <CommandBlock key={j} command={item.cmd} description={item.desc} className="rounded-none border-0" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatedSection delay={0.2} className="mt-6">
        <div className="p-4 rounded-lg border border-border bg-muted">
          <p className="text-xs font-sans text-muted-foreground">
            Para instruções detalhadas de instalação, consulte a{" "}
            <a
              href="https://github.com/petervanderdoes/gitflow-avh/wiki/Installation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              wiki do git-flow-avh
            </a>
            .
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
