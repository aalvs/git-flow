"use client"

import { Tag } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"
import { StepCard } from "@/src/components/step-card"
import { BranchDiagram } from "@/src/components/branch-diagram"
import { AnimatedSection } from "@/src/components/animated-section"

export function ReleasesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" as `${number}px` })

  return (
    <section id="releases" className="py-14 border-b border-border">
      <SectionHeader
        id="releases-title"
        icon={<Tag className="size-5" />}
        title="git flow release"
        subtitle="Prepara uma nova versão de produção. Permite correções menores e prepara metadados (número de versão, build dates, etc.)."
        color="text-purple-400"
      />

      <AnimatedSection delay={0.1}>
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-sans text-muted-foreground mb-3 uppercase tracking-wider">Diagrama do Workflow</p>
          <BranchDiagram type="release" />
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
        <StepCard step={1} title="Iniciar uma release" color="border-purple-400/30">
          <CommandBlock
            command="git flow release start 1.0.0"
            description="Cria o branch release/1.0.0 a partir do develop."
            variant="default"
          />
          <CommandBlock
            command="git flow release start 1.0.0 [SHA]"
            description="Opcionalmente, especifique um commit SHA do develop para iniciar."
          />
        </StepCard>

        <StepCard step={2} title="Publicar a release" color="border-purple-400/30">
          <CommandBlock
            command="git flow release publish 1.0.0"
            description="Publica o branch da release para commits de outros desenvolvedores."
            variant="default"
          />
          <CommandBlock
            command="git flow release track 1.0.0"
            description="Rastreia uma release remota de outro usuário."
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Faça somente ajustes finais: bump de versão, correções de bugs menores.
          </p>
        </StepCard>

        <StepCard step={3} title="Finalizar a release" color="border-purple-400/30" className="sm:col-span-2">
          <CommandBlock
            command="git flow release finish 1.0.0"
            description="Grande passo: mescla no main, cria tag, mescla de volta no develop, remove o branch."
            variant="primary"
          />
          <div className="grid sm:grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground leading-relaxed">
            <div className="space-y-1">
              <p>
                Mescla <code className="text-purple-400 font-sans">release/1.0.0</code> →{" "}
                <code className="text-green-400 font-sans">main</code>
              </p>
              <p>Etiqueta (tag) a versão com seu nome</p>
            </div>
            <div className="space-y-1">
              <p>
                Mescla <code className="text-purple-400 font-sans">release/1.0.0</code> →{" "}
                <code className="text-blue-400 font-sans">develop</code>
              </p>
              <p>Remove o branch de release</p>
            </div>
          </div>
        </StepCard>
      </motion.div>

      <AnimatedSection delay={0.2} className="mt-4">
        <div className="p-4 rounded-lg border border-purple-400/20 bg-purple-400/5">
          <p className="text-xs font-sans text-purple-300">
            <span className="font-bold">Dica:</span> Não se esqueça de publicar as tags com{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded">git push --tags</code> após finalizar a release.
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
