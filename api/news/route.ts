import { NextResponse } from 'next/server';

export async function GET() {
  const news = [
    {
      id: 1,
      title: "CryptoBostream Launches Advanced Streaming Platform",
      content: "CryptoBostream today announced the launch of its next-generation cryptocurrency streaming platform, featuring real-time data processing and advanced analytics capabilities.",
      date: "2024-01-15",
      author: "CryptoBostream Team"
    },
    {
      id: 2,
      title: "New API Features Released",
      content: "We've released several new API endpoints to improve data access and integration capabilities for our enterprise clients.",
      date: "2024-01-10",
      author: "Development Team"
    },
    {
      id: 3,
      title: "Partnership with Major Exchanges",
      content: "CryptoBostream has established strategic partnerships with leading cryptocurrency exchanges to enhance data quality and coverage.",
      date: "2024-01-05",
      author: "Business Development"
    }
  ];

  return NextResponse.json({ news });
}