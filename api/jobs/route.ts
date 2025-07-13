import { NextResponse } from 'next/server';

export async function GET() {
  const jobs = [
    {
      id: 1,
      title: "Senior Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our team to build scalable cryptocurrency data streaming infrastructure."
    },
    {
      id: 2,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      description: "Help us maintain and scale our high-availability cryptocurrency platform."
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Lead product strategy for our cryptocurrency streaming and analytics platform."
    }
  ];

  return NextResponse.json({ jobs });
}