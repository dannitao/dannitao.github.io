import { FC, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation";
import Header from "./components/header/Header";
import routes from "./routes";

const App: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme-mode", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router basename="/">
      <div className="App" data-theme={isDarkMode ? "dark" : "light"}>
        <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <Navigation isDarkMode={isDarkMode} />
        <main className="main-content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
