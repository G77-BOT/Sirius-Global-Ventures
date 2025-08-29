import { NextRequest } from 'next/server';
import { GET } from '@/app/api/jobs/route';
import { createMockRequest, setupTestDB, parseJsonResponse } from '../../test-utils';
import { Job } from '../../../lib/models/Job';

// Mock the Job model
jest.mock('@/lib/models/Job');

const mockJobs = [
  {
    _id: '1',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a skilled Frontend Developer...',
    responsibilities: ['Develop user interfaces', 'Write clean code'],
    requirements: ['React', 'TypeScript', 'CSS'],
    salary: { min: 80000, max: 120000, currency: 'USD' },
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a skilled Backend Developer...',
    responsibilities: ['Develop APIs', 'Optimize database queries'],
    requirements: ['Node.js', 'MongoDB', 'AWS'],
    salary: { min: 90000, max: 140000, currency: 'USD' },
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('GET /api/jobs', () => {
  setupTestDB();

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should return a list of jobs', async () => {
    // Mock the Job.find() method
    (Job.find as jest.Mock).mockResolvedValueOnce(mockJobs);

    // Create a mock request
    const req = createMockRequest('GET');

    // Call the API route
    const response = await GET(req);
    const data = await parseJsonResponse(response);

    // Assert the response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(2);
    expect(data.data[0].title).toBe('Frontend Developer');
    expect(data.data[1].title).toBe('Backend Developer');
    
    // Verify the find method was called with the correct query
    expect(Job.find).toHaveBeenCalledWith({ status: 'open' });
  });

  it('should return an empty array if no jobs are found', async () => {
    // Mock the Job.find() method to return an empty array
    (Job.find as jest.Mock).mockResolvedValueOnce([]);

    // Create a mock request
    const req = createMockRequest('GET');

    // Call the API route
    const response = await GET(req);
    const data = await parseJsonResponse(response);

    // Assert the response
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(0);
  });

  it('should handle errors properly', async () => {
    // Mock the Job.find() method to throw an error
    const errorMessage = 'Database error';
    (Job.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Create a mock request
    const req = createMockRequest('GET');

    // Call the API route
    const response = await GET(req);
    const data = await parseJsonResponse(response);

    // Assert the response
    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Internal Server Error');
  });
});
