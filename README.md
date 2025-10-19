# 🏺 Artisan Nepal - Handmade Crafts E-commerce Platform

A modern, responsive e-commerce platform showcasing authentic Nepalese handmade crafts and connecting customers with skilled artisans across Nepal.

![Artisan Nepal Hero](/public/readme/AN%20-%20Home.webp)

## Features

### **E-commerce Functionality**

- **Product Catalog**: Browse thousands of authentic handmade products
- **Advanced Search & Filtering**: Find products by category, price, artisan, and more
- **Shopping Cart**: Add items with real-time cart count updates
- **Secure Checkout**: SSL-encrypted payment processing
- **Order Management**: Track orders and view order history

### **Artisan Features**

- **Artisan Profiles**: Detailed profiles showcasing craftspeople and their stories
- **Product Management**: Artisans can manage their product listings
- **Sales Analytics**: Dashboard with sales insights and performance metrics
- **Verification System**: Verified artisan badges for quality assurance

### **Modern UI/UX**

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern Theme**: Beautiful amber/orange gradient design
- **Glassmorphism Effects**: Contemporary UI with backdrop blur effects
- **Smooth Animations**: Hover effects and transitions throughout

![Product Showcase](/public/readme/AN%20-%20Product%20Showcase.webp)

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Embla Carousel** - Touch-friendly carousels

### **Backend & Database**

- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Authentication and session management
- **Server Actions** - Secure server-side operations

### **Deployment & Infrastructure**

- **Docker** - Containerized deployment
- **Vercel** - Hosting and deployment platform
- **Cloudinary** - Image optimization and delivery

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/GosuCode/DOKO.git
   cd DOKO
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   DB_CONNECTION_STRING=supabase_connection_string
   DATABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase_anon_key

   NODE_ENV=development

   AUTH_SECRET="your_auth_secret"
   AUTH_GOOGLE_ID=your_google_auth_id
   AUTH_GOOGLE_SECRET=your_google_auth_secret

   AUTH_DRIZZLE_URL=drizzle_auth_url

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
   NEXT_PUBLIC_UPLOAD_PRESET=cloudinary_upload_preset
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   ```

````

4. **Database Setup**

```bash
npm run db:push
````

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Screenshots

### Homepage

![Homepage](/public/readme/AN%20-%20Home.webp)

### Product Catalog

![Product Catalog](/public/readme/AN%20-%20Product%20Catalog.webp)

### Shopping Cart

![Shopping Cart](/public/readme/AN%20-%20Shopping%20Cart.webp)

### Dashboard

![Dashboard](/public/readme/AN%20-%20dashboard.webp)

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t artisan-nepal .

# Run container
docker run -p 3000:3000 artisan-nepal
```

## Key Features in Detail

### **Advanced Product Search**

- Real-time search with instant results
- Filter by category, price range, artisan, and ratings
- Sort by popularity, price, newest, and ratings
- Grid and list view options

### **Shopping Experience**

- Add to cart with quantity selection
- Real-time cart count in header
- Secure checkout process
- Order confirmation and tracking

### **Artisan Management**

- Comprehensive artisan profiles
- Product portfolio management
- Sales analytics and insights
- Verification and quality badges

### **Admin Dashboard**

- Sales analytics and charts
- Product and order management
- User and artisan management
- Performance metrics

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for preserving and promoting Nepalese craftsmanship**
