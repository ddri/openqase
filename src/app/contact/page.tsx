'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('https://formspree.io/f/mdkekzlb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Thank you for your message. We'll get back to you soon.",
          duration: 3000,
        })
        // Reset the form
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    className="min-h-[150px] resize-y"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Contact Info */}
          <div className="space-y-6 sm:space-y-8">
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
                    href="https://twitter.com/openqase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                  >
                    <Twitter className="h-5 w-5" />
                    <span>Follow us on Twitter</span>
                  </Link>
                  <Link 
                    href="https://linkedin.com/company/openqase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Connect on LinkedIn</span>
                  </Link>
                  <Link 
                    href="https://discord.gg/openqase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/5 rounded-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Join our Discord</span>
                  </Link>
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
      </div>
    </main>
  )
} 