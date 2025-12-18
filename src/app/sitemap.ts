import { MetadataRoute } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'

const BASE_URL = 'https://openqase.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServiceRoleSupabaseClient()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/case-study`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/paths`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch dynamic content
  const [
    caseStudies,
    algorithms,
    industries,
    personas,
    blogPosts,
    quantumSoftware,
    quantumHardware,
    quantumCompanies,
    partnerCompanies,
  ] = await Promise.all([
    supabase.from('case_studies').select('slug, updated_at').eq('published', true),
    supabase.from('algorithms').select('slug, updated_at').eq('published', true),
    supabase.from('industries').select('slug, updated_at').eq('published', true),
    supabase.from('personas').select('slug, updated_at').eq('published', true),
    supabase.from('blog_posts').select('slug, updated_at').eq('published', true),
    supabase.from('quantum_software').select('slug, updated_at').eq('published', true),
    supabase.from('quantum_hardware').select('slug, updated_at').eq('published', true),
    supabase.from('quantum_companies').select('slug, updated_at').eq('published', true),
    supabase.from('partner_companies').select('slug, updated_at').eq('published', true),
  ])

  // Case study pages
  const caseStudyPages: MetadataRoute.Sitemap = (caseStudies.data || []).map((item) => ({
    url: `${BASE_URL}/case-study/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Algorithm pages
  const algorithmPages: MetadataRoute.Sitemap = (algorithms.data || []).map((item) => ({
    url: `${BASE_URL}/paths/algorithm/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Industry pages
  const industryPages: MetadataRoute.Sitemap = (industries.data || []).map((item) => ({
    url: `${BASE_URL}/paths/industry/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Persona pages
  const personaPages: MetadataRoute.Sitemap = (personas.data || []).map((item) => ({
    url: `${BASE_URL}/paths/persona/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = (blogPosts.data || []).map((item) => ({
    url: `${BASE_URL}/blog/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Quantum software pages
  const softwarePages: MetadataRoute.Sitemap = (quantumSoftware.data || []).map((item) => ({
    url: `${BASE_URL}/paths/quantum-software/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Quantum hardware pages
  const hardwarePages: MetadataRoute.Sitemap = (quantumHardware.data || []).map((item) => ({
    url: `${BASE_URL}/paths/quantum-hardware/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Quantum company pages
  const quantumCompanyPages: MetadataRoute.Sitemap = (quantumCompanies.data || []).map((item) => ({
    url: `${BASE_URL}/paths/quantum-company/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Partner company pages
  const partnerCompanyPages: MetadataRoute.Sitemap = (partnerCompanies.data || []).map((item) => ({
    url: `${BASE_URL}/paths/partner-company/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...caseStudyPages,
    ...algorithmPages,
    ...industryPages,
    ...personaPages,
    ...blogPages,
    ...softwarePages,
    ...hardwarePages,
    ...quantumCompanyPages,
    ...partnerCompanyPages,
  ]
}
