import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
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
    <div className="flex justify-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="py-2 px-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}