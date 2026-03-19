// Example helper functions

// Capitalize first letter
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Format timestamp to hh:mm
export const formatTime = (date = new Date()) => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

// Sleep / delay
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
