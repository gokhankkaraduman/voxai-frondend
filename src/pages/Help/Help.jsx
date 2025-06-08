import { 
    FaVolumeUp, 
    FaRobot, 
    FaUsers, 
    FaQuestionCircle, 
    FaShieldAlt,
    FaBookOpen,
    FaComment,
    FaCog,
    FaExclamationTriangle,
    FaEnvelope,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Help.module.css';

function Help() {
    const [openFaq, setOpenFaq] = useState(null);

    const helpCategories = [
        {
            icon: FaVolumeUp,
            title: "Audio Reading Help",
            subtitle: "Issues with audio playback and voice settings",
            questions: [
                { q: "How do I start listening to a book?", a: "Click on any book and press the play button. Make sure your device volume is turned up and your browser allows audio." },
                { q: "Audio is not working, what should I do?", a: "Check your browser permissions for audio, refresh the page, ensure your internet connection is stable, and try a different browser if needed." },
                { q: "How can I change voice speed?", a: "Use the speed control buttons (0.5x, 1x, 1.5x, 2x) in the audio player controls at the bottom of the screen." },
                { q: "Can I download audio for offline listening?", a: "Currently, offline mode is not available. You need an active internet connection to stream audio content." }
            ]
        },
        {
            icon: FaRobot,
            title: "AI Summaries Help",
            subtitle: "Getting and understanding AI-generated summaries",
            questions: [
                { q: "How do I get a summary of a book?", a: "Click on any book and select 'Generate Summary'. The AI will create a comprehensive summary in 30-60 seconds depending on book length." },
                { q: "Why is my summary taking too long?", a: "Large books may take up to 2 minutes to summarize. If it takes longer, refresh the page and try again. Check your internet connection." },
                { q: "Can I customize summary length?", a: "Yes, you can choose between Short (1 paragraph), Medium (3 paragraphs), or Detailed (full chapter breakdown) in the summary options." },
                { q: "Are AI summaries accurate?", a: "Our AI provides high accuracy, but always cross-reference important details with the original text for critical information." }
            ]
        },
        {
            icon: FaUsers,
            title: "Community & Social",
            subtitle: "Using community features and connecting with others",
            questions: [
                { q: "How do I join the community?", a: "Create an account and you're automatically part of our reading community. Complete your profile and start following other readers!" },
                { q: "How can I write a book review?", a: "Go to any book page and click 'Write Review'. Share your thoughts and rate the book from 1-5 stars. Reviews help other readers discover great books." },
                { q: "Can I message other readers privately?", a: "Yes! Click on any user's profile and select 'Send Message' to start a private conversation about books and reading." },
                { q: "How do I report inappropriate content?", a: "Use the flag icon next to any post or message to report it. Our moderation team reviews all reports within 24 hours." }
            ]
        },
        {
            icon: FaShieldAlt,
            title: "Account & Settings",
            subtitle: "Managing your account, privacy, and preferences",
            questions: [
                { q: "How do I change my password?", a: "Go to your profile menu > Settings > Account > Change Password. You'll need to enter your current password for security." },
                { q: "Can I delete my account?", a: "Yes, go to Settings > Account > Delete Account. Warning: This action cannot be undone and all your data will be permanently removed." },
                { q: "How do I update my privacy settings?", a: "Visit your profile menu > Settings > Privacy to control who can see your activity, send messages, and view your profile information." },
                { q: "Why can't I access some features?", a: "Some features require email verification. Check your inbox for verification emails, or request a new one in Settings > Account." }
            ]
        }
    ];

    const quickActions = [
        { icon: FaEnvelope, title: "Contact Support", description: "Get help from our team", action: "mailto:support@voxai.com" },
        { icon: FaComment, title: "Live Chat", description: "Chat with us now", action: "/chat" },
        { icon: FaBookOpen, title: "User Guide", description: "Step-by-step tutorials", action: "/guide" },
        { icon: FaCog, title: "Settings", description: "Manage your account", action: "/settings" }
    ];

    const troubleshooting = [
        {
            problem: "Audio won't play",
            solutions: [
                "Check your device volume and browser audio permissions",
                "Refresh the page and try again",
                "Try a different browser (Chrome, Firefox, Safari)",
                "Clear your browser cache and cookies",
                "Check your internet connection stability"
            ]
        },
        {
            problem: "Summaries not generating",
            solutions: [
                "Wait a few minutes and try again (server may be busy)",
                "Try with a different book to test the feature",
                "Refresh the page and retry",
                "Check if the book is supported (some formats may not work)",
                "Contact support if the issue persists"
            ]
        },
        {
            problem: "Can't log in to my account",
            solutions: [
                "Check your email and password are correct",
                "Try resetting your password",
                "Clear browser cookies and cache",
                "Make sure your email is verified",
                "Contact support if you're still locked out"
            ]
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className={styles.helpContainer}>
            {/* Hero Section */}
            <motion.section 
                className={styles.heroSection}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className={styles.heroContent}>
                    <motion.h1 
                        className={styles.heroTitle}
                        variants={itemVariants}
                    >
                        <motion.span 
                            className={styles.heroIcon}
                            variants={itemVariants}
                        >
                            <FaQuestionCircle />
                        </motion.span>
                        Help & Support
                    </motion.h1>
                    <motion.p 
                        className={styles.heroSubtitle}
                        variants={itemVariants}
                    >
                        Get help with VoxAi features, troubleshoot issues, and find answers to common questions.
                    </motion.p>
                </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section 
                className={styles.quickActionsSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className={styles.quickActionsGrid}>
                    {quickActions.map((action, index) => (
                        <motion.a 
                            key={index} 
                            href={action.action}
                            className={styles.quickActionCard}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={styles.quickActionIcon}>
                                <action.icon />
                            </div>
                            <h3 className={styles.quickActionTitle}>{action.title}</h3>
                            <p className={styles.quickActionDescription}>{action.description}</p>
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            {/* Help Categories */}
            <motion.section 
                className={styles.categoriesSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div className={styles.sectionHeader} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>
                        <FaQuestionCircle className={styles.sectionIcon} />
                        Common Questions
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Find answers to frequently asked questions about VoxAi features
                    </p>
                </motion.div>
                
                <div className={styles.categoriesGrid}>
                    {helpCategories.map((category, index) => (
                        <motion.div 
                            key={index} 
                            className={styles.categoryCard}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={styles.categoryHeader}>
                                <div className={styles.categoryIcon}>
                                    <category.icon />
                                </div>
                                <div className={styles.categoryInfo}>
                                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                                    <p className={styles.categorySubtitle}>{category.subtitle}</p>
                                </div>
                            </div>
                            <div className={styles.categoryQuestions}>
                                {category.questions.map((qa, qaIndex) => (
                                    <div key={qaIndex} className={styles.questionItem}>
                                        <button 
                                            className={styles.questionButton}
                                            onClick={() => toggleFaq(`${index}-${qaIndex}`)}
                                        >
                                            <span>{qa.q}</span>
                                            {openFaq === `${index}-${qaIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                        {openFaq === `${index}-${qaIndex}` && (
                                            <motion.div 
                                                className={styles.questionAnswer}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                {qa.a}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Troubleshooting */}
            <motion.section 
                className={styles.troubleshootingSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.div className={styles.sectionHeader} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>
                        <FaExclamationTriangle className={styles.sectionIcon} />
                        Troubleshooting Guide
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Step-by-step solutions for common issues
                    </p>
                </motion.div>
                
                <div className={styles.troubleshootingGrid}>
                    {troubleshooting.map((issue, index) => (
                        <motion.div 
                            key={index} 
                            className={styles.troubleshootingCard}
                            variants={itemVariants}
                        >
                            <h3 className={styles.troubleshootingTitle}>{issue.problem}</h3>
                            <ul className={styles.solutionsList}>
                                {issue.solutions.map((solution, sIndex) => (
                                    <li key={sIndex} className={styles.solutionItem}>
                                        <span className={styles.stepNumber}>{sIndex + 1}</span>
                                        {solution}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Contact Support */}
            <motion.section 
                className={styles.contactSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
            >
                <div className={styles.contactContent}>
                    <motion.h2 className={styles.contactTitle} variants={itemVariants}>
                        Still Need Help?
                    </motion.h2>
                    <motion.p className={styles.contactSubtitle} variants={itemVariants}>
                        Our support team is here to help you with any questions or issues you may have.
                    </motion.p>
                    <motion.div className={styles.contactActions} variants={containerVariants}>
                        <motion.a 
                            href="mailto:support@voxai.com"
                            className={styles.contactPrimary}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaEnvelope />
                            Email Support
                        </motion.a>
                        <motion.a 
                            href="/chat"
                            className={styles.contactSecondary}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaComment />
                            Live Chat
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}

export default Help; 