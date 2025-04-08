// src/context/ThemeContext.tsx
import React, { useState, useEffect, ReactNode } from 'react';
// Import context object and Theme type ONLY from the definition file
// REMOVED ThemeContextProps from this import
import { ThemeContext, Theme } from './themeContextDefinition';

// ThemeProviderProps remains internal or could be moved too, but usually fine here
interface ThemeProviderProps {
  children: ReactNode;
}

// Export ONLY the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State logic uses the imported Theme type
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // Effect logic remains the same
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle function remains the same
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the imported ThemeContext
  // The value provided here implicitly matches ThemeContextProps
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// No other exports from this file
