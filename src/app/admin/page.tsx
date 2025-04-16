import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { FileText, Code, Building2, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard - OpenQASE',
  description: 'Admin dashboard for managing OpenQASE content'
}

const contentTypes = [
  {
    title: 'Case Studies',
    description: 'Create and manage case studies showcasing quantum computing applications.',
    href: '/admin/case-studies',
    icon: FileText
  },
  {
    title: 'Algorithms',
    description: 'Manage quantum algorithm descriptions and implementations.',
    href: '/admin/algorithms',
    icon: Code
  },
  {
    title: 'Industries',
    description: 'Organize industry-specific quantum computing use cases.',
    href: '/admin/industries',
    icon: Building2
  },
  {
    title: 'Personas',
    description: 'Define learning paths for different user roles and backgrounds.',
    href: '/admin/personas',
    icon: Users
  }
]

export default function AdminPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">
          Select a content type to create or manage entries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card key={type.href} className="hover:bg-accent transition-colors">
              <Link href={type.href}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">{type.title}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 