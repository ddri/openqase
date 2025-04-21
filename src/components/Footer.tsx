'use client'

// src/components/Footer.tsx
import Link from 'next/link'
import { Github, Twitter, Linkedin, MessageCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FooterSectionProps {
  title: string
  children: React.ReactNode
}

function FooterSection({ title, children }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="border-b md:border-none border-border last:border-0">
      <button
        className="flex w-full items-center justify-between py-4 md:py-0 md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-sm font-semibold uppercase">
          {title}
        </h4>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform md:hidden",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-200 ease-in-out",
        isOpen ? "max-h-96 pb-4 md:pb-0" : "max-h-0 md:max-h-96"
      )}>
        {children}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {/* About Us Column */}
          <FooterSection title="About Us">
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About openQase
                </Link>
              </li>
              <li>
                <Link href="/about#mission" className="text-muted-foreground hover:text-accent transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-muted-foreground hover:text-accent transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Resources Column */}
          <FooterSection title="Resources">
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-study" className="text-muted-foreground hover:text-accent transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/paths" className="text-muted-foreground hover:text-accent transition-colors">
                  Learning Paths
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Connect Column */}
          <FooterSection title="Connect">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://github.com/ddri/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://twitter.com/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://linkedin.com/company/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://discord.gg/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discord</span>
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Legal Column */}
          <FooterSection title="Legal">
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 md:mt-12 pt-4 md:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} openQase. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Built with ❤️ by the quantum computing community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}