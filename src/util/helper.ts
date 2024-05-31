export const convertUTCDateToString= (utcDateString: string) => {
    const utcDateWithoutMilliseconds = utcDateString.split('.')[0];
    const date = new Date(utcDateWithoutMilliseconds);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Phnom_Penh", // Set to Khmer time zone
    };
    return date.toLocaleString("en-KH", options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3-$1-$2 $4:$5:$6');

};
