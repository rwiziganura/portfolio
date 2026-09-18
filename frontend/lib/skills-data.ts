export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools'

export interface Skill {
  name: string
  category: SkillCategory
  description: string
  icon: string
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'HTML',
    category: 'Frontend',
    description: 'Building semantic and accessible web page structures.',
    icon: 'Code',
  },
  {
    name: 'CSS',
    category: 'Frontend',
    description: 'Creating responsive layouts and polished user interfaces.',
    icon: 'Palette',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    description: 'Building interactive application logic and dynamic web experiences.',
    icon: 'Zap',
  },
  {
    name: 'React',
    category: 'Frontend',
    description: 'Building reusable component-based user interfaces.',
    icon: 'CircleDot',
  },
  // Backend
  {
    name: 'PHP',
    category: 'Backend',
    description: 'Developing server-side application functionality.',
    icon: 'Server',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Building JavaScript-based backend services.',
    icon: 'Cpu',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    description: 'Creating lightweight backend APIs and server applications.',
    icon: 'Boxes',
  },
  // Database
  {
    name: 'MySQL',
    category: 'Database',
    description: 'Working with relational data and SQL databases.',
    icon: 'Database',
  },
  // Tools
  {
    name: 'Git',
    category: 'Tools',
    description: 'Managing source code and development history.',
    icon: 'GitBranch',
  },
  {
    name: 'GitHub',
    category: 'Tools',
    description: 'Collaborating and managing software projects with Git.',
    icon: 'Github',
  },
  {
    name: 'Windows Server',
    category: 'Tools',
    description: 'Working with basic server configuration and deployment concepts.',
    icon: 'Monitor',
  },
]

export const categories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Tools']

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter((skill) => skill.category === category)
}

export const getAllSkills = (): Skill[] => {
  return skills
}
