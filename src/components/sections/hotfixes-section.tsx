"use client"

import { Flame } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"
import { StepCard } from "@/src/components/step-card"
import { BranchDiagram } from "@/src/components/branch-diagram"
import { AnimatedSection } from "@/src/components/animated-section"

export function HotfixesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" as `${number}px` })

  return (
    <section id="hotfixes" className="py-14 border-b border-border">
      <SectionHeader
        id="hotfixes-title"
        icon={<Flame className="size-5" />}
        title="git flow hotfix"
        subtitle="Corrija bugs críticos em produção imediatamente. Criados a partir do main e mesclados de volta ao main E ao develop."
        color="text-red-400"
      />

      <AnimatedSection delay={0.1}>
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Diagrama do Workflow</p>
          <BranchDiagram type="hotfix" />
        </div>
      </AnimatedSection>

      <motion.div
        ref={gridRef}
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <StepCard step={1} title="Iniciar um hotfix" color="border-red-400/30">
          <CommandBlock
            command="git flow hotfix start 1.0.1"
            description="Cria hotfix/1.0.1 a partir do main. Use quando há um bug crítico em produção."
            variant="default"
          />
          <CommandBlock
            command="git flow hotfix start 1.0.1 [BASENAME]"
            description="Opcionalmente, especifique um basename para começar."
          />
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            O número da versão marca o novo release do hotfix.
          </p>
        </StepCard>

        <StepCard step={2} title="Corrigir o bug" color="border-red-400/30">
          <CommandBlock command="git add ." description="Adicione somente as mudanças necessárias para corrigir o bug." />
          <CommandBlock command='git commit -m "fix: corrige bug crítico de autenticação"' />
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            Mantenha o hotfix focado: apenas a correção necessária, sem features extras.
          </p>
        </StepCard>

        <StepCard step={3} title="Finalizar o hotfix" color="border-red-400/30" className="sm:col-span-2">
          <CommandBlock
            command="git flow hotfix finish 1.0.1"
            description="Mescla no main E no develop, cria tag no main, remove o branch."
            variant="primary"
          />
          <div className="grid sm:grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground leading-relaxed">
            <div className="space-y-1">
              <p>
                Mescla <code className="text-red-400 font-mono">hotfix/1.0.1</code> →{" "}
                <code className="text-green-400 font-mono">main</code>
              </p>
              <p>
                Cria tag <code className="text-green-400 font-mono">1.0.1</code> no main
              </p>
            </div>
            <div className="space-y-1">
              <p>
                Mescla <code className="text-red-400 font-mono">hotfix/1.0.1</code> →{" "}
                <code className="text-blue-400 font-mono">develop</code>
              </p>
              <p>Remove o branch de hotfix</p>
            </div>
          </div>
        </StepCard>
      </motion.div>

      <AnimatedSection delay={0.2} className="mt-4">
        <div className="p-4 rounded-lg border border-red-400/20 bg-red-400/5">
          <p className="text-xs font-mono text-red-300">
            <span className="font-bold">Atenção:</span> Se uma release branch existe quando o hotfix é finalizado, ele
            é mesclado nela em vez do develop. O back-merge ao develop ocorre quando a release terminar.
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
