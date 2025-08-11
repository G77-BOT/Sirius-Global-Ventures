import { pgTable, text, varchar, timestamp, uuid, integer, decimal, boolean, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Companies table - Portfolio companies
export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  shortDescription: varchar('short_description', { length: 500 }),
  website: varchar('website', { length: 255 }),
  logo: varchar('logo', { length: 255 }),
  industry: varchar('industry', { length: 255 }),
  founded: varchar('founded', { length: 4 }),
  headquarters: varchar('headquarters', { length: 255 }),
  employees: varchar('employees', { length: 50 }),
  status: varchar('status', { length: 50 }).default('active'), // active, inactive, acquired, sold
  funding: decimal('funding', { precision: 15, scale: 2 }),
  valuation: decimal('valuation', { precision: 15, scale: 2 }),
  metrics: jsonb('metrics'), // For storing key performance metrics
  tags: text('tags').array(), // Technology tags, industry sectors
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// News articles table
export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  author: varchar('author', { length: 255 }),
  category: varchar('category', { length: 100 }),
  tags: text('tags').array(),
  publishedAt: timestamp('published_at').defaultNow(),
  featured: boolean('featured').default(false),
  imageUrl: varchar('image_url', { length: 500 }),
  companyId: uuid('company_id').references(() => companies.id), // Optional company relation
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Job postings table
export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  department: varchar('department', { length: 100 }),
  location: varchar('location', { length: 255 }),
  type: varchar('type', { length: 50 }), // full-time, part-time, contract, internship
  level: varchar('level', { length: 50 }), // junior, mid, senior, executive
  description: text('description').notNull(),
  requirements: text('requirements').array(),
  responsibilities: text('responsibilities').array(),
  benefits: text('benefits').array(),
  salaryMin: decimal('salary_min', { precision: 10, scale: 2 }),
  salaryMax: decimal('salary_max', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD'),
  remote: boolean('remote').default(false),
  companyId: uuid('company_id').references(() => companies.id),
  status: varchar('status', { length: 20 }).default('active'), // active, paused, closed
  applicationsCount: integer('applications_count').default(0),
  postedAt: timestamp('posted_at').defaultNow(),
  closingAt: timestamp('closing_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Team members table
export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  department: varchar('department', { length: 100 }),
  bio: text('bio'),
  expertise: text('expertise').array(),
  achievements: text('achievements').array(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  linkedin: varchar('linkedin', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  website: varchar('website', { length: 255 }),
  imageUrl: varchar('image_url', { length: 500 }),
  initials: varchar('initials', { length: 5 }),
  gradientClass: varchar('gradient_class', { length: 100 }),
  displayOrder: integer('display_order').default(0),
  isLeadership: boolean('is_leadership').default(false),
  isActive: boolean('is_active').default(true),
  joinedAt: timestamp('joined_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact submissions table
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  inquiryType: varchar('inquiry_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).default('new'), // new, in_progress, resolved, closed
  priority: varchar('priority', { length: 20 }).default('normal'), // low, normal, high, urgent
  assignedTo: varchar('assigned_to', { length: 255 }),
  response: text('response'),
  respondedAt: timestamp('responded_at'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: varchar('user_agent', { length: 500 }),
  source: varchar('source', { length: 100 }).default('website'), // website, api, referral
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Job applications table
export const jobApplications = pgTable('job_applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  resumeUrl: varchar('resume_url', { length: 500 }),
  coverLetter: text('cover_letter'),
  portfolioUrl: varchar('portfolio_url', { length: 500 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  githubUrl: varchar('github_url', { length: 255 }),
  experience: varchar('experience', { length: 50 }),
  location: varchar('location', { length: 255 }),
  salaryExpectation: decimal('salary_expectation', { precision: 10, scale: 2 }),
  availableFrom: timestamp('available_from'),
  status: varchar('status', { length: 20 }).default('pending'), // pending, reviewing, interviewing, rejected, hired
  stage: varchar('stage', { length: 50 }), // screening, phone, onsite, final, offer
  notes: text('notes'),
  rating: integer('rating'), // 1-5 rating
  reviewedBy: varchar('reviewed_by', { length: 255 }),
  reviewedAt: timestamp('reviewed_at'),
  source: varchar('source', { length: 100 }).default('website'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Media assets table
export const mediaAssets = pgTable('media_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: integer('size').notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  alt: varchar('alt', { length: 255 }),
  caption: text('caption'),
  category: varchar('category', { length: 50 }), // logo, photo, document, video, etc.
  tags: text('tags').array(),
  companyId: uuid('company_id').references(() => companies.id),
  newsId: uuid('news_id').references(() => news.id),
  teamMemberId: uuid('team_member_id').references(() => teamMembers.id),
  uploadedBy: varchar('uploaded_by', { length: 255 }),
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Newsletter subscribers table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'), // active, unsubscribed, bounced
  interests: text('interests').array(), // investment, careers, news, etc.
  source: varchar('source', { length: 100 }).default('website'),
  confirmedAt: timestamp('confirmed_at'),
  unsubscribedAt: timestamp('unsubscribed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Analytics/metrics table
export const analytics = pgTable('analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  event: varchar('event', { length: 100 }).notNull(),
  page: varchar('page', { length: 255 }),
  userId: varchar('user_id', { length: 255 }),
  sessionId: varchar('session_id', { length: 255 }),
  data: jsonb('data'), // Additional event data
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: varchar('user_agent', { length: 500 }),
  referrer: varchar('referrer', { length: 500 }),
  timestamp: timestamp('timestamp').defaultNow(),
});

// Zod schemas for validation
export const insertCompanySchema = createInsertSchema(companies);
export const selectCompanySchema = createSelectSchema(companies);
export type Company = z.infer<typeof selectCompanySchema>;
export type NewCompany = z.infer<typeof insertCompanySchema>;

export const insertNewsSchema = createInsertSchema(news);
export const selectNewsSchema = createSelectSchema(news);
export type News = z.infer<typeof selectNewsSchema>;
export type NewNews = z.infer<typeof insertNewsSchema>;

export const insertJobSchema = createInsertSchema(jobs);
export const selectJobSchema = createSelectSchema(jobs);
export type Job = z.infer<typeof selectJobSchema>;
export type NewJob = z.infer<typeof insertJobSchema>;

export const insertTeamMemberSchema = createInsertSchema(teamMembers);
export const selectTeamMemberSchema = createSelectSchema(teamMembers);
export type TeamMember = z.infer<typeof selectTeamMemberSchema>;
export type NewTeamMember = z.infer<typeof insertTeamMemberSchema>;

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
export const selectContactSubmissionSchema = createSelectSchema(contactSubmissions);
export type ContactSubmission = z.infer<typeof selectContactSubmissionSchema>;
export type NewContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export const insertJobApplicationSchema = createInsertSchema(jobApplications);
export const selectJobApplicationSchema = createSelectSchema(jobApplications);
export type JobApplication = z.infer<typeof selectJobApplicationSchema>;
export type NewJobApplication = z.infer<typeof insertJobApplicationSchema>;

export const insertMediaAssetSchema = createInsertSchema(mediaAssets);
export const selectMediaAssetSchema = createSelectSchema(mediaAssets);
export type MediaAsset = z.infer<typeof selectMediaAssetSchema>;
export type NewMediaAsset = z.infer<typeof insertMediaAssetSchema>;

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers);
export const selectNewsletterSubscriberSchema = createSelectSchema(newsletterSubscribers);
export type NewsletterSubscriber = z.infer<typeof selectNewsletterSubscriberSchema>;
export type NewNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
