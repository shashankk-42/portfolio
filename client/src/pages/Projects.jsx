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
                setProjects(response.data.projects);
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
                <h1 className="page-title">Featured <span className="highlight-text">Projects</span></h1>
                <p className="page-subtitle">Building innovative solutions across AI, security, and decentralized systems</p>
            </div>

            {/* Projects Grid */}
            <div className="projects-container">
                {projects.map((project) => (
                    <div key={project._id} className="project-card-simple">
                        <div className="project-image-placeholder">
                            🚀
                        </div>
                        <h3>{project.title}</h3>
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
