import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    chatCustom: {
      sidebarWidth: string;
      contactWidth: string;
      chatDetailWidth: string;
    };
  }

  interface ThemeOptions {
    chatCustom?: {
      sidebarWidth: string;
      contactWidth: string;
      chatDetailWidth: string;
    };
  }
}

const theme = extendTheme({
  chatCustom: {
    sidebarWidth: "90px",
    contactWidth: "360px",
    chatDetailWidth: "340px",
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.75rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
    caption: {
      fontSize: "0.625rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
    },
    subtitle2: {
      fontSize: "0.75rem",
    },
    button: {
      fontSize: "0.75rem",
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#6b8afd",
        },
        background: {
          default: "#94a3b8",
          paper: "#cbd5e1",
          paperChannel: "#f1f5f9",
        },
        text: {
          primary: "#000",
          secondary: "#2e333d",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#6b8afd",
        },
        background: {
          default: "#131313",
          paper: "#202329",
          paperChannel: "#2e333d",
        },
        text: {
          primary: "#fff",
          secondary: "#b0b0b0",
        },
      },
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "14px 20px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
