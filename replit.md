# CleanSip E-commerce Application

## Overview

CleanSip is a modern e-commerce web application built for selling party supplies, specializing in plastic straws and party basics. The application is built with a full-stack TypeScript architecture using React for the frontend and Express.js for the backend, with plans for Shopify integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors and design system
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints
- **Development Server**: Custom Vite integration for seamless full-stack development
- **Module System**: ESM (ES Modules) throughout the application

### Brand Identity
- **Primary Color**: #00BFA6 (Mint-Turquoise)
- **Secondary Color**: #003B46 (Deep Petrol)
- **Accent Color**: #FFD54F (Warm Yellow)
- **Typography**: Inter font family

## Key Components

### Data Storage
- **Current**: In-memory storage implementation for development
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Migration System**: Drizzle Kit for database migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

### Database Schema
- **Users**: Basic user authentication system
- **Products**: Product catalog with pricing, descriptions, and inventory
- **Newsletter Subscriptions**: Email collection for marketing
- **Cart Items**: Shopping cart functionality with session-based storage

### UI Components
- **Design System**: Complete shadcn/ui component library
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Built on Radix UI primitives for accessibility compliance
- **Toast Notifications**: User feedback system for actions

### Product Catalog
Currently supports one live product with plans for expansion:
- **CS-100**: CleanSip Strohhalme 100er Pack (CHF 14.90)
- **Planned Products**: Party cups, stirrers, and cutlery sets

## Data Flow

### Client-Server Communication
1. Frontend makes API requests through centralized `apiRequest` function
2. Express server handles REST endpoints with proper error handling
3. Data validation using Zod schemas
4. Response formatting with consistent JSON structure

### Newsletter Subscription Flow
1. User enters email in newsletter signup forms
2. Frontend validates and sends POST request to `/api/newsletter`
3. Server validates with Zod schema and stores subscription
4. Success/error feedback displayed via toast notifications

### Product Management Flow
1. Products stored in database with complete metadata
2. API endpoints for retrieving single products and product lists
3. Frontend components consume product data for display
4. Cart functionality tracks items by session ID

## External Dependencies

### Shopify Integration (LIVE)
- **Storefront API**: Active GraphQL integration with real product data from user's Shopify store
- **Environment Variables**: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN configured via secrets
- **Single Product Focus**: System optimized for one product with multiple color variants as specified
- **API Endpoints**: `/api/shopify/products` and `/api/shopify/products/:handle` serving real-time data
- **Color Variants**: Automatic detection and organization of product variants by color options
- **CleanSip Enhancement**: Real Shopify data enhanced with rebellious branding and Swiss pricing
- **Current Product**: "plastik-strohhalm" successfully loaded with variant data

### Development Tools
- **Replit Integration**: Special development environment support
- **Error Handling**: Runtime error overlay for development
- **Hot Reload**: Vite HMR for rapid development

### UI Libraries
- **Radix UI**: Headless component primitives
- **Lucide Icons**: Consistent icon system
- **Class Variance Authority**: Type-safe component variants
- **TailwindCSS**: Utility-first styling framework

## Deployment Strategy

### Build Process
- **Frontend Build**: Vite builds React app to `dist/public`
- **Backend Build**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served from build output directory

### Environment Configuration
- **Development**: Hot reloading with Vite dev server
- **Production**: Static file serving with Express
- **Database**: PostgreSQL with Neon serverless driver
- **Migrations**: Drizzle migrations in `/migrations` directory

### Deployment Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

The application follows a monorepo structure with clear separation between client, server, and shared code, making it maintainable and scalable for the planned product expansion.