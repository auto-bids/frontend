import React from "react";

export default function PaginationButton({ page, isActive, handleClick }: { page: number, isActive: boolean, handleClick: () => void }): JSX.Element {
    return (
        <button
            onClick={handleClick}
            className={`form-button border-2 rounded p-2 mr-2 hover:bg-gray-200 transition duration-300 ${isActive ? 'bg-gray-200' : ''}`}
        >
            {page}
        </button>
    );
}
