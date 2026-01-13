require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Achievement = require('./models/Achievement');
const Experience = require('./models/Experience');
const About = require('./models/About');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ MongoDB Connected');
    } catch (error) {
        console.error('✗ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await Project.deleteMany({});
        await Achievement.deleteMany({});
        await Experience.deleteMany({});
        await About.deleteMany({});

        console.log('🗑️  Cleared existing data');

        // Seed About
        const about = new About({
            name: 'Shashank Kakad',
            title: 'Sophomore at VIT | SDE | Cybersecurity Enthusiast',
            bio: 'Passionate software developer and cybersecurity enthusiast currently pursuing my degree at VIT. I love building innovative solutions that solve real-world problems, from AI-powered assistive technology to decentralized computing platforms.',
            email: 'shashankkakad10@gmail.com',
            phone: '+91 9503291648',
            github: 'https://github.com/shashankk-42',
            linkedin: 'https://www.linkedin.com/in/shashank-kakad/',
            photo: '/photo.jpg',
            skills: [
                'Python', 'C++', 'JavaScript',
                'HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'Flutter',
                'Git', 'GitHub', 'Docker',
                'SQLite', 'Cisco Packet Tracer', 'Google Cloud Platform'
            ],
            education: [
                {
                    institution: 'Vishwakarma Institute of Technology, Pune',
                    degree: 'B-Tech in Computer Science and Engineering (Data Science)',
                    duration: '2024 - Present',
                    location: 'Pune, India'
                },
                {
                    institution: 'Suryadatta Public School, Pune',
                    degree: 'Higher Secondary Certificate (HSC) – 12th Grade',
                    duration: '2022 - 2024',
                    location: 'Pune, India'
                },
                {
                    institution: 'New India School, Pune',
                    degree: 'Secondary School Certificate (SSC) – 10th Grade',
                    duration: '2020 - 2022',
                    location: 'Pune, India'
                }
            ],
            certifications: [
                {
                    name: 'Cyber Job Simulation',
                    issuer: 'Deloitte'
                },
                {
                    name: 'Advanced Excel',
                    issuer: 'SevenMentor Pvt Ltd'
                }
            ]
        });
        await about.save();

        // Seed Projects
        const projects = [
            {
                title: 'DDoS Detection & Visualization System',
                description: 'Real-time anomaly detection system for monitoring and visualizing DDoS attacks',
                longDescription: 'A real-time anomaly detection system built to monitor and visualize unusually high traffic loads that resemble small-scale Distributed Denial of Service (DDoS) attacks. Every inbound request is funneled through a C++ Crow-based proxy server, which acts as a middleware layer between the client and the hosted target website.',
                images: [
                    'https://images.ctfassets.net/6yom6slo28h2/1lX9MfashJOUazq97LGQwe/1f680ada1255dca2f68ea8f6bfe9efb9/ddos-defense-main.png'
                ],
                techStack: ['C++', 'Crow Framework', 'Google Cloud Run', 'JavaScript', 'PHP'],
                domain: 'Network Security / Anomaly Detection',
                features: [
                    'Full HTTP proxy pipeline using Crow',
                    'Logs request metadata (IP, timestamp, rate)',
                    'Real-time RPS graph visualization',
                    'Small-scale DDoS simulation',
                    'Cloud-based deployment'
                ],
                semester: 'sem1',
                featured: true,
                order: 1
            },
            {
                title: 'Sono Lumos Smart Cane',
                description: 'AI-powered mobility assistant for visually impaired users',
                longDescription: 'A cost-effective, AI-powered mobility assistant designed to support visually impaired users with environmental awareness, obstacle detection, and emergency support. It integrates computer vision, OCR, audio feedback, haptics, and IoT-powered GPS connectivity into a lightweight smart cane.',
                images: [
                    'https://assets.tina.io/c663584b-949a-433f-90e2-2216d1acfce1/Untitled-2.png'
                ],
                techStack: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'EasyOCR', 'FastAPI', 'Flutter', 'Raspberry Pi', 'Arduino'],
                domain: 'Assistive Technology / Embedded AI',
                features: [
                    'Object detection using YOLOv8 segmentation',
                    'Text-to-speech with OCR (EasyOCR)',
                    'Haptic feedback for proximity alerts',
                    'GPS-based emergency system',
                    'Flutter companion app'
                ],
                semester: 'extra',
                featured: true,
                order: 2
            },
            {
                title: 'EduSense+',
                description: 'Intelligent classroom assistant for real-time student engagement analysis',
                longDescription: 'EduSense+ is an intelligent classroom assistant engineered to identify student confusion, disengagement, and attention levels through real-time emotion recognition. The project emphasizes privacy by processing everything on the student side.',
                images: [
                    'https://echo360.com/wp-content/uploads/2015/04/02ba_analytics_oneClass_captureTimeHover_withConfusedContent_1.jpg'
                ],
                techStack: ['Python', 'Custom CNN', 'OpenCV', 'FER Models'],
                domain: 'EdTech / Computer Vision',
                features: [
                    'Live facial emotion detection',
                    'Detects confusion, neutral, happy, focused states',
                    'Post-session engagement dashboards',
                    'Privacy-first design (no cloud upload)',
                    'Supports online and hybrid classes'
                ],
                semester: 'sem2',
                featured: true,
                order: 3
            },
            {
                title: 'TaskForge',
                description: 'Decentralized system for secure and efficient distributed compute-sharing',
                longDescription: 'TaskForge is a modular, collaborative productivity platform designed for teams, students, and project groups. It serves as an all-in-one environment for task tracking, progress visualization, role-based workflows, and GPU marketplace integration.',
                images: [
                    'https://cdn.dribbble.com/userupload/43760634/file/original-139d21443a908931a1fe52a8e0678d25.jpg'
                ],
                techStack: ['MERN Stack', 'Node.js', 'Express', 'MongoDB', 'React'],
                domain: 'Productivity / Collaboration Tools',
                features: [
                    'Project dashboards',
                    'Kanban-style task boards',
                    'Team roles and permissions',
                    'Real-time collaboration',
                    'GPU marketplace integration'
                ],
                semester: 'sem3',
                featured: true,
                order: 4
            },
            {
                title: 'Smart Tourist Safety System',
                description: 'Safety-focused platform for tourists with real-time alerts and route indicators',
                longDescription: 'A smart safety-focused platform created for tourists visiting unfamiliar locations. The system offers real-time alerts, route safety indicators, and rapid emergency communication with authorities.',
                images: [
                    'https://play-lh.googleusercontent.com/ZsjoPmmWG4WOHXHTukvwzWdG1GypSi5YDV1PNrd17hh6yWn6t4BYKFt7qps7VOqQj4o'
                ],
                techStack: ['Android', 'Kotlin/Flutter', 'GPS', 'Maps API'],
                domain: 'SafetyTech / Smart City Solutions',
                features: [
                    'Panic button with GPS transmission',
                    'Safe/unsafe zone mapping',
                    'Recent incident heatmap',
                    'Location-based emergency contacts',
                    'Tourist-friendly UI'
                ],
                semester: 'sih',
                featured: false,
                order: 5
            },
            {
                title: 'The Indian Insite',
                description: 'Content-driven platform showcasing diverse aspects of India',
                longDescription: 'A content-driven platform that showcases diverse aspects of India — culture, travel, food, traditions, modern lifestyle, and hidden local insights. Aimed at both domestic readers and global audiences.',
                images: [
                    'https://blogger.googleusercontent.com/img/a/AVvXsEhLdB1HlXImKuz6JqOL-srrISCH7hPFuhch3x_jMuofdkgYpug-H5sA15l7pe4e0nhtoQBSlEPJOYYZr96IpHGTdZd7SUFozmkkucRyOPAqSIAVH1WbsUi4tXhKYBPO9XQcQCo0j7C9RlaQGUjkHAzKkGupj51IBvVYUk4H8IC8drrgB1MXVSBpSBIe%3Ds16000'
                ],
                techStack: ['HTML', 'CSS', 'JavaScript', 'Hugo/Jekyll/Next.js'],
                domain: 'Content / Culture / Media',
                features: [
                    'Long-form articles',
                    'State-wise travel guides',
                    'Cultural explainers',
                    'Region-wise food discoveries',
                    'Interview-based stories'
                ],
                semester: 'extra',
                featured: false,
                order: 6
            }
        ];

        await Project.insertMany(projects);
        console.log('✓ Seeded 6 projects');

        // Seed Achievements
        const achievements = [
            {
                type: 'publication',
                title: 'Detecting DDoS Attacks in Real-Time with Minimal Infrastructure A Node.js Approach',
                description: 'Research paper on real-time DDoS detection using lightweight infrastructure',
                date: new Date('2024-01-15'),
                metadata: {
                    authors: ['Shashank Kakad'],
                    conference: 'Network Security Conference 2024'
                },
                order: 1
            },
            {
                type: 'publication',
                title: 'Smart Cane for Visually Impaired Persons using Computer Vision',
                description: 'Research paper on AI-powered assistive technology for visually impaired individuals',
                date: new Date('2024-03-20'),
                metadata: {
                    authors: ['Shashank Kakad'],
                    conference: 'Assistive Technology Symposium 2024'
                },
                order: 2
            },
            {
                type: 'patent',
                title: 'Decentralized System for Secure and Efficient Distributed Compute-Sharing',
                description: 'Patent for TaskForge - distributed computing platform',
                date: new Date('2025-11-14'),
                image: '/uploads/patent.png',
                metadata: {
                    applicationNumber: '202521099930 A',
                    filingDate: '16/10/2025',
                    publicationDate: '14/11/2025',
                    inventors: ['Jashwini Nandkar', 'Sayali Prakash Shinde', 'Deepa Abin', 'Shashank Kakad', 'Nubaid Mursal', 'Anshul Nagpure', 'Radha Kulkarni']
                },
                order: 3
            }
        ];

        await Achievement.insertMany(achievements);
        console.log('✓ Seeded 3 achievements');

        // Seed Experience
        const experiences = [
            {
                organization: 'GeeksForGeeks VIT',
                role: 'Head of Sponsorship',
                duration: 'Aug 2024 - Present',
                description: 'Leading sponsorship initiatives and organizing major technical events',
                achievements: [
                    'Promoted from Member to Head of Sponsorship',
                    'Brought in CodeChef and HackerRank as sponsors for technical events',
                    'Led sponsorship initiatives by negotiating and finalizing corporate partnerships',
                    'Coordinated with technical teams for event execution'
                ],
                current: true,
                order: 1
            },
            {
                organization: 'GeeksForGeeks VIT',
                role: 'Member',
                duration: 'Aug 2023 - Aug 2024',
                description: 'Active member contributing to technical events and workshops',
                achievements: [
                    'Participated in organizing coding competitions',
                    'Assisted in workshop coordination',
                    'Contributed to community building initiatives'
                ],
                current: false,
                order: 2
            }
        ];

        await Experience.insertMany(experiences);
        console.log('✓ Seeded 2 experiences');

        console.log('\n✅ Database seeded successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

connectDB().then(seedData);
