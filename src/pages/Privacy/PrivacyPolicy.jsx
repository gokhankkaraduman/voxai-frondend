import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaUserShield, 
  FaLock, 
  FaEye, 
  FaDatabase, 
  FaCookie,
  FaEnvelope,
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGlobe
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

    return (
    <motion.div 
      className={styles.privacyContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section className={styles.heroSection} variants={itemVariants}>
        <div className={styles.heroContent}>
          <motion.h1 className={styles.heroTitle} variants={itemVariants}>
            <motion.span className={styles.heroIcon} variants={itemVariants}>
              <FaShieldAlt />
            </motion.span>
            Privacy Policy for <span className={styles.brandName}>VoxAi</span>
          </motion.h1>
          <motion.p className={styles.heroSubtitle} variants={itemVariants}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </motion.p>

        </div>
      </motion.section>

      {/* Data Collection */}
      <motion.section className={styles.dataSection} variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <motion.h2 className={styles.sectionTitle} variants={slideInLeft}>
            <FaDatabase className={styles.sectionIcon} />
            Data We Collect
          </motion.h2>
        </div>
        
        <div className={styles.dataGrid}>
          <motion.div className={styles.dataCard} variants={slideInLeft} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <div className={styles.dataHeader}>
              <FaUserShield className={styles.dataIcon} />
              <div className={styles.dataHeaderText}>
                <h3 className={styles.dataTitle}>Account Information</h3>
                <p className={styles.dataDescription}>Basic details for your account</p>
              </div>
            </div>
            <div className={styles.dataBody}>
              <ul className={styles.dataList}>
                <li>Email address and username</li>
                <li>Profile preferences</li>
                <li>Reading history and bookmarks</li>
                <li>Community interactions</li>
                    </ul>
            </div>
          </motion.div>

          <motion.div className={styles.dataCard} variants={slideInRight} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <div className={styles.dataHeader}>
              <FaEye className={styles.dataIcon} />
              <div className={styles.dataHeaderText}>
                <h3 className={styles.dataTitle}>Usage Data</h3>
                <p className={styles.dataDescription}>How you interact with VoxAi</p>
              </div>
            </div>
            <div className={styles.dataBody}>
              <ul className={styles.dataList}>
                <li>Reading patterns and preferences</li>
                <li>Audio playback settings</li>
                <li>Search queries and filters</li>
                <li>Device and browser information</li>
                    </ul>
            </div>
          </motion.div>

          <motion.div className={styles.dataCard} variants={slideInLeft} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <div className={styles.dataHeader}>
              <FaCookie className={styles.dataIcon} />
              <div className={styles.dataHeaderText}>
                <h3 className={styles.dataTitle}>Technical Data</h3>
                <p className={styles.dataDescription}>Information for app functionality</p>
              </div>
            </div>
            <div className={styles.dataBody}>
              <ul className={styles.dataList}>
                <li>Cookies and local storage</li>
                <li>IP address and location</li>
                <li>Session data</li>
                <li>Performance analytics</li>
                    </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How We Use Data */}
      <motion.section className={styles.usageSection} variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <motion.h2 className={styles.sectionTitle} variants={slideInRight}>
            <FaGlobe className={styles.sectionIcon} />
            How We Use Your Data
          </motion.h2>
        </div>
        
        <div className={styles.usageGrid}>
          <motion.div className={styles.usageItem} variants={itemVariants} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaCheckCircle className={styles.usageIcon} />
            <h3>Personalized Experience</h3>
            <p>Customize content recommendations and reading preferences</p>
          </motion.div>
          <motion.div className={styles.usageItem} variants={itemVariants} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaCheckCircle className={styles.usageIcon} />
            <h3>Service Improvement</h3>
            <p>Enhance app performance and develop new features</p>
          </motion.div>
          <motion.div className={styles.usageItem} variants={itemVariants} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaCheckCircle className={styles.usageIcon} />
            <h3>Communication</h3>
            <p>Send important updates and respond to your inquiries</p>
          </motion.div>
          <motion.div className={styles.usageItem} variants={itemVariants} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaCheckCircle className={styles.usageIcon} />
            <h3>Security</h3>
            <p>Protect your account and prevent unauthorized access</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Your Rights */}
      <motion.section className={styles.rightsSection} variants={itemVariants}>
        <div className={styles.sectionHeader}>
          <motion.h2 className={styles.sectionTitle} variants={slideInLeft}>
            <MdSecurity className={styles.sectionIcon} />
            Your Privacy Rights
          </motion.h2>
        </div>
        
        <div className={styles.rightsGrid}>
          <motion.div className={styles.rightCard} variants={slideInLeft} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaEye className={styles.rightIcon} />
            <h3>Access</h3>
            <p>View all data we have about you</p>
          </motion.div>
          <motion.div className={styles.rightCard} variants={slideInRight} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaExclamationTriangle className={styles.rightIcon} />
            <h3>Correction</h3>
            <p>Update or correct your information</p>
          </motion.div>
          <motion.div className={styles.rightCard} variants={slideInLeft} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaLock className={styles.rightIcon} />
            <h3>Deletion</h3>
            <p>Request removal of your data</p>
          </motion.div>
          <motion.div className={styles.rightCard} variants={slideInRight} whileInView="visible" initial="hidden" viewport={{ once: true }}>
            <FaUserShield className={styles.rightIcon} />
            <h3>Portability</h3>
            <p>Export your data in a readable format</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section className={styles.contactSection} variants={itemVariants}>
        <div className={styles.contactContent}>
          <motion.h2 className={styles.contactTitle} variants={itemVariants}>
            Questions About Privacy?
          </motion.h2>
          <motion.p className={styles.contactSubtitle} variants={itemVariants}>
            We're here to help with any privacy concerns or questions you may have.
          </motion.p>
          <motion.div className={styles.contactActions} variants={itemVariants}>
            <motion.a 
              href="mailto:privacy@voxai.com" 
              className={styles.contactButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              Contact Privacy Team
            </motion.a>
            <motion.a 
              href="/help" 
              className={styles.helpButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaQuestionCircle />
              Visit Help Center
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
    );
};

export default PrivacyPolicy; 