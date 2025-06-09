import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import Comment from '../Comment/Comment';
import { useUser } from '../../../contexts/UserContext';
import style from './CommentSection.module.css';

const CommentSection = ({ comments, onAddComment, onLikeComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);
  const remainingComments = comments.length - 3;

  return (
    <div className={style.commentSection}>
      {/* Comments List */}
      <div className={style.commentsList}>
        {displayedComments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            onLike={() => onLikeComment(comment.id)}
            />
          ))}
          
        {!showAllComments && remainingComments > 0 && (
            <button 
            className={style.viewMoreComments}
              onClick={() => setShowAllComments(true)}
            >
            View {remainingComments} more comment{remainingComments > 1 ? 's' : ''}
            </button>
          )}
        </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className={style.addCommentForm}>
        <img 
          src={user.avatar}
          alt={user.name}
          className={style.commentUserAvatar}
        />
        <div className={style.commentInputContainer}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className={style.commentInput}
          />
          <button 
            type="submit"
            className={style.commentSubmitButton}
            disabled={!commentText.trim()}
          >
            <MdSend className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection; 