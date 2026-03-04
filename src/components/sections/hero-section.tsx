"use client"

import { motion } from "framer-motion"
import { GitBranch, Star } from "lucide-react"
import { BranchDiagram } from "@/src/components/branch-diagram"

const facts = [
  { label: "Branches principais", value: "2", sub: "main + develop" },
  { label: "Branches de suporte", value: "3", sub: "feature, release, hotfix" },
  { label: "Plataformas", value: "3", sub: "macOS, Linux, Windows" },
  { label: "Modelo por", value: "V. Driessen", sub: "nvie.com" },
]

export function HeroSection() {
  return (
    <section id="sobre" className="py-16 border-b border-border">
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <GitBranch className="size-3.5 text-primary" />
          <span className="text-xs font-mono text-primary">git-flow cheatsheet</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-balance text-foreground mb-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Sistema de <span className="text-primary">Branches</span> Eficiente
        </motion.h1>

        <motion.p
          className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          O <strong className="text-foreground">git-flow</strong> é um conjunto de extensões para o git que provê
          operações de alto nível para repositórios usando o modelo de branches de{" "}
          <a
            href="https://nvie.com/posts/a-successful-git-branching-model/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Vincent Driessen
          </a>
          .
        </motion.p>
      </div>

      {/* Overview diagram */}
      <motion.div
        className="rounded-xl border border-border bg-card p-5 mb-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider">
            Visão Geral — Modelo de Branches
          </p>
          <div className="flex items-center gap-3 text-xs font-sans flex-wrap">
            {[
              { color: "bg-green-400", label: "main" },
              { color: "bg-blue-400", label: "develop" },
              { color: "bg-yellow-400", label: "feature" },
              { color: "bg-purple-400", label: "release" },
              { color: "bg-red-400", label: "hotfix" },
            ].map((b, i) => (
              <motion.span
                key={b.label}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                <span className={`w-2 h-2 rounded-full ${b.color} inline-block`} />
                {b.label}
              </motion.span>
            ))}
          </div>
        </div>
        <BranchDiagram type="overview" />
      </motion.div>

      {/* Key facts */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
        }}
      >
        {facts.map((fact) => (
          <motion.div
            key={fact.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            whileHover={{ y: -4, borderColor: "var(--primary)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold font-sans text-primary mb-1">{fact.value}</div>
            <div className="text-xs font-sans text-foreground font-semibold">{fact.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{fact.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tips */}
      <motion.div
        className="mt-6 p-4 rounded-lg border border-border bg-muted flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      >
        <Star className="size-4 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Dicas básicas:</strong> O git-flow oferece excelente ajuda na linha de
          comando — leia com atenção as saídas. No macOS, o{" "}
          <a
            href="https://www.sourcetreeapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Sourcetree
          </a>{" "}
          é um cliente GUI excelente com suporte nativo ao git-flow.
        </div>
      </motion.div>
    </section>
  )
}
