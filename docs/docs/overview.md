# Overview

Welcome to the developer documentation for OpenQase.

OpenQase is a web application built with Next.js and Supabase. Its primary goal appears to be managing and presenting various types of related content, potentially centered around case studies, learning paths, and blog posts.

Key functionalities include:

*   **Content Management:** An administrative interface (`/admin`) allows authenticated users with admin privileges to Create, Read, Update, and Delete content types such as Case Studies, Blog Posts, Personas, Algorithms, and Industries. This CMS leverages Next.js Server Actions for data mutation and manages complex relationships between content items.
*   **Public Content Display:** The application serves public-facing pages to display published content, including dedicated sections for Blog posts and Case Studies.
*   **User Authentication & Profiles:** Utilizes Supabase Auth for user management, protecting specific routes and potentially offering user profiles.
*   **Learning Paths:** The presence of a `/paths` route suggests functionality related to structured learning or content pathways.

This documentation aims to provide developers with the necessary information to understand the application's architecture, contribute effectively, and maintain the codebase. 