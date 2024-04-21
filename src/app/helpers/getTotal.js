export const getTotal = (arr) => {
  if (arr) {
    return arr.reduce((acc, curr) => {
      return acc + curr.totalSaleAmount;
    }, 0);
  }
};
