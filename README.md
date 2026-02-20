# E-Commerce Final Project

This project is built using React, Vite, Tailwind CSS, Redux Toolkit, and React Router. 

## Project Architecture

The project utilizes a **Domain-driven and Role-based architecture**. This is an excellent, scalable approach for applications that have distinct user segments—in this case, an **Admin Panel** and a **Public-facing E-Commerce**. 

### Directory Structure

The `src/` directory is logically divided into four main buckets:
- **`admin/`**: Contains everything related to the admin dashboard.
  - `components/`: UI components exclusive to the admin panel (e.g., admin tables, specialized forms).
  - `layouts/`: Layout wrappers for admin pages (e.g., Sidebar + Header layout).
  - `pages/`: Admin-specific views (e.g., Dashboard, Product Management, User Management).
  - `adminRoutes.jsx`: Routing configuration purely for admin sections.

- **`public/`**: Contains everything related to the customer-facing e-commerce storefront.
  - `components/`: UI components for the public store (e.g., Product Cards, Cart Drawer, specialized buttons).
  - `features/`: Feature-sliced modules for complex public business logic (e.g., checkout flow, shopping cart).
  - `layouts/`: Layout wrappers for public pages (e.g., Navbar + Footer layout, Container wrappers).
  - `pages/`: Public-facing views (e.g., Home, Shop, Product Details).
  - `publicRoutes.jsx`: Routing configuration purely for public sections.
- **`shared/`**: The bridge between admin and public domains. Contains reusable core logic.
  - `hooks/`: Custom React hooks used across both domains.
  - `services/`: API client and endpoint handlers.
  - `features/`: Redux Instance & Slices.
- **`sandbox/`**: 
  - `Sandbox.jsx`: An isolated environment for UI development, testing components, or experimenting without affecting the main application. The route is available at `/sandbox` in development environments.

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the component sandbox in development: `http://localhost:5173/sandbox`
4. **Adhere by the rules inside placeholder files, follow similar conventions to other components.**

## Related Links & Stuff
1. [E-Commerce (Public) Figma](https://www.figma.com/design/k9F0WnIhzuQ00wDPYLl7FG/Final-Project-E-Commerce-Website)
2. [Admin Dashboard Figma](https://www.figma.com/design/Qu5J4TfYwRtQmLdQo442q1/Dashboard-Final-Project)
3. [Trello Board](https://trello.com/b/ujBawCDg/fedora-be-sprint)
4. Relevant Tailwind documentations
    - [Creating color classes](https://tailwindcss.com/docs/colors#customizing-your-colors)
    - [Using color classes](https://tailwindcss.com/docs/colors#using-color-utilities)
    - [Font utilities](https://tailwindcss.com/docs/font-family#customizing-your-theme)

---
**Goodluck & Happy Coding Guys!**

**Jika ada pertanyaan contact me 24/7**