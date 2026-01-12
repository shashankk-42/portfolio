import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-brand-clickable">
                    <span className="navbar-brand-text">Shashank Kakad</span>
                </Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link
                        to="/"
                        style={isActive('/') ? { color: 'var(--accent-color)', fontWeight: '700' } : {}}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/projects"
                        style={isActive('/projects') ? { color: 'var(--accent-color)', fontWeight: '700' } : {}}
                    >
                        Projects
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        style={isActive('/about') ? { color: 'var(--accent-color)', fontWeight: '700' } : {}}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        style={isActive('/contact') ? { color: 'var(--accent-color)', fontWeight: '700' } : {}}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
