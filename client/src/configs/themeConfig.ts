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
