export const formatDate = (date) => date.toISOString().split("T")[0];

export const getMonth = (date) =>
  date.toLocaleString(undefined, {
    month: "short",
    year: "numeric",
  });
