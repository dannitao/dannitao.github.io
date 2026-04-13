import { FC } from "react";
import type { WatchedStats } from "@/types/watched";
import "../styles/WatchedFilters.css";

interface WatchedFiltersProps {
  stats: WatchedStats | null;
  selectedCategory: string;
  selectedYear: number | null;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: number | null) => void;
  onSearchChange: (query: string) => void;
}

export const WatchedFilters: FC<WatchedFiltersProps> = ({
  stats,
  selectedCategory,
  selectedYear,
  searchQuery,
  onCategoryChange,
  onYearChange,
  onSearchChange,
}) => {
  const categories = stats
    ? Object.keys(stats.byCategory)
    : ["kdrama", "anime", "movies", "misc"];
  const years = stats
    ? Object.keys(stats.byYear)
        .map(Number)
        .sort((a, b) => b - a)
    : [];

  return (
    <div className="watched-filters">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat} ({stats?.byCategory[cat] || 0})
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Year:</label>
        <select
          value={selectedYear || ""}
          onChange={(e) =>
            onYearChange(e.target.value ? parseInt(e.target.value) : null)
          }
          className="filter-select"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year} ({stats?.byYear[year] || 0})
            </option>
          ))}
        </select>
      </div>

      {stats && (
        <div className="stats-summary">
          <span className="stat-item">Total: {stats.totalEntries}</span>
        </div>
      )}
    </div>
  );
};
