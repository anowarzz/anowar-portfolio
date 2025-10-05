# Md. Anowar Hosen - Portfolio

## Live Link

[View Live Site](https://anowarzz-here.vercel.app)

---

## Project Overview

This is a personal portfolio web application designed to showcase my projects, blogs, and professional background. The dashboard provides an admin interface for managing content, while the public site highlights featured work, skills, and contact information.

### Key Features

- **Responsive, modern UI** for all devices
- **Admin dashboard** to manage blogs and projects
- **Blog & project listing** with filters and pagination
- **Rich text editor** for easy blog formatting
- **Image upload & gallery management**
- **About, skills, and contact sections**
- **Authentication** for secure admin access

---

## Technology Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React**
- **Prisma** (for database ORM)
- **PostgreSQL** (database)
- **Shadcn UI** (UI components)
- **Other libraries:**
  - Tiptap (rich text editor)
  - Sonner (notifications)
  - Various utility and helper libraries

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/anowar-portfolio.git
   cd anowar-portfolio
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (database URL, etc).

4. **Run database migrations:**

   ```bash
   pnpm prisma migrate dev
   # or
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open the app:**
   - Visit `http://localhost:3000` in your browser.

---

## Notes

- The admin dashboard is protected; you must log in to access content management features.
