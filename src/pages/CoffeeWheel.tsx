import { FC } from "react";
import SpinWheel from "../components/SpinWheel";
import "./CoffeeWheel.css";

const CoffeeWheelPage: FC = () => {
  return (
    <div className="coffee-wheel-page">
      <div className="coffee-header">
        <h1><span className="emoji">☕</span> Coffee Wheel</h1>
        <p>Can't decide what to order? Let fate choose your perfect brew!</p>
      </div>

      <SpinWheel />

      <div className="coffee-info">
        <p>
          <strong>Stuck in decision paralysis at the cafe?</strong> Spin the wheel and let fate guide you to your next favorite coffee. 
          From bold espresso shots to smooth cold brew, we've got 8 delicious options to surprise you!
        </p>
      </div>
    </div>
  );
};

export default CoffeeWheelPage;