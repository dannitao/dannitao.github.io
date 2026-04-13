import HomePage from "./pages/Home";
import ContentTrackerPage from "./pages/ContentTracker";
import CoffeeWheelPage from "./pages/CoffeeWheel";
import WatchedPage from "./pages/Watched";
import WatchedLegacy from "./pages/WatchedLegacy";

export interface Route {
  path: string;
  label: string;
  component: React.ComponentType;
}

export const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    component: HomePage,
  },
  {
    path: "/watched",
    label: "Watched",
    component: WatchedPage,
  },
  {
    path: "/watched-legacy",
    label: "Watched (Legacy)",
    component: WatchedLegacy,
  },
  {
    path: "/content-tracker",
    label: "Content Tracker",
    component: ContentTrackerPage,
  },
  {
    path: "/coffee",
    label: "Coffee Wheel",
    component: CoffeeWheelPage,
  },
];

export default routes;
