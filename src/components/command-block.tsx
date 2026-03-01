"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/src/lib/utils"
import { CommandTooltip } from "@/src/components/command-tooltip"

// Known git-flow tokens and their explanations
const TOKEN_TOOLTIPS: Record<string, string> = {
  "git flow init": "Inicializa o git-flow no repositório atual, configurando os branches principais.",
  "git flow init -d": "Inicializa com valores padrão sem fazer perguntas interativas.",
  "feature start": "Cria um novo branch feature/<nome> a partir do develop.",
  "feature finish": "Mescla o branch de feature no develop, remove o branch e volta para develop.",
  "feature publish": "Envia o branch de feature para o repositório remoto para colaboração.",
  "feature pull": "Obtém atualizações de uma feature publicada por outro desenvolvedor.",
  "feature track": "Rastreia um branch de feature remoto.",
  "release start": "Cria o branch release/<versão> a partir do develop para preparar o lançamento.",
  "release finish": "Mescla a release no main e no develop, cria uma tag e remove o branch.",
  "release publish": "Publica o branch de release no repositório remoto.",
  "release track": "Rastreia um branch de release remoto.",
  "hotfix start": "Cria o branch hotfix/<versão> diretamente a partir do main para correção urgente.",
  "hotfix finish": "Mescla o hotfix no main e no develop, cria uma tag e remove o branch.",
  "support start": "Cria um branch de suporte de longo prazo a partir de uma tag (recurso beta).",
  "git add .": "Adiciona todas as alterações do diretório atual à staging area.",
  "git push --tags": "Envia todas as tags locais para o repositório remoto.",
}

function getTooltip(command: string): string | undefined {
  for (const [key, tip] of Object.entries(TOKEN_TOOLTIPS)) {
    if (command.includes(key)) return tip
  }
  return undefined
}

interface CommandBlockProps {
  command: string
  description?: string
  className?: string
  variant?: "default" | "primary" | "muted"
}

export function CommandBlock({ command, description, className, variant = "default" }: CommandBlockProps) {
  const [copied, setCopied] = useState(false)
  const tooltip = getTooltip(command)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={cn("group rounded-lg border border-border overflow-hidden", className)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {description && (
        <div className="px-4 py-2 bg-muted border-b border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3",
          variant === "primary" && "bg-primary/10",
          variant === "muted" && "bg-muted",
          variant === "default" && "bg-card",
        )}
      >
        <Terminal
          className={cn(
            "size-4 shrink-0",
            variant === "primary" ? "text-primary" : "text-muted-foreground",
          )}
        />
        <code
          className={cn(
            "flex-1 font-mono text-sm tracking-tight",
            variant === "primary" ? "text-primary" : "text-foreground",
          )}
        >
          {tooltip ? (
            <CommandTooltip tooltip={tooltip}>
              <span className="border-b border-dashed border-current/40 pb-px">{command}</span>
            </CommandTooltip>
          ) : (
            command
          )}
        </code>
        <motion.button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copiar comando"
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="size-3.5 text-primary" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
}
