export const priceFormatter = (price = 0) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    useGrouping: "true",
  });

  return formatter.format(price);
};
