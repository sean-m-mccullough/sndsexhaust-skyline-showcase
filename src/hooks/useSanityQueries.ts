import { useQueries } from '@tanstack/react-query'
import { client, queries } from '@/lib/sanity'

export const useSanityQueries = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['navigation'],
        queryFn: () => client.fetch(queries.navigation),
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      {
        queryKey: ['hero'],
        queryFn: () => client.fetch(queries.hero),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['whyChooseUs'],
        queryFn: () => client.fetch(queries.whyChooseUs),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['servicesSection'],
        queryFn: () => client.fetch(queries.servicesSection),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['footer'],
        queryFn: () => client.fetch(queries.footer),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['reviewsSection'],
        queryFn: () => client.fetch(queries.reviewsSection),
        staleTime: 5 * 60 * 1000,
      },
    ],
  })

  const [navigationQuery, heroQuery, whyChooseUsQuery, servicesQuery, footerQuery, reviewsQuery] = results

  return {
    navigationData: navigationQuery.data,
    heroData: heroQuery.data,
    whyChooseUsData: whyChooseUsQuery.data,
    servicesData: servicesQuery.data,
    footerData: footerQuery.data,
    reviewsData: reviewsQuery.data,
    isLoading: results.some(query => query.isLoading),
    isError: results.some(query => query.isError),
    errors: results.map(query => query.error).filter(Boolean),
    refetchAll: () => results.forEach(query => query.refetch()),
  }
}