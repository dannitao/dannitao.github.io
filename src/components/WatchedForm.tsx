import { FC, useState } from "react";
import type { WatchedEntry } from "@/types/watched";
import "../styles/WatchedForm.css";

interface WatchedFormProps {
  onSubmit: (entry: Omit<WatchedEntry, "id" | "createdAt">) => void;
  isLoading?: boolean;
}

type CategoryType = "kdrama" | "anime" | "movies" | "misc";

export const WatchedForm: FC<WatchedFormProps> = ({ onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "kdrama" as CategoryType,
    year: new Date().getFullYear(),
    rating: undefined as number | undefined,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        category: "kdrama",
        year: new Date().getFullYear(),
        rating: undefined,
        notes: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <div className="watched-form-container">
      <button
        className="open-form-btn"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {isOpen ? "Cancel" : "+ Add Entry"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="watched-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Squid Game"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as CategoryType,
                  })
                }
                className="form-select"
              >
                <option value="kdrama">K-Drama</option>
                <option value="anime">Anime</option>
                <option value="movies">Movies</option>
                <option value="misc">Misc</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (1-10)</label>
              <input
                id="rating"
                type="number"
                min="1"
                max="10"
                value={formData.rating || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="Optional notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="form-textarea"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.title}
            className="submit-btn"
          >
            {isLoading ? "Adding..." : "Add Entry"}
          </button>
        </form>
      )}
    </div>
  );
};
