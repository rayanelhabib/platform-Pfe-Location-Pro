"use client"

import { useEffect, useRef } from "react"

export default function FloatingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let particles: Array<{
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      size: number;
      color: string;
    }> = []

    const COLORS = [
      "rgba(99,102,241,",
      "rgba(139,92,246,",
      "rgba(6,182,212,",
      "rgba(255,255,255,",
    ]

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      const count = Math.min(Math.floor(window.innerWidth * window.innerHeight / 14000), 100)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: (Math.random() - 0.5) * canvas.width * 1.5,
          y: (Math.random() - 0.5) * canvas.height * 1.5,
          z: Math.random() * 800,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const fov = 400

      particles.sort((a, b) => b.z - a.z)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // Wrap
        if (p.x < -canvas.width) p.x = canvas.width
        if (p.x > canvas.width) p.x = -canvas.width
        if (p.y < -canvas.height) p.y = canvas.height
        if (p.y > canvas.height) p.y = -canvas.height
        if (p.z < 0) p.z = 800
        if (p.z > 800) p.z = 0

        const scale = fov / (fov + p.z)
        const sx = cx + p.x * scale
        const sy = cy + p.y * scale
        const r = p.size * scale
        const alpha = scale * 0.6

        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", init)
    init()
    draw()

    return () => {
      window.removeEventListener("resize", init)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  )
}
