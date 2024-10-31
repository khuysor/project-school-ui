import { Breadcrumb, BreadcrumbProps } from "antd";

export const convertUTCDateToString = (
  utcDateString: string | null,
  timeZone: string = "Asia/Phnom_Penh"
) => {
  if (!utcDateString) return "";

  const utcDateWithoutMilliseconds = utcDateString.split(".")[0];
  const date = new Date(utcDateWithoutMilliseconds);

  if (isNaN(date.getTime())) {
    console.error("Invalid date format:", utcDateString);
    return ""; // Return empty string if date is invalid
  }

  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timeZone, // Set to provided time zone
  };

  return date
    .toLocaleString("en-KH", options)
    .replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, "$3-$1-$2 $4:$5:$6");
};

export interface BasePageContainerProps {
  title?: string;
  subTitle?: string;
  breadcrumb?: Partial<BreadcrumbProps> | React.ReactElement<typeof Breadcrumb>;
  extra?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  transparent?: boolean;
}

export const formatDate = (date) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    date += "T17:00:06.000";
  }

  const d = new Date(date);
  const options: any = {
    timeZone: "Asia/Phnom_Penh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(d);
  const year = parts.find((part) => part.type === "year").value;
  const month = parts.find((part) => part.type === "month").value;
  const day = parts.find((part) => part.type === "day").value;
  const hours = parts.find((part) => part.type === "hour").value;
  const minutes = parts.find((part) => part.type === "minute").value;
  const seconds = parts.find((part) => part.type === "second").value;
  const milliseconds = String(d.getUTCMilliseconds()).padStart(3, "0"); // Keeping milliseconds in UTC

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
