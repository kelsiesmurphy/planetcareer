 import { ArrowLeft, ArrowRight } from "react-feather";

const Pagination = ({
  demoTableItems,
  currentPage,
  pageSize,
  onPageChange,
}: any) => {
  const pagesCount = Math.ceil(demoTableItems / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-1 justify-between p-4">
      <button
        className={currentPage === 1 ? "hidden" : "btn-secondary"}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowLeft size={20} />
        Previous
      </button>
      <ul className="flex">
        {pages.map((page: any) => (
          <li key={page}>
            <a onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
      <button
        className={currentPage === demoTableItems.length ? "hidden" : "btn-secondary"}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Next
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;

export const paginate = (items: any, pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};
