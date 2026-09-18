'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  size: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const ripples = useRef<Ripple[]>([])
  const animRef = useRef<number>(0)
  const scrollVelocity = useRef(0)
  const lastScrollY = useRef(0)
  const scrollBoost = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Init particles
    particles.current = Array.from({ length: 180 }, () => {
      const bvx = (Math.random() - 0.5) * 0.5
      const bvy = (Math.random() - 0.5) * 0.5
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random(),
        vx: bvx,
        vy: bvy,
        baseVx: bvx,
        baseVy: bvy,
        size: Math.random() * 2 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      }
    })

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Scroll — track velocity and spawn ripples
    const onScroll = () => {
      const sy = window.scrollY
      const delta = sy - lastScrollY.current
      lastScrollY.current = sy
      scrollVelocity.current = delta
      scrollBoost.current = Math.min(Math.abs(delta) * 0.12, 6)

      // Spawn ripple at random x, at vertical center
      ripples.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0,
        maxRadius: 120 + Math.random() * 180,
        opacity: 0.5,
        speed: 2.5 + Math.abs(delta) * 0.08,
      })

      // Cap ripples
      if (ripples.current.length > 12) ripples.current.shift()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Decay scroll boost
      scrollBoost.current *= 0.92

      // Draw ripples
      ripples.current = ripples.current.filter((r) => r.opacity > 0.01)
      ripples.current.forEach((r) => {
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(138,180,248,${r.opacity * 0.4})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner ring
        if (r.radius > 20) {
          ctx.beginPath()
          ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(138,180,248,${r.opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        r.radius += r.speed
        r.opacity *= 0.97
        if (r.radius > r.maxRadius) r.opacity = 0
      })

      // Lines between nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(138,180,248,${(1 - dist / 130) * (0.1 + scrollBoost.current * 0.04)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Particles
      particles.current.forEach((p) => {
        p.pulse += p.pulseSpeed
        const pulseFactor = 0.85 + Math.sin(p.pulse) * 0.15

        // Parallax offset from mouse
        const parallaxX = ((mx / W) - 0.5) * p.z * 35
        const parallaxY = ((my / H) - 0.5) * p.z * 25
        const rx = p.x + parallaxX
        const ry = p.y + parallaxY

        const finalOpacity = p.opacity * pulseFactor * (0.5 + p.z * 0.5)
        const finalSize = p.size * pulseFactor * (0.4 + p.z * 0.8)

        // Glow halo
        const grd = ctx.createRadialGradient(rx, ry, 0, rx, ry, finalSize * 7)
        grd.addColorStop(0, `rgba(138,180,248,${finalOpacity * 0.8})`)
        grd.addColorStop(1, 'rgba(138,180,248,0)')
        ctx.beginPath()
        ctx.arc(rx, ry, finalSize * 7, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(rx, ry, finalSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(138,180,248,${finalOpacity})`
        ctx.fill()

        // Velocity: base + scroll boost (scroll direction pushes particles)
        const scrollDir = scrollVelocity.current > 0 ? 1 : -1
        p.vx = p.baseVx + (Math.random() - 0.5) * scrollBoost.current * 0.3
        p.vy = p.baseVy + scrollDir * scrollBoost.current * p.z * 0.5

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
      })

      // Cursor glow
      const cgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 260)
      cgrd.addColorStop(0, 'rgba(138,180,248,0.08)')
      cgrd.addColorStop(1, 'rgba(138,180,248,0)')
      ctx.beginPath()
      ctx.arc(mx, my, 260, 0, Math.PI * 2)
      ctx.fillStyle = cgrd
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
