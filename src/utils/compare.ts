export const compareArrayString = (
  itemNumberOne: string,
  itemNumberTwo: string
) => {
  if (itemNumberOne < itemNumberTwo) {
    return -1;
  }
  if (itemNumberOne > itemNumberTwo) {
    return 1;
  }
  return 0;
};
