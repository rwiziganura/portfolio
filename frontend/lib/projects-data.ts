export interface Project {
  id: number
  title: string
  description: string
  category: 'All' | 'Frontend' | 'Backend' | 'Full Stack' | 'Other'
  technologies: string[]
  image?: string
  github?: string
  live?: string
  featured?: boolean
  problem?: string
  solution?: string
  features?: string[]
  challenges?: string[]
  lessons?: string[]
  screenshots?: string[]
  overview?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'BloodConnect',
    description: 'A comprehensive blood donation and management platform.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    featured: true,
    overview: 'BloodConnect is a full-stack web application designed to streamline blood donation management and connect donors with recipients efficiently.',
    problem: 'Blood banks and donation centers face challenges in managing donor information, matching blood types, and coordinating urgent transfusion requests. This often leads to critical delays in emergencies.',
    solution: 'BloodConnect provides a centralized platform where donors can register, track their donation history, and locate nearby blood banks. Hospitals can post urgent requests that are automatically matched with eligible donors.',
    features: [
      'User registration and donor profiles',
      'Blood type matching algorithm',
      'Real-time donation request notifications',
      'Donation history tracking',
      'Nearby blood bank locator',
      'Admin dashboard for blood banks',
    ],
    challenges: [
      'Implementing real-time matching logic for emergency requests',
      'Ensuring data privacy and security for sensitive health information',
      'Building a scalable database for high concurrent access',
    ],
    lessons: [
      'Real-time systems require robust message queuing and event handling',
      'Health-related applications demand strict compliance and security protocols',
      'User trust is built through transparency and reliable notifications',
    ],
    screenshots: [],
  },
  {
    id: 2,
    title: 'Mind-Track',
    description: 'Mental health tracking and wellness monitoring application.',
    category: 'Other',
    technologies: [],
    overview: 'Content coming soon.',
    problem: 'Content coming soon.',
    solution: 'Content coming soon.',
    features: [],
    challenges: [],
    lessons: [],
    screenshots: [],
  },
  {
    id: 3,
    title: 'Smart Agriculture Advisor',
    description: 'AI-powered agricultural guidance and crop management system.',
    category: 'Other',
    technologies: [],
    overview: 'Content coming soon.',
    problem: 'Content coming soon.',
    solution: 'Content coming soon.',
    features: [],
    challenges: [],
    lessons: [],
    screenshots: [],
  },
  {
    id: 4,
    title: 'XY Shop',
    description: 'Modern e-commerce platform for seamless online shopping.',
    category: 'Other',
    technologies: [],
    overview: 'Content coming soon.',
    problem: 'Content coming soon.',
    solution: 'Content coming soon.',
    features: [],
    challenges: [],
    lessons: [],
    screenshots: [],
  },
]

export const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Other'] as const
