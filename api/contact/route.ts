import { NextResponse } from 'next/server';
import { storage } from '../../server/storage';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subsidiaryId: z.number().int().positive().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validation.error.issues },
        { status: 400 }
      );
    }

    const submission = await storage.createContactSubmission(validation.data);
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return NextResponse.json(
      { message: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
