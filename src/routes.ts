import HomePage from "./pages/Home";
import ContentTrackerPage from "./pages/ContentTracker";
import CoffeeWheelPage from "./pages/CoffeeWheel";
import WatchedPage from "./pages/Watched";

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
