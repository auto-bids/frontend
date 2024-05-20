import React from "react";
import { Link } from "react-router-dom";

interface PaginationButtonProps {
  page: number;
  isActive: boolean;
  link: string;
    fetchOffers: (num: number) => void;
}

export default function PaginationButton({ page, isActive, link, fetchOffers }: PaginationButtonProps) {
  return (
    <Link
      to={link}
      className={`form-button border-2 rounded p-2 mr-2 hover:bg-gray-200 transition duration-300 ${isActive ? 'bg-gray-200' : ''}`}
      onClick={() => {
        fetchOffers(page);
        window.scrollTo(0, 0);
        }}
    >
      {page}
    </Link>
  );
}
