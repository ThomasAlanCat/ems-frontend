const paginate = (filteredItems) => {
  const itemsPerPage = 3;
  const numberOfPages = Math.ceil(filteredItems.length / itemsPerPage);
  const newDepartments = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  });
  return newDepartments;
};

export default paginate;
