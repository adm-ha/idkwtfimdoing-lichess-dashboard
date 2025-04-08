// src/hooks/useTheme.ts
import { useContext } from 'react';
// *** UPDATED IMPORT PATH ***
// Import the Context object and its type from the definition file
import { ThemeContext, ThemeContextProps } from '../context/themeContextDefinition';

// Custom hook implementation remains the same
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
