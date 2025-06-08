import { FaEnvelope, FaQuestionCircle, FaShieldAlt, FaFileContract, FaUser, FaGithub, FaLinkedin, FaCode, FaCoffee, FaReact, FaCss3Alt, FaRoute, FaIcons, FaNodeJs, FaDatabase, FaCloud, FaMicrophone, FaRobot, FaServer, FaGlobe } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const footerLinks = [
        { 
            icon: FaQuestionCircle, 
            label: "Help & Support", 
            path: "/help",
            description: "Get help and answers"
        },
        { 
            icon: FaShieldAlt, 
            label: "Privacy Policy", 
            path: "/privacy-policy",
            description: "How we protect your data"
        },
        { 
            icon: FaFileContract, 
            label: "Terms of Service", 
            path: "/terms",
            description: "Terms and conditions"
        },
        { 
            icon: FaEnvelope, 
            label: "Contact Us", 
            path: "/contact",
            description: "Get in touch with us"
        }
    ];

    return (
        <>
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Logo and Company Info */}
                <div className={styles.footerBrand}>
                    <h3 className={styles.brandName}>
                        Vox<span className={styles.brandSpan}>Ai</span>
                    </h3>
                    <p className={styles.brandDescription}>
                        Revolutionizing reading with AI-powered audio and smart summaries.
                    </p>
                </div>

                {/* Footer Links */}
                <div className={styles.footerLinks}>
                    {footerLinks.map((link, index) => (
                        <NavLink 
                            key={index}
                            to={link.path} 
                            className={styles.footerLink}
                        >
                            <div className={styles.linkIcon}>
                                <link.icon />
                            </div>
                            <div className={styles.linkContent}>
                                <span className={styles.linkLabel}>{link.label}</span>
                                <span className={styles.linkDescription}>{link.description}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>

                {/* Developer Section */}
                <div className={styles.developerSection}>
                    <div className={styles.developerActions}>
                        <button onClick={openModal} className={styles.developerAction}>
                            <FaCode className={styles.actionIcon} />
                            <div className={styles.actionContent}>
                                <span className={styles.actionLabel}>Meet the Developer</span>
                                <span className={styles.actionDescription}>Learn about the creator</span>
                            </div>
                        </button>
                        <a 
                            href="https://buymeacoffee.com/gokhankaraduman" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.developerAction}
                        >
                            <FaCoffee className={styles.actionIcon} />
                            <div className={styles.actionContent}>
                                <span className={styles.actionLabel}>Buy me a coffee</span>
                                <span className={styles.actionDescription}>Support development</span>
                            </div>
                        </a>
                        <a href="mailto:support@voxai.com" className={styles.developerAction}>
                            <FaEnvelope className={styles.actionIcon} />
                            <div className={styles.actionContent}>
                                <span className={styles.actionLabel}>Contact</span>
                                <span className={styles.actionDescription}>Get in touch</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={styles.footerBottom}>
                <p className={styles.copyright}>
                    © {currentYear} VoxAi. All rights reserved. Made with ❤️ for book lovers.
                </p>
            </div>
        </footer>

        {/* Developer Modal - Outside footer for full screen coverage */}
        {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.modalClose} onClick={closeModal}>
                        ✕
                    </button>
                    
                    <div className={styles.developerCard}>
                        <div className={styles.developerAvatar}>
                            <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face&auto=format&q=80" 
                                alt="Gökhan Karaduman" 
                                className={styles.avatarImage}
                            />
                        </div>
                        
                        <div className={styles.developerInfo}>
                            <h2 className={styles.developerName}>Gökhan Karaduman</h2>
                            <p className={styles.developerTitle}>Full Stack Developer</p>
                            <p className={styles.developerDescription}>
                                Passionate about creating innovative web applications and AI-powered solutions. 
                                Built VoxAi to revolutionize the reading experience with modern technologies.
                            </p>
                        </div>

                                                    <div className={styles.socialLinksModal}>
                                <a 
                                    href="https://linkedin.com/in/gokhankaraduman" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.socialLinkModal}
                                >
                                    <FaLinkedin className={styles.socialIcon} />
                                    <span className={styles.socialLabel}>LinkedIn</span>
                                </a>
                                <a 
                                    href="https://github.com/gokhankaraduman" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.socialLinkModal}
                                >
                                    <FaGithub className={styles.socialIcon} />
                                    <span className={styles.socialLabel}>GitHub</span>
                                </a>
                                <a 
                                    href="mailto:gokhan@voxai.com" 
                                    className={styles.socialLinkModal}
                                >
                                    <FaEnvelope className={styles.socialIcon} />
                                    <span className={styles.socialLabel}>Email</span>
                                </a>
                                <a 
                                    href="https://buymeacoffee.com/gokhankaraduman" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.socialLinkModal}
                                >
                                    <FaCoffee className={styles.socialIcon} />
                                    <span className={styles.socialLabel}>Buy me coffee</span>
                                </a>
                            </div>

                        <div className={styles.techStack}>
                            <h3 className={styles.techTitle}>Technologies Used</h3>
                            <div className={styles.techTags}>
                                <div className={styles.techTag}>
                                    <FaReact className={styles.techIcon} />
                                    <span className={styles.techLabel}>React.js</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaCss3Alt className={styles.techIcon} />
                                    <span className={styles.techLabel}>CSS Modules</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaRoute className={styles.techIcon} />
                                    <span className={styles.techLabel}>React Router</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaIcons className={styles.techIcon} />
                                    <span className={styles.techLabel}>React Icons</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaCode className={styles.techIcon} />
                                    <span className={styles.techLabel}>Framer Motion</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaNodeJs className={styles.techIcon} />
                                    <span className={styles.techLabel}>Node.js</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaDatabase className={styles.techIcon} />
                                    <span className={styles.techLabel}>MongoDB</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaCloud className={styles.techIcon} />
                                    <span className={styles.techLabel}>Cloudinary</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaMicrophone className={styles.techIcon} />
                                    <span className={styles.techLabel}>Web Speech API</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaRobot className={styles.techIcon} />
                                    <span className={styles.techLabel}>OpenAI API</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaServer className={styles.techIcon} />
                                    <span className={styles.techLabel}>Render</span>
                                </div>
                                <div className={styles.techTag}>
                                    <FaGlobe className={styles.techIcon} />
                                    <span className={styles.techLabel}>Vercel</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default Footer; 