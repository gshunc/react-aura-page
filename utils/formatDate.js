export const formatDate = (raw_date) => {
  //Helper function used in multiple graphing components.
  const str_date = String(raw_date);
  const formattedDate = new Date(str_date).toLocaleString("en-US", {
    timezone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedDate;
};
