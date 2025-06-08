import React, { useState } from 'react';
import { 
  FaPalette,
  FaVolumeUp,
  FaEye,
  FaGlobe,
  FaBook,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaFont,
  FaClock,
  FaForward
} from 'react-icons/fa';
import style from './Preferences.module.css';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    // Reading Preferences
    readingSpeed: 'normal',
    autoPlayNext: false,
    rememberPosition: true,
    sleepTimer: false,
    defaultSleepTime: 30,
    
    // Audio Preferences
    playbackSpeed: 1.0,
    voiceGender: 'female',
    audioQuality: 'high',
    skipSilence: true,
    
    // Display Preferences
    theme: 'dark',
    fontSize: 'medium',
    fontFamily: 'Inter',
    highlightColor: '#6366f1',
    
    // Language & Region
    language: 'en',
    region: 'US',
    timeFormat: '12h',
    dateFormat: 'MM/DD/YYYY',
    
    // Content Preferences
    preferredGenres: ['fiction', 'science'],
    contentRating: 'all',
    showExplicitContent: true,
    
    // Advanced Settings
    preloadChapters: true,
    offlineMode: false,
    dataSaver: false,
    backgroundPlay: true
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGenreToggle = (genre) => {
    setPreferences(prev => ({
      ...prev,
      preferredGenres: prev.preferredGenres.includes(genre)
        ? prev.preferredGenres.filter(g => g !== genre)
        : [...prev.preferredGenres, genre]
    }));
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    // Here you would save to backend/localStorage
  };

  const playbackSpeeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const fontSizes = ['small', 'medium', 'large', 'xl'];
  const fontFamilies = ['Inter', 'Roboto', 'Open Sans', 'Playfair Display', 'Merriweather'];
  const themes = ['light', 'dark', 'sepia', 'contrast'];
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'tr', name: 'Türkçe' }
  ];
  const genres = [
    'fiction', 'non-fiction', 'science', 'history', 'biography', 
    'mystery', 'romance', 'fantasy', 'self-help', 'business'
  ];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Preferences</h2>
        <p className={style.subtitle}>Customize your reading experience</p>
      </div>

      {/* Reading Preferences */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaBook />
          Reading Preferences
        </h3>
        <div className={style.preferenceGrid}>
          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Reading Speed</h4>
              <p>Preferred reading pace</p>
            </div>
            <select
              value={preferences.readingSpeed}
              onChange={(e) => handlePreferenceChange('readingSpeed', e.target.value)}
              className={style.select}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Auto-play Next Chapter</h4>
              <p>Continue to next chapter automatically</p>
            </div>
            <button
              onClick={() => handleToggle('autoPlayNext')}
              className={style.toggle}
            >
              {preferences.autoPlayNext ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Remember Reading Position</h4>
              <p>Save your progress automatically</p>
            </div>
            <button
              onClick={() => handleToggle('rememberPosition')}
              className={style.toggle}
            >
              {preferences.rememberPosition ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Sleep Timer</h4>
              <p>Enable sleep timer feature</p>
            </div>
            <button
              onClick={() => handleToggle('sleepTimer')}
              className={style.toggle}
            >
              {preferences.sleepTimer ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          {preferences.sleepTimer && (
            <div className={style.preferenceItem}>
              <div className={style.preferenceInfo}>
                <h4>Default Sleep Time</h4>
                <p>Minutes until auto-stop</p>
              </div>
              <input
                type="number"
                min="5"
                max="120"
                value={preferences.defaultSleepTime}
                onChange={(e) => handlePreferenceChange('defaultSleepTime', parseInt(e.target.value))}
                className={style.numberInput}
              />
            </div>
          )}
        </div>
      </div>

      {/* Audio Preferences */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaVolumeUp />
          Audio Preferences
        </h3>
        <div className={style.preferenceGrid}>
          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Playback Speed</h4>
              <p>Audio playback speed multiplier</p>
            </div>
            <select
              value={preferences.playbackSpeed}
              onChange={(e) => handlePreferenceChange('playbackSpeed', parseFloat(e.target.value))}
              className={style.select}
            >
              {playbackSpeeds.map(speed => (
                <option key={speed} value={speed}>{speed}x</option>
              ))}
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Preferred Voice</h4>
              <p>AI voice gender preference</p>
            </div>
            <select
              value={preferences.voiceGender}
              onChange={(e) => handlePreferenceChange('voiceGender', e.target.value)}
              className={style.select}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Audio Quality</h4>
              <p>Streaming audio quality</p>
            </div>
            <select
              value={preferences.audioQuality}
              onChange={(e) => handlePreferenceChange('audioQuality', e.target.value)}
              className={style.select}
            >
              <option value="low">Low (64kbps)</option>
              <option value="medium">Medium (128kbps)</option>
              <option value="high">High (256kbps)</option>
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Skip Silence</h4>
              <p>Automatically skip long pauses</p>
            </div>
            <button
              onClick={() => handleToggle('skipSilence')}
              className={style.toggle}
            >
              {preferences.skipSilence ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaEye />
          Display Preferences
        </h3>
        <div className={style.preferenceGrid}>
          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Theme</h4>
              <p>App appearance theme</p>
            </div>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className={style.select}
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Font Size</h4>
              <p>Text size in reading view</p>
            </div>
            <select
              value={preferences.fontSize}
              onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
              className={style.select}
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Font Family</h4>
              <p>Text font for reading</p>
            </div>
            <select
              value={preferences.fontFamily}
              onChange={(e) => handlePreferenceChange('fontFamily', e.target.value)}
              className={style.select}
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Highlight Color</h4>
              <p>Color for text highlights</p>
            </div>
            <input
              type="color"
              value={preferences.highlightColor}
              onChange={(e) => handlePreferenceChange('highlightColor', e.target.value)}
              className={style.colorInput}
            />
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaGlobe />
          Language & Region
        </h3>
        <div className={style.preferenceGrid}>
          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Language</h4>
              <p>App interface language</p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className={style.select}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Time Format</h4>
              <p>12-hour or 24-hour format</p>
            </div>
            <select
              value={preferences.timeFormat}
              onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
              className={style.select}
            >
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Preferences */}
      <div className={style.section}>
        <h3 className={style.sectionTitle}>
          <FaPalette />
          Content Preferences
        </h3>
        
        <div className={style.genreSection}>
          <h4 className={style.genreTitle}>Preferred Genres</h4>
          <div className={style.genreGrid}>
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`${style.genreButton} ${
                  preferences.preferredGenres.includes(genre) ? style.active : ''
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={style.preferenceGrid}>
          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Content Rating</h4>
              <p>Age-appropriate content filter</p>
            </div>
            <select
              value={preferences.contentRating}
              onChange={(e) => handlePreferenceChange('contentRating', e.target.value)}
              className={style.select}
            >
              <option value="all">All Ages</option>
              <option value="teen">Teen (13+)</option>
              <option value="mature">Mature (17+)</option>
              <option value="adult">Adult Only</option>
            </select>
          </div>

          <div className={style.preferenceItem}>
            <div className={style.preferenceInfo}>
              <h4>Show Explicit Content</h4>
              <p>Display books with mature themes</p>
            </div>
            <button
              onClick={() => handleToggle('showExplicitContent')}
              className={style.toggle}
            >
              {preferences.showExplicitContent ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={style.saveSection}>
        <button onClick={handleSave} className={style.saveButton}>
          <FaSave />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences; 