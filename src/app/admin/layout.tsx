import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  BookOpen,
  Settings,
  PenTool
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/admin/case-studies', label: 'Case Studies', icon: <FileText className="h-4 w-4" /> },
    { href: '/admin/algorithms', label: 'Algorithms', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/admin/industries', label: 'Industries', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/admin/personas', label: 'Personas', icon: <Users className="h-4 w-4" /> },
    { href: '/admin/blog', label: 'Blog', icon: <PenTool className="h-4 w-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-52 bg-card border-r border-border flex flex-col">
        <nav className="flex-1 p-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                  <span className="ml-2.5">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto pb-20">
        {children}
      </div>
    </div>
  );
}