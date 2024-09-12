import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
      <Pagination.Item active>{currentPage}</Pagination.Item>
      <Pagination.Next
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
