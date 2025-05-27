import { Suspense } from "react";
import { searchMotorbikes } from "./_lib/service";
import { SearchHeader } from "@/app/(pages)/search/_component/search-header";
import { SearchResults } from "@/app/(pages)/search/_component/search-result";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  // Fetch search results
  const searchResults = query ? await searchMotorbikes(query) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <SearchHeader query={query} />

        <Suspense fallback={<div>Đang tải...</div>}>
          <SearchResults
            results={searchResults}
            query={query}
            totalResults={searchResults.length}
          />
        </Suspense>
      </div>
    </div>
  );
}
