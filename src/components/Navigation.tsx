import { FC } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import routes from "../routes";
import "./Navigation.css";

interface NavigationProps {
  isDarkMode?: boolean;
}

const Navigation: FC<NavigationProps> = () => {
  return (
    <Menu borderless className="navigation" style={{ marginBottom: "2rem" }}>
      <Menu.Item header>✨ Danni's Content ✨</Menu.Item>
      <Menu.Menu position="right">
        {routes.map((route) => (
          <Menu.Item key={route.path} as={Link} to={route.path}>
            {route.label}
          </Menu.Item>
        ))}
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
