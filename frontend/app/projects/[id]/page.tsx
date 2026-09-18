'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code2, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import { projects, Project } from '@/lib/projects-data'
import { Navbar } from '@/components/navbar'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const [projectId, setProjectId] = useState<number | null>(null)
  useEffect(() => {
    params.then(({ id }) => setProjectId(parseInt(id, 10)))
  }, [params])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedImage) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  if (projectId === null) {
    return <div className="min-h-screen bg-background" />
  }
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const currentIndex = projects.findIndex((p) => p.id === projectId)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
              aria-label="Close preview"
            >
              <X className="size-8" />
            </button>
            <img
              src={selectedImage}
              alt="Project preview"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mb-12"
            >
              <ChevronLeft className="size-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
            {/* Project Category Label */}
            <motion.p variants={itemVariants} className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              {project.category}
            </motion.p>

            {/* Project Title */}
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-4xl md:text-5xl font-bold text-foreground"
            >
              {project.title}
            </motion.h1>

            {/* Project Description */}
            <motion.p variants={itemVariants} className="mb-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {project.description}
            </motion.p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-semibold text-foreground hover:border-accent/50 hover:bg-secondary/80 transition-colors border border-border"
                >
                  <Code2 className="size-5" />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  <ExternalLink className="size-5" />
                  Live Demo
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Project Image */}
          {project.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-20 rounded-lg border border-border overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(project.image)}
              />
            </motion.div>
          )}

          {/* Content Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Overview */}
            {project.overview && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Overview</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{project.overview}</p>
              </motion.section>
            )}

            {/* Problem */}
            {project.problem && project.problem !== 'Content coming soon.' && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">The Problem</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{project.problem}</p>
              </motion.section>
            )}

            {/* Solution */}
            {project.solution && project.solution !== 'Content coming soon.' && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">The Solution</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{project.solution}</p>
              </motion.section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Challenges</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent text-lg font-semibold">•</span>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Lessons Learned */}
            {project.lessons && project.lessons.length > 0 && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">What I Learned</h2>
                <ul className="space-y-3">
                  {project.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent text-lg font-semibold">•</span>
                      <span className="text-muted-foreground">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <motion.section variants={itemVariants} className="rounded-lg border border-border bg-card/50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Project Screenshots</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer rounded-lg overflow-hidden border border-border"
                      onClick={() => setSelectedImage(screenshot)}
                    >
                      <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-auto object-cover" />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* No Screenshots Message */}
            {(!project.screenshots || project.screenshots.length === 0) && (
              <motion.section variants={itemVariants} className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
                <p className="text-muted-foreground">Project screenshots coming soon.</p>
              </motion.section>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-20 grid gap-6 md:grid-cols-2 pt-12 border-t border-border"
          >
            {prevProject ? (
              <motion.div variants={itemVariants}>
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="group inline-flex flex-col gap-2 rounded-lg border border-border p-6 hover:border-accent/50 hover:bg-secondary transition-all"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                    <ChevronLeft className="size-4" />
                    Previous Project
                  </span>
                  <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {prevProject.title}
                  </span>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}

            {nextProject ? (
              <motion.div variants={itemVariants} className="md:text-right">
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="group inline-flex flex-col gap-2 rounded-lg border border-border p-6 hover:border-accent/50 hover:bg-secondary transition-all"
                >
                  <span className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                    Next Project
                    <ChevronRight className="size-4" />
                  </span>
                  <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </span>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
