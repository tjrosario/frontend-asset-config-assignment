import { createTheme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";
  // Keep shared surface colors in one place so component overrides and palette stay aligned.
  const backgroundDefault = isDark ? "#111827" : "#f4f7fb";
  const backgroundPaper = isDark ? "#1f2937" : "#ffffff";
  const borderColor = isDark ? "#334155" : "#d8e0ea";

  return createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 700,
            minHeight: 44,
            textTransform: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // CssBaseline owns the page background so route content does not need wrappers.
            backgroundColor: backgroundDefault,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundPaper,
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            // A real border gives cards definition in both color modes without relying on shadows.
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
          },
        },
      },
    },
    palette: {
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      error: {
        main: isDark ? "#f87171" : "#b42318",
      },
      mode,
      primary: {
        dark: isDark ? "#93c5fd" : "#16477f",
        main: isDark ? "#60a5fa" : "#1f6fb2",
      },
      secondary: {
        main: isDark ? "#34d399" : "#2f7d59",
      },
      text: {
        primary: isDark ? "#f8fafc" : "#1f2933",
        secondary: isDark ? "#cbd5e1" : "#607083",
      },
      warning: {
        main: isDark ? "#fbbf24" : "#c77800",
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      button: {
        letterSpacing: 0,
      },
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h4: {
        fontSize: "2rem",
        fontWeight: 750,
        letterSpacing: 0,
        lineHeight: 1.15,
      },
      h6: {
        fontWeight: 700,
        letterSpacing: 0,
      },
    },
  });
}
