export const timeAgo = (date) => {
  const now = new Date();
  const createdTime = new Date(date);
  const diff = Math.floor((now - createdTime) / 1000);

  const timeIntervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(timeIntervals)) {
    const interval = Math.floor(diff / secondsInUnit);
    if (interval >= 1) {
      return interval + unit[0] + " ago"; // e.g., '2h ago', '15m ago', etc.
    }
  }

  return "just now";
};
