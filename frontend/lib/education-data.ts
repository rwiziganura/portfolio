export type EducationEntry = {
  id: number
  institution: string
  program: string
  level: string
  startDate: string
  endDate: string
  status?: string
  description: string
  subjects: string[]
}

export const education: EducationEntry[] = [
  {
    id: 1,
    institution: 'Content coming soon.',
    program: 'Content coming soon.',
    level: 'Content coming soon.',
    startDate: 'Content coming soon.',
    endDate: 'Content coming soon.',
    description: 'Content coming soon.',
    subjects: [],
  },
]

export const currentLearningFocus = ['Content coming soon.']

export const isCurrentEducation = (entry: EducationEntry) => entry.status?.toLowerCase() === 'current'
export const getEducationSubjects = (entry: EducationEntry) => entry.subjects.filter(Boolean)
export const formatEducationPeriod = (entry: EducationEntry) => `${entry.startDate} — ${entry.endDate}`
export const hasCurrentLearningFocus = currentLearningFocus.some((item) => item !== 'Content coming soon.')
export const hasEducationContent = education.some((entry) => entry.institution !== 'Content coming soon.')
