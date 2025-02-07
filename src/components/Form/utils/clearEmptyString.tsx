export const clearEmptyString = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== "")
  );
};
