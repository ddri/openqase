// src/config/theme.ts
export const themeColors = {
    background: '#dcddd7',
    accent: '#ffa04f',
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
      tertiary: '#717171',
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f8f8f8',
      tertiary: '#f3f3f3',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '#e5e5e5',
      hoverBorder: '#ffa04f',
      hoverBackground: 'rgba(255, 160, 79, 0.05)',
    }
  } as const;
  
  // Tailwind class configurations
  export const theme = {
    text: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    spacing: {
      xs: 'p-2',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
  } as const;
  
  // CSS custom properties
  export const cssVariables = `
    :root {
      --background: ${themeColors.background};
      --accent: ${themeColors.accent};
      --text-primary: ${themeColors.text.primary};
      --text-secondary: ${themeColors.text.secondary};
      --text-tertiary: ${themeColors.text.tertiary};
      --surface-primary: ${themeColors.surface.primary};
      --surface-secondary: ${themeColors.surface.secondary};
      --surface-tertiary: ${themeColors.surface.tertiary};
      --card-background: ${themeColors.card.background};
      --card-border: ${themeColors.card.border};
      --card-hover-border: ${themeColors.card.hoverBorder};
      --card-hover-background: ${themeColors.card.hoverBackground};
    }
  `;