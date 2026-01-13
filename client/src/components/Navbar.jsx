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
                    <a
                        href="/Shashank-Kakad-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#FFFFFF' }}
                    >
                        Resume
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
