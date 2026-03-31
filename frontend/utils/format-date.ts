export function formatISODate(isoDate: string) {
  const date = new Date(isoDate);

  // Options for human-readable format
  const options = {
    year: "numeric",
    month: "long", // "March"
    day: "numeric", // "29"
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true, // 12-hour format
    // timeZoneName: "short", // e.g., "GMT"
  };

  return date.toLocaleString(undefined, options);
}
