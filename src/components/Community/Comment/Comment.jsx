import React from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import style from './Comment.module.css';

const Comment = ({ comment, onLike }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={style.comment}>
      <img 
        src={comment.userAvatar} 
        alt={comment.userName}
        className={style.commentUserAvatar}
      />
      
      <div className={style.commentContent}>
        <div className={style.commentBubble}>
          <div className={style.commentHeader}>
            <span className={style.commentUserName}>{comment.userName}</span>
            <span className={style.commentTimestamp}>{formatTimeAgo(comment.timestamp)}</span>
          </div>
          <p className={style.commentText}>{comment.content}</p>
        </div>
        
        <div className={style.commentActions}>
          <button 
            className={`${style.commentLikeButton} ${comment.isLiked ? style.liked : ''}`}
            onClick={onLike}
          >
            {comment.isLiked ? (
              <MdFavorite className="w-3 h-3" />
            ) : (
              <MdFavoriteBorder className="w-3 h-3" />
            )}
            <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
          </button>
          
          <button className={style.commentReplyButton}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment; 