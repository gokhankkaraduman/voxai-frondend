import React from 'react';
import { 
  MdFavorite, 
  MdComment, 
  MdPersonAdd, 
  MdAlternateEmail,
  MdBook,
  MdEmojiEvents,
  MdGroup,
  MdMarkAsUnread,
  MdDelete
} from 'react-icons/md';
import style from './NotificationItem.module.css';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { icon: MdFavorite, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
      case 'comment':
        return { icon: MdComment, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' };
      case 'follow':
        return { icon: MdPersonAdd, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
      case 'mention':
        return { icon: MdAlternateEmail, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
      case 'book_recommendation':
        return { icon: MdBook, color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' };
      case 'reading_challenge':
        return { icon: MdEmojiEvents, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' };
      case 'book_club':
        return { icon: MdGroup, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.1)' };
      default:
        return { icon: MdBook, color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  const iconConfig = getNotificationIcon(notification.type);
  const IconComponent = iconConfig.icon;

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div className={`${style.notificationItem} ${!notification.isRead ? style.unread : ''}`}>
      {!notification.isRead && <div className={style.unreadIndicator} />}
      
      {/* Icon */}
      <div 
        className={style.iconContainer}
        style={{ 
          backgroundColor: iconConfig.bgColor,
          border: `1px solid ${iconConfig.color}40`
        }}
      >
        <IconComponent 
          className={style.icon}
          style={{ color: iconConfig.color }}
        />
      </div>

      {/* Content */}
      <div className={style.content}>
        <div className={style.mainContent}>
          {/* User Info */}
          {notification.user && (
            <div className={style.userInfo}>
              <img 
                src={notification.user.avatar} 
                alt={notification.user.name}
                className={style.userAvatar}
              />
              <div className={style.userDetails}>
                <span className={style.userName}>{notification.user.name}</span>
                <span className={style.userHandle}>{notification.user.username}</span>
              </div>
            </div>
          )}

          {/* Notification Content */}
          <div className={style.notificationContent}>
            <p className={style.notificationText}>
              {notification.user ? (
                <>
                  <span className={style.highlight}>{notification.user.name}</span>
                  {' ' + notification.content}
                </>
              ) : (
                notification.content
              )}
            </p>

            {/* Book mention */}
            {notification.bookMentioned && (
              <div className={style.bookMention}>
                📚 {notification.bookMentioned}
              </div>
            )}

            {/* Club mention */}
            {notification.clubName && (
              <div className={style.clubMention}>
                🏛️ {notification.clubName}
              </div>
            )}

            {/* Comment preview */}
            {notification.comment && (
              <div className={style.commentPreview}>
                💬 "{notification.comment}"
              </div>
            )}

            {/* Post preview */}
            {notification.postContent && (
              <div className={style.postPreview}>
                "{notification.postContent.length > 100 
                  ? notification.postContent.substring(0, 100) + '...' 
                  : notification.postContent}"
              </div>
            )}

            {/* Book cover for recommendations */}
            {notification.bookCover && (
              <div className={style.bookCover}>
                <img 
                  src={notification.bookCover} 
                  alt={notification.bookMentioned}
                  className={style.coverImage}
                />
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={style.timestamp}>
            {formatTimestamp(notification.timestamp)}
          </div>
        </div>

        {/* Actions */}
        <div className={style.actions}>
          {!notification.isRead && (
            <button 
              className={style.actionBtn}
              onClick={handleMarkAsRead}
              title="Mark as read"
            >
              <MdMarkAsUnread />
            </button>
          )}
          <button 
            className={style.actionBtn}
            onClick={handleDelete}
            title="Delete notification"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem; 