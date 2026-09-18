'use client'

import { motion } from 'framer-motion'
import { categories } from '@/lib/projects-data'

interface ProjectFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectFilter({ activeCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-12 flex flex-wrap gap-3"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            activeCategory === category
              ? 'bg-accent text-accent-foreground shadow-lg'
              : 'border border-border bg-card text-foreground hover:border-accent/50 hover:text-accent'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  )
}
