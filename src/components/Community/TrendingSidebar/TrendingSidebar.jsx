import React from 'react';
import { 
  MdTrendingUp, 
  MdBook, 
  MdEmojiEvents,
  MdStar,
  MdLocalFireDepartment,
  MdHeadphones,
  MdFavorite,
  MdMenuBook,
  MdScience,
  MdAutoAwesome
} from 'react-icons/md';
import style from './TrendingSidebar.module.css';

const TrendingSidebar = () => {
  const trendingTopics = [
    {
      id: 1,
      name: 'BookReview',
      posts: 156,
      trend: 'hot',
      icon: MdBook,
      color: '#10b981'
    },
    {
      id: 2,
      name: 'SciFi',
      posts: 89,
      trend: 'rising',
      icon: MdScience,
      color: '#6366f1'
    },
    {
      id: 3,
      name: 'BookClub',
      posts: 67,
      trend: 'stable',
      icon: MdMenuBook,
      color: '#8b5cf6'
    },
    {
      id: 4,
      name: 'Fantasy',
      posts: 54,
      trend: 'rising',
      icon: MdAutoAwesome,
      color: '#ec4899'
    },
    {
      id: 5,
      name: 'AudioBooks',
      posts: 43,
      trend: 'stable',
      icon: MdHeadphones,
      color: '#f59e0b'
    },
    {
      id: 6,
      name: 'Romance',
      posts: 38,
      trend: 'rising',
      icon: MdFavorite,
      color: '#ef4444'
    }
  ];

  const popularAuthors = [
    {
      id: 1,
      name: 'Stephen King',
      mentions: 24,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'J.K. Rowling',
      mentions: 19,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Brandon Sanderson',
      mentions: 18,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Agatha Christie',
      mentions: 15,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const readingChallenge = {
    current: 13,
    target: 20,
    progress: 65, // 13/20 * 100
    status: 'ahead',
    message: "Keep it up! You're ahead of schedule!"
  };

  const getTrendBadge = (trend) => {
    switch (trend) {
      case 'hot':
        return { text: 'Hot', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
      case 'rising':
        return { text: 'Rising', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
      case 'stable':
        return { text: 'Stable', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
      default:
        return { text: 'New', color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' };
    }
  };

  return (
    <div className={style.trendingSidebar}>
      {/* Trending Topics */}
      <div className={style.sidebarSection}>
        <h3 className={style.sidebarTitle}>
          <MdLocalFireDepartment className={style.titleIcon} />
          Trending Topics
        </h3>
        
        <div className={style.topicsList}>
          {trendingTopics.map((topic) => {
            const TopicIcon = topic.icon;
            const trendBadge = getTrendBadge(topic.trend);
            
            return (
              <div key={topic.id} className={style.topicItem}>
                <div className={style.topicIcon} style={{ backgroundColor: `${topic.color}20`, border: `1px solid ${topic.color}40` }}>
                  <TopicIcon style={{ color: topic.color }} />
                </div>
                <div className={style.topicInfo}>
                  <h4 className={style.topicName}>{topic.name}</h4>
                  <span className={style.topicPosts}>{topic.posts} posts</span>
                </div>
                <div 
                  className={style.trendBadge}
                  style={{ 
                    color: trendBadge.color, 
                    backgroundColor: trendBadge.bgColor,
                    border: `1px solid ${trendBadge.color}40`
                  }}
                >
                  {trendBadge.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Authors */}
      <div className={style.sidebarSection}>
        <h3 className={style.sidebarTitle}>
          <MdStar className={style.titleIcon} />
          Popular Authors
        </h3>
        
        <div className={style.authorsList}>
          {popularAuthors.map((author, index) => (
            <div key={author.id} className={style.authorItem}>
              <div className={style.authorRank}>
                {index + 1}
              </div>
              <img 
                src={author.avatar} 
                alt={author.name}
                className={style.authorAvatar}
              />
              <div className={style.authorInfo}>
                <h4 className={style.authorName}>{author.name}</h4>
                <span className={style.authorMentions}>{author.mentions} mentions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Challenge */}
      <div className={style.sidebarSection}>
        <h3 className={style.sidebarTitle}>
          <MdEmojiEvents className={style.titleIcon} />
          Reading Challenge 2024
        </h3>
        
        <div className={style.challengeCard}>
          <div className={style.challengeHeader}>
            <div className={style.challengeProgress}>
              <span className={style.challengeCurrent}>{readingChallenge.current}</span>
              <span className={style.challengeSeparator}>of</span>
              <span className={style.challengeTarget}>{readingChallenge.target}</span>
              <span className={style.challengeLabel}>books</span>
        </div>
      </div>

          <div className={style.progressContainer}>
            <div className={style.progressBar}>
              <div 
                className={style.progressFill}
                style={{ width: `${readingChallenge.progress}%` }}
              ></div>
            </div>
            <span className={style.progressPercentage}>{readingChallenge.progress}%</span>
          </div>
          
          <div className={style.challengeMessage}>
            <span className={style.messageText}>{readingChallenge.message}</span>
            <span className={style.messageEmoji}>📚✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar; 