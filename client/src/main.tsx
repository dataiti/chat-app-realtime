import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { store } from "~/store";
import App from "~/App";
import theme from "~/configs/themeConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
