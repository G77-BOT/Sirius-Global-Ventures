import { NextResponse } from 'next/server';
import { storage } from '../../server/storage';

export async function GET() {
  try {
    const news = await storage.getAllNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return NextResponse.json(
      { message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
