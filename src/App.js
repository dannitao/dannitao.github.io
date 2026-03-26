import React from "react";
import "./App.css";

import Filter from "./components/filter/Filter";
import Header from "./components/header/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Filter />
    </div>
  );
};

export default App;
