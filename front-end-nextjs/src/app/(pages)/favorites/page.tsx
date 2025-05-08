"use client";

import { useState } from "react";
import { FavoritesHeader } from "@/components/client/favorites/favorites-header";
import { FavoritesList } from "@/components/client/favorites/favorites-list";
import { EmptyFavorites } from "@/components/client/favorites/empty-favorites";
import { Breadcrumb } from "@/components/client/layout/breadcrumb";

// Mock data for favorite products
const favoriteProducts = [
  {
    id: 1,
    name: "Honda Wave Alpha",
    image: "/placeholder.svg?height=300&width=400",
    price: 17800000,
    oldPrice: 18500000,
    brand: "Honda",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    image: "/placeholder.svg?height=300&width=400",
    price: 50900000,
    oldPrice: null,
    brand: "Yamaha",
    isNew: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Suzuki Raider R150",
    image: "/placeholder.svg?height=300&width=400",
    price: 49990000,
    oldPrice: 52000000,
    brand: "Suzuki",
    isNew: false,
    inStock: false,
  },
  {
    id: 4,
    name: "Honda SH 150i",
    image: "/placeholder.svg?height=300&width=400",
    price: 102900000,
    oldPrice: null,
    brand: "Honda",
    isNew: true,
    inStock: true,
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoriteProducts);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Toggle selection of an item
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Select all items
  const selectAll = () => {
    if (selectedItems.length === favorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favorites.map((item) => item.id));
    }
  };

  // Remove selected items
  const removeSelected = () => {
    setFavorites((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  // Remove a single item
  const removeItem = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Yêu thích", href: "/favorites" },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Sản phẩm yêu thích</h1>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container py-8">
        {favorites.length > 0 ? (
          <>
            <FavoritesHeader
              totalItems={favorites.length}
              selectedItems={selectedItems}
              onSelectAll={selectAll}
              onRemoveSelected={removeSelected}
            />
            <FavoritesList
              products={favorites}
              selectedItems={selectedItems}
              onToggleSelection={toggleSelection}
              onRemoveItem={removeItem}
            />
          </>
        ) : (
          <EmptyFavorites />
        )}
      </div>
    </main>
  );
}
