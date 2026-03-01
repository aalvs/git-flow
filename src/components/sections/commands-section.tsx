"use client"

import { BookOpen } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "@/src/components/section-header"
import { CommandBlock } from "@/src/components/command-block"

const commandGroups = [
  {
    title: "Inicialização",
    color: "text-green-400",
    dotColor: "bg-green-400",
    borderColor: "border-green-400/30",
    commands: [
      { cmd: "git flow init", desc: "Inicializa git-flow em um repositório existente" },
      { cmd: "git flow init -d", desc: "Inicializa usando os valores padrão sem perguntas" },
    ],
  },
  {
    title: "Feature",
    color: "text-yellow-400",
    dotColor: "bg-yellow-400",
    borderColor: "border-yellow-400/30",
    commands: [
      { cmd: "git flow feature", desc: "Lista os branches de feature existentes" },
      { cmd: "git flow feature start <nome>", desc: "Inicia uma nova feature a partir do develop" },
      { cmd: "git flow feature finish <nome>", desc: "Finaliza e mescla a feature no develop" },
      { cmd: "git flow feature publish <nome>", desc: "Publica a feature no repositório remoto" },
      { cmd: "git flow feature pull origin <nome>", desc: "Obtém feature publicada por outro usuário" },
      { cmd: "git flow feature track <nome>", desc: "Rastreia feature de outro usuário no remoto" },
    ],
  },
  {
    title: "Release",
    color: "text-purple-400",
    dotColor: "bg-purple-400",
    borderColor: "border-purple-400/30",
    commands: [
      { cmd: "git flow release", desc: "Lista os branches de release existentes" },
      { cmd: "git flow release start <versao>", desc: "Inicia uma release a partir do develop" },
      { cmd: "git flow release start <versao> [SHA]", desc: "Inicia release a partir de commit específico" },
      { cmd: "git flow release publish <versao>", desc: "Publica o branch de release" },
      { cmd: "git flow release track <versao>", desc: "Rastreia release remota" },
      { cmd: "git flow release finish <versao>", desc: "Finaliza: mescla em main e develop, cria tag" },
    ],
  },
  {
    title: "Hotfix",
    color: "text-red-400",
    dotColor: "bg-red-400",
    borderColor: "border-red-400/30",
    commands: [
      { cmd: "git flow hotfix", desc: "Lista os branches de hotfix existentes" },
      { cmd: "git flow hotfix start <versao>", desc: "Inicia hotfix a partir do main" },
      { cmd: "git flow hotfix start <versao> [BASENAME]", desc: "Inicia hotfix com basename específico" },
      { cmd: "git flow hotfix finish <versao>", desc: "Finaliza: mescla em main e develop, cria tag" },
    ],
  },
  {
    title: "Support (Beta)",
    color: "text-orange-400",
    dotColor: "bg-orange-400",
    borderColor: "border-orange-400/30",
    commands: [
      { cmd: "git flow support start <versao> <tag>", desc: "Inicia um branch de suporte a partir de uma tag (beta)" },
    ],
  },
]

function CommandGroup({
  group,
  index,
}: {
  group: (typeof commandGroups)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" as `${number}px` })

  return (
    <motion.div
      ref={ref}
      className={`rounded-xl border bg-card overflow-hidden ${group.borderColor}`}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="px-5 py-3 border-b border-border bg-muted flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${group.dotColor}`} />
        <h3 className={`text-sm font-bold font-mono ${group.color}`}>{group.title}</h3>
        <span className="ml-auto text-xs font-mono text-muted-foreground">{group.commands.length} comandos</span>
      </div>
      <motion.div
        className="divide-y divide-border"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        }}
      >
        {group.commands.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            }}
          >
            <CommandBlock command={item.cmd} description={item.desc} className="rounded-none border-0" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export function CommandsSection() {
  return (
    <section id="comandos" className="py-14">
      <SectionHeader
        id="comandos-title"
        icon={<BookOpen className="size-5" />}
        title="Referência de Comandos"
        subtitle="Todos os comandos do git-flow organizados por categoria para consulta rápida."
        color="text-foreground"
      />

      <div className="space-y-8">
        {commandGroups.map((group, i) => (
          <CommandGroup key={group.title} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
