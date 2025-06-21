import { NextResponse } from 'next/server';
import { storage } from '../../server/storage';

export async function GET() {
  try {
    const jobs = await storage.getAllJobPostings();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to fetch job postings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch job postings' },
      { status: 500 }
    );
  }
}
