export type WatchedEntry = {
  id?: string;
  title: string;
  category: "kdrama" | "anime" | "movies" | "misc";
  year: number;
  rating?: number;
  notes?: string;
  watchDate?: string;
  createdAt?: string;
};

export type WatchedStats = {
  totalEntries: number;
  byCategory: Record<string, number>;
  byYear: Record<number, number>;
  averageRating?: number;
};
