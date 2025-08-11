// Common types used throughout the application
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Company related types
export interface CompanyMetrics {
  revenue?: number;
  users?: number;
  growth?: number;
  uptime?: number;
  latency?: string;
  exchanges?: number;
}

export interface CompanyFilters {
  industry?: string;
  status?: string;
  featured?: boolean;
  tags?: string[];
}

// Job related types
export interface JobFilters {
  department?: string;
  location?: string;
  type?: string;
  level?: string;
  remote?: boolean;
  status?: string;
}

export interface JobApplicationData {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeFile?: File;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  experience: string;
  location: string;
  salaryExpectation?: number;
  availableFrom?: Date;
}

// Contact form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'investment' | 'partnership' | 'careers' | 'media' | 'support';
}

// News related types
export interface NewsFilters {
  category?: string;
  author?: string;
  featured?: boolean;
  companyId?: string;
  tags?: string[];
  publishedAfter?: Date;
  publishedBefore?: Date;
}

// Team member types
export interface TeamMemberFilters {
  department?: string;
  isLeadership?: boolean;
  isActive?: boolean;
}

// Newsletter types
export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

// Admin dashboard types
export interface DashboardStats {
  companies: {
    total: number;
    active: number;
    featured: number;
  };
  jobs: {
    total: number;
    active: number;
    applications: number;
  };
  news: {
    total: number;
    published: number;
    featured: number;
  };
  contacts: {
    total: number;
    unresolved: number;
    thisMonth: number;
  };
  team: {
    total: number;
    leadership: number;
    active: number;
  };
  subscribers: {
    total: number;
    active: number;
    thisMonth: number;
  };
}

// Media/File upload types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Search types
export interface SearchParams {
  query: string;
  type?: 'all' | 'companies' | 'jobs' | 'news' | 'team';
  filters?: any;
}

export interface SearchResult {
  type: string;
  id: string;
  title: string;
  description?: string;
  url: string;
  relevance: number;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  page?: string;
  data?: Record<string, any>;
}

// Portfolio performance types
export interface PortfolioMetrics {
  totalInvestments: number;
  totalValuation: number;
  activeCompanies: number;
  exitedCompanies: number;
  totalReturns: number;
  averageGrowth: number;
  topPerformers: {
    company: string;
    growth: number;
    valuation: number;
  }[];
}

// Error types
export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: ValidationError[];
  success: boolean;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  children?: NavItem[];
  external?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// User/Admin types (for future authentication)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// Export commonly used utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Status enums for consistent usage
export enum CompanyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ACQUIRED = 'acquired',
  SOLD = 'sold'
}

export enum JobStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed'
}

export enum ApplicationStatus {
  PENDING = 'pending',
  REVIEWING = 'reviewing',
  INTERVIEWING = 'interviewing',
  REJECTED = 'rejected',
  HIRED = 'hired'
}

export enum ContactStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}
