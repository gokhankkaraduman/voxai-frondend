import React from 'react';
import { motion } from 'framer-motion';
import style from './Home.module.css';
import { HiSparkles } from 'react-icons/hi';
import BookSearchForm from '../../components/BookSearchForm/BookSearchForm';
import WhyBookVoice from '../../components/WhyBookVoice/WhyBookVoice';
import PopularBooks from '../../components/PopularBooks/PopularBooks';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

function Home() {
    return (
        <div className={style.container}>
            {/* Hero Section */}
            <motion.section 
                className={style.heroSection}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className={style.heroContent}>
                    <motion.h1 
                        className={style.heroTitle}
                        variants={itemVariants}
                    >
                        Don't Just Read Books, <span className={style.brandName}>Live Them</span> and <span className={style.brandName}>Discover</span> New Knowledge Through Emotional Feeling!
                    </motion.h1>
                    <motion.p 
                        className={style.heroSubtitle}
                        variants={itemVariants}
                    >
                        Don't just turn the pages; listen aloud, summarize instantly, and engage with real people who share your passions. VoxAi revolutionizes your knowledge experience, taking your learning journey to the next level.
                    </motion.p>
                </div>
            </motion.section>

            {/* Book Search Form */}
            <BookSearchForm />

            {/* Why BookVoice Features */}
            <WhyBookVoice />

            {/* Popular Books */}
            <PopularBooks />
        </div>
    );
}

export default Home;