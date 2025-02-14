// src/components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1D] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">openQase</h2>
            <p className="text-gray-400 text-sm">
              Making quantum computing accessible through real-world case studies and practical insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learning-path" className="text-gray-400 hover:text-copper transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link href="/quantum-stack" className="text-gray-400 hover:text-copper transition-colors">
                  Quantum Stack
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-copper transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-copper transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-400 hover:text-copper transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-copper transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest quantum computing insights and case studies.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg 
                         text-gray-300 placeholder-gray-500 focus:outline-none focus:border-copper
                         transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-copper/20 text-copper-light border border-copper/40
                         rounded-lg hover:bg-copper/30 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 openQase. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}