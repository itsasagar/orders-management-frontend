Order Management Frontend
Description:
 Next.js frontend for the order management system, built with TailwindCSS and shadcn/ui.
Live URLs:
 Frontend: https://orders-management-frontend-jet.vercel.app
 Backend API: https://ordersbackends.onrender.com
Tech Stack:
Next.js 14 (App Router)


TypeScript


TailwindCSS


shadcn/ui


Fetch API


Local Setup:
Prerequisites:
Node.js 18 or later


Backend API running


Installation Steps:
Install dependencies: npm install


Create a file named .env.local and add:
 NEXT_PUBLIC_API_URL=http://localhost:3000


Start the development server: npm run dev


Open http://localhost:30000 in your browser


Features:
View all orders with pagination


Search orders by user name or email


Create new orders with multiple items


Responsive design


Real-time order status updates (pending → confirmed)


Pages:
 Home page with navigation


/orders : Orders listing and management


Trade-offs and Shortcuts:
No Redis caching (removed)


Simple state management using React useState instead of Redux or Zustand


No optimistic updates (requires page refresh after creating an order)


Basic client-side form validation only


No error boundaries (to be added for production)


Hardcoded product and user IDs (manual entry instead of dropdowns)


Simple loading state text instead of skeleton loaders


Uses alert() instead of toast notifications


Limited accessibility (would add ARIA labels and keyboard navigation later)


No offline support (no service worker or caching strategy)


Environment Variable:
 NEXT_PUBLIC_API_URL=http://localhost:8000
Deployment Notes:
 Deployed on Vercel with the following settings:
Framework: Next.js


Build Command: npm run build


Output Directory: .next
