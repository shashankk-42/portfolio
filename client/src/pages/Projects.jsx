import { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data.projects);
                setFilteredProjects(response.data.projects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.semester === filter));
        }
    }, [filter, projects]);

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <div className="projects-page">
            {/* Hero Section */}
            <div className="page-hero">
                <h1 className="page-title">My <span className="highlight-text">Projects</span></h1>
                <p className="page-subtitle">Complex, industry-ready builds showcasing innovation and technical depth</p>
            </div>

            {/* Filter Buttons */}
            <div className="filter-section">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Projects
                </button>
                <button
                    className={`filter-btn ${filter === 'sem1' ? 'active' : ''}`}
                    onClick={() => setFilter('sem1')}
                >
                    Semester 1
                </button>
                <button
                    className={`filter-btn ${filter === 'sem2' ? 'active' : ''}`}
                    onClick={() => setFilter('sem2')}
                >
                    Semester 2
                </button>
                <button
                    className={`filter-btn ${filter === 'sem3' ? 'active' : ''}`}
                    onClick={() => setFilter('sem3')}
                >
                    Semester 3
                </button>
                <button
                    className={`filter-btn ${filter === 'extra' ? 'active' : ''}`}
                    onClick={() => setFilter('extra')}
                >
                    Extra
                </button>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
                {filteredProjects.map((project) => (
                    <div key={project._id} className="project-card-large">
                        {project.images && project.images.length > 0 && (
                            <div className="project-image">
                                <img src={project.images[0]} alt={project.title} />
                            </div>
                        )}
                        <div className="project-content">
                            <div className="project-header">
                                <h2>{project.title}</h2>
                                <span className="project-semester">{project.semester}</span>
                            </div>
                            <p className="project-domain">{project.domain}</p>
                            <p className="project-description">{project.description}</p>

                            {project.features && project.features.length > 0 && (
                                <div className="project-features">
                                    <h4>Key Features:</h4>
                                    <ul>
                                        {project.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="tech-stack-large">
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className="tech-badge-large">{tech}</span>
                                ))}
                            </div>

                            {(project.github || project.demo) && (
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                            GitHub →
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                                            Live Demo →
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="no-projects">
                    <p>No projects found for this filter.</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
