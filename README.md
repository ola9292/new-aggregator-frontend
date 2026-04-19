# News Aggregator Frontend

A responsive, high-performance web interface built with Vue 3 for the News Aggregator API. This project focuses on reactive state management, persistent user sessions, and a modern utility-first styling approach.

---

## Features

- **Persistent Authentication:** Utilizes Pinia in conjunction with LocalStorage to ensure user sessions and access tokens persist across browser refreshes.
- **Reactive UI Components:** Built with Vue 3 Composition API for modular, reusable, and reactive components.
- **Modern UI/UX:** Styled with Tailwind CSS and DaisyUI, providing a clean, accessible, and mobile-responsive interface.
- **State-Driven Interactions:** Real-time updates for likes and comment counts managed via global Pinia stores.
- **Efficient API Integration:** Axios-based service layer for handling asynchronous requests to the Laravel backend.

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **State Management:** Pinia
- **Styling:** Tailwind CSS & DaisyUI
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Build Tool:** Vite

---

## State Management Architecture

### Persistence Layer

Instead of relying solely on memory, the application implements a synchronization layer between Pinia and LocalStorage. This ensures that the user's authentication state and theme preferences are restored instantly upon page load, reducing the need for redundant API verification calls.

### Component Communication

The application uses a centralized store pattern. For example, the "Like" functionality updates a central store which then propagates changes to all relevant UI components (like counters and icons) across the page, ensuring data consistency without complex event emitting.

---

## Getting Started

### Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/news-aggregator-frontend.git](https://github.com/yourusername/news-aggregator-frontend.git)
   cd news-aggregator-frontend
   ```
