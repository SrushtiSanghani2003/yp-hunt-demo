import type React from "react";
import { chevronLeft, chevronRight } from "../../../icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // const renderPageNumbers = () => {
  //   const pages = [];

  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(
  //       <button
  //         key={i}
  //         onClick={() => onPageChange(i)}
  //         className={` w-10 flex items-center justify-center h-full  rounded-md border-primary border-0.5 ${
  //           i === currentPage
  //             ? "bg-primary text-black border-fcd100"
  //             : "bg-white"
  //         }`}
  //       >
  //         <span className="h-auto">{i}</span>
  //       </button>
  //     );
  //   }

  //   return pages;
  // };

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const range = 1; // how many pages to show before and after current

    const addButton = (page: number) => {
      pages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`md:w-10 w-9 flex items-center justify-center h-full rounded-md border-primary border-0.5 ${
            page === currentPage
              ? "bg-primary text-black border-fcd100"
              : "bg-white"
          }`}
        >
          <span className="text-sm md:text-base">{page}</span>
        </button>
      );
    };

    const addDots = (key: string) => {
      pages.push(
        <span key={key} className="px-2 text-gray-500">
          ...
        </span>
      );
    };

    const leftBoundary = Math.max(2, currentPage - range);
    const rightBoundary = Math.min(totalPages - 1, currentPage + range);

    addButton(1); // always show first page

    if (leftBoundary > 2) {
      addDots("left-dots");
    }

    for (let i = leftBoundary; i <= rightBoundary; i++) {
      addButton(i);
    }

    if (rightBoundary < totalPages - 1) {
      addDots("right-dots");
    }

    if (totalPages > 1) {
      addButton(totalPages); // always show last page
    }

    return pages;
  };

  return (
    <>
      <div className="container flex items-center gap-2 my-3 md:h-sp40 h-9">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center md:w-10 w-9 h-full border-primary border-0.5 rounded-md bg-white disabled:opacity-50"
        >
          <img src={chevronLeft} />
        </button>

        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center md:w-10 w-9 h-full border-primary border-0.5 rounded-md bg-white disabled:opacity-50"
        >
          <img src={chevronRight} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
