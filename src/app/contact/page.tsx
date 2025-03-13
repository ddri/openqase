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
import { useForm } from '@/hooks/useForm'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const { values, isSubmitting, handleChange, handleSubmit } = useForm<ContactForm>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    onSubmit: async (values) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
    },
    successMessage: "Thank you for your message. We'll get back to you soon.",
    errorMessage: "Failed to send message. Please try again later."
  })

  return (
    <main className="min-h-screen">
      <div className="container-outer section-spacing">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
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
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-base">
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
                      value={values.name}
                      onChange={handleChange}
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
                      value={values.email}
                      onChange={handleChange}
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
                    value={values.subject}
                    onChange={handleChange}
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
                    value={values.message}
                    onChange={handleChange}
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
                <CardTitle className="text-2xl">Join Our Community</CardTitle>
                <CardDescription className="text-base">
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
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-base">
                  Quick answers to common questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How can I contribute?</h3>
                    <p className="text-muted-foreground">
                      We welcome contributions from the community! You can contribute by submitting case studies,
                      improving documentation, or helping with code. Check out our GitHub repository for more details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">I found a bug. Where should I report it?</h3>
                    <p className="text-muted-foreground">
                      Please report any bugs or issues on our GitHub repository's issue tracker. Make sure to
                      include as much detail as possible to help us understand and fix the problem.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Can I suggest new features?</h3>
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