"use client";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  resetFilters?: () => void;
}

export function EmptyState({ resetFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">Không tìm thấy sản phẩm nào</h3>
      <p className="text-muted-foreground mb-4">
        Không có sản phẩm nào phù hợp với bộ lọc của bạn
      </p>
      <Button onClick={resetFilters}>Xóa bộ lọc</Button>
    </div>
  );
}
