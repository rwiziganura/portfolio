'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects-data'
import { ProjectCard } from './project-card'
import { ProjectFilter } from './project-filter'

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const featuredProject = projects.find((p) => p.featured)
  const regularProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id)
  const showFeatured = activeCategory === 'All' && featuredProject

  return (
    <section id="projects" className="relative py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent"
        >
          SELECTED WORK
        </motion.p>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projects I&apos;ve built.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            A selection of practical applications and software projects I've worked on while developing my skills.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <ProjectFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Projects Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            showFeatured ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
          }`}
        >
          {/* Featured Project */}
          {showFeatured && featuredProject && (
            <ProjectCard project={featuredProject} index={0} featured={true} />
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 ? (
            regularProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={showFeatured ? index + 1 : index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full rounded-lg border border-dashed border-border bg-card/50 p-12 text-center"
            >
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
