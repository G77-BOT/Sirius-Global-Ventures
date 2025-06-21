import { NextResponse } from 'next/server';
import { storage } from '../../server/storage';

export async function GET() {
  try {
    const subsidiaries = await storage.getAllSubsidiaries();
    return NextResponse.json(subsidiaries);
  } catch (error) {
    console.error('Failed to fetch subsidiaries:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subsidiaries' },
      { status: 500 }
    );
  }
}
