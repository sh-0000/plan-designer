export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  /* map through the data and return "category" from each object */

  return ["All", ...new Set(unique)]; //aggrigate the results using Set()
};
