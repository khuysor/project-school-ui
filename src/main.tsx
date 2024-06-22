import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ConfigProvider, ConfigProviderProps } from "antd";
import { antdConfig } from "./util/antdconfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider {...antdConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
