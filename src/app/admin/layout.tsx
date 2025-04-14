import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if user is admin
  const { data: user } = await supabase
    .from('user_preferences')
    .select('role')
    .single();

  if (!session || user?.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          <a
            href="/admin/case-studies"
            className="block px-4 py-2 hover:bg-gray-800"
          >
            Case Studies
          </a>
          <a
            href="/admin/algorithms"
            className="block px-4 py-2 hover:bg-gray-800"
          >
            Algorithms
          </a>
          <a
            href="/admin/industries"
            className="block px-4 py-2 hover:bg-gray-800"
          >
            Industries
          </a>
          <a
            href="/admin/personas"
            className="block px-4 py-2 hover:bg-gray-800"
          >
            Personas
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
} 