import React from 'react';
import { MdPersonAdd } from 'react-icons/md';
import style from './SuggestedSidebar.module.css';

const SuggestedSidebar = () => {
  const suggestedPeople = [
    {
      id: 1,
      name: 'Emma Thompson',
      username: '@emma_reads',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 5,
      favoriteGenres: ['Fantasy', 'Mystery'],
      currentBook: 'The Seven Moons of Maali Almeida'
    },
    {
      id: 2,
      name: 'James Wilson',
      username: '@bookworm_james',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 3,
      favoriteGenres: ['Sci-Fi', 'Biography'],
      currentBook: 'Atomic Habits'
    },
    {
      id: 3,
      name: 'Sofia Martinez',
      username: '@sofia_bookclub',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 7,
      favoriteGenres: ['Romance', 'Historical Fiction'],
      currentBook: 'The Atlas Six'
    },
    {
      id: 4,
      name: 'Alex Chen',
      username: '@alex_adventures',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 2,
      favoriteGenres: ['Adventure', 'Non-Fiction'],
      currentBook: 'Educated'
    }
  ];

  return (
    <div className={style.suggestedSidebar}>
      <div className={style.sidebarSection}>
        <h3 className={style.sidebarTitle}>
          <MdPersonAdd className={style.titleIcon} />
          People You May Know
        </h3>
        <div className={style.suggestedList}>
          {suggestedPeople.map(person => (
            <div key={person.id} className={style.userItem}>
              <img 
                src={person.avatar} 
                alt={person.name}
                className={style.userAvatar}
              />
              <div className={style.userInfo}>
                <h4 className={style.userName}>{person.name}</h4>
                <p className={style.userBio}>{person.username}</p>
                <div className={style.userGenres}>
                  {person.favoriteGenres.map(genre => (
                    <span key={genre} className={style.genreTag}>{genre}</span>
                  ))}
                </div>
                <p className={style.currentlyReading}>
                  Currently reading: {person.currentBook}
                </p>
                {person.mutualConnections > 0 && (
                  <span className={style.mutualConnections}>
                    {person.mutualConnections} mutual connections
                  </span>
                )}
              </div>
              <button className={style.followButton}>
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedSidebar; 