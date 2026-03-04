"use client"

import { Puzzle } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"
import { StepCard } from "@/src/components/step-card"
import { BranchDiagram } from "@/src/components/branch-diagram"
import { AnimatedSection } from "@/src/components/animated-section"

export function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" as `${number}px` })

  return (
    <section id="features" className="py-14 border-b border-border">
      <SectionHeader
        id="features-title"
        icon={<Puzzle className="size-5" />}
        title="git flow feature"
        subtitle="Desenvolva novas funcionalidades isoladas. Criadas a partir de develop e integradas de volta ao develop ao concluir."
        color="text-yellow-400"
      />

      <AnimatedSection delay={0.1}>
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-sans text-muted-foreground mb-3 uppercase tracking-wider">Diagrama do Workflow</p>
          <BranchDiagram type="feature" />
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
        <StepCard step={1} title="Iniciar uma feature" color="border-yellow-400/30">
          <CommandBlock
            command="git flow feature start MINHA-FEATURE"
            description="Cria branch feature/MINHA-FEATURE a partir de develop e muda para ela."
            variant="default"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Equivale a:{" "}
            <code className="text-yellow-400 font-sans text-xs">
              git checkout -b feature/MINHA-FEATURE develop
            </code>
          </p>
        </StepCard>

        <StepCard step={2} title="Trabalhar na feature" color="border-yellow-400/30">
          <CommandBlock command="git add ." description="Adiciona seus arquivos modificados à staging area." />
          <CommandBlock command='git commit -m "feat: adiciona nova funcionalidade"' />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Faça commits regulares enquanto desenvolve a funcionalidade.
          </p>
        </StepCard>

        <StepCard step={3} title="Publicar feature (colaborativo)" color="border-yellow-400/30">
          <CommandBlock
            command="git flow feature publish MINHA-FEATURE"
            description="Publica a feature no servidor remoto para colaboração com outros desenvolvedores."
            variant="default"
          />
          <CommandBlock
            command="git flow feature pull origin MINHA-FEATURE"
            description="Obtém uma feature publicada por outro usuário e rastreia mudanças remotas."
          />
        </StepCard>

        <StepCard step={4} title="Finalizar a feature" color="border-yellow-400/30">
          <CommandBlock
            command="git flow feature finish MINHA-FEATURE"
            description="Mescla de volta ao develop, remove o branch e retorna ao develop."
            variant="primary"
          />
          <div className="text-xs text-muted-foreground leading-relaxed space-y-1 mt-1">
            <p>
              Mescla <code className="text-yellow-400 font-sans">feature/MINHA-FEATURE</code> →{" "}
              <code className="text-blue-400 font-sans">develop</code>
            </p>
            <p>Remove o branch de feature</p>
            <p>
              Volta para o branch <code className="text-blue-400 font-sans">develop</code>
            </p>
          </div>
        </StepCard>
      </motion.div>
    </section>
  )
}
