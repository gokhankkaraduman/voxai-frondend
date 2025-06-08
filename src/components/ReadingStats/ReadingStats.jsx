import React from 'react';
import { FaBook, FaClock, FaHeadphones, FaFire, FaTrophy, FaCalendarDay } from 'react-icons/fa';
import style from './ReadingStats.module.css';

const ReadingStats = () => {
  // Mock data - will be replaced with real data from backend
  const stats = {
    totalBooks: 24,
    totalHours: 156,
    currentStreak: 7,
    booksThisMonth: 3,
    avgPerWeek: 2.5,
    favoriteGenre: 'Science Fiction',
    longestSession: '4h 32m',
    completionRate: 89
  };

  const recentActivity = [
    { date: '2024-01-15', book: 'Atomic Habits', duration: '2h 15m', completed: false },
    { date: '2024-01-14', book: 'The Psychology of Money', duration: '1h 45m', completed: true },
    { date: '2024-01-13', book: 'Sapiens', duration: '3h 10m', completed: false },
  ];

  const monthlyGoal = {
    target: 4,
    current: 3,
    percentage: 75
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Reading Statistics</h2>
        <p className={style.subtitle}>Track your progress and achievements</p>
      </div>

      {/* Main Stats Grid */}
      <div className={style.statsGrid}>
        <div className={style.statCard}>
          <div className={style.statIcon}>
            <FaBook />
          </div>
          <div className={style.statContent}>
            <h3 className={style.statNumber}>{stats.totalBooks}</h3>
            <p className={style.statLabel}>Books Read</p>
          </div>
        </div>

        <div className={style.statCard}>
          <div className={style.statIcon}>
            <FaClock />
          </div>
          <div className={style.statContent}>
            <h3 className={style.statNumber}>{stats.totalHours}h</h3>
            <p className={style.statLabel}>Total Hours</p>
          </div>
        </div>

        <div className={style.statCard}>
          <div className={style.statIcon}>
            <FaFire />
          </div>
          <div className={style.statContent}>
            <h3 className={style.statNumber}>{stats.currentStreak}</h3>
            <p className={style.statLabel}>Day Streak</p>
          </div>
        </div>

        <div className={style.statCard}>
          <div className={style.statIcon}>
            <FaCalendarDay />
          </div>
          <div className={style.statContent}>
            <h3 className={style.statNumber}>{stats.booksThisMonth}</h3>
            <p className={style.statLabel}>This Month</p>
          </div>
        </div>
      </div>

      {/* Monthly Goal */}
      <div className={style.goalSection}>
        <h3 className={style.goalTitle}>Monthly Goal</h3>
        <div className={style.goalProgress}>
          <div className={style.goalInfo}>
            <span>{monthlyGoal.current} of {monthlyGoal.target} books</span>
            <span className={style.goalPercentage}>{monthlyGoal.percentage}%</span>
          </div>
          <div className={style.progressBar}>
            <div 
              className={style.progressFill}
              style={{ width: `${monthlyGoal.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className={style.additionalStats}>
        <div className={style.additionalGrid}>
          <div className={style.additionalItem}>
            <FaHeadphones className={style.additionalIcon} />
            <div>
              <p className={style.additionalLabel}>Longest Session</p>
              <p className={style.additionalValue}>{stats.longestSession}</p>
            </div>
          </div>
          
          <div className={style.additionalItem}>
            <FaTrophy className={style.additionalIcon} />
            <div>
              <p className={style.additionalLabel}>Completion Rate</p>
              <p className={style.additionalValue}>{stats.completionRate}%</p>
            </div>
          </div>
          
          <div className={style.additionalItem}>
            <FaBook className={style.additionalIcon} />
            <div>
              <p className={style.additionalLabel}>Favorite Genre</p>
              <p className={style.additionalValue}>{stats.favoriteGenre}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={style.activitySection}>
        <h3 className={style.activityTitle}>Recent Activity</h3>
        <div className={style.activityList}>
          {recentActivity.map((activity, index) => (
            <div key={index} className={style.activityItem}>
              <div className={style.activityDate}>
                {new Date(activity.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className={style.activityContent}>
                <p className={style.activityBook}>{activity.book}</p>
                <p className={style.activityDuration}>{activity.duration}</p>
              </div>
              <div className={`${style.activityStatus} ${activity.completed ? style.completed : style.inProgress}`}>
                {activity.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingStats; 