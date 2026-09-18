export const contactInfo = {
  email: 'YOUR_EMAIL',
  location: 'Rwanda',
  github: 'YOUR_GITHUB_URL',
  linkedin: 'YOUR_LINKEDIN_URL',
} as const

export function isRealContactValue(value: string) {
  return value.trim() !== '' && !value.startsWith('YOUR_')
}

export function isRealEmail(value: string) {
  return isRealContactValue(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const socialLinks = [
  { label: 'GitHub', value: contactInfo.github },
  { label: 'LinkedIn', value: contactInfo.linkedin },
].filter((link) => isRealContactValue(link.value))

export const hasRealEmail = isRealEmail(contactInfo.email)

export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export const emptyContactForm: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please enter a subject.'
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}

export const contactSubmissionNotice = 'Demo mode: this form is ready for a future POST /api/contact connection.'

export const contactNavigation = [
  { label: 'GitHub', href: contactInfo.github },
  { label: 'LinkedIn', href: contactInfo.linkedin },
].filter((link) => isRealContactValue(link.href))

export const contactEmailHref = hasRealEmail ? `mailto:${contactInfo.email}` : undefined

export const contactLabels = {
  email: 'EMAIL',
  location: 'LOCATION',
} as const

export const contactHeading = "Let's build something useful."

export const contactDescription = 'Have a project idea, collaboration opportunity, or just want to connect? Send me a message.'

export const contactClosing = 'Have an idea worth building?'

export const contactClosingAction = "Let's talk."

export const contactSubmissionDelay = 650

export const contactMaxMessageLength = 1000

export const contactSocialLabels = socialLinks.map((link) => link.label)

export const contactHasSocialLinks = socialLinks.length > 0

export const contactPlaceholderEmail = contactInfo.email

export const contactLocation = contactInfo.location

export const contactEmail = contactInfo.email

export const contactGithub = contactInfo.github

export const contactLinkedin = contactInfo.linkedin

export const contactFormFieldNames: Array<keyof ContactFormValues> = ['name', 'email', 'subject', 'message']

export const contactFormEndpoint = '/api/contact'

export const contactFormMethod = 'POST'

export const contactFormReadyForBackend = true

export const contactFormDemoOnly = true

export const contactInfoLabels = ['email', 'location'] as const

export const contactSocialIconLabels = ['GitHub', 'LinkedIn'] as const

export const contactSectionId = 'contact'

export const contactSectionLabel = 'GET IN TOUCH'

export const contactFormTitle = 'Contact form'

export const contactFormButtonLabel = 'Send Message'

export const contactFormSubmittingLabel = 'Sending...'

export const contactSuccessTitle = 'Message sent successfully.'

export const contactSuccessDescription = "Thanks for reaching out. I'll get back to you soon."

export const contactErrorTitle = 'Something went wrong.'

export const contactErrorDescription = 'Please try again.'

export const contactRetryLabel = 'Try Again'

export const contactMessageCountLabel = (length: number) => `${length} / ${contactMaxMessageLength}`

export const contactAccessibleEmailLabel = hasRealEmail ? `Email ${contactInfo.email}` : 'Email placeholder'

export const contactAccessibleLocationLabel = `Location ${contactInfo.location}`

export const contactAccessibleSocialLabel = (label: string) => `Open ${label} profile`

export const contactDataVersion = 1

export const contactSupportsApiMigration = true

export const contactRequiresServerValidation = true

export const contactNoSecretsInClient = true

export const contactUsesPlaceholderData = !hasRealEmail && socialLinks.length === 0

export const contactReady = true

export const contactSectionOrder = 10

export const contactFormAccessibleName = 'Send a message'

export const contactMessagePlaceholder = 'Tell me a little about what you have in mind...'

export const contactNamePlaceholder = 'Your name'

export const contactEmailPlaceholder = 'you@example.com'

export const contactSubjectPlaceholder = 'What would you like to build?'

export const contactInfoIntro = 'I am open to thoughtful collaborations, product ideas, and conversations about building useful software.'

export const contactFutureNote = 'Submission is simulated until a backend is connected.'

export const contactFormFields = ['Name', 'Email', 'Subject', 'Message'] as const

export const contactSocialsAvailable = socialLinks.length > 0

export const contactEmailAvailable = hasRealEmail

export const contactLocationAvailable = contactInfo.location.trim().length > 0

export const contactUseDemoSubmission = true

export const contactAllowRetry = true

export const contactClearOnSuccess = true

export const contactPreventDuplicateSubmissions = true

export const contactHasErrorState = true

export const contactHasSuccessState = true

export const contactHasCharacterCount = true

export const contactRespectsReducedMotion = true

export const contactAccessible = true

export const contactResponsive = true

export const contactDataDriven = true

export const contactFutureApi = contactFormEndpoint

export const contactFormSubmitLabel = contactFormButtonLabel

export const contactFormLoadingLabel = contactFormSubmittingLabel

export const contactSuccessMessage = `${contactSuccessTitle} ${contactSuccessDescription}`

export const contactErrorMessage = `${contactErrorTitle} ${contactErrorDescription}`

export const contactPlaceholderNotice = contactSubmissionNotice

export const contactSectionTitle = contactHeading

export const contactSectionDescription = contactDescription

export const contactFinalPrompt = `${contactClosing} ${contactClosingAction}`

export const contactContent = { contactInfo, socialLinks, contactHeading, contactDescription }

export default contactInfo
        
