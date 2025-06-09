import React, { useState } from 'react';
import { 
  MdFavoriteBorder, 
  MdComment, 
  MdIosShare,
  MdMoreHoriz,
  MdFavorite
} from 'react-icons/md';
import CommentSection from '../CommentSection/CommentSection';
import toast from 'react-hot-toast';
import style from './Post.module.css';

const Post = ({ 
  post, 
  comments, 
  onLikePost, 
  onAddComment, 
  onLikeComment 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLikeClick = () => {
    onLikePost(post.id);
  };

  const handleShareClick = () => {
    // Simulate sharing functionality
    navigator.clipboard.writeText(`Check out this book post by ${post.userName}!`);
    toast.success('📋 Post link copied to clipboard!', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const handleCommentSubmit = (commentContent) => {
    onAddComment(post.id, commentContent);
  };

  const displayImages = showAllImages ? post.images : post.images.slice(0, 4);
  const remainingImages = post.images.length - 4;

  return (
    <div className={style.post}>
      {/* Post Header */}
      <div className={style.postHeader}>
        <div className={style.postUserInfo}>
          <img 
            src={post.userAvatar} 
            alt={post.userName}
            className={style.postUserAvatar}
          />
          <div className={style.postUserDetails}>
            <h4 className={style.postUserName}>{post.userName}</h4>
            <span className={style.postTimestamp}>{formatTimeAgo(post.timestamp)}</span>
          </div>
        </div>
        <button className={style.postMenuButton}>
          <MdMoreHoriz />
        </button>
      </div>

      {/* Post Content */}
      <div className={style.postContent}>
        <p className={style.postText}>{post.content}</p>
        
        {/* Mentioned Book */}
        {post.bookMentioned && (
          <div className={style.mentionedBook}>
            <img 
              src={post.bookMentioned.cover} 
              alt={post.bookMentioned.title}
              className={style.bookCover}
            />
            <div className={style.bookInfo}>
              <h5>{post.bookMentioned.title}</h5>
              <p>by {post.bookMentioned.author}</p>
            </div>
          </div>
        )}

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className={`${style.postImages} ${post.images.length === 1 ? style.single : style.multiple}`}>
            {displayImages.map((image, index) => (
              <div key={index} className={style.imageContainer}>
                <img src={image} alt={`Post image ${index + 1}`} />
                {index === 3 && remainingImages > 0 && !showAllImages && (
                  <div 
                    className={style.imageOverlay}
                    onClick={() => setShowAllImages(true)}
                  >
                    <span>+{remainingImages}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className={style.postStats}>
        <div className={style.statsLeft}>
          {post.likes > 0 && (
            <span className={style.likesCount}>
              <MdFavorite className={style.statsIcon} />
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </span>
          )}
        </div>
        <div className={style.statsRight}>
          {post.comments > 0 && (
            <button 
              className={style.commentsCount}
              onClick={() => setShowComments(!showComments)}
            >
              {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
            </button>
          )}
          {post.shares > 0 && (
            <span className={style.sharesCount}>
              {post.shares} {post.shares === 1 ? 'share' : 'shares'}
            </span>
          )}
        </div>
      </div>

      {/* Post Actions */}
      <div className={style.postActions}>
        <button 
          className={`${style.actionButton} ${post.isLiked ? style.liked : ''}`}
          onClick={handleLikeClick}
        >
          {post.isLiked ? (
            <MdFavorite />
          ) : (
            <MdFavoriteBorder />
          )}
          <span>Like</span>
        </button>

        <button 
          className={style.actionButton}
          onClick={() => setShowComments(!showComments)}
        >
          <MdComment />
          <span>Comment</span>
        </button>

        <button 
          className={style.actionButton}
          onClick={handleShareClick}
        >
          <MdIosShare />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection
          comments={comments}
          onAddComment={handleCommentSubmit}
          onLikeComment={(commentId) => onLikeComment(post.id, commentId)}
        />
      )}
    </div>
  );
};

export default Post; 