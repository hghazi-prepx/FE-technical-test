import moment from "moment";

export const common = {
  getPermissionsByName,
};

function getPermissionsByName(name: any, responseArray: any) {
  const module = responseArray.find((module: any) => module.MenuCode == name);

  if (module) {
    return module.Permission || [];
  }
  return [];
}

export const formatCourseDates = (startDateTime: any, endDateTime: any) => {
  const startDate = moment(startDateTime).format("dddd MMMM D");
  const endDate = moment(endDateTime).format("dddd MMMM D");
  const startTime = moment(startDateTime).format("h:mm A");
  const endTime = moment(endDateTime).format("h:mm A");

  return {
    startDate,
    endDate,
    time: `${startTime} - ${endTime}`,
    date: `${startDate} - ${endDate}`,
  };
};

export const formatFileSize = (bytes: any) => {
  if (bytes >= 1024 ** 3) {
    return (bytes / 1024 ** 3).toFixed(2) + " GB";
  } else if (bytes >= 1024 ** 2) {
    return (bytes / 1024 ** 2).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    return bytes + " bytes";
  }
};
type FormatDateOptions = {
  timezone: string;
  fixedFormat: boolean;
};

export function formatDate(
  timestamp: string,
  options?: { timezone?: string; fixedFormat?: boolean }
): string {
  const date = new Date(Number(timestamp));

  if (options?.fixedFormat) {
    // Always return YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Default: localized format with optional timezone
  return date.toLocaleDateString("en-US", {
    timeZone: options?.timezone || "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
