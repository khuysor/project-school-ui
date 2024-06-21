import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ConfigProvider, ConfigProviderProps } from "antd";
import { enUSIntl } from "@ant-design/pro-components";
const antdConfig: ConfigProviderProps = {

  theme: {
    token: {
      colorPrimary: '#818cf8',
    },
  },
  locale: enUSIntl,
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider {...antdConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
