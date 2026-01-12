import { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [about, setAbout] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await axios.get('/api/about');
                setAbout(response.data.about);
            } catch (error) {
                console.error('Error fetching about:', error);
            }
        };
        fetchAbout();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate sending (you can add actual email API later)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1000);
    };

    return (
        <div className="contact-page">
            {/* Hero */}
            <div className="page-hero">
                <h1 className="page-title">Get In <span className="highlight-text">Touch</span></h1>
                <p className="page-subtitle">Let's build something amazing together</p>
            </div>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2>Let's Connect</h2>
                            <p className="contact-intro">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="contact-icon">📧</div>
                                    <div>
                                        <h4>Email</h4>
                                        <a href={`mailto:${about?.email}`}>{about?.email}</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="contact-icon">💼</div>
                                    <div>
                                        <h4>LinkedIn</h4>
                                        <a href={about?.linkedin} target="_blank" rel="noopener noreferrer">
                                            Connect with me
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="contact-icon">💻</div>
                                    <div>
                                        <h4>GitHub</h4>
                                        <a href={about?.github} target="_blank" rel="noopener noreferrer">
                                            Check out my code
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="availability">
                                <h4>Availability</h4>
                                <p>Open to freelance projects and internship opportunities</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-container">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h3>Send a Message</h3>

                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>

                                {status === 'success' && (
                                    <div className="success-message">
                                        ✓ Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
