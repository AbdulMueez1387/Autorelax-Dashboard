import { FaBell } from 'react-icons/fa'; 
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="AutoRelax" />
      </div>
      <div className="nav-right">
        <span className="bell-icon">
          <FaBell />
        </span>
        <div className="user-profile">
          <img src="/user.png" alt="user" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;