import { NextRequest, NextResponse } from 'next/server';

// Mock job data - in a real application, this would come from a database
const jobs = [
  {
    id: 1,
    title: "Investment Analyst",
    department: "Investments",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our investment team to analyze potential opportunities and support portfolio companies.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "2-4 years of experience in investment analysis or consulting",
      "Strong analytical and financial modeling skills",
      "Excellent communication and presentation abilities",
      "CFA designation preferred"
    ],
    responsibilities: [
      "Conduct due diligence on potential investments",
      "Build financial models and perform valuation analysis",
      "Support portfolio companies with strategic initiatives",
      "Prepare investment memos and presentations",
      "Monitor market trends and competitive landscape"
    ],
    datePosted: "2024-02-15",
    applicationDeadline: "2024-04-15",
    salaryRange: "$90,000 - $120,000",
    experience: "2-4 years",
    featured: true
  },
  {
    id: 2,
    title: "Senior Frontend Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description: "Lead the development of our investor portal and internal tools using modern web technologies.",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent experience",
      "5+ years of experience in frontend development",
      "Expertise in React, TypeScript, and modern web technologies",
      "Experience with responsive design and UI/UX best practices",
      "Knowledge of financial services or FinTech preferred"
    ],
    responsibilities: [
      "Develop and maintain investor-facing web applications",
      "Collaborate with design team to implement user interfaces",
      "Optimize applications for performance and scalability",
      "Mentor junior developers and conduct code reviews",
      "Stay current with emerging technologies and best practices"
    ],
    datePosted: "2024-02-20",
    applicationDeadline: "2024-04-20",
    salaryRange: "$130,000 - $160,000",
    experience: "5+ years",
    featured: false
  },
  {
    id: 3,
    title: "Portfolio Operations Manager",
    department: "Operations",
    location: "New York, NY",
    type: "Full-time",
    description: "Oversee operational aspects of our portfolio companies and investment processes.",
    requirements: [
      "MBA or equivalent advanced degree",
      "3-5 years of experience in operations or management consulting",
      "Strong project management and organizational skills",
      "Experience working with startups or growth companies",
      "Excellent interpersonal and communication skills"
    ],
    responsibilities: [
      "Support portfolio companies with operational improvements",
      "Manage investment process workflows and documentation",
      "Coordinate with external service providers and advisors",
      "Develop and maintain operational metrics and reporting",
      "Lead special projects and strategic initiatives"
    ],
    datePosted: "2024-02-10",
    applicationDeadline: "2024-04-10",
    salaryRange: "$110,000 - $140,000",
    experience: "3-5 years",
    featured: false
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Technology",
    location: "New York, NY / Remote",
    type: "Full-time",
    description: "Apply advanced analytics and machine learning to investment decisions and portfolio optimization.",
    requirements: [
      "PhD or Master's degree in Data Science, Statistics, or related field",
      "4+ years of experience in data science or analytics",
      "Proficiency in Python, R, and SQL",
      "Experience with machine learning frameworks and cloud platforms",
      "Background in finance or investment management preferred"
    ],
    responsibilities: [
      "Develop predictive models for investment screening",
      "Analyze portfolio performance and risk metrics",
      "Build data pipelines and analytics infrastructure",
      "Create dashboards and visualization tools",
      "Research new analytical techniques and methodologies"
    ],
    datePosted: "2024-02-25",
    applicationDeadline: "2024-04-25",
    salaryRange: "$140,000 - $180,000",
    experience: "4+ years",
    featured: true
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    description: "Drive brand awareness and lead generation through strategic marketing initiatives.",
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "3-5 years of B2B marketing experience",
      "Experience in financial services or professional services",
      "Strong content creation and digital marketing skills",
      "Proficiency in marketing automation and analytics tools"
    ],
    responsibilities: [
      "Develop and execute marketing strategies and campaigns",
      "Create content for website, thought leadership, and events",
      "Manage digital marketing channels and social media presence",
      "Plan and coordinate industry events and conferences",
      "Analyze marketing performance and optimize campaigns"
    ],
    datePosted: "2024-03-01",
    applicationDeadline: "2024-05-01",
    salaryRange: "$85,000 - $110,000",
    experience: "3-5 years",
    featured: false
  },
  {
    id: 6,
    title: "Compliance Officer",
    department: "Legal & Compliance",
    location: "New York, NY",
    type: "Full-time",
    description: "Ensure compliance with regulatory requirements and manage risk across our investment activities.",
    requirements: [
      "JD or relevant compliance certification",
      "5+ years of compliance experience in investment management",
      "Knowledge of SEC regulations and investment advisor requirements",
      "Strong attention to detail and analytical skills",
      "Experience with compliance monitoring systems"
    ],
    responsibilities: [
      "Monitor compliance with investment advisor regulations",
      "Develop and maintain compliance policies and procedures",
      "Conduct compliance testing and audits",
      "Manage regulatory filings and correspondence",
      "Provide compliance training to staff"
    ],
    datePosted: "2024-01-30",
    applicationDeadline: "2024-03-30",
    salaryRange: "$120,000 - $150,000",
    experience: "5+ years",
    featured: false
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const department = searchParams.get('department');
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const experience = searchParams.get('experience');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    let filteredJobs = [...jobs];

    // Apply filters
    if (department) {
      filteredJobs = filteredJobs.filter(job => 
        job.department.toLowerCase().includes(department.toLowerCase())
      );
    }

    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (experience) {
      filteredJobs = filteredJobs.filter(job => 
        job.experience.toLowerCase().includes(experience.toLowerCase())
      );
    }

    if (featured === 'true') {
      filteredJobs = filteredJobs.filter(job => job.featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredJobs = filteredJobs.slice(0, limitNum);
      }
    }

    // Sort by date posted (most recent first) and featured jobs first
    filteredJobs.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
    });

    return NextResponse.json({
      success: true,
      jobs: filteredJobs,
      total: filteredJobs.length,
      filters: {
        department,
        location,
        type,
        experience,
        featured,
        search
      }
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch jobs',
        jobs: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'department', 'location', 'type', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new job
    const newJob = {
      id: Math.max(...jobs.map(j => j.id)) + 1,
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description,
      requirements: body.requirements || [],
      responsibilities: body.responsibilities || [],
      datePosted: new Date().toISOString().split('T')[0],
      applicationDeadline: body.applicationDeadline || null,
      salaryRange: body.salaryRange || null,
      experience: body.experience || '',
      featured: body.featured || false
    };

    jobs.push(newJob);

    return NextResponse.json({
      success: true,
      job: newJob,
      message: 'Job created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// Get individual job by ID
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const job = jobs.find(j => j.id === parseInt(id));
    
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job
    });

  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}
