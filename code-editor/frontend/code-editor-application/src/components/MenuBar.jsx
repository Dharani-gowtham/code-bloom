import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <div className="logo">
        <Link to="/" className="logo-link">
          bloom
        </Link>
      </div>
      <div className="menu-items">
        <Link to="/">Home</Link>
        <Link to="/editor">Editor</Link>
        <Link to="/course">Courses</Link>
        <Link to="/test">Test</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
      <div className="profile">
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default MenuBar;
