import { createContext } from 'react';

export type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
