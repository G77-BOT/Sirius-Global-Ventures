import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table remains the same as required for the system
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Company subsidiaries table
export const subsidiaries = pgTable("subsidiaries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  established: text("established").notNull(),
  status: text("status").notNull().default("active"),
  logoInitials: text("logo_initials").notNull(),
  logoColor: text("logo_color").notNull(),
  detailedDescription: text("detailed_description").notNull(),
  websiteUrl: text("website_url"),
});

export const insertSubsidiarySchema = createInsertSchema(subsidiaries).omit({
  id: true,
});

// News and updates table
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishDate: timestamp("publish_date").notNull().defaultNow(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  processed: boolean("processed").notNull().default(false),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  processed: true,
});

// Job postings
export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  department: text("department").notNull(),
  type: text("type").notNull(), // full-time, part-time, contract
  postedDate: timestamp("posted_date").notNull().defaultNow(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({
  id: true,
  postedDate: true,
});

// Features for subsidiaries
export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id).notNull(),
});

export const insertFeatureSchema = createInsertSchema(features).omit({
  id: true,
});

// Stats for subsidiaries
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id).notNull(),
});

export const insertStatSchema = createInsertSchema(stats).omit({
  id: true,
});

// Values for the company
export const values = pgTable("values", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
});

export const insertValueSchema = createInsertSchema(values).omit({
  id: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubsidiary = z.infer<typeof insertSubsidiarySchema>;
export type Subsidiary = typeof subsidiaries.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;
export type JobPosting = typeof jobPostings.$inferSelect;

export type InsertFeature = z.infer<typeof insertFeatureSchema>;
export type Feature = typeof features.$inferSelect;

export type InsertStat = z.infer<typeof insertStatSchema>;
export type Stat = typeof stats.$inferSelect;

export type InsertValue = z.infer<typeof insertValueSchema>;
export type Value = typeof values.$inferSelect;
