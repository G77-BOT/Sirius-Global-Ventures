import { NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../lib/db/schema';

// Create a connection to a test database
const testDbUrl = process.env.TEST_DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/test';
const sql = neon(testDbUrl);
const db = drizzle(sql, { schema });

// Mock Next.js request
export const createMockRequest = (method: string, body?: any, params?: any): NextRequest => {
  const request = new NextRequest('http://localhost', {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
};

// Setup test database
export const setupTestDB = () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Add any cleanup code here if needed
  });
};

// Helper to parse JSON response
export const parseJsonResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse JSON response: ${text}`);
  }
};

// Mock the Next.js server components
global.Response = Response;
global.Headers = Headers;
global.Request = Request;

export { db };
