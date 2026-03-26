import { FC } from "react";
import "./Header.css";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <div className="header">
      <div className="header-content">
        <p className="header-quote">
          if you have good thoughts they will shine out of your face like
          sunbeams and you will always look lovely - roald dahl
        </p>
        <div className="theme-toggle-wrapper">
          <span className="theme-icon left">☀️</span>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            data-state={isDarkMode ? "dark" : "light"}
          >
            <span className="toggle-track"></span>
            <span className="toggle-dot"></span>
          </button>
          <span className="theme-icon right">🌙</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
