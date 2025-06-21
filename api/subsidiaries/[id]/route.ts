import { NextResponse } from 'next/server';
import { storage } from '../../../server/storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Invalid subsidiary ID' },
        { status: 400 }
      );
    }

    const subsidiary = await storage.getSubsidiary(id);
    if (!subsidiary) {
      return NextResponse.json(
        { message: 'Subsidiary not found' },
        { status: 404 }
      );
    }

    // Get related features and stats
    const [features, stats] = await Promise.all([
      storage.getFeaturesBySubsidiary(id),
      storage.getStatsBySubsidiary(id)
    ]);

    return NextResponse.json({
      subsidiary,
      features,
      stats
    });
  } catch (error) {
    console.error('Failed to fetch subsidiary details:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subsidiary details' },
      { status: 500 }
    );
  }
}
