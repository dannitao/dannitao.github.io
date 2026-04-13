import { FC, useRef, useState, useEffect } from "react";
import "./CoffeeSpinner.css";

interface CoffeeOption {
  name: string;
  description: string;
  color: string;
}

const COFFEE_OPTIONS: CoffeeOption[] = [
  { name: "Espresso", description: "Bold and strong", color: "#8B4513" },
  { name: "Cappuccino", description: "Creamy and smooth", color: "#A0826D" },
  { name: "Latte", description: "Mild and comforting", color: "#C9A876" },
  { name: "Americano", description: "Classic and simple", color: "#9B7653" },
  { name: "Macchiato", description: "Marked with cream", color: "#8B6F47" },
  { name: "Mocha", description: "Chocolate & coffee", color: "#6F4E37" },
  { name: "Flat White", description: "Velvety & dense", color: "#A68B6E" },
  { name: "Cold Brew", description: "Smooth & refreshing", color: "#4A2C2A" },
];

const SpinWheel: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<CoffeeOption | null>(null);

  // Draw the wheel
  const drawWheel = (ctx: CanvasRenderingContext2D, radius: number) => {
    const sliceAngle = (2 * Math.PI) / COFFEE_OPTIONS.length;

    COFFEE_OPTIONS.forEach((option, index) => {
      const startAngle = sliceAngle * index;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(option.name, radius - 30, 5);
      ctx.restore();
    });
  };

  // Redraw wheel when component mounts or rotation changes
  const redrawWheel = (rot: number = rotation) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const radius = 150;
    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.translate(-150, -150);
    drawWheel(ctx, radius);
    ctx.restore();
  };

  // Initialize wheel on component mount
  useEffect(() => {
    redrawWheel(0);
  }, []);

  // Handle spin
  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + extraDegrees;
    const newRotation = (rotation + totalRotation) % 360;

    // Animate spin
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const animateSpin = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = rotation + totalRotation * easeOut;

      setRotation(currentRotation);
      redrawWheel(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        // Calculate which option was selected
        // The pointer is at 270 degrees (top in canvas coordinates)
        // Find which slice is at that position after rotation
        const sliceAngle = 360 / COFFEE_OPTIONS.length;
        const pointerAngle = 270; // Top of circle
        const normalizedRotation = (newRotation % 360 + 360) % 360;
        const selectedAngle = ((pointerAngle - normalizedRotation) % 360 + 360) % 360;
        const selectedIndex = Math.floor(selectedAngle / sliceAngle) % COFFEE_OPTIONS.length;
        setSelectedOption(COFFEE_OPTIONS[selectedIndex]);
      }
    };

    animateSpin();
  };

  return (
    <div className="coffee-spinner-container">
      <div className="spinner-wrapper">
        <div className="spinner-pointer"></div>
        <canvas
          ref={canvasRef}
          className="spinner-canvas"
          width={300}
          height={300}
        />
      </div>

      <button
        className="spin-button"
        onClick={() => {
          handleSpin();
        }}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>

      {selectedOption && (
        <div className={`result-display ${isSpinning ? "spinning" : ""}`}>
          <div className="result-label">You should order:</div>
          <div className="result-value">{selectedOption.name}</div>
          <div className="result-description">{selectedOption.description}</div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
