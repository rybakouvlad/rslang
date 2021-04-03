export const shuffle = (arr: Array<any>) => {
  return arr.sort(() => Math.round(Math.random() * 100) - 50);
};
