export const getItem = (key) => {
  const itemString = sessionStorage.getItem(key);
  if (!itemString) return;

  const item = JSON.parse(itemString);

  if (item.expiry) {
    const now = Date.now();

    const isNotValid = Math.floor(now) > Math.floor(item.expiry);

    if (isNotValid) {
      sessionStorage.removeItem(key);
      return;
    }
    return item.value;
  }
  return item.value;
};

export const setItem = (key, value, ttl) => {
  try {
    const item = { value };

    if (ttl) {
      const expiryTime = Date.now() + ttl * 1000;
      item.expiry = expiryTime;
    }

    return sessionStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
};
