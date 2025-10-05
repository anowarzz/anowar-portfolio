"use client";

import { BlogFilters } from "@/services/blogService/getAllBlogPost";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BlogFiltersProps {
  onFiltersChange: (filters: BlogFilters) => void;
  initialFilters?: BlogFilters;
}

export const BlogFiltersComponent = ({
  onFiltersChange,
  initialFilters = {},
}: BlogFiltersProps) => {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(
    initialFilters.isFeatured
  );

  const handleSearch = () => {
    onFiltersChange({
      search: search || "",
      isFeatured,
      page: 1,
    });
  };

  const handleFeaturedFilter = (featured: boolean | undefined) => {
    setIsFeatured(featured);
    onFiltersChange({
      search: search || "",
      isFeatured: featured,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setIsFeatured(undefined);
    onFiltersChange({ page: 1 });
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Filter Blogs</h3>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search blogs by title, content, or excerpt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
            <Button
              onClick={handleSearch}
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-lg"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Featured Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Featured
          </label>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={isFeatured === undefined ? "default" : "outline"}
              size="default"
              onClick={() => handleFeaturedFilter(undefined)}
              className={
                isFeatured === undefined
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 shadow-lg border-2 border-cyan-600 transition-all duration-200"
                  : "border-2 border-slate-600 text-slate-700 bg-white hover:bg-slate-700 hover:border-slate-700 hover:text-white font-medium px-6 transition-all duration-200"
              }
            >
              All
            </Button>
            <Button
              variant={isFeatured === true ? "default" : "outline"}
              size="default"
              onClick={() => handleFeaturedFilter(true)}
              className={
                isFeatured === true
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 shadow-lg border-2 border-cyan-600 transition-all duration-200"
                  : "border-2 border-blue-600 text-blue-700 bg-white hover:bg-blue-600 hover:border-blue-600 hover:text-white font-medium px-6 transition-all duration-200"
              }
            >
              ⭐ Featured
            </Button>
            <Button
              variant={isFeatured === false ? "default" : "outline"}
              size="default"
              onClick={() => handleFeaturedFilter(false)}
              className={
                isFeatured === false
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 shadow-lg border-2 border-cyan-600 transition-all duration-200"
                  : "border-2 border-indigo-600 text-indigo-700 bg-white hover:bg-indigo-600 hover:border-indigo-600 hover:text-white font-medium px-6 transition-all duration-200"
              }
            >
              📝 Not Featured
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <Button
            onClick={handleClearFilters}
            variant="outline"
            size="default"
            className="border-2 border-gray-600 text-gray-700 bg-white hover:bg-gray-600 hover:text-white hover:border-gray-600 font-semibold px-6 shadow-lg transition-all duration-200"
          >
            🗑️ Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
