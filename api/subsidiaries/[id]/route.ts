import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  // Mock subsidiary data
  const subsidiaries = {
    1: {
      id: 1,
      name: "CryptoStream Analytics",
      description: "Real-time cryptocurrency data streaming and analytics platform",
      detailedDescription: "CryptoStream Analytics provides enterprise-grade cryptocurrency data streaming services with real-time market analysis, trend detection, and comprehensive reporting tools.",
      logoInitials: "CSA",
      logoColor: "#3B82F6",
      websiteUrl: "https://cryptostream.example.com",
      status: "Active",
      established: "2024"
    },
    2: {
      id: 2,
      name: "BlockData Pro",
      description: "Professional blockchain data services for enterprises",
      detailedDescription: "BlockData Pro delivers comprehensive blockchain data solutions for institutional clients, featuring advanced analytics and seamless API integration.",
      logoInitials: "BDP",
      logoColor: "#7C3AED",
      websiteUrl: "https://blockdata.example.com",
      status: "Active",
      established: "2024"
    }
  };

  const features = [
    {
      id: 1,
      title: "Real-time Data Streaming",
      description: "High-frequency data streaming with minimal latency for professional trading applications.",
      iconName: "BarChart2"
    },
    {
      id: 2,
      title: "Advanced Analytics",
      description: "Comprehensive market analysis tools with predictive modeling and trend detection.",
      iconName: "BarChart"
    },
    {
      id: 3,
      title: "Enterprise Security",
      description: "Bank-level security with encrypted connections and secure API access.",
      iconName: "Lock"
    },
    {
      id: 4,
      title: "API Integration",
      description: "RESTful APIs with comprehensive documentation for seamless integration.",
      iconName: "Settings"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "< 10ms", label: "Latency" },
    { value: "500+", label: "Exchanges" },
    { value: "24/7", label: "Support" }
  ];

  const subsidiary = subsidiaries[id as keyof typeof subsidiaries];

  if (!subsidiary) {
    return NextResponse.json({ error: 'Subsidiary not found' }, { status: 404 });
  }

  return NextResponse.json({
    subsidiary,
    features,
    stats
  });
}
