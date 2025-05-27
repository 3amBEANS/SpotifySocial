import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">Spotify Connect</Link>
      </div>

      <nav className="nav-links">
        <Link to="/profile">User Profile</Link>
        <Link to="/Forum">Forum</Link>
      </nav>
    </div>
  );
};

export default Header;
