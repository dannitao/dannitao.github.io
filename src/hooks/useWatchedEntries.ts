import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { WatchedEntry, WatchedStats } from "@/types/watched";

export const useWatchedEntries = () => {
  const [entries, setEntries] = useState<WatchedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WatchedStats | null>(null);

  // Fetch all entries
  const fetchEntries = async (
    category?: string,
    year?: number,
    searchQuery?: string
  ) => {
    try {
      setLoading(true);
      let query = supabase.from("watched_entries").select("*");

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      if (year) {
        query = query.eq("year", year);
      }

      const { data, error: fetchError } = await query.order("year", {
        ascending: false,
      });

      if (fetchError) throw fetchError;

      let filtered = (data || []) as WatchedEntry[];
      if (searchQuery) {
        filtered = filtered.filter((entry: WatchedEntry) =>
          entry.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setEntries(filtered);
      calculateStats(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  };

  // Add new entry
  const addEntry = async (entry: Omit<WatchedEntry, "id" | "createdAt">) => {
    try {
      const { data, error: addError } = await supabase
        .from("watched_entries")
        .insert([entry])
        .select();

      if (addError) throw addError;
      if (data) {
        setEntries([...entries, ...(data as WatchedEntry[])]);
        calculateStats([...entries, ...(data as WatchedEntry[])]);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add entry");
      throw err;
    }
  };

  // Delete entry
  const deleteEntry = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("watched_entries")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setEntries(entries.filter((e) => e.id !== id));
      calculateStats(entries.filter((e) => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete entry");
      throw err;
    }
  };

  // Update entry
  const updateEntry = async (
    id: string,
    updates: Partial<WatchedEntry>
  ) => {
    try {
      const { data, error: updateError } = await supabase
        .from("watched_entries")
        .update(updates)
        .eq("id", id)
        .select();

      if (updateError) throw updateError;
      if (data) {
        const updatedData = data as WatchedEntry[];
        setEntries(
          entries.map((e) => (e.id === id ? { ...e, ...updatedData[0] } : e))
        );
        calculateStats(
          entries.map((e) => (e.id === id ? { ...e, ...updatedData[0] } : e))
        );
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update entry");
      throw err;
    }
  };

  const calculateStats = (data: WatchedEntry[]) => {
    const stats: WatchedStats = {
      totalEntries: data.length,
      byCategory: {},
      byYear: {},
    };

    data.forEach((entry) => {
      stats.byCategory[entry.category] =
        (stats.byCategory[entry.category] || 0) + 1;
      stats.byYear[entry.year] = (stats.byYear[entry.year] || 0) + 1;
    });

    setStats(stats);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    stats,
    fetchEntries,
    addEntry,
    deleteEntry,
    updateEntry,
  };
};
