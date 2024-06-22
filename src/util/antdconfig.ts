import { enUSIntl } from "@ant-design/pro-components";
import { ConfigProviderProps } from "antd";

export const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      colorPrimary: "#818cf8",
    },
    components: {
      Table: {
        headerBg: "#818cf8",
        headerBorderRadius: 10,
        headerSortActiveBg: "#a5f3fc",
      },
    },
  },
  locale: enUSIntl,
};
