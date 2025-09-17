import { MetadataRoute } from 'next'
import { createServiceRoleSupabaseClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://openqase.com'
  const supabase = createServiceRoleSupabaseClient()
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/roadmap',
    '/case-study',
    '/blog',
    '/paths',
    '/paths/algorithm',
    '/paths/industry',
    '/paths/persona',
    '/paths/quantum-companies',
    '/paths/quantum-software',
    '/paths/quantum-hardware',
    '/paths/partner-companies',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Fetch all published case studies
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('slug, updated_at')
    .eq('published', true)
    .order('updated_at', { ascending: false })
  
  const caseStudyPages = (caseStudies || []).map(cs => ({
    url: `${baseUrl}/case-study/${cs.slug}`,
    lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  // Fetch all published algorithms
  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('slug, updated_at')
    .eq('published', true)
  
  const algorithmPages = (algorithms || []).map(item => ({
    url: `${baseUrl}/paths/algorithm/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Fetch all published industries
  const { data: industries } = await supabase
    .from('industries')
    .select('slug, updated_at')
    .eq('published', true)
  
  const industryPages = (industries || []).map(item => ({
    url: `${baseUrl}/paths/industry/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Fetch all published personas
  const { data: personas } = await supabase
    .from('personas')
    .select('slug, updated_at')
    .eq('published', true)
  
  const personaPages = (personas || []).map(item => ({
    url: `${baseUrl}/paths/persona/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Fetch all published blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true)
  
  const blogPages = (blogPosts || []).map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))
  
  // Fetch quantum entities
  const { data: quantumCompanies } = await supabase
    .from('quantum_companies')
    .select('slug, updated_at')
    .eq('published', true)
  
  const quantumCompanyPages = (quantumCompanies || []).map(item => ({
    url: `${baseUrl}/paths/quantum-companies/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  
  const { data: quantumSoftware } = await supabase
    .from('quantum_software')
    .select('slug, updated_at')
    .eq('published', true)
  
  const quantumSoftwarePages = (quantumSoftware || []).map(item => ({
    url: `${baseUrl}/paths/quantum-software/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  
  const { data: quantumHardware } = await supabase
    .from('quantum_hardware')
    .select('slug, updated_at')
    .eq('published', true)
  
  const quantumHardwarePages = (quantumHardware || []).map(item => ({
    url: `${baseUrl}/paths/quantum-hardware/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  
  const { data: partnerCompanies } = await supabase
    .from('partner_companies')
    .select('slug, updated_at')
    .eq('published', true)
  
  const partnerCompanyPages = (partnerCompanies || []).map(item => ({
    url: `${baseUrl}/paths/partner-companies/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  
  // Combine all pages
  return [
    ...staticPages,
    ...caseStudyPages,
    ...algorithmPages,
    ...industryPages,
    ...personaPages,
    ...blogPages,
    ...quantumCompanyPages,
    ...quantumSoftwarePages,
    ...quantumHardwarePages,
    ...partnerCompanyPages,
  ]
}