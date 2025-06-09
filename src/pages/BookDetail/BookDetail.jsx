import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MdArrowBack, 
  MdPlayArrow, 
  MdFavoriteBorder,
  MdStar,
  MdHeadphones,
  MdMenuBook,
  MdAutoStories,
  MdSummarize
} from 'react-icons/md';
import style from './BookDetail.module.css';

// Import books data
import booksData from '../../data/books.json';
import { useUser } from '../../contexts/UserContext';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { preferences } = useUser();
  
  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Use booksData instead of allBooks
    const foundBook = booksData.books.find(b => b.id === parseInt(bookId));
    if (foundBook) {
      setBook(foundBook);
    } else {
      toast.error('Book not found');
      navigate('/books');
    }
  }, [bookId, navigate]);

  const handleGenerateSummary = async () => {
    // Navigate to summary page with action parameter
    navigate(`/books/${bookId}?action=summary`);
    toast.success('Generating AI summary... ✨');
  };

  const handleToggleFavorite = () => {
    toast.success('Added to favorites! ❤️');
  };

  if (!book) {
    return (
      <div className={style.loading}>
        <div className={style.loadingSpinner}></div>
        <p>Loading book...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {/* Header */}
      <motion.div 
        className={style.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button 
          className={style.backBtn}
          onClick={() => navigate('/books')}
        >
          <MdArrowBack />
        </button>
        <h1 className={style.pageTitle}>Book Details</h1>
      </motion.div>

      {/* Book Hero Section */}
      <motion.div 
        className={style.bookHero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={style.bookCover}>
          <img src={book.cover} alt={book.title} />
        </div>
        <div className={style.bookInfo}>
          <h2 className={style.bookTitle}>{book.title}</h2>
          <p className={style.bookAuthor}>by {book.author}</p>
          <div className={style.bookMeta}>
            <span className={style.genre}>{book.genre}</span>
            <div className={style.rating}>
              <MdStar />
              <span>{book.rating}</span>
              <span className={style.reviewCount}>({book.reviews} reviews)</span>
            </div>
          </div>
          <p className={style.bookDescription}>{book.description}</p>
          <div className={style.bookStats}>
            <div className={style.stat}>
              <MdMenuBook />
              <span>{book.pages} pages</span>
            </div>
            <div className={style.stat}>
              <MdHeadphones />
              <span>{book.duration}</span>
            </div>
          </div>
          <div className={style.actionButtons}>
            <button 
              className={style.primaryButton}
              onClick={() => navigate(`/books/${bookId}/read`)}
            >
              <MdAutoStories />
              Start Reading
            </button>
            <button 
              className={style.summaryButton}
              onClick={handleGenerateSummary}
            >
              <MdSummarize />
              Generate Summary
            </button>
            <button 
              className={style.favoriteButton}
              onClick={handleToggleFavorite}
            >
              <MdFavoriteBorder />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className={style.tabs}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button 
          className={`${style.tab} ${activeTab === 'overview' ? style.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`${style.tab} ${activeTab === 'chapters' ? style.active : ''}`}
          onClick={() => setActiveTab('chapters')}
        >
          Chapters
        </button>
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        className={style.tabContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={style.overviewContent}
            >
              <div className={style.bookSpecs}>
                <h3>Book Details</h3>
                <div className={style.specGrid}>
                  <div className={style.specItem}>
                    <span className={style.specLabel}>Publisher</span>
                    <span className={style.specValue}>{book.publisher}</span>
                  </div>
                  <div className={style.specItem}>
                    <span className={style.specLabel}>Published</span>
                    <span className={style.specValue}>{book.publishYear}</span>
                  </div>
                  <div className={style.specItem}>
                    <span className={style.specLabel}>Language</span>
                    <span className={style.specValue}>{book.language}</span>
                  </div>
                  <div className={style.specItem}>
                    <span className={style.specLabel}>ISBN</span>
                    <span className={style.specValue}>{book.isbn}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chapters' && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={style.chaptersContent}
            >
              <h3>Chapters ({book.chapters.length})</h3>
              <div className={style.chaptersList}>
                {book.chapters.map((chapter, index) => (
                  <div 
                    key={chapter.id} 
                    className={style.chapterItem}
                  >
                    <div className={style.chapterNumber}>{index + 1}</div>
                    <div className={style.chapterInfo}>
                      <h4 className={style.chapterTitle}>{chapter.title}</h4>
                      <span className={style.chapterDuration}>{chapter.duration}</span>
                    </div>
                    <button 
                      className={style.chapterPlayBtn}
                      onClick={() => navigate(`/books/${bookId}/read`)}
                    >
                      <MdPlayArrow />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BookDetail; 