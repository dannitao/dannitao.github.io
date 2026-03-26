import React, { FC } from "react";
import SpinWheel from "../components/SpinWheel";

const CoffeeWheel: FC = () => {
  return (
    <div>
      <h1>Coffee Wheel</h1>
      <p>Can't decide what to order? Let fate choose!</p>
      <SpinWheel />
    </div>
  );
};

export default CoffeeWheel;