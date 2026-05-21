import React from 'react';

export const FilterIcon = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22.0005 6.50098H16.0005"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M5.99951 6.50098H1.99951"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M9.99951 10C11.9325 10 13.4995 8.433 13.4995 6.5C13.4995 4.567 11.9325 3 9.99951 3C8.06652 3 6.49951 4.567 6.49951 6.5C6.49951 8.433 8.06652 10 9.99951 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M22 17.499H18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M7.99951 17.499H1.99951"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M14 21.001C15.933 21.001 17.5 19.434 17.5 17.501C17.5 15.568 15.933 14.001 14 14.001C12.067 14.001 10.5 15.568 10.5 17.501C10.5 19.434 12.067 21.001 14 21.001Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}