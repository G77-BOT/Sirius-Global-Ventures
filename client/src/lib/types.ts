import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  children?: NavItem[];
}

// Card content types
export interface ValueCardContent {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureCardContent {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
}

// Stats type
export interface StatItem {
  value: string;
  label: string;
}

// Team member type
export interface TeamMember {
  name: string;
  position: string;
  imageUrl?: string;
  bio: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// Career/Job types
export interface JobLocation {
  city: string;
  country: string;
  remote: boolean;
}

export interface JobFilter {
  department?: string;
  location?: string;
  type?: string;
  search?: string;
}

// News/Article types
export interface ArticleFilter {
  category?: string;
  subsidiaryId?: number;
  search?: string;
}

// Form submission types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}
