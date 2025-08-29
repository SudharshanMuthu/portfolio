# Overview

This is a personal portfolio website for Sudharshan M, a Computer Science Engineering student specializing in AI & ML. The project is built using vanilla HTML, CSS, and JavaScript with particle.js for animated backgrounds. It features a modern, responsive design with glassmorphism effects, dark/light theme switching, and scroll-based animations. The portfolio showcases personal information, experience, projects, skills, education, and contact details in a professional format with SEO optimization and accessibility features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Pure Vanilla Stack**: Built entirely with HTML5, CSS3, and ES6+ JavaScript without any frameworks or external CSS libraries
- **Component-Based JavaScript**: Modular JavaScript classes for theme management and scroll animations using ES6 class syntax
- **CSS Custom Properties**: Extensive use of CSS variables for consistent theming and easy maintenance across light/dark modes
- **Mobile-First Responsive Design**: Flexbox and CSS Grid layouts with breakpoints optimized for mobile devices first

## Styling and UI Architecture
- **Glassmorphism Design**: Modern 2025 design trends with semi-transparent surfaces, backdrop filters, and soft shadows
- **Theme System**: Dual-theme architecture using CSS custom properties and data attributes for seamless light/dark mode switching
- **Animation System**: Custom Intersection Observer-based animations for scroll-triggered effects without external libraries
- **Component Styling**: Modular CSS architecture with reusable components like cards, buttons, and form elements

## JavaScript Architecture
- **Theme Management Class**: Centralized theme switching with localStorage persistence and system preference detection
- **Scroll Animation Engine**: Custom Intersection Observer implementation for fade-in and slide-up animations
- **Event-Driven Architecture**: Modular event handling for user interactions, theme switching, and scroll behaviors
- **Performance Optimization**: Lazy loading, debounced scroll events, and efficient DOM manipulation

## SEO and Accessibility
- **Semantic HTML5**: Proper document structure with semantic elements and ARIA labels
- **Rich Meta Tags**: Comprehensive SEO with Open Graph, Twitter Cards, and JSON-LD structured data
- **Accessibility Features**: Focus management, keyboard navigation, and screen reader compatibility
- **Print Optimization**: Dedicated print styles for resume generation via browser print functionality

# External Dependencies

## Third-Party Libraries
- **Particle.js**: Animated particle background system loaded via CDN (https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js)
- **Google Fonts**: Inter font family and Dancing Script for typography loaded from Google Fonts API

## Browser APIs
- **Web Storage API**: localStorage for theme preference persistence
- **Intersection Observer API**: For scroll-based animation triggers
- **Media Query API**: For system theme preference detection
- **Print API**: window.print() for resume download functionality

## Asset Dependencies
- **Profile Image**: Static image asset (profile.jpg) for personal photo display
- **Favicon**: PNG favicon for browser tab identification
- **SVG Icons**: Inline SVG icons for UI elements to avoid external icon dependencies

## Performance Considerations
- **CDN Delivery**: Particle.js served from CDN for optimal loading performance
- **Font Optimization**: Google Fonts with preconnect hints for faster loading
- **No Build Process**: Direct file serving without compilation or bundling requirements