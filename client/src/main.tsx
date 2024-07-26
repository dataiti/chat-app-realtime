import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { store } from "~/store";
import App from "~/App";
import theme from "~/configs/themeConfig";
import { SocketProvider } from "~/context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <SocketProvider>
            <CssBaseline />
            <App />
          </SocketProvider>
        </CssVarsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
