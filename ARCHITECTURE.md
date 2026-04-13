# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            React Components (TypeScript)            │   │
│  │  ┌──────────────  Watched Page ─────────────┐       │   │
│  │  │                                          │       │   │
│  │  │  ┌─────────────┐  ┌──────────────┐     │       │   │
│  │  │  │ WatchedForm │  │ WatchedList  │     │       │   │
│  │  │  │  (Add)      │  │ (Display)    │     │       │   │
│  │  │  └─────────────┘  └──────────────┘     │       │   │
│  │  │                                          │       │   │
│  │  │  ┌─────────────────────────────────┐   │       │   │
│  │  │  │      WatchedFilters             │   │       │   │
│  │  │  │  (Search, Category, Year)       │   │       │   │
│  │  │  └─────────────────────────────────┘   │       │   │
│  │  └──────────────────────────────────────┘       │   │
│  │                    ↓↑                             │   │
│  │           ┌─────────────────────┐               │   │
│  │           │ useWatchedEntries() │ ← Hook       │   │
│  │           │ (CRUD + Stats)      │               │   │
│  │           └─────────────────────┘               │   │
│  └──────────────────────────────────────────────────────┘
│                         ↓↑
│               import.meta.env (vite)
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              SUPABASE (Backend as a Service)                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │        REST API (Over HTTPS)                       │    │
│  │  POST /watched_entries                            │    │
│  │  GET /watched_entries                             │    │
│  │  DELETE /watched_entries?id=...                   │    │
│  │  PATCH /watched_entries?id=...                    │    │
│  └────────────────────────────────────────────────────┘    │
│             ↓↑                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │        PostgreSQL Database                        │    │
│  │                                                    │    │
│  │  Table: watched_entries                           │    │
│  │  ├── id (UUID)                                    │    │
│  │  ├── title (TEXT)                                 │    │
│  │  ├── category (kdrama|anime|movies|misc)          │    │
│  │  ├── year (INTEGER)                               │    │
│  │  ├── rating (1-10, nullable)                      │    │
│  │  ├── notes (TEXT, nullable)                       │    │
│  │  └── timestamps                                   │    │
│  │                                                    │    │
│  │  Indexes:                                          │    │
│  │  - category (fast filtering)                      │    │
│  │  - year (fast sorting)                            │    │
│  │  - title (fast searching)                         │    │
│  │                                                    │    │
│  │  RLS Policies: (Row Level Security)               │    │
│  │  - SELECT: Allow all (public read)                │    │
│  │  - INSERT: Allow all (public write)               │    │
│  │  - UPDATE: Allow all (public modify)              │    │
│  │  - DELETE: Allow all (public delete)              │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### When User Adds Entry:

```
WatchedForm (user clicks "Add Entry")
         ↓
useWatchedEntries.addEntry(data)
         ↓
supabase.from('watched_entries').insert(data)
         ↓
Supabase REST API
         ↓
PostgreSQL INSERT
         ↓
Response: New entry with UUID
         ↓
Update React state
         ↓
WatchedList re-renders with new entry
```

### When User Filters Entries:

```
WatchedFilters (user selects category)
         ↓
setSelectedCategory('kdrama')
         ↓
useEffect triggers
         ↓
Filter entries in memory (JavaScript)
         ↓
setFilteredEntries(filtered)
         ↓
WatchedList re-renders with filtered data
```

### When User Searches:

```
Search Input (user types)
         ↓
setSearchQuery('squid game')
         ↓
useEffect triggers
         ↓
Filter entries: title.includes(query)
         ↓
setFilteredEntries(filtered)
         ↓
WatchedList re-renders
```

## Component Hierarchy

```
Watched Page (".tsx")
├── WatchedHeader
│   ├── h1: "Watched Archive"
│   └── p: subtitle
│
├── ErrorMessage (if error exists)
│
├── WatchedControls
│   └── WatchedForm
│       ├── Button: "+ Add Entry"
│       └── Form (conditional):
│           ├── Input: title
│           ├── Select: category
│           ├── Input: year
│           ├── Input: rating
│           ├── Textarea: notes
│           └── Button: "Add Entry"
│
├── WatchedFilters
│   ├── Input: search
│   ├── Select: category
│   ├── Select: year
│   └── Stats: total count
│
└── WatchedList
    └── For each year:
        ├── YearHeader (clickable)
        │   ├── Year title
        │   ├── Entry count
        │   └── Expand icon
        │
        └── EntriesContainer (if expanded):
            └── For each entry:
                ├── Title
                ├── Category badge
                ├── Rating (if exists)
                ├── Notes (if exists)
                └── Delete button
```

## State Management Flow

```
useWatchedEntries Hook:
├── entries: WatchedEntry[] (from Supabase)
├── setEntries (setter)
├── loading: boolean
├── error: string | null
├── stats: WatchedStats (calculated)
├── addEntry(): Promise
├── deleteEntry(): Promise
├── updateEntry(): Promise
└── fetchEntries(): Promise

Watched Page:
├── selectedCategory: string
├── setSelectedCategory
├── selectedYear: number | null
├── setSelectedYear
├── searchQuery: string
├── setSearchQuery
├── filteredEntries: WatchedEntry[] (derived from entries)
└── setFilteredEntries
```

## Type System

```typescript
WatchedEntry {
  id?: string;                    // UUID from DB
  title: string;                  // Required
  category: 'kdrama'|'anime'|'movies'|'misc';
  year: number;
  rating?: number;                // 1-10
  notes?: string;
  watchDate?: string;
  createdAt?: string;
}

WatchedStats {
  totalEntries: number;
  byCategory: Record<string, number>;  // {kdrama: 50, anime: 30, ...}
  byYear: Record<number, number>;      // {2021: 45, 2022: 35, ...}
  averageRating?: number;
}
```

## Performance Considerations

### Database Indexes

```
✅ category - Used by: filter by category
✅ year - Used by: sort/filter by year
✅ title - Used by: future "advanced search"
```

### Frontend Optimizations

```
✅ Grouping by year (reduce rendered entries initially)
✅ Collapsible sections (don't render hidden entries)
✅ Local filtering (search happens in JS, not API)
✅ Memoization (could add useMemo for grouping)
```

### Free Tier Limits

```
✅ 500 MB storage     → ~1 million entries (easily!)
✅ 50k requests/day   → ~2k per hour (more than enough)
✅ 2 GB bandwidth/mo  → ~67 MB/day (massive!)
```

## Scaling Path (Future)

Today: ✅ Simple CRUD + Search

```
├── No auth
├── Public read/write
└── Manual data management
```

Phase 2: Add Authentication

```
├── User accounts (GitHub login)
├── Private lists (per user)
└── Device sync across browser/mobile
```

Phase 3: Add Realtime

```
├── WebSocket subscriptions
├── Live updates when data changes
└── Collaborative features
```

Phase 4: Add Advanced Features

```
├── Import/export CSV
├── Analytics dashboard
├── Recommendations
├── Social sharing
└── Mobile app (React Native)
```

---

## Summary

- **Client**: React + TypeScript (responsive, themed)
- **Hook**: `useWatchedEntries()` manages all data logic
- **API**: Supabase REST (simple, stateless)
- **DB**: PostgreSQL (reliable, scalable)
- **Auth**: None (public) → Can add later
- **Free Tier**: More than enough for personal use

Clean separation of concerns = Easy to maintain and extend! 🚀
