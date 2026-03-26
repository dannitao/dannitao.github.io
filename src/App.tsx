import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation";
import Header from "./components/header/Header";
import routes from "./routes";

const App: FC = () => {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <Navigation />
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
