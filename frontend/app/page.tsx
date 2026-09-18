import { About } from '@/components/about'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Journey } from '@/components/journey'
import { Education } from '@/components/education'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Education />
      <Contact />
    </main>
  )
}
