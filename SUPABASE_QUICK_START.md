# Supabase Integration Quick Start

You've successfully set up Supabase integration for your watched archive! Here's what was done and what you need to do next.

## What Was Set Up

✅ **Supabase Client** - Ready to connect to your database  
✅ **Type-Safe Hooks** - `useWatchedEntries()` for all CRUD operations  
✅ **React Components:**

- `WatchedForm` - Add new entries
- `WatchedList` - Display & manage entries (grouped by year)
- `WatchedFilters` - Search, filter by category/year

✅ **Professional Styling** - Dark/light mode compatible  
✅ **TypeScript** - Full type safety throughout

## Next Steps (Required)

### 1. Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → Sign in with GitHub
3. Create a new project (use `us-east-1` or your region)
4. **Save your credentials** (you'll need them in step 2)

### 2. Add Environment Variables (1 min)

Create `.env.local` in your project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from Supabase: **Settings > API**

### 3. Create Database Table (2 min)

In Supabase, go to **SQL Editor** → **New Query** → Copy & run this:

```sql
CREATE TABLE watched_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('kdrama', 'anime', 'movies', 'misc')),
  year INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  notes TEXT,
  watch_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_watched_entries_category ON watched_entries(category);
CREATE INDEX idx_watched_entries_year ON watched_entries(year);
CREATE INDEX idx_watched_entries_title ON watched_entries(title);

-- Enable Row Level Security (optional)
ALTER TABLE watched_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON watched_entries FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON watched_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON watched_entries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON watched_entries FOR DELETE USING (true);
```

### 4. Migrate Your Data (5-10 min)

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed migration instructions.

### 5. Test It Out!

```bash
npm run dev
# Visit http://localhost:3000/watched
```

Try:

- ✅ Add a new entry
- ✅ Search entries
- ✅ Filter by category/year
- ✅ Delete an entry
- ✅ View stats

## Features

- **Search** - Real-time search by title
- **Filter** - By category or year
- **Stats** - Total count, breakdown by category/year
- **Grouped Display** - Entries organized by year (collapsible)
- **Add/Delete** - Full CRUD operations
- **Dark Mode** - Full theme support

## File Structure

```
src/
├── lib/
│   └── supabaseClient.ts       # Supabase config
├── types/
│   └── watched.ts              # TypeScript types
├── hooks/
│   └── useWatchedEntries.ts    # Supabase hook
├── components/
│   ├── WatchedList.tsx
│   ├── WatchedFilters.tsx
│   └── WatchedForm.tsx
├── styles/
│   ├── WatchedList.css
│   ├── WatchedFilters.css
│   └── WatchedForm.css
└── pages/
    └── Watched.tsx             # Main page

.env.local                       # Your secrets (NOT in git)
.env.example                     # Template
SUPABASE_SETUP.md               # Detailed setup guide
```

## Troubleshooting

**"Missing Supabase credentials" error**

- ✅ Create `.env.local` file
- ✅ Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- ✅ Restart dev server with `npm run dev`

**"Failed to fetch entries"**

- ✅ Check browser console for exact error
- ✅ Verify table exists in Supabase
- ✅ Check RLS policies are set correctly

**CORS errors**

- ✅ Go to Supabase **Settings > API > Allowed CORS Origins**
- ✅ Add: `localhost:3000, https://yourusername.github.io`

## Cost & Free Tier

**Supabase Free Tier Includes:**

- 500 MB database storage
- 2 GB bandwidth down / 50 GB up per month
- 50k API calls per day
- Plenty for personal use!

**When you need to upgrade:**

- Pro: $25/month (100 GB storage, 250 GB bandwidth)
- Team: $599/month (unlimited)

## Next: Consider Adding

Once basics work, you might want:

- **Authentication** - Sign in to sync across devices
- **Realtime** - Live updates when entries change
- **Export** - Download as CSV
- **Analytics** - Charts & statistics
- **Mobile App** - React Native version
- **Sharing** - Public lists/achievements

## Questions?

Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for comprehensive setup guide with data migration instructions.

Good luck! 🚀
