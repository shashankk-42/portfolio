import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="/projects" className="footer-link">Projects</a></li>
                            <li><a href="/Shashank-Kakad-Resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="https://github.com/shashankk-42" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/shashank-kakad/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
                            <li><a href="mailto:shashankkakad10@gmail.com" className="footer-link">shashankkakad10@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Achievements</h4>
                        <ul>
                            <li className="footer-link">2 Publications</li>
                            <li className="footer-link">1 Patent</li>
                            <li className="footer-link">6 Projects</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {currentYear} Shashank Kakad. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
