# Adding New Pages & Routes

## Quick Start: Add a New Page

### Step 1: Create a New Page Component

Create a file in `src/pages/YourPageName.tsx`:

```typescript
import React, { FC } from "react";

const YourPageName: FC = () => {
  return (
    <div>
      <h1>Your Page Title</h1>
      <p>Your content here</p>
    </div>
  );
};

export default YourPageName;
```

### Step 2: Add Route to Configuration

Edit `src/routes.ts` and add your route:

```typescript
import YourPageName from "./pages/YourPageName";

export const routes: Route[] = [
  // ... existing routes ...
  {
    path: "/your-page", // URL path (must start with /)
    label: "Your Page", // Navigation label
    component: YourPageName, // Your page component
  },
];
```

**That's it!** Your page will automatically:

- ✅ Appear in the navigation menu
- ✅ Be routable at `/your-page`
- ✅ Work with React Router

## Example: Add a "Recommendations" Page

### 1. Create `src/pages/Recommendations.tsx`

```typescript
import React, { FC } from "react";

const RecommendationsPage: FC = () => {
  return (
    <div>
      <h1>My Recommendations</h1>
      <p>Here are my top picks...</p>
    </div>
  );
};

export default RecommendationsPage;
```

### 2. Update `src/routes.ts`

```typescript
import RecommendationsPage from "./pages/Recommendations";

export const routes: Route[] = [
  {
    path: "/",
    label: "Content Tracker",
    component: ContentTrackerPage,
  },
  {
    path: "/coffee",
    label: "Coffee Wheel",
    component: CoffeeWheelPage,
  },
  {
    path: "/recommendations", // ← Add this
    label: "Recommendations",
    component: RecommendationsPage,
  },
];
```

### 3. Visit Your New Page

Your site will now have:

- Navigation link: `Recommendations` in the menu
- URL: `https://yourdomain.com/recommendations`

## Removing a Page

Simply delete the route from `src/routes.ts` and delete the page file.

## Current Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── routes.ts                  # Route configuration (edit here to add pages!)
├── components/
│   ├── Navigation.tsx         # Auto-generated from routes.ts
│   ├── Header.tsx
│   ├── filter/
│   ├── buttons/
│   ├── card/
│   └── header/
├── pages/                     # All your pages go here
│   ├── ContentTracker.tsx     # Main content tracking page
│   └── CoffeeWheel.tsx        # Coffee wheel spinner
├── Data2022.ts
├── Data2023.ts
├── Categories.ts
└── types.ts
```

## Linking Between Pages

Use React Router's `Link` component:

```typescript
import { Link } from "react-router-dom";

<Link to="/coffee">Go to Coffee Wheel</Link>
```

## Dynamic Routing (Advanced)

Want to pass parameters in the URL? Example: `/content/:category`

```typescript
{
  path: "/content/:category",
  label: "Content by Category",
  component: CategoryPage,
}
```

Then in your component:

```typescript
import { useParams } from "react-router-dom";

const CategoryPage: FC = () => {
  const { category } = useParams<{ category: string }>();
  return <h1>Category: {category}</h1>;
};
```

## Nested Routes (Advanced)

You can create nested route structures for multi-level navigation.

## API Reference

### `src/routes.ts` Structure

```typescript
export interface Route {
  path: string; // URL path (e.g., "/" or "/coffee")
  label: string; // Display name in navigation
  component: React.ComponentType; // Your page component
}
```

### Available Hooks (in your page components)

```typescript
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Get URL parameters
const { id } = useParams();

// Navigate programmatically
const navigate = useNavigate();
navigate("/coffee");

// Get current location
const location = useLocation();
console.log(location.pathname);
```

## Common Patterns

### Make a Page Not Show in Navigation

Create the page, but don't add it to `routes.ts`. Then navigate to it via URL or programmatic navigation.

### Conditional Navigation Links

```typescript
{routes.map((route) => {
  if (shouldHide(route)) return null;
  return <Link key={route.path} to={route.path}>{route.label}</Link>;
})}
```

### Redirect from Old URL

```typescript
import { Navigate } from "react-router-dom";

{
  path: "/old-path",
  label: "Old Page",
  component: () => <Navigate to="/new-path" />,
}
```

## Deployment Notes

- GitHub Pages: Works perfectly with client-side routing
- Build command: `npm run build` (creates `/dist`)
- Deploy: `git push origin main` (auto-deploys via GitHub Actions)

---

## Need Help?

- React Router Docs: https://reactrouter.com/
- React Components: See existing pages in `src/pages/` for examples
