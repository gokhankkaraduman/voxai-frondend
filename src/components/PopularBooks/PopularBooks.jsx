import { FaPlay, FaFileAlt, FaStar, FaBookOpen, FaHeart, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './PopularBooks.module.css';

const PopularBooks = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This will be replaced with actual auth context later

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Mock data - will be replaced with backend API later
  const popularBooks = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      rating: 4.8,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=entropy",
      description: "Timeless lessons on wealth, greed, and happiness from one of the greatest financial minds of our time.",
      duration: "6h 30m"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Development",
      rating: 4.9,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=entropy",
      description: "Proven strategies to build good habits, break bad ones, and get 1% better every day.",
      duration: "5h 45m"
    },
    {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      rating: 4.7,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=entropy",
      description: "A brief history of humankind and how we came to dominate the planet.",
      duration: "15h 17m"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.6,
      cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=400&fit=crop&crop=entropy",
      description: "Between life and death there is a library, and within that library, the shelves go on forever.",
      duration: "8h 52m"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      genre: "Biography",
      rating: 4.8,
      cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop&crop=entropy",
      description: "A memoir about a woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD.",
      duration: "12h 10m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      rating: 4.9,
      cover: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop&crop=entropy",
      description: "Set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs.",
      duration: "21h 2m"
    }
  ];

  const handleListen = (bookId) => {
    navigate(`/book/${bookId}?tab=listen`);
  };

  const handleSummary = (bookId) => {
    navigate(`/book/${bookId}?tab=summary`);
  };

  const handleFavorite = (bookId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const book = popularBooks.find(b => b.id === bookId);
    if (!book) return;

    const isCurrentlyFavorited = favorites.some(fav => fav.id === bookId);
    
    let updatedFavorites;
    if (isCurrentlyFavorited) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== bookId);
    } else {
      // Add to favorites with complete book data
      const completeBookData = {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        reviewCount: Math.floor(Math.random() * 2000) + 500, // Mock review count
        cover: book.cover,
        description: book.description,
        longDescription: book.description + " This book offers deep insights and practical wisdom that readers find transformative and engaging.",
        duration: book.duration,
        chapters: Math.floor(Math.random() * 20) + 10, // Mock chapters
        publishYear: 2020 + Math.floor(Math.random() * 4), // Mock year
        isbn: "978-" + Math.random().toString().substr(2, 10), // Mock ISBN
        language: "English",
        summary: "This book provides valuable insights on " + book.genre.toLowerCase() + " and offers practical strategies that can be applied in daily life."
      };
      updatedFavorites = [...favorites, completeBookData];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <h2 className={style.title}>Popular Books</h2>
          <p className={style.subtitle}>Discover what others are reading and loving</p>
        </div>
        
        <div className={style.booksGrid}>
          {popularBooks.map((book) => (
            <div key={book.id} className={style.bookCard}>
              <div className={style.bookCover}>
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className={style.coverImage}
                />
                <div className={style.coverOverlay}>
                  <button 
                    className={style.playButton}
                    onClick={() => handleListen(book.id)}
                  >
                    <FaPlay />
                  </button>
                </div>
                {isLoggedIn && (
                  <button 
                    className={`${style.favoriteButton} ${
                      favorites.some(fav => fav.id === book.id) ? style.favorited : ''
                    }`}
                    onClick={() => handleFavorite(book.id)}
                  >
                    <FaHeart />
                  </button>
                )}
              </div>
              
              <div className={style.bookInfo}>
                <div className={style.bookMeta}>
                  <span className={style.genre}>{book.genre}</span>
                  <div className={style.rating}>
                    <FaStar />
                    <span>{book.rating}</span>
                  </div>
                </div>
                
                <h3 className={style.bookTitle}>{book.title}</h3>
                <p className={style.bookAuthor}>by {book.author}</p>
                <p className={style.bookDescription}>{book.description}</p>
                
                <div className={style.bookStats}>
                  <div className={style.duration}>
                    <FaBookOpen />
                    <span>{book.duration}</span>
                  </div>
                </div>
                
                <div className={style.actionButtons}>
                  <button 
                    className={`${style.actionButton} ${style.listenButton}`}
                    onClick={() => handleListen(book.id)}
                  >
                    <FaPlay />
                    Listen
                  </button>
                  <button 
                    className={`${style.actionButton} ${style.summaryButton}`}
                    onClick={() => handleSummary(book.id)}
                  >
                    <FaFileAlt />
                    Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={style.viewAllContainer}>
          <button 
            className={style.viewAllButton}
            onClick={() => navigate('/books')}
          >
            View All Books
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks; 