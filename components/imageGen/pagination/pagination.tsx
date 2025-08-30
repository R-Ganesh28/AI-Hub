import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  return (
    <nav
      className="d-flex justify-content-center fixed-bottom opacity-75 
        mb-10"
    >
      <ul className="flex justify-center items-center space-x-2 mt-5">
        {page > 1 && (
          <li className="page-item">
            <Link href={`?page=${page - 1}`}>
              <Button className="cursor-pointer" variant="ghost">
                <ChevronsLeft />
              </Button>
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber} className="page-item">
              <Link href={`?page=${pageNumber}`}>
                <Button
                  className="cursor-pointer"
                  variant={`${page == pageNumber ? "secondary" : "ghost"}`}
                >
                  {pageNumber}
                </Button>
              </Link>
            </li>
          );
        })}

        {page < totalPages && (
          <li className="page-item">
            <Link href={`?page=${page + 1}`}>
              <Button className="cursor-pointer" variant="ghost">
                <ChevronsRight />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
