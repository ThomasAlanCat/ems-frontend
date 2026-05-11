const Pagination = ({ pages, index, setIndex, nextPage, prevPage }) => {
  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex list-none  rounded">
        <li className="">
          <button
            onClick={prevPage}
            className="px-3 py-1 hover:bg-gray-200 transition-colors rounded"
          >
            Prev
          </button>
        </li>
        {pages.map((_, pageIndex) => (
          <li
            key={pageIndex}
            className={` ${index === pageIndex ? "bg-teal-500 text-white rounded " : ""}`}
          >
            <button onClick={() => setIndex(pageIndex)} className="px-3 py-1">
              {pageIndex + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPage}
            className="px-3 py-1 hover:bg-gray-200 transition-colors rounded"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
