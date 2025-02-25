# Theme System

## Overview

OpenQASE includes a built-in theme system that allows users to switch between different visual themes. The system provides four default themes:

- **Light**: The default theme with a light sandy background and high contrast
- **Dark**: A dark theme designed for reduced eye strain in low-light environments
- **Warm**: A theme with warmer color tones
- **Cool**: A theme with cooler color tones

## Implementation Details

### CSS Variables

The theme system uses CSS variables defined in `globals.css` to control colors across the application. Each theme has its own set of variables applied when the theme is selected.

### Theme Persistence

User theme preferences are stored in localStorage, ensuring the selected theme persists across browsing sessions.

### Component Integration

The `ThemeSwitcher` component provides a dropdown interface for users to select their preferred theme. This component is rendered in the main navigation.

## Development Guidelines

When developing new components or pages:

1. **Always use theme variables**: Never hardcode colors; instead, use the CSS theme variables
   ```tsx
   // Good
   <div className="bg-background text-foreground">
   
   // Avoid
   <div className="bg-[#E5E5E5] text-black">