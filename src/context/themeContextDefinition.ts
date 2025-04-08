// src/context/themeContextDefinition.ts
import { createContext } from 'react';

// Define types related to the theme context
export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Create and export the actual context object
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
