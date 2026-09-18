export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools'
  description: string
  icon: string
}

export const skills: Skill[] = [
  { name: 'HTML', category: 'Frontend', description: 'Building semantic and accessible web page structures.', icon: 'Code' },
  { name: 'CSS', category: 'Frontend', description: 'Creating responsive layouts and polished user interfaces.', icon: 'Palette' },
  { name: 'JavaScript', category: 'Frontend', description: 'Building interactive application logic and dynamic web experiences.', icon: 'Zap' },
  { name: 'React', category: 'Frontend', description: 'Building reusable component-based user interfaces.', icon: 'CircleDot' },
  { name: 'PHP', category: 'Backend', description: 'Developing server-side application functionality.', icon: 'Server' },
  { name: 'Node.js', category: 'Backend', description: 'Building JavaScript-based backend services.', icon: 'Cpu' },
  { name: 'Express.js', category: 'Backend', description: 'Creating lightweight backend APIs and server applications.', icon: 'Boxes' },
  { name: 'MySQL', category: 'Database', description: 'Working with relational data and SQL databases.', icon: 'Database' },
  { name: 'Git', category: 'Tools', description: 'Managing source code and development history.', icon: 'GitBranch' },
  { name: 'GitHub', category: 'Tools', description: 'Collaborating and managing software projects with Git.', icon: 'Github' },
  { name: 'Windows Server', category: 'Tools', description: 'Working with basic server configuration and deployment concepts.', icon: 'Monitor' },
]
