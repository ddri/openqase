import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Send an email notification
    // 2. Store the message in a database
    // 3. Send to a CRM system
    // For now, we'll just log it
    console.log('Contact form submission:', { name, email, subject, message })

    return NextResponse.json(
      { message: 'Thank you for your message. We will get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 