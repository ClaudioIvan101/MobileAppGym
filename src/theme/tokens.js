/**
 * StrongFit Design Tokens
 * Sistema de diseño Fit-Tech (Emerald Green & Slate Dark/Light mode)
 */

export const tokens = {
  colors: {
    // Brand Fit-Tech Emerald
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Emerald base principal
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      glow: 'rgba(16, 185, 129, 0.25)',
    },

    // Status Badges & Indicators
    status: {
      active: {
        bg: 'rgba(16, 185, 129, 0.12)',
        border: '#10b981',
        text: '#34d399',
        dot: '#10b981',
        label: 'Activo',
      },
      expiring: {
        bg: 'rgba(245, 158, 11, 0.12)',
        border: '#f59e0b',
        text: '#fbbf24',
        dot: '#f59e0b',
        label: 'Por vencer',
      },
      inactive: {
        bg: 'rgba(239, 68, 68, 0.12)',
        border: '#ef4444',
        text: '#f87171',
        dot: '#ef4444',
        label: 'Inactivo',
      },
    },

    // Surfaces & Backgrounds (Dark Mode First)
    surface: {
      background: '#090D14',     // Fondo principal ultra oscuro
      card: '#111726',           // Superficie de tarjetas
      cardHover: '#162035',      // Hover interactivo
      glass: 'rgba(17, 23, 38, 0.85)',
      elevated: '#1A2338',       // Modales y menús flotantes
      input: '#0D1322',          // Inputs y selects
      border: '#1E293B',         // Bordes sutiles
      borderHighlight: '#334155',// Bordes activos
    },

    // Text hierarchy
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      accent: '#10B981',
      inverse: '#090D14',
    },

    // Secondary Accents
    accent: {
      fire: '#FF5722',          // Para rachas 🔥
      fireGlow: 'rgba(255, 87, 34, 0.2)',
      cyan: '#06B6D4',          // Métricas secundarias
      purple: '#8B5CF6',        // Clases especiales
    }
  },

  radii: {
    xs: '4px',
    sm: '8px',                  // Requerido: --radius-sm: 8px para Mini-KPIs
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(16, 185, 129, 0.25)',
    fireGlow: '0 0 15px rgba(255, 87, 34, 0.3)',
  },

  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.25s ease',
    spring: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  }
};

export default tokens;
