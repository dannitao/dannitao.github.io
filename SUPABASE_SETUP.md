# Supabase Watched Archive Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Create a new organization (or use existing)
5. Create a new project:
   - **Name:** `watched-archive` (or your choice)
   - **Database Password:** Generate a strong password
   - **Region:** Choose closest to you (e.g., `us-east-1`, `eu-west-1`)
   - **Plan:** Free tier is fine for personal use

## 2. Get Your Credentials

1. In Supabase dashboard, go to **Settings > API**
2. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

## 3. Create the Database Table

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

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

-- Create indexes for better query performance
CREATE INDEX idx_watched_entries_category ON watched_entries(category);
CREATE INDEX idx_watched_entries_year ON watched_entries(year);
CREATE INDEX idx_watched_entries_title ON watched_entries(title);

-- Enable Row Level Security (RLS) - optional, allows any user
ALTER TABLE watched_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/write (optional, for demo only)
CREATE POLICY "Allow public read" ON watched_entries FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON watched_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON watched_entries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON watched_entries FOR DELETE USING (true);
```

4. Click **Run** button
5. You should see success message

## 4. Set Up Environment Variables

1. Create `.env.local` file in project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Add `.env.local` to `.gitignore` (if not already there):

```
.env.local
```

## 5. Migrate Existing Data

### Option A: Manual Import (Recommended for first setup)

1. Create a CSV file from your existing data:
   - Format: `title, category, year, rating, notes`
   - Example:
     ```
     emily in paris s3,kdrama,2023,,
     squid game,kdrama,2021,9,Amazing show
     ```

2. In Supabase, go to **Explore > watched_entries**
3. Click **Insert > Insert data manually** or **Upload bulk data**
4. Paste your CSV or JSON data

### Option B: Programmatic (For bulk operations)

Use the provided migration script (create `scripts/migrate.ts`):

```typescript
import { supabase } from "@/lib/supabaseClient";

const DATA = [
  { title: "Squid Game", category: "kdrama", year: 2021, rating: 9 },
  // ... more entries
];

async function migrate() {
  const { error } = await supabase.from("watched_entries").insert(DATA);
  if (error) console.error("Migration failed:", error);
  else console.log("Migration successful!");
}

migrate();
```

## 6. Test Everything

1. Start dev server: `npm run dev`
2. Navigate to `/watched`
3. Test features:
   - ✅ Search entries
   - ✅ Filter by category
   - ✅ Filter by year
   - ✅ Add new entry
   - ✅ Delete entry
   - ✅ View stats

## 7. Deploy to GitHub Pages

Run your normal deployment:

```bash
npm run build
git add .
git commit -m "Migrate watched page to Supabase"
git push
```

**Note:** Secrets in `.env.local` are safe because they're in `.gitignore`. The `VITE_SUPABASE_ANON_KEY` is exposed in the frontend (by design), but it only allows read/write to your tables with the RLS policies you set.

## Troubleshooting

### "Missing Supabase credentials"

- ✅ Check `.env.local` file exists
- ✅ Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- ✅ Restart dev server

### "Failed to fetch entries"

- ✅ Check network tab in DevTools
- ✅ Verify RLS policies are enabled
- ✅ Check Supabase table exists and has data

### CORS errors

- ✅ Go to Supabase **Settings > API > Allowed CORS Origins**
- ✅ Add: `localhost:3000, https://yourusername.github.io`

## Cost & Limits (Free Tier)

- Database: 500 MB storage
- Bandwidth: 2 GB/month down, 50 GB/month up
- API calls: 50k/day
- Realtime connections: 200
- Perfect for personal projects!

## Future Enhancements

Once basic setup works, you can add:

- Authentication (sign in to sync across devices)
- Export to CSV
- Realtime sync with WebSockets
- Advanced stats & charts
- Mobile app version (React Native)
