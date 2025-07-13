import { NextResponse } from 'next/server';

export async function GET() {
  const contact = {
    company: "CryptoBostream",
    email: "contact@cryptobostream.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Crypto Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA"
    },
    support: {
      email: "support@cryptobostream.com",
      hours: "24/7"
    }
  };

  return NextResponse.json({ contact });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real implementation, you would process the contact form submission
    // For now, we'll just return a success response
    
    return NextResponse.json({ 
      success: true, 
      message: "Thank you for your message. We'll get back to you soon!" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send message. Please try again." 
    }, { status: 500 });
  }
}