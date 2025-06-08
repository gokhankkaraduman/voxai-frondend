import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaUser, FaChartBar, FaCog, FaHeart } from 'react-icons/fa';

// Import Profile Components
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ReadingStats from '../../components/ReadingStats/ReadingStats';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import Preferences from '../../components/Preferences/Preferences';

import style from './Profile.module.css';

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // URL'deki tab parametresini kontrol et
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'stats', 'settings', 'preferences'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Tab değiştiğinde URL'i güncelle
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUser },
    { id: 'stats', label: 'Statistics', icon: FaChartBar },
    { id: 'settings', label: 'Account', icon: FaCog },
    { id: 'preferences', label: 'Preferences', icon: FaHeart }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={style.overviewContent}>
            <ProfileHeader />
            <ReadingStats />
          </div>
        );
      case 'stats':
        return <ReadingStats />;
      case 'settings':
        return <AccountSettings />;
      case 'preferences':
        return <Preferences />;
      default:
        return (
          <div className={style.overviewContent}>
            <ProfileHeader />
            <ReadingStats />
          </div>
        );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.profileContainer}>
        {/* Tab Navigation */}
        <div className={style.tabNavigation}>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`${style.tabButton} ${
                  activeTab === tab.id ? style.active : ''
                }`}
              >
                <IconComponent />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className={style.contentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile; 