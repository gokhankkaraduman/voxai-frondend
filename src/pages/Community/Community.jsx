import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import { 
  MdPeople, 
  MdBook, 
  MdFavorite, 
  MdComment,
  MdGroup,
  MdEmojiEmotions,
  MdSearch,
  MdCreate,
  MdTrendingUp,
  MdNotifications
} from 'react-icons/md';
import style from './Community.module.css';

// Components
import CreatePost from '../../components/Community/CreatePost/CreatePost';
import PostFeed from '../../components/Community/PostFeed/PostFeed';
import TrendingSidebar from '../../components/Community/TrendingSidebar/TrendingSidebar';
import SuggestedSidebar from '../../components/Community/SuggestedSidebar/SuggestedSidebar';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Community = () => {
  const { user } = useUser();
  
  // Mock data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      content: 'Just finished reading "The Seven Husbands of Evelyn Hugo" and I am OBSESSED! 📚✨ The storytelling was absolutely incredible. Has anyone else read this masterpiece?',
      bookMentioned: {
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
      },
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      ],
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      userName: 'Alex Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      timestamp: Date.now() - 3600000, // 1 hour ago
      content: 'Currently diving into the Dune series! 🏜️ Frank Herbert created such an incredible universe. Perfect for anyone who loves epic sci-fi worldbuilding.',
      bookMentioned: {
        title: 'Dune',
        author: 'Frank Herbert',
        cover: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=200&h=300&fit=crop'
      },
      images: [],
      likes: 31,
      comments: 12,
      shares: 7,
      isLiked: true
    },
    {
      id: 3,
      userName: 'Emma Davis',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      timestamp: Date.now() - 7200000, // 2 hours ago
      content: 'Book club meeting was amazing today! We discussed "Educated" by Tara Westover. Such a powerful memoir about education and family. Highly recommend! 📖💭',
      bookMentioned: {
        title: 'Educated',
        author: 'Tara Westover',
        cover: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=200&h=300&fit=crop'
      },
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      ],
      likes: 18,
      comments: 6,
      shares: 2,
      isLiked: false
    }
  ]);

  // Mock comments data
  const [commentsData, setCommentsData] = useState({
    1: [
      {
        id: 1,
        userName: 'Mike Chen',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        content: 'I loved this book too! The plot twists were incredible.',
        timestamp: Date.now() - 900000,
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        userName: 'Lisa Thompson',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
        content: 'Adding this to my reading list right now! 📝',
        timestamp: Date.now() - 600000,
        likes: 3,
        isLiked: true
      }
    ],
    2: [
      {
        id: 3,
        userName: 'David Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        content: 'Dune is a masterpiece! Have you read the sequels yet?',
        timestamp: Date.now() - 1800000,
        likes: 8,
        isLiked: false
      }
    ],
    3: [
      {
        id: 4,
        userName: 'Rachel Green',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        content: 'Our book club sounds amazing! How can I join?',
        timestamp: Date.now() - 3600000,
        likes: 2,
        isLiked: false
      }
    ]
  });

  // Handlers with toast notifications
  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      userName: user.name,
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      timestamp: Date.now(),
      content: postData.content,
      bookMentioned: postData.bookMentioned,
      images: postData.images || [],
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };
    
    setPosts([newPost, ...posts]);
    
    // Success toast
    toast.success('📚 Your post has been shared!', {
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
  };

  const handleLikePost = (postId) => {
    const post = posts.find(p => p.id === postId);
    const wasLiked = post.isLiked;
    
    setPosts(posts.map(p => 
      p.id === postId 
        ? { 
            ...p, 
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1
          }
        : p
    ));

    // Toast notification
    if (!wasLiked) {
      toast.success('❤️ Post liked!', {
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
    }
  };

  const handleAddComment = (postId, commentContent) => {
    const newComment = {
      id: Date.now(),
      userName: user.name,
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: commentContent,
      timestamp: Date.now(),
      likes: 0,
      isLiked: false
    };

    setCommentsData({
      ...commentsData,
      [postId]: [...(commentsData[postId] || []), newComment]
    });

    // Update comments count on post
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));

    // Toast notification
    toast.success('💬 Comment added!', {
      duration: 2000,
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
  };

  const handleLikeComment = (postId, commentId) => {
    const comment = commentsData[postId].find(c => c.id === commentId);
    const wasLiked = comment.isLiked;

    setCommentsData({
      ...commentsData,
      [postId]: commentsData[postId].map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    });

    // Toast notification for comment likes
    if (!wasLiked) {
      toast.success('👍 Comment liked!', {
        duration: 1500,
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
    }
  };

  const quickActions = [
    { 
      icon: MdCreate, 
      text: 'Create New Post', 
      action: () => {
        // Scroll to the create post section
        const createPostElement = document.querySelector('[class*="createPost"]');
        if (createPostElement) {
          createPostElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Focus on the textarea after scrolling
          setTimeout(() => {
            const textarea = createPostElement.querySelector('textarea');
            if (textarea) {
              textarea.focus();
            }
          }, 500);
        }
        toast('📝 Ready to share your thoughts!', {
          duration: 2000,
          position: 'top-right',
        });
      }
    },
    { 
      icon: MdSearch, 
      text: 'Discover Books', 
      action: () => {
        window.location.href = '/books';
        toast('🔍 Exploring books...', {
          duration: 2000,
          position: 'top-right',
        });
      }
    },
    { 
      icon: MdFavorite, 
      text: 'My Favorite', 
      action: () => {
        window.location.href = '/favorites';
        toast('❤️ Opening your favorites...', {
          duration: 2000,
          position: 'top-right',
        });
      }
    },
    { 
      icon: MdNotifications, 
      text: 'Notifications', 
      action: () => {
        window.location.href = '/notifications';
        toast('🔔 Checking notifications...', {
          duration: 2000,
          position: 'top-right',
        });
      }
    }
  ];

  return (
    <div className={style.container}>
      {/* Hero Section */}
      <motion.div 
        className={style.heroSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>
            <MdGroup className={style.heroIcon} />
            Book Community
          </h1>
          <p className={style.heroSubtitle}>
            Connect with fellow book lovers, share your reading journey, and discover your next favorite story
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className={style.quickActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={style.actionsGrid}>
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              className={style.actionItem}
              onClick={action.action}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <action.icon className={style.actionIcon} />
              <span className={style.actionText}>{action.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className={style.mainContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Content Area */}
        <div className={style.contentArea}>
          <div className={style.card}>
            <CreatePost onCreatePost={handleCreatePost} />
          </div>
          
          <div className={style.card}>
            <PostFeed 
              posts={posts}
              commentsData={commentsData}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className={style.sidebar}>
          <div className={style.card}>
            <TrendingSidebar />
          </div>
          
          <div className={style.card}>
            <SuggestedSidebar />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Community; 