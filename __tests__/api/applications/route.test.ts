import { NextRequest } from 'next/server';
import { POST } from '@/app/api/applications/route';
import { createMockRequest, setupTestDB, parseJsonResponse } from '../../test-utils';
import { db } from '@/lib/db/connection';

// Mock the database connection and operations
const mockInsert = jest.fn().mockReturnThis();
const mockValues = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockResolvedValue([{
  id: 'app123',
  jobId: 'job123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  status: 'pending'
}]);

const mockSelect = jest.fn().mockReturnThis();
const mockFrom = jest.fn().mockReturnThis();
const mockWhere = jest.fn().mockResolvedValue([{
  id: 'job123',
  title: 'Frontend Developer',
  status: 'open'
}]);

// Mock the database connection module
jest.mock('@/lib/db/connection', () => ({
  db: {
    insert: mockInsert,
    values: mockValues,
    returning: mockReturning,
    select: mockSelect,
    from: mockFrom,
    where: mockWhere
  },
  eq: (a: any, b: any) => a === b
}));

// Mock the database schema
jest.mock('@/lib/db/schema', () => ({
  jobs: {
    id: 'id',
    title: 'title',
    status: 'status'
  },
  jobApplications: {
    id: 'id',
    jobId: 'jobId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    resume: 'resume',
    coverLetter: 'coverLetter',
    status: 'status',
    source: 'source',
    diversity: 'diversity'
  }
}));

const validApplication = {
  jobId: 'job123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  resume: 'resume.pdf',
  coverLetter: 'I am a great fit for this position!',
  source: 'Company Website',
  diversity: { veteran: false, disability: false, race: 'Prefer not to say' },
};

describe('POST /api/applications', () => {
  setupTestDB();

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockSelect.mockReturnThis();
    mockFrom.mockReturnThis();
    mockWhere.mockResolvedValue([{
      id: 'job123',
      title: 'Frontend Developer',
      status: 'open'
    }]);
    
    mockInsert.mockReturnThis();
    mockValues.mockReturnThis();
    mockReturning.mockResolvedValue([{
      id: 'app123',
      jobId: 'job123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  });

  it('should create a new job application', async () => {
    const req = createMockRequest('POST', validApplication);
    
    const response = await POST(req);
    const data = await parseJsonResponse(response);
    
    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      id: 'app123',
      jobId: validApplication.jobId,
      firstName: validApplication.firstName,
      lastName: validApplication.lastName,
      email: validApplication.email,
      status: 'pending'
    });
  });

  it('should return 400 if job is not found', async () => {
    // Mock the database to return no jobs
    mockWhere.mockResolvedValueOnce([]);
    
    const req = createMockRequest('POST', validApplication);
    const response = await POST(req);
    const data = await parseJsonResponse(response);

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Job not found');
  });

  it('should return 400 if job is not open', async () => {
    // Mock the database to return a closed job
    mockWhere.mockResolvedValueOnce([{
      id: 'job123',
      title: 'Frontend Developer',
      status: 'closed'
    }]);
    
    const req = createMockRequest('POST', validApplication);
    const response = await POST(req);
    const data = await parseJsonResponse(response);

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('This job is not currently accepting applications');
  });

  it('should return 400 for invalid application data', async () => {
    const invalidApplication = { ...validApplication, email: 'invalid-email' };
    
    const req = createMockRequest('POST', invalidApplication);
    const response = await POST(req);
    const data = await parseJsonResponse(response);

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });
});
