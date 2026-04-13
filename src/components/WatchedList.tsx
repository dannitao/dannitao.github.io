import { FC, useState } from "react";
import type { WatchedEntry } from "@/types/watched";
import "../styles/WatchedList.css";

interface WatchedListProps {
  entries: WatchedEntry[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const WatchedList: FC<WatchedListProps> = ({
  entries,
  onDelete,
  loading,
}) => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const groupedByYear = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.year]) {
        acc[entry.year] = [];
      }
      acc[entry.year].push(entry);
      return acc;
    },
    {} as Record<number, WatchedEntry[]>
  );

  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  if (loading) {
    return <div className="loading">Loading entries...</div>;
  }

  if (entries.length === 0) {
    return <div className="empty-state">No entries found</div>;
  }

  return (
    <div className="watched-list">
      {sortedYears.map((year) => (
        <div key={year} className="year-section">
          <div
            className="year-header"
            onClick={() =>
              setExpandedYear(expandedYear === year ? null : year)
            }
          >
            <span className="year-title">{year}</span>
            <span className="year-count">
              {groupedByYear[year].length}
            </span>
            <span className="expand-icon">
              {expandedYear === year ? "▼" : "▶"}
            </span>
          </div>

          {expandedYear === year && (
            <div className="entries-container">
              {groupedByYear[year].map((entry: WatchedEntry) => (
                <div key={entry.id} className="entry-item">
                  <div className="entry-content">
                    <h3 className="entry-title">{entry.title}</h3>
                    <div className="entry-meta">
                      <span className="category-badge">{entry.category}</span>
                      {entry.rating && (
                        <span className="rating">★ {entry.rating}/10</span>
                      )}
                      {entry.notes && (
                        <span className="notes">{entry.notes}</span>
                      )}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => entry.id && onDelete(entry.id)}
                    title="Delete entry"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
