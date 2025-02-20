// src/components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              openQase
            </h3>
            <p className="text-text-secondary max-w-md">
              An open resource platform for quantum computing case studies and learning materials.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learning-path" className="text-text-secondary hover:text-accent transition-colors">
                  Learning Path
                </Link>
              </li>
              <li>
                <Link href="/paths/persona" className="text-text-secondary hover:text-accent transition-colors">
                  Persona Path
                </Link>
              </li>
              <li>
                <Link href="/paths/industry" className="text-text-secondary hover:text-accent transition-colors">
                  Industry Path
                </Link>
              </li>
              <li>
                <Link href="/paths/algorithm" className="text-text-secondary hover:text-accent transition-colors">
                  Algorithm Path
                </Link>
              </li>
              <li>
                <Link href="/quantum-stack" className="text-text-secondary hover:text-accent transition-colors">
                  Quantum Stack
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://github.com/ddri/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/your-repo/openqase/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/your-repo/openqase/blob/main/RESOURCES.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Additional Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-card-border">
          <div className="flex justify-between items-center">
            <p className="text-text-tertiary text-sm">
              © {new Date().getFullYear()} openQase. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy"
                className="text-text-tertiary hover:text-accent text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-text-tertiary hover:text-accent text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}