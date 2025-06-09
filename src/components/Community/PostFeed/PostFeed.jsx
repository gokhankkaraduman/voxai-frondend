import React from 'react';
import { MdFeed, MdLibraryBooks } from 'react-icons/md';
import Post from '../Post/Post';
import style from './PostFeed.module.css';

const PostFeed = ({ posts, commentsData, onLikePost, onAddComment, onLikeComment }) => {
    return (
    <div className={style.postFeed}>
      <div className={style.postFeedHeader}>
        <h2 className={style.feedTitle}>
          <MdFeed className={style.feedIcon} />
          Community Feed
        </h2>
      </div>

      <div className={style.postsContainer}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className={style.postContainer}>
        <Post
          post={post}
                comments={commentsData[post.id] || []}
          onLikePost={onLikePost}
          onAddComment={onAddComment}
          onLikeComment={onLikeComment}
        />
            </div>
          ))
        ) : (
          <div className={style.noPostsMessage}>
            <MdLibraryBooks className={style.noPostsIcon} />
            <h3 className={style.noPostsTitle}>No posts yet</h3>
            <p className={style.noPostsText}>
              Be the first to share your reading experience with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed; 