import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  BookOpen,
  Layers,
  Settings
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/admin/case-studies', label: 'Case Studies', icon: <FileText className="h-5 w-5" /> },
    { href: '/admin/algorithms', label: 'Algorithms', icon: <BookOpen className="h-5 w-5" /> },
    { href: '/admin/industries', label: 'Industries', icon: <Briefcase className="h-5 w-5" /> },
    { href: '/admin/personas', label: 'Personas', icon: <Users className="h-5 w-5" /> },
    { href: '/admin/stack-layers', label: 'Stack Layers', icon: <Layers className="h-5 w-5" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold">OpenQASE Admin</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-border text-xs text-muted-foreground">
          <p>OpenQASE Admin v1.0</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}