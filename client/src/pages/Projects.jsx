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
                        <div className="project-image-placeholder"></div>
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
