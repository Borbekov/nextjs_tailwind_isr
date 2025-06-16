"use client"

import { useCreatePageUrl } from "@/hooks/useCreatePageUrl"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface PaginationProps {
    totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const { changePage } = useCreatePageUrl()
    const searchParams = useSearchParams()

    const currentPage = +(searchParams.get('_page') ?? '1')

    const handlePageClick = (page: number) => {
        changePage(page)
    }

    const getPageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = []
        const maxVisiblePages = 3

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push("...")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
                aria-label="Go to previous page"
            >
                <ArrowLeft />
            </button>

            {pageNumbers.map((page, index) => (
                <div key={index}>
                    {page === "..." ? (
                        <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">...</span>
                    ) : (
                        <button
                            onClick={() => handlePageClick(page as number)}
                            className={`px-3 py-2 text-sm font-medium border cursor-pointer ${currentPage === page
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                                }`}
                            aria-label={`Go to page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
                aria-label="Go to next page"
            >
                <ArrowRight />
            </button>
        </div>
    )
}

export default Pagination
