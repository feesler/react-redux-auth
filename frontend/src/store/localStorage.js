export const loadState = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    // Ignore write errors.
  }
};
