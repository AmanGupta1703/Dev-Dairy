# Dev Dairy
A modern web application for managing and sharing development posts, built with **React**, **TypeScript**, and **Vite**. Authentication, database, and file storage are powered by **Appwrite**.

## Features

- **User Authentication:** Secure sign up, log in, and log out with Appwrite.
- **Post Management:** Create, edit, and delete your development posts.
- **Rich Text Editor:** Write posts with formatting using a built-in editor.
- **Post Browsing:** Browse all posts or view detailed single post pages.
- **File Uploads:** Attach and preview files in posts via Appwrite Storage.

## Project Structure

```
src/
├── App.tsx                # Main app component
├── main.tsx               # Entry point
├── index.css              # Global styles
├── vite-env.d.ts          # Vite environment types
├── components/
│   ├── AppLayout.tsx        # Layout for authenticated users
│   ├── AuthLayout.tsx       # Layout for authentication pages
│   ├── index.ts             # Components barrel file
│   ├── Forms/
│   │   ├── AddPostForm.tsx    # Add post form
│   │   ├── LoginForm.tsx      # Login form
│   │   └── SignUpForm.tsx     # Sign up form
│   ├── sections/
│   │   ├── Footer.tsx         # Footer
│   │   ├── Header.tsx         # Header
│   │   ├── HeroSection.tsx    # Landing page hero
│   │   └── HowItWorks.tsx     # How it works section
│   └── ui/
│       ├── AllPosts.tsx       # List of all posts
│       ├── Button.tsx         # Reusable button
│       ├── Input.tsx          # Reusable input
│       ├── Loader.tsx         # Loading spinner
│       ├── LogoutBtn.tsx      # Logout button
│       ├── PostCard.tsx       # Post card
│       ├── RTE.tsx            # Rich Text Editor
│       ├── Select.tsx         # Reusable select
│       ├── SinglePost.tsx     # Single post view
│       └── Textarea.tsx       # Reusable textarea
├── config/
│   └── index.ts             # App configuration (Appwrite, etc.)
├── pages/
│   ├── AddPost.tsx          # Add post page
│   ├── AllPosts.tsx         # All posts page
│   ├── EditPost.tsx         # Edit post page
│   ├── Home.tsx             # Home/landing page
│   ├── Login.tsx            # Login page
│   ├── Post.tsx             # Single post page
│   ├── Posts.tsx            # Posts listing page
│   ├── SignUp.tsx           # Sign up page
│   └── index.ts             # Pages barrel file
├── services/
│   └── appwrite/
│       ├── auth.ts            # Appwrite authentication service
│       ├── database.ts        # Appwrite database service
│       └── storage.ts         # Appwrite storage service
└── store/
  ├── authSlice.ts         # Redux slice for authentication
  ├── postsSlice.ts        # Redux slice for posts
  └── store.ts             # Redux store setup
```

## Technologies Used

- React
- TypeScript
- Vite
- Appwrite
- Redux Toolkit

## Installation
 
1. **Clone the repository:**
  ```bash
  git clone https://github.com/AmanGupta1703/Dev-Dairy.git
  cd Dev-Dairy
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Configure Appwrite:**
  - Update `src/config/index.ts` with your Appwrite project credentials.

4. **Start the development server:**
  ```bash
  npm run dev
  ```

