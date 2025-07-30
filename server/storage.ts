import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type CartItem,
  type InsertCartItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProduct(id: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;

  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.newsletterSubscriptions = new Map();
    this.cartItems = new Map();
    
    // Initialize with default products
    this.initializeDefaultProducts();
  }

  private initializeDefaultProducts() {
    // Add the live product
    const liveProduct: Product = {
      id: "CS-100",
      name: "CleanSip Strohhalme 100er Pack",
      description: "Frustriert von bröckelnden Papierhalmen? CleanSip bleibt stabil – vom ersten bis zum letzten Schluck.",
      price: "14.90",
      weight: "120g",
      sku: "CS-100",
      inStock: true,
      isComingSoon: false,
      category: "strohhalme",
      imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3"
    };

    // Add coming soon products
    const comingSoonProducts: Product[] = [
      {
        id: "PC-50",
        name: "Classic Party Cups 50er Pack",
        description: "Robuste PP-Becher für jede Feier",
        price: "12.90",
        weight: "500g",
        sku: "PC-50",
        inStock: false,
        isComingSoon: true,
        category: "cups",
        imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3"
      },
      {
        id: "PS-100",
        name: "Pro Stirrer 100er Pack",
        description: "100 holzfreie Rührstäbchen",
        price: "5.90",
        weight: "150g",
        sku: "PS-100",
        inStock: false,
        isComingSoon: true,
        category: "stirrers",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"
      },
      {
        id: "FB-40",
        name: "Flex Fork & Knife 40er Kit",
        description: "Kunststoff-Besteck-Kit",
        price: "9.80",
        weight: "300g",
        sku: "FB-40",
        inStock: false,
        isComingSoon: true,
        category: "cutlery",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"
      }
    ];

    this.products.set(liveProduct.id, liveProduct);
    comingSoonProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      id,
      name: insertProduct.name,
      description: insertProduct.description || null,
      price: insertProduct.price,
      weight: insertProduct.weight || null,
      sku: insertProduct.sku,
      inStock: insertProduct.inStock ?? true,
      isComingSoon: insertProduct.isComingSoon ?? false,
      category: insertProduct.category,
      imageUrl: insertProduct.imageUrl || null
    };
    this.products.set(id, product);
    return product;
  }

  // Newsletter methods
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existing = await this.getNewsletterSubscriptionByEmail(insertSubscription.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id,
      subscribedAt: new Date().toISOString()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email
    );
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const item: CartItem = { 
      id,
      productId: insertItem.productId,
      quantity: insertItem.quantity ?? 1,
      sessionId: insertItem.sessionId
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();
