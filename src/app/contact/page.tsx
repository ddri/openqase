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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions about quantum computing or suggestions for our platform? 
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
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
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
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
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  value={values.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Contact Info */}
        <div className="space-y-6">
          {/* Community Links */}
          <Card>
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>
                Connect with us on social media and join our community platforms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link 
                  href="https://github.com/ddri/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>Follow us on GitHub</span>
                </Link>
                <Link 
                  href="https://twitter.com/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Follow us on Twitter</span>
                </Link>
                <Link 
                  href="https://linkedin.com/company/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Connect on LinkedIn</span>
                </Link>
                <Link 
                  href="https://discord.gg/openqase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Join our Discord</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">How can I contribute?</h3>
                  <p className="text-sm text-muted-foreground">
                    We welcome contributions from the community! You can contribute by submitting case studies,
                    improving documentation, or helping with code. Check out our GitHub repository for more details.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">I found a bug. Where should I report it?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please report any bugs or issues on our GitHub repository's issue tracker. Make sure to
                    include as much detail as possible to help us understand and fix the problem.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Can I suggest new features?</h3>
                  <p className="text-sm text-muted-foreground">
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
  )
} 