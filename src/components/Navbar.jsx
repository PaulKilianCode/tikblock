// Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/tikblock">TikBlock</Link></li>
        <li><Link to="/following">Following</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
