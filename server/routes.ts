import express, { type Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const apiRouter = express.Router();

  // Get all subsidiaries
  apiRouter.get("/subsidiaries", async (req, res) => {
    try {
      const subsidiaries = await storage.getAllSubsidiaries();
      res.json(subsidiaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiaries" });
    }
  });

  // Get a specific subsidiary
  apiRouter.get("/subsidiaries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid subsidiary ID" });
      }

      const subsidiary = await storage.getSubsidiary(id);
      if (!subsidiary) {
        return res.status(404).json({ message: "Subsidiary not found" });
      }

      // Get related features and stats
      const features = await storage.getFeaturesBySubsidiary(id);
      const stats = await storage.getStatsBySubsidiary(id);

      res.json({
        subsidiary,
        features,
        stats
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiary details" });
    }
  });

  // Get all news
  apiRouter.get("/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Get news for a specific subsidiary
  apiRouter.get("/news/subsidiary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid subsidiary ID" });
      }

      const news = await storage.getNewsBySubsidiary(id);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiary news" });
    }
  });

  // Get all job postings
  apiRouter.get("/jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllJobPostings();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job postings" });
    }
  });

  // Get jobs for a specific subsidiary
  apiRouter.get("/jobs/subsidiary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid subsidiary ID" });
      }

      const jobs = await storage.getJobPostingsBySubsidiary(id);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiary job postings" });
    }
  });

  // Get all company values
  apiRouter.get("/values", async (req, res) => {
    try {
      const values = await storage.getAllValues();
      res.json(values);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company values" });
    }
  });

  // Submit contact form
  apiRouter.post("/contact", async (req, res) => {
    try {
      const validData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validData);
      res.status(201).json({
        success: true,
        message: "Your message has been submitted. We'll get back to you soon.",
        submission
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false,
          message: "Validation failed",
          errors: validationError.details
        });
      }
      res.status(500).json({ 
        success: false,
        message: "Failed to submit contact form" 
      });
    }
  });

  // Mount API routes
  app.use("/api", apiRouter);

  return httpServer;
}

// Import createServer at the top to avoid TypeScript errors
import { createServer } from "http";
