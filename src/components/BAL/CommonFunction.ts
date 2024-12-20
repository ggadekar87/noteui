export const IsValid = (property: any): boolean => {
  if (typeof property === "undefined") {
    return false;
  }
  if (property === null) {
    return false;
  }
  if (!property) {
    return false;
  }
  return true;
};
