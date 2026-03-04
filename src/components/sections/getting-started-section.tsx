"use client"

import { Rocket } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"
import { AnimatedSection } from "@/src/components/animated-section"

const branchEntries = [
  { color: "text-green-400", dot: "text-green-400", name: "main", desc: "versão de produção estável" },
  { color: "text-blue-400", dot: "text-blue-400", name: "develop", desc: "branch de integração" },
]

const prefixes = [
  { color: "text-yellow-400", text: "feature/  →  novas funcionalidades" },
  { color: "text-purple-400", text: "release/  →  preparação de versões" },
  { color: "text-red-400", text: "hotfix/   →  correções urgentes" },
  { color: "text-orange-400", text: "support/  →  branches de suporte (beta)" },
]

export function GettingStartedSection() {
  const prefixRef = useRef<HTMLDivElement>(null)
  const prefixInView = useInView(prefixRef, { once: true, margin: "-40px" as `${number}px` })

  return (
    <section id="iniciando" className="py-14 border-b border-border">
      <SectionHeader
        id="iniciando-title"
        icon={<Rocket className="size-5" />}
        title="Iniciando com git-flow"
        subtitle="O git-flow precisa ser inicializado para personalizar a configuração do seu projeto."
        color="text-blue-400"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedSection direction="left" delay={0.1}>
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-sans text-blue-400">Inicialização</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Comece o uso do git-flow inicializando dentro de um repositório git existente. Você precisará responder
              algumas questões sobre convenções de nomenclatura dos branches.
            </p>
            <CommandBlock
              command="git flow init"
              description="Inicializa o git-flow e configura os branches principais interativamente."
              variant="primary"
            />
            <CommandBlock
              command="git flow init -d"
              description="Usa os valores padrão sem perguntas (recomendado para a maioria dos projetos)."
            />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.2}>
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-sans text-blue-400">Estrutura de Branches Criada</h3>
            <div
              ref={prefixRef}
              className="rounded-xl border border-border bg-card p-4 font-sans text-xs space-y-2"
            >
              {branchEntries.map((b, i) => (
                <motion.div
                  key={b.name}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={prefixInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
                >
                  <span className={b.dot}>●</span>
                  <span className="text-foreground">{b.name}</span>
                  <span className="text-muted-foreground">— {b.desc}</span>
                </motion.div>
              ))}

              <motion.div
                className="ml-4 text-muted-foreground text-xs mt-3 space-y-1"
                initial={{ opacity: 0 }}
                animate={prefixInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35 }}
              >
                <p>Prefixos configurados durante o init:</p>
                {prefixes.map((p, i) => (
                  <motion.p
                    key={p.text}
                    className={p.color}
                    initial={{ opacity: 0, x: 10 }}
                    animate={prefixInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.08 }}
                  >
                    {p.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.3} className="mt-6">
        <div className="p-4 rounded-lg border border-blue-400/20 bg-blue-400/5">
          <p className="text-xs font-sans text-blue-300 leading-relaxed">
            <strong>Recomendação:</strong> Use os valores padrão durante a inicialização. A convenção padrão (
            {'"feature/", "release/", "hotfix/"'}) é amplamente reconhecida pela comunidade e facilita a colaboração.
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
