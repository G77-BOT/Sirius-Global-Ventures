import { 
  users, type User, type InsertUser,
  subsidiaries, type Subsidiary, type InsertSubsidiary,
  news, type News, type InsertNews,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  jobPostings, type JobPosting, type InsertJobPosting,
  features, type Feature, type InsertFeature,
  stats, type Stat, type InsertStat,
  values, type Value, type InsertValue
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subsidiary methods
  getAllSubsidiaries(): Promise<Subsidiary[]>;
  getSubsidiary(id: number): Promise<Subsidiary | undefined>;
  createSubsidiary(subsidiary: InsertSubsidiary): Promise<Subsidiary>;
  updateSubsidiary(id: number, subsidiary: Partial<InsertSubsidiary>): Promise<Subsidiary | undefined>;
  
  // News methods
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsBySubsidiary(subsidiaryId: number): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Job postings methods
  getAllJobPostings(): Promise<JobPosting[]>;
  getJobPostingsBySubsidiary(subsidiaryId: number): Promise<JobPosting[]>;
  createJobPosting(jobPosting: InsertJobPosting): Promise<JobPosting>;
  
  // Features methods
  getFeaturesBySubsidiary(subsidiaryId: number): Promise<Feature[]>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  
  // Stats methods
  getStatsBySubsidiary(subsidiaryId: number): Promise<Stat[]>;
  createStat(stat: InsertStat): Promise<Stat>;
  
  // Values methods
  getAllValues(): Promise<Value[]>;
  createValue(value: InsertValue): Promise<Value>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private subsidiariesMap: Map<number, Subsidiary>;
  private newsMap: Map<number, News>;
  private contactSubmissionsMap: Map<number, ContactSubmission>;
  private jobPostingsMap: Map<number, JobPosting>;
  private featuresMap: Map<number, Feature>;
  private statsMap: Map<number, Stat>;
  private valuesMap: Map<number, Value>;
  
  private currentUserId: number;
  private currentSubsidiaryId: number;
  private currentNewsId: number;
  private currentContactSubmissionId: number;
  private currentJobPostingId: number;
  private currentFeatureId: number;
  private currentStatId: number;
  private currentValueId: number;

  constructor() {
    this.usersMap = new Map();
    this.subsidiariesMap = new Map();
    this.newsMap = new Map();
    this.contactSubmissionsMap = new Map();
    this.jobPostingsMap = new Map();
    this.featuresMap = new Map();
    this.statsMap = new Map();
    this.valuesMap = new Map();
    
    this.currentUserId = 1;
    this.currentSubsidiaryId = 1;
    this.currentNewsId = 1;
    this.currentContactSubmissionId = 1;
    this.currentJobPostingId = 1;
    this.currentFeatureId = 1;
    this.currentStatId = 1;
    this.currentValueId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }

  // Subsidiary methods
  async getAllSubsidiaries(): Promise<Subsidiary[]> {
    return Array.from(this.subsidiariesMap.values());
  }

  async getSubsidiary(id: number): Promise<Subsidiary | undefined> {
    return this.subsidiariesMap.get(id);
  }

  async createSubsidiary(subsidiary: InsertSubsidiary): Promise<Subsidiary> {
    const id = this.currentSubsidiaryId++;
    const newSubsidiary: Subsidiary = { ...subsidiary, id };
    this.subsidiariesMap.set(id, newSubsidiary);
    return newSubsidiary;
  }

  async updateSubsidiary(id: number, subsidiaryUpdate: Partial<InsertSubsidiary>): Promise<Subsidiary | undefined> {
    const existingSubsidiary = this.subsidiariesMap.get(id);
    if (!existingSubsidiary) return undefined;
    
    const updatedSubsidiary = { ...existingSubsidiary, ...subsidiaryUpdate };
    this.subsidiariesMap.set(id, updatedSubsidiary);
    return updatedSubsidiary;
  }

  // News methods
  async getAllNews(): Promise<News[]> {
    return Array.from(this.newsMap.values()).sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.newsMap.get(id);
  }

  async getNewsBySubsidiary(subsidiaryId: number): Promise<News[]> {
    return Array.from(this.newsMap.values())
      .filter(news => news.subsidiaryId === subsidiaryId)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const newNews: News = { ...newsItem, id };
    this.newsMap.set(id, newNews);
    return newNews;
  }

  // Contact methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      submittedAt: new Date(), 
      processed: false 
    };
    this.contactSubmissionsMap.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissionsMap.values())
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }

  // Job postings methods
  async getAllJobPostings(): Promise<JobPosting[]> {
    return Array.from(this.jobPostingsMap.values())
      .filter(job => job.isActive)
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }

  async getJobPostingsBySubsidiary(subsidiaryId: number): Promise<JobPosting[]> {
    return Array.from(this.jobPostingsMap.values())
      .filter(job => job.subsidiaryId === subsidiaryId && job.isActive)
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }

  async createJobPosting(jobPosting: InsertJobPosting): Promise<JobPosting> {
    const id = this.currentJobPostingId++;
    const newJobPosting: JobPosting = { 
      ...jobPosting, 
      id, 
      postedDate: new Date() 
    };
    this.jobPostingsMap.set(id, newJobPosting);
    return newJobPosting;
  }

  // Features methods
  async getFeaturesBySubsidiary(subsidiaryId: number): Promise<Feature[]> {
    return Array.from(this.featuresMap.values())
      .filter(feature => feature.subsidiaryId === subsidiaryId);
  }

  async createFeature(feature: InsertFeature): Promise<Feature> {
    const id = this.currentFeatureId++;
    const newFeature: Feature = { ...feature, id };
    this.featuresMap.set(id, newFeature);
    return newFeature;
  }

  // Stats methods
  async getStatsBySubsidiary(subsidiaryId: number): Promise<Stat[]> {
    return Array.from(this.statsMap.values())
      .filter(stat => stat.subsidiaryId === subsidiaryId);
  }

  async createStat(stat: InsertStat): Promise<Stat> {
    const id = this.currentStatId++;
    const newStat: Stat = { ...stat, id };
    this.statsMap.set(id, newStat);
    return newStat;
  }

  // Values methods
  async getAllValues(): Promise<Value[]> {
    return Array.from(this.valuesMap.values());
  }

  async createValue(value: InsertValue): Promise<Value> {
    const id = this.currentValueId++;
    const newValue: Value = { ...value, id };
    this.valuesMap.set(id, newValue);
    return newValue;
  }

  // Initialize data for the application
  private initializeData(): void {
    // Add Bostream subsidiary
    const bostream = this.createSubsidiary({
      name: "Bostream",
      shortName: "Bostream",
      description: "Advanced Crypto Trading Platform",
      industry: "Finance & Technology",
      established: "2023",
      status: "active",
      logoInitials: "BS",
      logoColor: "#3498DB",
      detailedDescription: "Bostream offers cutting-edge algorithmic trading solutions for cryptocurrencies, providing institutional-grade tools for high-frequency trading, portfolio management, and risk assessment.",
      websiteUrl: "https://bostream.ca"
    });

    // Add sample news
    this.createNews({
      title: "Sirius Global Ventures Announces Bostream Acquisition",
      content: "Sirius Global Ventures has officially announced the acquisition of Bostream, an innovative crypto trading platform specializing in high-frequency trading solutions.",
      category: "Company News",
      publishDate: new Date("2023-10-15"),
      subsidiaryId: null
    });

    this.createNews({
      title: "Bostream Platform Launch Set for November",
      content: "Bostream announces the official launch date for its high-frequency crypto trading platform, featuring advanced algorithms and institutional-grade security.",
      category: "Bostream",
      publishDate: new Date("2023-10-20"),
      subsidiaryId: 1
    });

    this.createNews({
      title: "Sirius Global Ventures Announces Expansion Strategy",
      content: "Sirius Global Ventures reveals its strategic expansion plans for 2024, focusing on fintech, blockchain, and sustainable technology investments.",
      category: "Investor Relations",
      publishDate: new Date("2023-10-25"),
      subsidiaryId: null
    });

    // Add features for Bostream
    this.createFeature({
      title: "High-Frequency Trading",
      description: "Execute thousands of trades per second with minimal latency and maximum efficiency.",
      iconName: "BarChart2",
      subsidiaryId: 1
    });

    this.createFeature({
      title: "Advanced Analytics",
      description: "Comprehensive market analysis tools with real-time data visualization and predictive modeling.",
      iconName: "BarChart",
      subsidiaryId: 1
    });

    this.createFeature({
      title: "Institutional Security",
      description: "Enterprise-grade security protocols with multi-factor authentication and cold storage solutions.",
      iconName: "Lock",
      subsidiaryId: 1
    });

    this.createFeature({
      title: "API Integration",
      description: "Robust API endpoints for seamless integration with existing trading systems and third-party tools.",
      iconName: "Settings",
      subsidiaryId: 1
    });

    // Add stats for Bostream
    this.createStat({
      label: "Trading",
      value: "24/7",
      subsidiaryId: 1
    });

    this.createStat({
      label: "Execution",
      value: "0.001s",
      subsidiaryId: 1
    });

    this.createStat({
      label: "Markets",
      value: "100+",
      subsidiaryId: 1
    });

    this.createStat({
      label: "Uptime",
      value: "99.9%",
      subsidiaryId: 1
    });

    // Add company values
    this.createValue({
      title: "Innovation",
      description: "We invest in forward-thinking companies that are disrupting traditional markets with innovative solutions.",
      iconName: "Zap"
    });

    this.createValue({
      title: "Leadership",
      description: "We empower our companies with strategic guidance and resources to become leaders in their respective industries.",
      iconName: "Users"
    });

    this.createValue({
      title: "Trust",
      description: "We build lasting relationships with our stakeholders based on transparency, integrity, and shared success.",
      iconName: "Shield"
    });

    // Add sample job postings
    this.createJobPosting({
      title: "Frontend Developer",
      description: "We're looking for a talented Frontend Developer to join the Bostream team to help build and maintain our cutting-edge trading platform interface.",
      location: "New York, NY",
      department: "Engineering",
      type: "Full-time",
      subsidiaryId: 1,
      isActive: true
    });

    this.createJobPosting({
      title: "Blockchain Engineer",
      description: "Join our team to develop secure and scalable blockchain solutions for our trading platform.",
      location: "Remote",
      department: "Engineering",
      type: "Full-time",
      subsidiaryId: 1,
      isActive: true
    });

    this.createJobPosting({
      title: "Financial Analyst",
      description: "Help analyze market trends and develop trading strategies for our algorithmic trading systems.",
      location: "New York, NY",
      department: "Finance",
      type: "Full-time",
      subsidiaryId: 1,
      isActive: true
    });

    this.createJobPosting({
      title: "Marketing Manager",
      description: "Lead marketing efforts for Sirius Global Ventures and coordinate with subsidiary marketing teams.",
      location: "New York, NY",
      department: "Marketing",
      type: "Full-time",
      subsidiaryId: null,
      isActive: true
    });
  }
}

export const storage = new MemStorage();
