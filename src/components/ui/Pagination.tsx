/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {FC} from "react";

interface PaginationProps {
    canIncrementPage: boolean
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({page,setPage, canIncrementPage}) => {

    function decrementPage() {
        if (page>0) setPage(page - 1)
    }

    function incrementPage() {
        if (canIncrementPage) setPage(page+1)
    }

    return (
        <div className="bg-white px-4 py-3 border-t border-gray-200 ">
            <div className="flex-1 flex justify-between sm:hidden">
                <a
                    onClick={()=> decrementPage()}
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    onClick={()=> incrementPage()}
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                        onClick={()=> decrementPage()}
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Previous
                        <span className="sr-only">Previous</span>
                    </a>
                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                    <a
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                        {page+1}
                    </a>
                    <a
                        onClick={()=> incrementPage()}
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Next
                        <span className="sr-only">Next</span>
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default Pagination