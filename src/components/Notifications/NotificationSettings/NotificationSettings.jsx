import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdClose,
  MdNotifications,
  MdEmail,
  MdChat,
  MdFavorite,
  MdComment,
  MdPeople,
  MdBook,
  MdGroup,
  MdTrendingUp,
  MdSecurity,
  MdVolumeUp
} from 'react-icons/md';
import style from './NotificationSettings.module.css';

const NotificationSettings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    push: {
      likes: true,
      comments: true,
      follows: true,
      mentions: true,
      bookRecommendations: true,
      clubActivities: false,
      readingChallenges: true,
      systemUpdates: false
    },
    email: {
      likes: false,
      comments: true,
      follows: true,
      mentions: true,
      bookRecommendations: true,
      clubActivities: true,
      readingChallenges: false,
      systemUpdates: false
    },
    sound: true,
    doNotDisturb: false,
    frequency: 'instant' // instant, hourly, daily
  });

  const handleToggle = (category, type) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
  };

  const handleFrequencyChange = (frequency) => {
    setSettings(prev => ({
      ...prev,
      frequency
    }));
  };

  const notificationTypes = [
    { 
      id: 'likes', 
      label: 'Likes', 
      description: 'When someone likes your posts or reviews',
      icon: MdFavorite,
      color: '#ef4444'
    },
    { 
      id: 'comments', 
      label: 'Comments', 
      description: 'When someone comments on your posts',
      icon: MdComment,
      color: '#3b82f6'
    },
    { 
      id: 'follows', 
      label: 'New Followers', 
      description: 'When someone follows you',
      icon: MdPeople,
      color: '#10b981'
    },
    { 
      id: 'mentions', 
      label: 'Mentions', 
      description: 'When someone mentions you in a post or comment',
      icon: MdChat,
      color: '#f59e0b'
    },
    { 
      id: 'bookRecommendations', 
      label: 'Book Recommendations', 
      description: 'When someone recommends a book to you',
      icon: MdBook,
      color: '#8b5cf6'
    },
    { 
      id: 'clubActivities', 
      label: 'Book Club Activities', 
      description: 'Updates from your book clubs',
      icon: MdGroup,
      color: '#ec4899'
    },
    { 
      id: 'readingChallenges', 
      label: 'Reading Challenges', 
      description: 'Updates on your reading progress and achievements',
      icon: MdTrendingUp,
      color: '#06b6d4'
    },
    { 
      id: 'systemUpdates', 
      label: 'System Updates', 
      description: 'Important updates and announcements',
      icon: MdSecurity,
      color: '#64748b'
    }
  ];

  const frequencyOptions = [
    { id: 'instant', label: 'Instant', description: 'Receive notifications immediately' },
    { id: 'hourly', label: 'Hourly', description: 'Receive notifications once per hour' },
    { id: 'daily', label: 'Daily', description: 'Receive notifications once per day' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={style.overlay} onClick={onClose}>
        <motion.div 
          className={style.modal}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={style.header}>
            <div className={style.headerContent}>
              <MdNotifications className={style.headerIcon} />
              <div>
                <h2 className={style.title}>Notification Settings</h2>
                <p className={style.subtitle}>Manage how you receive notifications</p>
              </div>
            </div>
            <button className={style.closeBtn} onClick={onClose}>
              <MdClose />
            </button>
          </div>

          <div className={style.content}>
            {/* General Settings */}
            <div className={style.section}>
              <h3 className={style.sectionTitle}>General Preferences</h3>
              
              <div className={style.generalSettings}>
                <div className={style.settingItem}>
                  <div className={style.settingInfo}>
                    <MdVolumeUp className={style.settingIcon} />
                    <div>
                      <div className={style.settingLabel}>Sound Notifications</div>
                      <div className={style.settingDescription}>Play sound when receiving notifications</div>
                    </div>
                  </div>
                  <button 
                    className={`${style.toggle} ${settings.sound ? style.active : ''}`}
                    onClick={() => setSettings(prev => ({ ...prev, sound: !prev.sound }))}
                  >
                    <div className={style.toggleSlider}></div>
                  </button>
                </div>

                <div className={style.settingItem}>
                  <div className={style.settingInfo}>
                    <MdSecurity className={style.settingIcon} />
                    <div>
                      <div className={style.settingLabel}>Do Not Disturb</div>
                      <div className={style.settingDescription}>Temporarily pause all notifications</div>
                    </div>
                  </div>
                  <button 
                    className={`${style.toggle} ${settings.doNotDisturb ? style.active : ''}`}
                    onClick={() => setSettings(prev => ({ ...prev, doNotDisturb: !prev.doNotDisturb }))}
                  >
                    <div className={style.toggleSlider}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Frequency Settings */}
            <div className={style.section}>
              <h3 className={style.sectionTitle}>Notification Frequency</h3>
              <div className={style.frequencyOptions}>
                {frequencyOptions.map(option => (
                  <button
                    key={option.id}
                    className={`${style.frequencyBtn} ${settings.frequency === option.id ? style.active : ''}`}
                    onClick={() => handleFrequencyChange(option.id)}
                  >
                    <div className={style.frequencyLabel}>{option.label}</div>
                    <div className={style.frequencyDescription}>{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Types */}
            <div className={style.section}>
              <h3 className={style.sectionTitle}>Notification Types</h3>
              
              <div className={style.typeHeader}>
                <div className={style.typeColumn}>Type</div>
                <div className={style.typeColumn}>
                  <MdNotifications />
                  Push
                </div>
                <div className={style.typeColumn}>
                  <MdEmail />
                  Email
                </div>
              </div>

              <div className={style.typesList}>
                {notificationTypes.map(type => {
                  const IconComponent = type.icon;
                  return (
                    <div key={type.id} className={style.typeItem}>
                      <div className={style.typeInfo}>
                        <IconComponent 
                          className={style.typeIcon} 
                          style={{ color: type.color }}
                        />
                        <div>
                          <div className={style.typeLabel}>{type.label}</div>
                          <div className={style.typeDescription}>{type.description}</div>
                        </div>
                      </div>
                      
                      <div className={style.typeControls}>
                        <button 
                          className={`${style.toggle} ${settings.push[type.id] ? style.active : ''}`}
                          onClick={() => handleToggle('push', type.id)}
                        >
                          <div className={style.toggleSlider}></div>
                        </button>
                        
                        <button 
                          className={`${style.toggle} ${settings.email[type.id] ? style.active : ''}`}
                          onClick={() => handleToggle('email', type.id)}
                        >
                          <div className={style.toggleSlider}></div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={style.footer}>
            <button className={style.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={style.saveBtn} onClick={onClose}>
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationSettings; 