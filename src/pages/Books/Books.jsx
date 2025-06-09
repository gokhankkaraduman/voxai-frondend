import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdLibraryBooks,
  MdStar,
  MdHeadset,
  MdAutoAwesome,
  MdFavorite,
  MdFavoriteBorder
} from 'react-icons/md';
import { FaPlay, FaFileAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import style from './Books.module.css';

// Import components
import BookSearchForm from '../../components/BookSearchForm/BookSearchForm';

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, favorites, addToFavorites, removeFromFavorites, isFavorite } = useUser();
  const isLoggedIn = user.isLoggedIn;

  // Books data that matches home page PopularBooks
  const allBooks = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      rating: 4.8,
      reviews: 1247,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=entropy",
      description: "Timeless lessons on wealth, greed, and happiness from one of the greatest financial minds of our time.",
      duration: "6h 30m",
      pages: 324,
      publishYear: 2023,
      publisher: "Finance House Publishing",
      isbn: "978-0-123456-78-9",
      language: "English",
      isAudioAvailable: true,
      tags: ["finance", "psychology", "money", "investment"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: No One's Crazy",
          duration: "25m",
          text: "Your personal experiences with money make up maybe 0.00000001% of what's happened in the world, but maybe 80% of how you think the world works. Everyone has their own unique experience with how the world works. And what you've experienced is more compelling than what you learn second-hand. So all of us—you, me, everyone—go through life anchored to a set of views about how money works that vary wildly from person to person. What seems crazy to you might make sense to me."
        }
      ]
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Development",
      rating: 4.9,
      reviews: 892,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=entropy",
      description: "Proven strategies to build good habits, break bad ones, and get 1% better every day.",
      duration: "5h 45m",
      pages: 289,
      publishYear: 2022,
      publisher: "Self Help Press",
      isbn: "978-0-234567-89-0",
      language: "English",
      isAudioAvailable: true,
      tags: ["habits", "self-improvement", "productivity", "success"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: The Surprising Power of Atomic Habits",
          duration: "30m",
          text: "The fate of British Cycling changed one day in 2003. The organization, which was the governing body for professional cycling in Great Britain, had recently hired Dave Brailsford as its new performance director. At the time, professional cyclists in Great Britain had endured nearly one hundred years of mediocrity. Since 1908, British riders had won just a single gold medal at the Olympic Games, and they had fared even worse in cycling's biggest race, the Tour de France."
        }
      ]
    },
    {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      rating: 4.7,
      reviews: 2341,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=entropy",
      description: "A brief history of humankind and how we came to dominate the planet.",
      duration: "15h 17m",
      pages: 456,
      publishYear: 2021,
      publisher: "History Books Inc",
      isbn: "978-0-345678-90-1",
      language: "English",
      isAudioAvailable: true,
      tags: ["history", "anthropology", "evolution", "society"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: An Animal of No Significance",
          duration: "45m",
          text: "About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics. About 300,000 years after their appearance, matter and energy started to coalesce into complex structures, called atoms, which then combined into molecules."
        }
      ]
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.6,
      reviews: 1567,
      cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=400&fit=crop&crop=entropy",
      description: "Between life and death there is a library, and within that library, the shelves go on forever.",
      duration: "8h 52m",
      pages: 378,
      publishYear: 2023,
      publisher: "Fiction World",
      isbn: "978-0-456789-01-2",
      language: "English",
      isAudioAvailable: true,
      tags: ["fiction", "philosophy", "life", "choices"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Nineteen Years Before She Decided to Die",
          duration: "35m",
          text: "Nineteen years before she decided to die, Nora Seed sat in the warmth of the school library, in a comfortable chair by the window, reading about polar bears. She was fifteen, and polar bears were her favourite animals."
        }
      ]
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      genre: "Biography",
      rating: 4.8,
      reviews: 1823,
      cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop&crop=entropy",
      description: "A memoir about a woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD.",
      duration: "12h 10m",
      pages: 423,
      publishYear: 2021,
      publisher: "Biography Press",
      isbn: "978-0-567890-12-3",
      language: "English",
      isAudioAvailable: true,
      tags: ["biography", "education", "family", "memoir"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Choose the Good",
          duration: "40m",
          text: "My strongest memory is not a memory. It's something I imagined, then came to remember as if it had happened. The memory was formed when I was five, just before I turned six, from a story my father told in such detail that I and my brothers and sister had each, in our minds, been present."
        }
      ]
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      rating: 4.9,
      reviews: 756,
      cover: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop&crop=entropy",
      description: "Set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs.",
      duration: "21h 2m",
      pages: 612,
      publishYear: 2020,
      publisher: "Sci-Fi Books",
      isbn: "978-0-678901-23-4",
      language: "English",
      isAudioAvailable: true,
      tags: ["sci-fi", "space", "politics", "desert"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: In the week before their departure to Arrakis",
          duration: "50m",
          text: "In the week before their departure to Arrakis, when all the final scurrying about had reached a nearly unbearable frenzy, an old crone came to visit the mother of Muad'Dib. It was a warm night at Castle Caladan, and the ancient pile of stone that had served the Atreides family as home for twenty-six generations bore that cooled-sweat feeling it acquired before a change in the weather."
        }
      ]
    },
    {
      id: 7,
      title: "The Martian",
      author: "Andy Weir",
      genre: "Science Fiction",
      rating: 4.7,
      reviews: 3421,
      cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop&crop=entropy",
      description: "A thrilling survival story of an astronaut stranded on Mars who must use his ingenuity to survive.",
      duration: "10h 53m",
      pages: 369,
      publishYear: 2011,
      publisher: "Crown Publishers",
      isbn: "978-0-553418-02-4",
      language: "English",
      isAudioAvailable: true,
      tags: ["sci-fi", "space", "survival", "humor"],
      chapters: [
        {
          id: 1,
          title: "Sol 6",
          duration: "35m",
          text: "I'm pretty much fucked. That's my considered opinion. Fucked."
        }
      ]
    },
    {
      id: 8,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      rating: 4.8,
      reviews: 5678,
      cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop&crop=entropy",
      description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
      duration: "11h 22m",
      pages: 328,
      publishYear: 1949,
      publisher: "Secker & Warburg",
      isbn: "978-0-452284-23-4",
      language: "English",
      isAudioAvailable: true,
      tags: ["dystopian", "politics", "surveillance", "classic"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Part One",
          duration: "42m",
          text: "It was a bright cold day in April, and the clocks were striking thirteen."
        }
      ]
    },
    {
      id: 9,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic Literature",
      rating: 4.6,
      reviews: 4321,
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&crop=entropy",
      description: "A gripping tale of racial injustice and the loss of innocence in the American South.",
      duration: "12h 17m",
      pages: 376,
      publishYear: 1960,
      publisher: "J.B. Lippincott & Co.",
      isbn: "978-0-061120-08-4",
      language: "English",
      isAudioAvailable: true,
      tags: ["classic", "justice", "coming-of-age", "american-literature"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1",
          duration: "38m",
          text: "When I was almost six years old, I first heard about the rumors of Boo Radley."
        }
      ]
    },
    {
      id: 10,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      rating: 4.4,
      reviews: 2987,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=entropy",
      description: "A classic novel about the decadence and excess of the Jazz Age in America.",
      duration: "4h 49m",
      pages: 180,
      publishYear: 1925,
      publisher: "Charles Scribner's Sons",
      isbn: "978-0-743273-56-5",
      language: "English",
      isAudioAvailable: true,
      tags: ["classic", "jazz-age", "american-dream", "romance"],
      chapters: [
        {
          id: 1,
          title: "Chapter 1",
          duration: "29m",
          text: "In my younger and more vulnerable years my father gave me some advice that I've carried with me ever since."
        }
      ]
    },
    {
      id: 11,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "History",
      rating: 4.7,
      reviews: 6543,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&crop=entropy",
      description: "A brief history of humankind, exploring how humans became the dominant species on Earth.",
      duration: "15h 17m",
      pages: 443,
      publishYear: 2011,
      publisher: "Harvill Secker",
      isbn: "978-0-099590-08-8",
      language: "English",
      isAudioAvailable: true,
      tags: ["history", "anthropology", "evolution", "society"],
      chapters: [
        {
          id: 1,
          title: "Part One: The Cognitive Revolution",
          duration: "55m",
          text: "About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang."
        }
      ]
    },
    {
      id: 12,
      title: "Homo Deus",
      author: "Yuval Noah Harari",
      genre: "Philosophy",
      rating: 4.5,
      reviews: 3876,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop&crop=entropy",
      description: "A brief history of tomorrow, exploring the future of humanity in an age of artificial intelligence.",
      duration: "14h 54m",
      pages: 450,
      publishYear: 2015,
      publisher: "Harvill Secker",
      isbn: "978-1-910701-88-6",
      language: "English",
      isAudioAvailable: true,
      tags: ["philosophy", "future", "ai", "humanity"],
      chapters: [
        {
          id: 1,
          title: "Part I: Homo Sapiens Conquers the World",
          duration: "62m",
          text: "In the twenty-first century, we are likely to see more radical changes than in any previous century."
        }
      ]
    }
  ];

  // State management
  const [books, setBooks] = useState(allBooks);
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // 6 kitap per sayfa

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle search data from navigation state
  useEffect(() => {
    if (location.state?.searchData) {
      const searchData = location.state.searchData;
      handleSearch(searchData);
    }
  }, [location.state]);

  // Reset to first page when filteredBooks changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredBooks]);

  // Search function to be called by BookSearchForm
  const handleSearch = (searchData) => {
    const searchTerm = searchData.searchTerm || '';
    const category = searchData.category || '';
    const author = searchData.author || '';
    const year = searchData.year || '';
    
    setSearchTerm(searchTerm);
    
    let filtered = [...allBooks];

    // Search by term
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category/genre
    if (category) {
      filtered = filtered.filter(book => book.genre === category);
    }

    // Filter by author
    if (author) {
      filtered = filtered.filter(book => 
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    // Filter by year
    if (year) {
      filtered = filtered.filter(book => book.publishYear === parseInt(year));
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page after search
    
    if (filtered.length === 0) {
      toast.error('No books found matching your search criteria');
    } else {
      toast.success(`Found ${filtered.length} book${filtered.length > 1 ? 's' : ''}`);
    }
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of books section
    document.querySelector(`.${style.booksSection}`)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Make handleSearch available globally for BookSearchForm
  useEffect(() => {
    window.handleBooksSearch = handleSearch;
    return () => {
      delete window.handleBooksSearch;
    };
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleStartListening = (bookId, e) => {
    e.stopPropagation();
    navigate(`/books/${bookId}/read`);
  };

  const handleGenerateSummary = (bookId, e) => {
    e.stopPropagation();
    navigate(`/books/${bookId}?action=summary`);
  };

  const handleToggleFavorite = (bookId, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error('Please login to add favorites');
      navigate('/login');
      return;
    }

    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;

    const isCurrentlyFavorited = isFavorite(bookId);
    
    if (isCurrentlyFavorited) {
      removeFromFavorites(bookId);
      toast.success(`💔 Removed "${book.title}" from favorites`);
    } else {
      // Add to favorites with complete book data
      const completeBookData = {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        reviews: book.reviews,
        cover: book.cover,
        description: book.description,
        duration: book.duration,
        pages: book.pages,
        publishYear: book.publishYear,
        publisher: book.publisher,
        isbn: book.isbn,
        language: book.language,
        isAudioAvailable: book.isAudioAvailable,
        tags: book.tags,
        chapters: book.chapters
      };
      
      addToFavorites(completeBookData);
      toast.success(`📚 Added "${book.title}" to favorites!`);
      
      // Navigate to favorites page after 1.5 seconds
      setTimeout(() => {
        navigate('/favorites');
      }, 1500);
    }
  };

  return (
    <div className={style.container}>
      {/* Hero Section */}
      <motion.div 
        className={style.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={style.headerContent}>
          <h1 className={style.title}>
            <MdLibraryBooks className={style.titleIcon} />
            Find Your Next Book
          </h1>
          <p className={style.subtitle}>
            Discover amazing stories with immersive audio reading experience
          </p>
        </div>
      </motion.div>

      {/* Book Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <BookSearchForm />
      </motion.div>

      {/* Books Grid */}
      <motion.section 
        className={style.booksSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Results Summary */}
        {filteredBooks.length > 0 && (
          <div className={style.resultsInfo}>
            <p className={style.resultsText}>
              Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, filteredBooks.length)} of {filteredBooks.length} books
              {totalPages > 1 && (
                <span className={style.pageInfo}> (Page {currentPage} of {totalPages})</span>
              )}
            </p>
          </div>
        )}

        <div className={style.booksContainer}>
          <AnimatePresence mode="wait">
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  className={style.bookCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleBookClick(book.id)}
                >
                  <div className={style.bookCover}>
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className={style.coverImage}
                    />
                    
                    {/* Play Overlay */}
                    <div className={style.coverOverlay}>
                      <button 
                        className={style.playButton}
                        onClick={(e) => handleStartListening(book.id, e)}
                      >
                        <FaPlay />
                      </button>
                    </div>

                    {/* Favorite Button */}
                    {isLoggedIn && (
                      <button 
                        className={`${style.favoriteButton} ${isFavorite(book.id) ? style.favorited : ''}`}
                        onClick={(e) => handleToggleFavorite(book.id, e)}
                      >
                        <MdFavorite />
                      </button>
                    )}
                  </div>

                  <div className={style.bookInfo}>
                    <div className={style.bookMeta}>
                      <span className={style.genre}>{book.genre}</span>
                      <div className={style.rating}>
                        <MdStar />
                        <span>{book.rating}</span>
                      </div>
                    </div>

                    <h3 className={style.bookTitle}>{book.title}</h3>
                    <p className={style.bookAuthor}>by {book.author}</p>
                    <p className={style.bookDescription}>{book.description}</p>
                    
                    <div className={style.bookStats}>
                      <div className={style.duration}>
                        <MdHeadset />
                        <span>{book.duration}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={style.actionButtons}>
                      <button 
                        className={`${style.actionButton} ${style.listenButton}`}
                        onClick={(e) => handleStartListening(book.id, e)}
                      >
                        <FaPlay />
                        Listen
                      </button>
                      <button 
                        className={`${style.actionButton} ${style.summaryButton}`}
                        onClick={(e) => handleGenerateSummary(book.id, e)}
                      >
                        <FaFileAlt />
                        Summary
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className={style.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MdLibraryBooks className={style.emptyIcon} />
                <h3 className={style.emptyTitle}>No books found</h3>
                <p className={style.emptyText}>
                  Try adjusting your search or filters to find more books.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className={style.pagination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button 
              className={`${style.paginationButton} ${style.prevButton} ${currentPage === 1 ? style.disabled : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
              Previous
            </button>

            <div className={style.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                  key={pageNumber}
                  className={`${style.pageNumber} ${currentPage === pageNumber ? style.active : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button 
              className={`${style.paginationButton} ${style.nextButton} ${currentPage === totalPages ? style.disabled : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Books; 