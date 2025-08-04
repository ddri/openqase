'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ContactPage() {
  useEffect(() => {
    // Load Tally script if not already loaded
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="mb-4 md:mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Have questions about quantum computing or suggestions for our platform? 
            We'd love to hear from you.
          </p>
        </div>

        {/* Single Column Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Embedded Tally Form */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <iframe
                data-tally-src="https://tally.so/embed/wap82b?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="400"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Form"
                className="rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Community Links */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">Join Our Community</CardTitle>
              <CardDescription>
                Connect with us on social media and join our community platforms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link 
                  href="https://github.com/ddri/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                >
                  <Github className="h-5 w-5" />
                  <span>Follow us on GitHub</span>
                </Link>
                <Link 
                  href="https://threads.com/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Follow us on Threads</span>
                </Link>
                {/*
                <Link 
                  href="https://linkedin.com/company/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Connect on LinkedIn</span>
                </Link>
                */}
                {/*
                <Link 
                  href="https://discord.gg/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Join our Discord</span>
                </Link>
                */}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2">How can I contribute?</h3>
                  <p className="text-muted-foreground">
                    We welcome contributions from the community! You can contribute by submitting case studies,
                    improving documentation, or helping with code. Check out our GitHub repository for more details.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2">I found a bug. Where should I report it?</h3>
                  <p className="text-muted-foreground">
                    Please report any bugs or issues on our GitHub repository's issue tracker. Make sure to
                    include as much detail as possible to help us understand and fix the problem.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2">Can I suggest new features?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We love hearing new ideas from the community. You can suggest features
                    through our GitHub repository or by reaching out to us directly through this form.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 