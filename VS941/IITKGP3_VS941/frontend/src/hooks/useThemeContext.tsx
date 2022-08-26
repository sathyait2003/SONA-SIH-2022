import { ColorScheme } from '@mantine/core';
import { createContext, useContext, useMemo, useState } from 'react';

function getInitialColorMode(): ColorScheme {
  const persistedColorPreference = window.localStorage.getItem('color-mode');
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (persistedColorPreference) {
    return persistedColorPreference as ColorScheme;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light';
}

type ThemeContextType = {
  colorMode: ColorScheme;
  setColorMode: (value: ColorScheme) => void;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>(undefined!);
export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, rawSetColorMode] = useState<ColorScheme>(getInitialColorMode);

  const setColorMode = (value: ColorScheme) => {
    rawSetColorMode(value);
    // Persist it on update
    window.localStorage.setItem('color-mode', value);
  };

  const toggleColorMode = () => {
    if(colorMode === 'light') setColorMode('dark')
    else setColorMode('light')
  }

  // eslint-disable-next-line
  const value = useMemo(() => ({ colorMode, setColorMode, toggleColorMode }), [colorMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}