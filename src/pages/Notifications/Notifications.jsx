import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdNotifications, 
  MdDoneAll,
  MdDelete,
  MdSettings
} from 'react-icons/md';
import toast from 'react-hot-toast';
import style from './Notifications.module.css';

// Components
import NotificationItem from '../../components/Notifications/NotificationItem/NotificationItem';
import NotificationFilter from '../../components/Notifications/NotificationFilter/NotificationFilter';
import NotificationSettings from '../../components/Notifications/NotificationSettings/NotificationSettings';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
        username: '@sarah_reads'
      },
      content: 'liked your post about "The Seven Husbands of Evelyn Hugo"',
      postContent: 'Just finished reading this masterpiece! The storytelling was absolutely incredible...',
      timestamp: Date.now() - 300000, // 5 minutes ago
      isRead: false,
      bookMentioned: 'The Seven Husbands of Evelyn Hugo'
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Alex Martinez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        username: '@alex_adventures'
      },
      content: 'commented on your post',
      comment: 'I completely agree! This book changed my perspective on storytelling.',
      postContent: 'Just finished reading this masterpiece! The storytelling was absolutely incredible...',
      timestamp: Date.now() - 900000, // 15 minutes ago
      isRead: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        username: '@emma_bookclub'
      },
      content: 'started following you',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      isRead: true
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        username: '@mike_reads'
      },
      content: 'mentioned you in a comment',
      comment: '@johndoe you should definitely read this book! It reminds me of your favorite genre.',
      postContent: 'Looking for book recommendations in the fantasy genre...',
      timestamp: Date.now() - 3600000, // 1 hour ago
      isRead: true
    },
    {
      id: 5,
      type: 'book_recommendation',
      user: {
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
        username: '@lisa_fantasy'
      },
      content: 'recommended a book to you',
      bookMentioned: 'The Name of the Wind',
      bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
      timestamp: Date.now() - 7200000, // 2 hours ago
      isRead: true
    },
    {
      id: 6,
      type: 'reading_challenge',
      content: 'Congratulations! You\'ve reached 15 books in your 2024 reading challenge 🎉',
      timestamp: Date.now() - 10800000, // 3 hours ago
      isRead: false,
      isSystem: true
    },
    {
      id: 7,
      type: 'book_club',
      content: 'New discussion started in "Sci-Fi Enthusiasts" book club',
      clubName: 'Sci-Fi Enthusiasts',
      bookMentioned: 'Dune',
      timestamp: Date.now() - 14400000, // 4 hours ago
      isRead: true,
      isSystem: true
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'mention').length }
  ];

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'mentions':
        return notifications.filter(n => n.type === 'mention');
      default:
        return notifications;
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('✅ All notifications marked as read!');
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
    toast.success('🗑️ Notification deleted!');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('🧹 All notifications cleared!');
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className={style.container}>
      {/* Hero Section */}
      <motion.div 
        className={style.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={style.headerContent}>
          <h1 className={style.title}>
            <MdNotifications className={style.titleIcon} />
            Notifications
            {unreadCount > 0 && (
              <span className={style.unreadBadge}>{unreadCount}</span>
            )}
          </h1>
          <p className={style.subtitle}>
            Stay updated with your reading community activities
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className={style.headerActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <button 
          className={style.actionBtn}
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <MdDoneAll />
          Mark All Read
        </button>
        <button 
          className={style.actionBtn}
          onClick={handleClearAll}
          disabled={notifications.length === 0}
        >
          <MdDelete />
          Clear All
        </button>
        <button 
          className={style.settingsBtn}
          onClick={handleOpenSettings}
        >
          <MdSettings />
          Settings
        </button>
      </motion.div>

      {/* Filter Section */}
      <motion.div 
        className={style.filterSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <NotificationFilter 
          filterOptions={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </motion.div>

      {/* Notifications Section */}
      <motion.section 
        className={style.notificationsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className={style.notificationsList}>
          <AnimatePresence mode="wait">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <NotificationItem 
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDeleteNotification}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className={style.emptyState}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <MdNotifications className={style.emptyIcon} />
                <h3 className={style.emptyTitle}>No notifications found</h3>
                <p className={style.emptyText}>
                  {activeFilter === 'all' 
                    ? "You're all caught up! New notifications will appear here."
                    : `No ${activeFilter} notifications at the moment.`
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Settings Modal */}
      <NotificationSettings 
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
      />
    </div>
  );
};

export default Notifications; 