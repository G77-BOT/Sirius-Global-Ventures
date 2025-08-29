import { NextRequest, NextResponse } from 'next/server';

// Mock database for applications
const applications: Array<{
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  appliedAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['jobId', 'name', 'email', 'resume'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create new application
    const newApplication = {
      id: applications.length + 1,
      jobId: Number(body.jobId),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      resume: body.resume,
      coverLetter: body.coverLetter || '',
      status: 'pending' as const,
      appliedAt: new Date().toISOString()
    };

    applications.push(newApplication);

    return NextResponse.json({
      success: true,
      application: newApplication,
      message: 'Application submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
