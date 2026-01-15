import { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                // Sort projects: industry projects first, then by order
                const sortedProjects = response.data.projects.sort((a, b) => {
                    // Industry projects come first
                    if (a.isIndustry && !b.isIndustry) return -1;
                    if (!a.isIndustry && b.isIndustry) return 1;
                    // Within same category, sort by order
                    return a.order - b.order;
                });
                setProjects(sortedProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <div className="projects-page">
            {/* Hero Section */}
            <div className="page-hero">
                <h1 className="page-title">All <span className="highlight-text">Projects</span></h1>
                <p className="page-subtitle">Building innovative solutions across AI, security, cloud infrastructure, and social impact</p>
            </div>

            {/* Projects Grid */}
            <div className="projects-container">
                {projects.map((project) => (
                    <div key={project._id} className="project-card-simple">
                        <div className="project-image-placeholder">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                    aria-label="View on GitHub"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                        {project.isIndustry && project.organization && (
                            <div style={{ padding: '1.25rem 2rem 0 2rem' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1rem',
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                    color: 'white',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase'
                                }}>
                                    {project.organization}
                                </span>
                            </div>
                        )}
                        <h3>
                            {project.title}
                            {project.ongoing && (
                                <span style={{
                                    marginLeft: '0.75rem',
                                    padding: '0.25rem 0.6rem',
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase',
                                    verticalAlign: 'middle'
                                }}>
                                    Ongoing
                                </span>
                            )}
                        </h3>
                        <p className="project-description">{project.description}</p>
                        <div className="tech-stack-simple">
                            {project.techStack.map((tech, idx) => (
                                <span key={idx} className="tech-badge-simple">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="no-projects">
                    <p>No projects available.</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
