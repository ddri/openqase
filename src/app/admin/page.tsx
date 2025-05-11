import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Briefcase, Users, PenTool } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard - OpenQASE',
  description: 'OpenQASE Content Management System',
};

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();
  
  // Fetch counts for different content types
  const [
    caseStudiesResponse,
    algorithmsResponse,
    industriesResponse,
    personasResponse,
    blogPostsResponse
  ] = await Promise.all([
    supabase.from('case_studies').select('id', { count: 'exact', head: true }),
    supabase.from('algorithms').select('id', { count: 'exact', head: true }),
    supabase.from('industries').select('id', { count: 'exact', head: true }),
    supabase.from('personas').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true })
  ]);

  const contentCounts = {
    caseStudies: caseStudiesResponse.count || 0,
    algorithms: algorithmsResponse.count || 0,
    industries: industriesResponse.count || 0,
    personas: personasResponse.count || 0,
    blogPosts: blogPostsResponse.count || 0
  };

  const contentCards = [
    {
      title: 'Case Studies',
      count: contentCounts.caseStudies,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      href: '/admin/case-studies',
      description: 'Manage case studies and success stories'
    },
    {
      title: 'Algorithms',
      count: contentCounts.algorithms,
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      href: '/admin/algorithms',
      description: 'Manage quantum algorithm descriptions'
    },
    {
      title: 'Industries',
      count: contentCounts.industries,
      icon: <Briefcase className="h-8 w-8 text-green-500" />,
      href: '/admin/industries',
      description: 'Manage industry categories'
    },
    {
      title: 'Personas',
      count: contentCounts.personas,
      icon: <Users className="h-8 w-8 text-orange-500" />,
      href: '/admin/personas',
      description: 'Manage user personas'
    },
    {
      title: 'Blog Posts',
      count: contentCounts.blogPosts,
      icon: <PenTool className="h-8 w-8 text-pink-500" />,
      href: '/admin/blog',
      description: 'Manage blog posts and articles'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage content and settings for the OpenQASE platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentCards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.count}</p>
                <p className="text-sm text-muted-foreground mt-2">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/case-studies/new" className="block text-blue-500 hover:underline">
                New Case Study
              </Link>
              <Link href="/admin/algorithms/new" className="block text-blue-500 hover:underline">
                New Algorithm
              </Link>
              <Link href="/admin/industries/new" className="block text-blue-500 hover:underline">
                New Industry
              </Link>
              <Link href="/admin/personas/new" className="block text-blue-500 hover:underline">
                New Persona
              </Link>
              <Link href="/admin/blog/new" className="block text-blue-500 hover:underline">
                New Blog Post
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Content update history will be displayed here in a future update.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>All systems operational</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {new Date().toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}