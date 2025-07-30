import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, subscription });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid email or subscription already exists" 
      });
    }
  });

  // Get all newsletter subscriptions (admin endpoint)
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json({ subscriptions });
    } catch (error) {
      console.error("Get newsletter subscriptions error:", error);
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });

  // Product endpoints (for future Shopify integration)
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json({ products });
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ product });
    } catch (error) {
      console.error("Get product error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
