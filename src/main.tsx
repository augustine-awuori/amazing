import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ToastContainer />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
