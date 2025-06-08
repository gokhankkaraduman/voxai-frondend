import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate reader and audiobook enthusiast. Love exploring new worlds through stories.',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    avatar: null,
    isLoggedIn: true
  });

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: '/api/placeholder/300/400',
      genre: 'Finance',
      rating: 4.8,
      addedDate: '2024-01-10'
    },
    {
      id: '2', 
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: '/api/placeholder/300/400',
      genre: 'Self-Help',
      rating: 4.9,
      addedDate: '2024-01-08'
    }
  ]);

  const [readingStats, setReadingStats] = useState({
    totalBooks: 24,
    totalHours: 156,
    currentStreak: 7,
    booksThisMonth: 3,
    avgPerWeek: 2.5,
    favoriteGenre: 'Science Fiction',
    longestSession: '4h 32m',
    completionRate: 89
  });

  // User actions with toast notifications
  const updateUserProfile = (updates) => {
    const previousUser = { ...user };
    setUser(prev => ({ ...prev, ...updates }));

    // Custom toast notification based on what was updated
    if (updates.name && updates.name !== previousUser.name) {
      toast.success(`Welcome, ${updates.name}! 👋`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      });
    }

    if (updates.email && updates.email !== previousUser.email) {
      toast.success('Email updated successfully! 📧', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
      });
    }

    if (updates.bio && updates.bio !== previousUser.bio) {
      toast.success('Profile updated! ✨', {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
      });
    }
  };

  const addToFavorites = (book) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);
    
    if (isAlreadyFavorite) {
      toast.error('Already in favorites! 💔', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
      });
      return;
    }

    const newFavorite = {
      ...book,
      addedDate: new Date().toISOString().split('T')[0]
    };
    
    setFavorites(prev => [newFavorite, ...prev]);
    
    toast.success(`"${book.title}" added to favorites! ❤️`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const removeFromFavorites = (bookId) => {
    const book = favorites.find(fav => fav.id === bookId);
    setFavorites(prev => prev.filter(fav => fav.id !== bookId));
    
    toast.success(`"${book?.title}" removed from favorites! 🗑️`, {
      duration: 2500,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const updateReadingProgress = (bookId, progress) => {
    // Update reading stats
    toast.success(`Reading progress updated! 📚 ${progress}%`, {
      duration: 2000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const markBookCompleted = (book) => {
    setReadingStats(prev => ({
      ...prev,
      totalBooks: prev.totalBooks + 1,
      booksThisMonth: prev.booksThisMonth + 1
    }));

    toast.success(`Congratulations! You completed "${book.title}"! 🎉`, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const updateSettings = (setting, value) => {
    toast.success('Settings updated! ⚙️', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const updatePreferences = (preferences) => {
    toast.success('Preferences saved! 🎨', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  // Check if book is in favorites
  const isFavorite = (bookId) => {
    return favorites.some(fav => fav.id === bookId);
  };

  const value = {
    // User data
    user,
    favorites,
    readingStats,
    
    // User actions
    updateUserProfile,
    addToFavorites,
    removeFromFavorites,
    updateReadingProgress,
    markBookCompleted,
    updateSettings,
    updatePreferences,
    
    // Helper functions
    isFavorite
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 