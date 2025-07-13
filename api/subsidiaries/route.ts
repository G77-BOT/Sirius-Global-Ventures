import { NextResponse } from 'next/server';

export async function GET() {
  const subsidiaries = [
    {
      id: 1,
      name: "CryptoStream Analytics",
      description: "Real-time cryptocurrency data streaming and analytics platform",
      status: "Active",
      established: "2024"
    },
    {
      id: 2,
      name: "BlockData Pro",
      description: "Professional blockchain data services for enterprises",
      status: "Active",
      established: "2024"
    },
    {
      id: 3,
      name: "CoinFlow API",
      description: "High-performance cryptocurrency market data APIs",
      status: "Active",
      established: "2024"
    }
  ];

  return NextResponse.json({ subsidiaries });
}