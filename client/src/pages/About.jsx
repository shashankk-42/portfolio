import { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
    const [about, setAbout] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutRes, experiencesRes] = await Promise.all([
                    axios.get('/api/about'),
                    axios.get('/api/experiences')
                ]);

                setAbout(aboutRes.data.about);
                setExperiences(experiencesRes.data.experiences);
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
        <div className="about-page">
            {/* Hero */}
            <div className="page-hero">
                <h1 className="page-title">About <span className="highlight-text">Me</span></h1>
                <p className="page-subtitle">{about?.title}</p>
            </div>

            {/* Bio Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <h2>Who I Am</h2>
                        <p className="bio-text">{about?.bio}</p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="about-section alt-bg">
                <div className="container">
                    <h2>Technical <span className="highlight-text" style={{ display: 'inline', fontSize: 'inherit' }}>Skills</span></h2>
                    <div className="skills-grid">
                        {about?.skills?.map((skill, idx) => (
                            <div key={idx} className="skill-badge">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="about-section">
                <div className="container">
                    <h2>Experience</h2>
                    <div className="experience-timeline">
                        {experiences.map((exp) => (
                            <div key={exp._id} className="experience-item">
                                <div className="experience-header">
                                    <h3>{exp.role}</h3>
                                    {exp.current && <span className="current-badge">Current</span>}
                                </div>
                                <p className="experience-org">{exp.organization}</p>
                                <p className="experience-duration">{exp.duration}</p>
                                <p className="experience-description">{exp.description}</p>
                                {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className="experience-achievements">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="about-section alt-bg">
                <div className="container">
                    <h2>Education</h2>
                    <div className="education-card">
                        <h3>Vellore Institute of Technology (VIT)</h3>
                        <p className="education-degree">Bachelor of Technology</p>
                        <p className="education-year">Currently Sophomore • 2023 - 2027</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
