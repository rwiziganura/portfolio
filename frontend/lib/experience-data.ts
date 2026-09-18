export type JourneyEntry = {
  id: string
  year: string
  title: string
  description: string
  technologies: string[]
}

export const journey: JourneyEntry[] = [
  {
    id: 'journey-1',
    year: 'Content coming soon.',
    title: 'The journey begins here.',
    description: 'Content coming soon.',
    technologies: [],
  },
  {
    id: 'journey-2',
    year: 'Content coming soon.',
    title: 'Building and learning in public.',
    description: 'Content coming soon.',
    technologies: [],
  },
  {
    id: 'journey-3',
    year: 'Content coming soon.',
    title: 'Growing through practical projects.',
    description: 'Content coming soon.',
    technologies: [],
  },
]

export const currentFocus = ['Content coming soon.']

export const hasJourneyContent = journey.some(
  (entry) => entry.year !== 'Content coming soon.' || entry.description !== 'Content coming soon.'
)

export const hasCurrentFocus = currentFocus.some((item) => item !== 'Content coming soon.')

export function getJourneyContentLabel(hasContent: boolean) {
  return hasContent ? undefined : 'Content coming soon.'
}

export default journey
