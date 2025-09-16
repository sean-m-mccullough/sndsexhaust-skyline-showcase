import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Queries
export const queries = {
  hero: `*[_type == "heroSection" && isActive == true][0]{
    header,
    backgroundImage,
    primaryButton,
    secondaryButton
  }`,
  
  whyChooseUs: `*[_type == "whyChooseUsSection" && isActive == true][0]{
    header,
    featureCards[]->{
      title,
      description,
      icon,
      order,
      isActive
    } | order(order asc)
  }`,
  
  servicesSection: `*[_type == "servicesSection" && isActive == true][0]{
    header,
    backgroundColor,
    services[]->{
      title,
      description,
      features,
      icon,
      images,
      reverse
    }
  }`,
  
  footer: `*[_type == "footer"][0]{
    companyInfo,
    services,
    contactInfo,
    copyright,
    additionalInfo,
    additionalInfoLink
  }`,
  
  navigation: `*[_type == "navigation" && isActive == true][0]{
    brandName,
    navigationItems[]{
      label,
      href,
      order,
      isActive
    },
    phoneNumber,
    phoneDisplayText
  }`,
  
  reviewsSection: `*[_type == "reviewsSection" && isActive == true][0]{
    header,
    googleReviewsEnabled,
    googleBusinessUrl,
    errorMessage,
    reviewsDisplayLimit,
    showRatingsSummary,
    ratingSummaryText,
    leaveReviewCard
  }`
}