import { createContext, useContext, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { type PaletteMode, ThemeProvider } from "@mui/material/styles";

import { createAppTheme } from "./appTheme";

const colorModeStorageKey = "asset-config-color-mode";

interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

function getInitialMode(): PaletteMode {
  if (typeof window === "undefined") {
    return "light";
  }

  // Ignore unexpected stored values so a bad localStorage entry cannot break theme creation.
  const storedMode = window.localStorage.getItem(colorModeStorageKey);

  return storedMode === "dark" || storedMode === "light" ? storedMode : "light";
}

export function ColorModeProvider({ children }: React.PropsWithChildren): React.JSX.Element {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);
  // Rebuild the MUI theme only when the selected color mode changes.
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const contextValue = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((currentMode) => {
          const nextMode = currentMode === "light" ? "dark" : "light";

          // Persist immediately so a reload keeps the user's explicit preference.
          window.localStorage.setItem(colorModeStorageKey, nextMode);

          return nextMode;
        });
      },
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext);

  if (!context) {
    // Fail loudly during development if a page uses the toggle outside the app provider.
    throw new Error("useColorMode must be used within ColorModeProvider");
  }

  return context;
}
