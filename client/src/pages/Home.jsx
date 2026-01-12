import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, achievementsRes] = await Promise.all([
                    axios.get('/api/projects'),
                    axios.get('/api/achievements')
                ]);

                // Get only featured projects
                const featuredProjects = projectsRes.data.projects.filter(p => p.featured).slice(0, 3);
                setProjects(featuredProjects);
                setAchievements(achievementsRes.data.achievements);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home-page">
            {/* Hero Section */}
            <header className="hero-section">
                <h1 className="hero-heading">
                    Hi, I'm <span className="highlight-text">Shashank Kakad</span>
                </h1>
                <p className="hero-paragraph">
                    Sophomore at VIT | Software Development Engineer | Cybersecurity Enthusiast
                    <br />
                    Building innovative solutions that solve real-world problems
                </p>

                {/* Quick Stats */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">{projects.length}+</div>
                        <div className="stat-label">Projects</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">2</div>
                        <div className="stat-label">Publications</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">1</div>
                        <div className="stat-label">Patent</div>
                    </div>
                </div>

                {/* Hero Buttons */}
                <div className="hero-buttons">
                    <Link to="/projects" className="btn-hero-primary">🚀 View Projects</Link>
                    <Link to="/contact" className="btn-hero-secondary">📧 Contact Me</Link>
                </div>
            </header>

            {/* Featured Projects Section */}
            <section className="taskforge-section" id="featured-projects">
                <div className="container">
                    <h2>Featured <span className="highlight-text" style={{ display: 'inline', fontSize: 'inherit' }}>Projects</span></h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.2rem' }}>
                        Complex, industry-ready builds showcasing innovation and technical depth
                    </p>
                    <div className="taskforge-boxes">
                        {projects.map((project) => (
                            <div key={project._id} className="taskforge-box project-card">
                                <h3>{project.title}</h3>
                                <p className="project-domain">{project.domain}</p>
                                <p>{project.description}</p>
                                <div className="tech-stack">
                                    {project.techStack.slice(0, 4).map((tech, idx) => (
                                        <span key={idx} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                                <Link to={`/projects`} className="project-link">View Details →</Link>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/projects" className="btn-hero-secondary">View All Projects</Link>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="taskforge-section alt-bg" id="achievements">
                <div className="container">
                    <h2>Achievements & <span className="highlight-text" style={{ display: 'inline', fontSize: 'inherit' }}>Recognition</span></h2>
                    <div className="taskforge-boxes">
                        {achievements.map((achievement) => (
                            <div key={achievement._id} className="taskforge-box achievement-card">
                                <div className="achievement-type">{achievement.type.toUpperCase()}</div>
                                <h3>{achievement.title}</h3>
                                <p>{achievement.description}</p>
                                {achievement.date && (
                                    <p className="achievement-date">
                                        {new Date(achievement.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="taskforge-section" id="experience">
                <div className="container">
                    <h2>Experience</h2>
                    <div className="taskforge-boxes">
                        <div className="taskforge-box">
                            <h3>Head of Sponsorship</h3>
                            <p className="experience-org">GeeksForGeeks VIT</p>
                            <p className="experience-duration">Aug 2024 - Present</p>
                            <ul className="experience-achievements">
                                <li>Promoted from Member to Head of Sponsorship</li>
                                <li>Led 2 major events with sponsors from Unstop and CodeChef</li>
                                <li>Managed sponsorship outreach and partnerships</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
