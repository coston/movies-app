"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavButtonProps {
  href?: string;
  disabled: boolean;
  children: React.ReactNode;
}

function NavButton({ href, disabled, children }: NavButtonProps) {
  const button = (
    <Button variant="outline" size="sm" disabled={disabled}>
      {children}
    </Button>
  );
  return disabled || !href ? (
    button
  ) : (
    <Link href={href} passHref>
      {button}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <NavButton
        disabled={currentPage === 1}
        href={createPageURL(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </NavButton>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <NavButton
        disabled={currentPage === totalPages}
        href={createPageURL(currentPage + 1)}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </NavButton>
    </div>
  );
}
