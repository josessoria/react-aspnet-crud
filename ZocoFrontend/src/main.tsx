import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import UserProvider from "./context/UserProvider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProductProvider from "./context/ProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
