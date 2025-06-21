import { NextResponse } from 'next/server';
import { storage } from '../../server/storage';

export async function GET() {
  try {
    const values = await storage.getAllValues();
    return NextResponse.json(values);
  } catch (error) {
    console.error('Failed to fetch values:', error);
    return NextResponse.json(
      { message: 'Failed to fetch values' },
      { status: 500 }
    );
  }
}
