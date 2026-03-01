"use client"

import { useScroll, useSpring, motion } from "framer-motion"
import { Navbar } from "@/src/components/navbar"
import { HeroSection } from "@/src/components/sections/hero-section"
import { InstallSection } from "@/src/components/sections/install-section"
import { GettingStartedSection } from "@/src/components/sections/getting-started-section"
import { FeaturesSection } from "@/src/components/sections/features-section"
import { ReleasesSection } from "@/src/components/sections/releases-section"
import { HotfixesSection } from "@/src/components/sections/hotfixes-section"
import { CommandsSection } from "@/src/components/sections/commands-section"
import { GitBranch, Github, ExternalLink } from "lucide-react"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary origin-left z-60"
      style={{ scaleX }}
    />
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ScrollProgress />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <HeroSection />
        <InstallSection />
        <GettingStartedSection />
        <FeaturesSection />
        <ReleasesSection />
        <HotfixesSection />
        <CommandsSection />
      </main>

      <motion.footer
        className="border-t border-border bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-mono">
              <GitBranch className="size-4 text-primary" />
              <span className="text-muted-foreground">
                Inspirado no{" "}
                <a
                  href="https://danielkummer.github.io/git-flow-cheatsheet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  git-flow cheatsheet
                  <ExternalLink className="size-3" />
                </a>{" "}
                de Daniel Kummer
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <a
                href="https://github.com/nvie/gitflow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="size-3.5" />
                nvie/gitflow
              </a>
              <a
                href="https://github.com/petervanderdoes/gitflow-avh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="size-3.5" />
                gitflow-avh
              </a>
              <a
                href="https://nvie.com/posts/a-successful-git-branching-model/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <ExternalLink className="size-3.5" />
                Modelo original
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Modelo de branching por Vincent Driessen — Extensão por Peter van der Does</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
