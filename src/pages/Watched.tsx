import { FC, useState, useEffect } from "react";
import { WatchedList } from "@/components/WatchedList";
import { WatchedFilters } from "@/components/WatchedFilters";
import { WatchedForm } from "@/components/WatchedForm";
import { useWatchedEntries } from "@/hooks/useWatchedEntries";
import type { WatchedEntry } from "@/types/watched";
import "./Watched.css";

const WatchedPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEntries, setFilteredEntries] = useState<WatchedEntry[]>([]);

  const { entries, loading, error, stats, addEntry, deleteEntry } =
    useWatchedEntries();

  // Apply filters
  useEffect(() => {
    let filtered = entries;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((e: WatchedEntry) => e.category === selectedCategory);
    }

    if (selectedYear) {
      filtered = filtered.filter((e: WatchedEntry) => e.year === selectedYear);
    }

    if (searchQuery) {
      filtered = filtered.filter((e: WatchedEntry) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEntries(filtered);
  }, [entries, selectedCategory, selectedYear, searchQuery]);

  const handleAddEntry = async (entry: Omit<WatchedEntry, "id" | "createdAt">) => {
    await addEntry(entry);
  };

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteEntry(id);
    }
  };

  return (
    <div className="watched-page">
      <div className="watched-header">
        <h1>Watched Archive</h1>
        <p className="watched-subtitle">
          Track and manage your entertainment journey
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="watched-controls">
        <WatchedForm onSubmit={handleAddEntry} isLoading={loading} />
      </div>

      <WatchedFilters
        stats={stats}
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onYearChange={setSelectedYear}
        onSearchChange={setSearchQuery}
      />

      <WatchedList
        entries={filteredEntries}
        onDelete={handleDeleteEntry}
        loading={loading}
      />
    </div>
  );
};

export default WatchedPage;
