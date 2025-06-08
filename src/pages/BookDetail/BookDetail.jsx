import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaPlay, FaPause, FaFileAlt, FaStar, FaBookOpen, FaHeart } from 'react-icons/fa';
import style from './BookDetail.module.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This will be replaced with actual auth context later

  // Mock book data - will be replaced with API call later
  const bookData = {
    1: {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      rating: 4.8,
      reviewCount: 1247,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=entropy",
      description: "Timeless lessons on wealth, greed, and happiness from one of the greatest financial minds of our time. The Psychology of Money shows you how to have a better relationship with money and make smarter financial decisions.",
      longDescription: "Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.",
      duration: "6h 30m",
      chapters: 20,
      publishYear: 2020,
      isbn: "978-0857197689",
      language: "English",
      summary: "This book explores the psychology behind financial decisions, revealing how emotions, biases, and personal experiences shape our relationship with money. Key insights include the importance of time in investing, the power of compounding, and why behavioral factors often matter more than mathematical formulas in financial success."
    },
    2: {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Development",
      rating: 4.9,
      reviewCount: 2156,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=entropy",
      description: "Proven strategies to build good habits, break bad ones, and get 1% better every day.",
      longDescription: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      duration: "5h 45m",
      chapters: 15,
      publishYear: 2018,
      isbn: "978-0735211292",
      language: "English",
      summary: "This book reveals how small changes can make a big difference by focusing on the four laws of behavior change: make it obvious, attractive, easy, and satisfying. Clear explains how habits compound over time and provides practical strategies for building systems that lead to remarkable results."
    }
    // Add more books as needed
  };

  const currentBook = bookData[bookId] || bookData[1];

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if current book is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isBookFavorited = favorites.some(book => book.id === currentBook.id);
    setIsFavorite(isBookFavorited);
  }, [currentBook.id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFavorite = () => {
    if (!isLoggedIn) return;
    
    setIsFavorite(!isFavorite);
    
    // Save to favorites in localStorage (will be replaced with API later)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (!isFavorite) {
      // Add to favorites
      const newFavorites = [...favorites, currentBook];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      // Remove from favorites
      const newFavorites = favorites.filter(book => book.id !== currentBook.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaBookOpen /> },
    { id: 'listen', label: 'Listen', icon: <FaPlay /> },
    { id: 'summary', label: 'AI Summary', icon: <FaFileAlt /> }
  ];

  return (
    <div className={style.container}>
      <div className={style.content}>
        {/* Book Header */}
        <div className={style.bookHeader}>
          <div className={style.bookCover}>
            <img 
              src={currentBook.cover} 
              alt={currentBook.title}
              className={style.coverImage}
            />
            <div className={style.coverActions}>
              <button 
                className={`${style.playButton} ${isPlaying ? style.playing : ''}`}
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
          
          <div className={style.bookInfo}>
            <div className={style.bookMeta}>
              <span className={style.genre}>{currentBook.genre}</span>
              <div className={style.rating}>
                <FaStar />
                <span>{currentBook.rating}</span>
                <span className={style.reviewCount}>({currentBook.reviewCount} reviews)</span>
              </div>
            </div>
            
            <h1 className={style.bookTitle}>{currentBook.title}</h1>
            <p className={style.bookAuthor}>by {currentBook.author}</p>
            <p className={style.bookDescription}>{currentBook.description}</p>
            
            <div className={style.bookStats}>
              <div className={style.stat}>
                <FaBookOpen />
                <span>{currentBook.duration}</span>
              </div>
              <div className={style.stat}>
                <span>{currentBook.chapters} chapters</span>
              </div>
              <div className={style.stat}>
                <span>{currentBook.publishYear}</span>
              </div>
            </div>
            
            <div className={style.actionButtons}>
              <button className={style.primaryButton} onClick={handlePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
                {isPlaying ? 'Pause' : 'Start Listening'}
              </button>
              {isLoggedIn && (
                <button 
                  className={`${style.iconButton} ${isFavorite ? style.favorite : ''}`}
                  onClick={handleFavorite}
                >
                  <FaHeart />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={style.tabsContainer}>
          <div className={style.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${style.tab} ${activeTab === tab.id ? style.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={style.tabContent}>
          {activeTab === 'overview' && (
            <div className={style.overview}>
              <h3>About this book</h3>
              <p>{currentBook.longDescription}</p>
              <div className={style.bookDetails}>
                <div className={style.detail}>
                  <strong>ISBN:</strong> {currentBook.isbn}
                </div>
                <div className={style.detail}>
                  <strong>Language:</strong> {currentBook.language}
                </div>
                <div className={style.detail}>
                  <strong>Duration:</strong> {currentBook.duration}
                </div>
                <div className={style.detail}>
                  <strong>Chapters:</strong> {currentBook.chapters}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listen' && (
            <div className={style.listen}>
              <div className={style.audioPlayer}>
                <h3>Audio Player</h3>
                <div className={style.playerControls}>
                  <button className={style.playerButton} onClick={handlePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div className={style.progressBar}>
                    <div className={style.progress}></div>
                  </div>
                  <span className={style.timeDisplay}>0:00 / {currentBook.duration}</span>
                </div>
                <p className={style.playerNote}>
                  {isPlaying ? 'Now playing...' : 'Click play to start listening to this audiobook'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className={style.summary}>
              <h3>AI-Generated Summary</h3>
              <div className={style.summaryContent}>
                <p>{currentBook.summary}</p>
                <div className={style.summaryNote}>
                  <FaFileAlt />
                  <span>This summary was generated by our AI system to help you quickly understand the key concepts.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 