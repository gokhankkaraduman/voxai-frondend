import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaFileAlt, FaStar, FaBookOpen, FaHeart, FaTrash } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import style from './Favorites.module.css';

const Favorites = () => {
  const { user, favorites, removeFromFavorites } = useUser();
  const navigate = useNavigate();
  const isLoggedIn = user.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [isLoggedIn, navigate]);

  const handleRemoveFromFavorites = (bookId) => {
    removeFromFavorites(bookId);
  };

  const handleListen = (bookId) => {
    navigate(`/book/${bookId}?tab=listen`);
  };

  const handleSummary = (bookId) => {
    navigate(`/book/${bookId}?tab=summary`);
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (!isLoggedIn) {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.loginRequired}>
            <h2>Please log in to view your favorites</h2>
            <button 
              className={style.loginButton}
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <h1>My Favorite Books</h1>
          <p>Your personal collection of favorite audiobooks</p>
        </div>

        {favorites.length === 0 ? (
          <div className={style.emptyState}>
            <FaHeart className={style.emptyIcon} />
            <h3>No favorites yet</h3>
            <p>Start exploring books and add them to your favorites!</p>
            <button 
              className={style.exploreButton}
              onClick={() => navigate('/')}
            >
              Explore Books
            </button>
          </div>
        ) : (
          <div className={style.favoritesGrid}>
            {favorites.map((book) => (
              <div key={book.id} className={style.bookCard}>
                <div className={style.bookCover} onClick={() => handleBookClick(book.id)}>
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className={style.coverImage}
                  />
                  <div className={style.coverOverlay}>
                    <FaBookOpen />
                  </div>
                </div>
                
                <div className={style.bookContent}>
                  <div className={style.bookMeta}>
                    <span className={style.genre}>{book.genre}</span>
                    <div className={style.rating}>
                      <FaStar />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className={style.bookTitle} onClick={() => handleBookClick(book.id)}>
                    {book.title}
                  </h3>
                  <p className={style.bookAuthor}>by {book.author}</p>
                  <p className={style.bookDescription}>{book.description}</p>
                  
                  <div className={style.bookActions}>
                    <button 
                      className={style.actionButton}
                      onClick={() => handleListen(book.id)}
                    >
                      <FaPlay />
                      Listen
                    </button>
                    <button 
                      className={style.actionButton}
                      onClick={() => handleSummary(book.id)}
                    >
                      <FaFileAlt />
                      Summary
                    </button>
                    <button 
                      className={style.removeButton}
                      onClick={() => handleRemoveFromFavorites(book.id)}
                      title="Remove from favorites"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 