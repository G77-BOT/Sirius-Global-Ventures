import { NextResponse } from 'next/server';

export async function GET() {
  const values = [
    {
      id: 1,
      title: "Innovation",
      description: "We constantly push the boundaries of cryptocurrency technology to deliver cutting-edge solutions."
    },
    {
      id: 2,
      title: "Transparency",
      description: "We believe in open communication and transparent business practices with all our stakeholders."
    },
    {
      id: 3,
      title: "Security",
      description: "Security is paramount in everything we do, from data protection to platform architecture."
    },
    {
      id: 4,
      title: "Reliability",
      description: "Our platform provides consistent, reliable service that our clients can depend on 24/7."
    }
  ];

  return NextResponse.json({ values });
}