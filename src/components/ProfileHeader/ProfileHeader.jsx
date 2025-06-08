import React, { useState } from 'react';
import { FaUser, FaEdit, FaCamera, FaEnvelope, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';
import style from './ProfileHeader.module.css';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile } = useUser();
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
    joinDate: user.joinDate,
    avatar: user.avatar
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Update global state with toast notification
    updateUserProfile(userInfo);
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.avatarSection}>
          <div className={style.avatarContainer}>
            {userInfo.avatar ? (
              <img 
                src={userInfo.avatar} 
                alt="Profile" 
                className={style.avatar}
              />
            ) : (
              <div className={style.avatarPlaceholder}>
                <FaUser />
              </div>
            )}
            <label className={style.avatarEditButton}>
              <FaCamera />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div className={style.userInfo}>
          <div className={style.nameSection}>
            {isEditing ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={style.nameInput}
              />
            ) : (
              <h1 className={style.userName}>{userInfo.name}</h1>
            )}
            <button 
              className={style.editButton}
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              <FaEdit />
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className={style.contactInfo}>
            <div className={style.infoItem}>
              <FaEnvelope />
              {isEditing ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={style.infoInput}
                />
              ) : (
                <span>{userInfo.email}</span>
              )}
            </div>
            <div className={style.infoItem}>
              <FaMapMarkerAlt />
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={style.infoInput}
                />
              ) : (
                <span>{userInfo.location}</span>
              )}
            </div>
            <div className={style.infoItem}>
              <FaCalendar />
              <span>Member since {userInfo.joinDate}</span>
            </div>
          </div>

          <div className={style.bioSection}>
            {isEditing ? (
              <textarea
                value={userInfo.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className={style.bioTextarea}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className={style.bio}>{userInfo.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 