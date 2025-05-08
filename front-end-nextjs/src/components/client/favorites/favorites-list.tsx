"use client";

import { ProductCard } from "@/components/client/products/product-card";
import { Checkbox } from "@/components/ui/checkbox";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  brand: string;
  isNew: boolean;
  inStock: boolean;
}

interface FavoritesListProps {
  products: Product[];
  selectedItems: number[];
  onToggleSelection: (id: number) => void;
  onRemoveItem: (id: number) => void;
}

export function FavoritesList({
  products,
  selectedItems,
  onToggleSelection,
  onRemoveItem,
}: FavoritesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="relative">
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              checked={selectedItems.includes(product.id)}
              onCheckedChange={() => onToggleSelection(product.id)}
              className="bg-white/80"
            />
          </div>
          <ProductCard
            product={product}
            isFavorite={true}
            onFavoriteToggle={() => onRemoveItem(product.id)}
            showFavoriteButton={true}
          />
        </div>
      ))}
    </div>
  );
}
