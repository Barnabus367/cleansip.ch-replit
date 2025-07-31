# CleanSip E-commerce Application

A modern, full-stack e-commerce web application for selling sustainable party supplies, specializing in plastic straws and party basics.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query
- **E-commerce**: Shopify Storefront API

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Shopify store with Storefront API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cleansip.ch-replit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=your_postgresql_connection_string
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
   SESSION_SECRET=your_session_secret_key_here
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities & API
│   │   └── styles/        # CSS files
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── vite.ts          # Vite dev server setup
├── shared/               # Shared types & schemas
└── attached_assets/      # Product images
```

## Features

- 🛍️ **E-commerce Integration**: Full Shopify Storefront API integration
- 🎨 **Modern UI**: Responsive design with Shadcn/ui components
- 🚀 **Performance**: Optimized with Vite and modern React patterns
- 🔐 **Type Safety**: Full TypeScript coverage
- 📱 **Mobile First**: Responsive design for all devices
- 🎭 **Animations**: Smooth transitions and micro-interactions
- 📊 **Analytics**: Built-in performance monitoring

## Brand Colors

- **Primary**: `#00BFA6` (Mint-Turquoise)
- **Secondary**: `#003B46` (Deep Petrol)
- **Accent**: `#FFD54F` (Warm Yellow)
- **Neutral**: `#F9FAFB` (Light Gray)

## Development

### Code Style

The project uses TypeScript strict mode and follows modern React best practices:

- Components use TypeScript interfaces
- Custom hooks for reusable logic
- Proper error boundaries and loading states
- Responsive design patterns

### API Integration

The application integrates with Shopify's Storefront API for:
- Product catalog management
- Inventory tracking
- Variant handling (colors, sizes)
- Real-time pricing

## Deployment

### Build for Production

```bash
npm run build
```

This creates:
- `dist/public/` - Frontend build
- `dist/index.js` - Backend bundle

### Environment Variables

Ensure these are set in production:
- `DATABASE_URL` - PostgreSQL connection
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - API access token
- `SESSION_SECRET` - Secure session key
- `NODE_ENV=production`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
