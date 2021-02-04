export const assert = (a) => {
    if (!a) {
        throw new Error(`Expected ${a} to be true.`);
    }
};
