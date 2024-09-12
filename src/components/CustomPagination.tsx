import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="d-flex justify-content-between">
      <div>
        Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
        {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems}
      </div>
      <div className="d-flex">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </Pagination>
  );
};

export default CustomPagination;
