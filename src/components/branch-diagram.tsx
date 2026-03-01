"use client"

import { useEffect, useRef } from "react"

interface BranchDiagramProps {
  type: "feature" | "release" | "hotfix" | "overview"
}

const COLORS = {
  main: "#4ade80",
  develop: "#60a5fa",
  feature: "#fbbf24",
  release: "#c084fc",
  hotfix: "#f87171",
}

export function BranchDiagram({ type }: BranchDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, w, h)

    const drawBranch = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      dashed = false,
    ) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      if (dashed) ctx.setLineDash([5, 4])
      else ctx.setLineDash([])
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawMergeArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.setLineDash([])
      ctx.moveTo(x1, y1)
      // cubic bezier for smooth merge lines
      const cpx = x1 + (x2 - x1) * 0.5
      ctx.bezierCurveTo(cpx, y1, cpx, y2, x2, y2)
      ctx.stroke()
    }

    const drawCommit = (x: number, y: number, color: string, radius = 7, label?: string) => {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = "#0f0f0f"
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      ctx.stroke()
      if (label) {
        ctx.fillStyle = color
        ctx.font = "bold 10px 'Geist Mono', monospace"
        ctx.textAlign = "center"
        ctx.fillText(label, x, y + radius + 14)
      }
    }

    const drawLabel = (x: number, y: number, text: string, color: string) => {
      ctx.fillStyle = color
      ctx.font = "bold 11px 'Geist Mono', monospace"
      ctx.textAlign = "left"
      ctx.fillText(text, x, y)
    }

    if (type === "overview") {
      // Full git-flow diagram
      const mainY = 40
      const developY = 100
      const featureY = 155
      const releaseY = 210
      const hotfixY = 265

      const xs = [50, 130, 200, 270, 340, 410, 480, 550, 620, 680]

      // Labels
      drawLabel(2, mainY + 4, "main", COLORS.main)
      drawLabel(2, developY + 4, "develop", COLORS.develop)
      drawLabel(2, featureY + 4, "feature", COLORS.feature)
      drawLabel(2, releaseY + 4, "release", COLORS.release)
      drawLabel(2, hotfixY + 4, "hotfix", COLORS.hotfix)

      // Main branch line
      drawBranch(xs[0], mainY, xs[9], mainY, COLORS.main)
      // Develop branch
      drawBranch(xs[0], mainY, xs[1], developY, COLORS.develop)
      drawBranch(xs[1], developY, xs[8], developY, COLORS.develop)
      drawBranch(xs[8], developY, xs[9], mainY, COLORS.main)

      // Feature branch
      drawBranch(xs[2], developY, xs[2] - 10, featureY, COLORS.feature)
      drawBranch(xs[2] - 10, featureY, xs[4] + 10, featureY, COLORS.feature)
      drawBranch(xs[4] + 10, featureY, xs[4], developY, COLORS.feature)

      // Release branch
      drawBranch(xs[5], developY, xs[5] + 5, releaseY, COLORS.release)
      drawBranch(xs[5] + 5, releaseY, xs[6] + 5, releaseY, COLORS.release)
      drawBranch(xs[6] + 5, releaseY, xs[7], mainY, COLORS.release)
      drawMergeArrow(xs[6] + 5, releaseY, xs[7], developY, COLORS.release)

      // Hotfix branch
      drawBranch(xs[1] + 10, mainY, xs[1] + 10, hotfixY, COLORS.hotfix)
      drawBranch(xs[1] + 10, hotfixY, xs[3], hotfixY, COLORS.hotfix)
      drawBranch(xs[3], hotfixY, xs[3] + 10, mainY, COLORS.hotfix)
      drawMergeArrow(xs[3], hotfixY, xs[3] + 10, developY, COLORS.hotfix)

      // Commits on main
      drawCommit(xs[0], mainY, COLORS.main)
      drawCommit(xs[3] + 10, mainY, COLORS.main)
      drawCommit(xs[7], mainY, COLORS.main)
      drawCommit(xs[9], mainY, COLORS.main)

      // Commits on develop
      drawCommit(xs[1], developY, COLORS.develop)
      drawCommit(xs[2], developY, COLORS.develop)
      drawCommit(xs[4], developY, COLORS.develop)
      drawCommit(xs[5], developY, COLORS.develop)
      drawCommit(xs[7], developY, COLORS.develop)
      drawCommit(xs[8], developY, COLORS.develop)

      // Feature commits
      drawCommit(xs[2] - 10, featureY, COLORS.feature)
      drawCommit(xs[3], featureY, COLORS.feature)
      drawCommit(xs[4] + 10, featureY, COLORS.feature)

      // Release commits
      drawCommit(xs[5] + 5, releaseY, COLORS.release)
      drawCommit(xs[6] + 5, releaseY, COLORS.release)

      // Hotfix commits
      drawCommit(xs[1] + 10, hotfixY, COLORS.hotfix)
      drawCommit(xs[2] + 10, hotfixY, COLORS.hotfix)
      drawCommit(xs[3], hotfixY, COLORS.hotfix)
    }

    if (type === "feature") {
      const developY = 60
      const featureY = 140
      const xs = [60, 160, 240, 320, 400, 480]

      drawLabel(2, developY + 4, "develop", COLORS.develop)
      drawLabel(2, featureY + 4, "feature/minha-funcionalidade", COLORS.feature)

      drawBranch(xs[0], developY, xs[5], developY, COLORS.develop)
      drawBranch(xs[1], developY, xs[1] + 10, featureY, COLORS.feature)
      drawBranch(xs[1] + 10, featureY, xs[4], featureY, COLORS.feature)
      drawBranch(xs[4], featureY, xs[4] + 10, developY, COLORS.feature)

      drawCommit(xs[0], developY, COLORS.develop, 7, "init")
      drawCommit(xs[1], developY, COLORS.develop, 7, "start")
      drawCommit(xs[2], featureY, COLORS.feature, 7, "wip")
      drawCommit(xs[3], featureY, COLORS.feature, 7, "fix")
      drawCommit(xs[4], featureY, COLORS.feature, 7, "done")
      drawCommit(xs[4] + 10, developY, COLORS.develop, 7, "merge")
      drawCommit(xs[5], developY, COLORS.develop, 7, "next")
    }

    if (type === "release") {
      const mainY = 50
      const developY = 130
      const releaseY = 210
      const xs = [50, 150, 240, 330, 420, 510]

      drawLabel(2, mainY + 4, "main", COLORS.main)
      drawLabel(2, developY + 4, "develop", COLORS.develop)
      drawLabel(2, releaseY + 4, "release/1.0.0", COLORS.release)

      drawBranch(xs[0], mainY, xs[5], mainY, COLORS.main)
      drawBranch(xs[0], mainY, xs[1], developY, COLORS.develop)
      drawBranch(xs[1], developY, xs[5], developY, COLORS.develop)
      drawBranch(xs[2], developY, xs[2] + 5, releaseY, COLORS.release)
      drawBranch(xs[2] + 5, releaseY, xs[4], releaseY, COLORS.release)
      drawBranch(xs[4], releaseY, xs[4] + 15, mainY, COLORS.release)
      drawMergeArrow(xs[4], releaseY, xs[4] + 10, developY, COLORS.release)

      drawCommit(xs[0], mainY, COLORS.main, 7)
      drawCommit(xs[4] + 15, mainY, COLORS.main, 7, "v1.0.0")
      drawCommit(xs[1], developY, COLORS.develop, 7)
      drawCommit(xs[2], developY, COLORS.develop, 7)
      drawCommit(xs[4] + 10, developY, COLORS.develop, 7)
      drawCommit(xs[2] + 5, releaseY, COLORS.release, 7, "rc1")
      drawCommit(xs[3], releaseY, COLORS.release, 7, "fix")
      drawCommit(xs[4], releaseY, COLORS.release, 7, "final")
    }

    if (type === "hotfix") {
      const mainY = 50
      const developY = 130
      const hotfixY = 210
      const xs = [50, 150, 240, 330, 420, 510]

      drawLabel(2, mainY + 4, "main", COLORS.main)
      drawLabel(2, developY + 4, "develop", COLORS.develop)
      drawLabel(2, hotfixY + 4, "hotfix/1.0.1", COLORS.hotfix)

      drawBranch(xs[0], mainY, xs[5], mainY, COLORS.main)
      drawBranch(xs[0], mainY, xs[1], developY, COLORS.develop)
      drawBranch(xs[1], developY, xs[5], developY, COLORS.develop)
      drawBranch(xs[2], mainY, xs[2] + 5, hotfixY, COLORS.hotfix)
      drawBranch(xs[2] + 5, hotfixY, xs[4], hotfixY, COLORS.hotfix)
      drawBranch(xs[4], hotfixY, xs[4] + 15, mainY, COLORS.hotfix)
      drawMergeArrow(xs[4], hotfixY, xs[4] + 10, developY, COLORS.hotfix)

      drawCommit(xs[0], mainY, COLORS.main, 7, "v1.0.0")
      drawCommit(xs[2], mainY, COLORS.main, 7)
      drawCommit(xs[4] + 15, mainY, COLORS.main, 7, "v1.0.1")
      drawCommit(xs[1], developY, COLORS.develop, 7)
      drawCommit(xs[3], developY, COLORS.develop, 7)
      drawCommit(xs[4] + 10, developY, COLORS.develop, 7)
      drawCommit(xs[2] + 5, hotfixY, COLORS.hotfix, 7, "fix")
      drawCommit(xs[3], hotfixY, COLORS.hotfix, 7, "test")
      drawCommit(xs[4], hotfixY, COLORS.hotfix, 7, "done")
    }
  }, [type])

  const heights: Record<string, number> = {
    overview: 300,
    feature: 180,
    release: 260,
    hotfix: 260,
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg"
      style={{ height: heights[type] }}
      aria-label={`Diagrama de branches git-flow: ${type}`}
    />
  )
}
