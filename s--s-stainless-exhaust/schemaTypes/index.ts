import service from './service'
import featureCard from './featureCard'
import whyChooseUsSection from './whyChooseUsSection'
import heroSection from './heroSection'
import servicesSection from './servicesSection'
import footer from './footer'
import navigation from './navigation'
import reviewsSection from './reviewsSection'

// Objects
import sectionHeader from './objects/sectionHeader'

export const schemaTypes = [
  // Objects (must be listed first)
  sectionHeader,
  
  // Documents
  service,
  featureCard,
  whyChooseUsSection,
  heroSection,
  servicesSection,
  footer,
  navigation,
  reviewsSection
]