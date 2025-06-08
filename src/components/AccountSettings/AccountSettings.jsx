import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { 
  FaLock, 
  FaBell, 
  FaEye, 
  FaEyeSlash, 
  FaTrash, 
  FaUserShield,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaUser,
  FaEnvelope
} from 'react-icons/fa';
import style from './AccountSettings.module.css';

const AccountSettings = () => {
  const { user, updateUserProfile, updateSettings } = useUser();
  const [settings, setSettings] = useState({
    // Privacy Settings
    profileVisibility: 'public',
    showReadingActivity: true,
    showBookmarks: false,
    allowRecommendations: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    newBookAlerts: true,
    
    // Account Security
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Data & Privacy
    dataCollection: false,
    thirdPartySharing: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [accountData, setAccountData] = useState({
    email: user.email,
    username: user.username,
    phone: user.phone
  });

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAccountDataChange = (field, value) => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveChanges = () => {
    // Update global state with toast notification
    updateUserProfile(accountData);
    updateSettings('account', settings);
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Updating password...');
    // Here you would update password
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      // Here you would delete account
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Account Settings</h2>
        <p className={style.subtitle}>Manage your account preferences and security</p>
      </div>

      {/* Account Information */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaUser />
          Account Information
        </h3>
        <div className={style.inputGrid}>
          <div className={style.inputGroup}>
            <label className={style.label}>Email Address</label>
            <input
              type="email"
              value={accountData.email}
              onChange={(e) => handleAccountDataChange('email', e.target.value)}
              className={style.input}
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}>Username</label>
            <input
              type="text"
              value={accountData.username}
              onChange={(e) => handleAccountDataChange('username', e.target.value)}
              className={style.input}
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}>Phone Number</label>
            <input
              type="tel"
              value={accountData.phone}
              onChange={(e) => handleAccountDataChange('phone', e.target.value)}
              className={style.input}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaUserShield />
          Privacy Settings
        </h3>
        <div className={style.settingsGrid}>
          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Profile Visibility</h4>
              <p>Who can see your profile</p>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
              className={style.select}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Show Reading Activity</h4>
              <p>Display your reading progress to others</p>
            </div>
            <button
              onClick={() => handleSettingToggle('showReadingActivity')}
              className={style.toggle}
            >
              {settings.showReadingActivity ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Show Bookmarks</h4>
              <p>Make your saved books visible to others</p>
            </div>
            <button
              onClick={() => handleSettingToggle('showBookmarks')}
              className={style.toggle}
            >
              {settings.showBookmarks ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Allow Recommendations</h4>
              <p>Receive personalized book suggestions</p>
            </div>
            <button
              onClick={() => handleSettingToggle('allowRecommendations')}
              className={style.toggle}
            >
              {settings.allowRecommendations ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaBell />
          Notifications
        </h3>
        <div className={style.settingsGrid}>
          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <button
              onClick={() => handleSettingToggle('emailNotifications')}
              className={style.toggle}
            >
              {settings.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Push Notifications</h4>
              <p>Get notified on your device</p>
            </div>
            <button
              onClick={() => handleSettingToggle('pushNotifications')}
              className={style.toggle}
            >
              {settings.pushNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Weekly Digest</h4>
              <p>Summary of your reading activity</p>
            </div>
            <button
              onClick={() => handleSettingToggle('weeklyDigest')}
              className={style.toggle}
            >
              {settings.weeklyDigest ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaLock />
          Security
        </h3>
        
        {/* Change Password */}
        <div className={style.passwordSection}>
          <h4 className={style.subTitle}>Change Password</h4>
          <div className={style.passwordGrid}>
            <div className={style.passwordGroup}>
              <label className={style.label}>Current Password</label>
              <div className={style.passwordInput}>
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className={style.input}
                />
                <button
                  onClick={() => togglePasswordVisibility('current')}
                  className={style.eyeButton}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={style.passwordGroup}>
              <label className={style.label}>New Password</label>
              <div className={style.passwordInput}>
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className={style.input}
                />
                <button
                  onClick={() => togglePasswordVisibility('new')}
                  className={style.eyeButton}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={style.passwordGroup}>
              <label className={style.label}>Confirm New Password</label>
              <div className={style.passwordInput}>
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className={style.input}
                />
                <button
                  onClick={() => togglePasswordVisibility('confirm')}
                  className={style.eyeButton}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <button onClick={handlePasswordUpdate} className={style.updateButton}>
            Update Password
          </button>
        </div>

        {/* Security Options */}
        <div className={style.settingsGrid}>
          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Two-Factor Authentication</h4>
              <p>Add extra security to your account</p>
            </div>
            <button
              onClick={() => handleSettingToggle('twoFactorAuth')}
              className={style.toggle}
            >
              {settings.twoFactorAuth ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.settingItem}>
            <div className={style.settingInfo}>
              <h4>Login Alerts</h4>
              <p>Get notified of new sign-ins</p>
            </div>
            <button
              onClick={() => handleSettingToggle('loginAlerts')}
              className={style.toggle}
            >
              {settings.loginAlerts ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={style.actionButtons}>
        <button onClick={handleSaveChanges} className={style.saveButton}>
          <FaSave />
          Save Changes
        </button>
        <button onClick={handleDeleteAccount} className={style.deleteButton}>
          <FaTrash />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings; 