export const assert = (a: unknown) => {
  if (!a) {
    throw new Error(`Expected ${a} to be true.`);
  }
};
