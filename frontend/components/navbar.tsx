'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter((s): s is Element => Boolean(s))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-24% 0px -64% 0px', threshold: [0.1, 0.25, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const navigate = (href: string) => {
    setIsMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.nav
        ref={navRef}
        aria-label="Main navigation"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5 ${
          isScrolled
            ? 'border border-border/80 bg-background/70 shadow-lg shadow-black/20 backdrop-blur-2xl'
            : 'border border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <motion.a
          href="/"
          aria-label="Rene home"
          className="font-mono text-sm font-semibold tracking-[0.28em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <span className="transition-colors duration-200 hover:text-accent">RENE</span>
        </motion.a>

        {/* Desktop links */}
        <div
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            const isHovered = hovered === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onClick={(e) => { e.preventDefault(); navigate(link.href) }}
                className="relative rounded-full px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Hover pill background */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-accent/10"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </AnimatePresence>

                <motion.span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-muted-foreground'
                  } ${isHovered ? 'text-foreground' : ''}`}
                  animate={{ y: isHovered ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {link.label}
                </motion.span>

                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                  />
                )}
              </a>
            )
          })}
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((v) => !v)}
            size="icon"
            variant="ghost"
            className="size-9 rounded-full text-muted-foreground hover:bg-accent/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-border bg-card/95 p-2 backdrop-blur-2xl md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={(e) => { e.preventDefault(); navigate(link.href) }}
                className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
