import React from 'react';
import { MdFilterList } from 'react-icons/md';
import style from './NotificationFilter.module.css';

const NotificationFilter = ({ filterOptions, activeFilter, onFilterChange }) => {
  return (
    <div className={style.filterContainer}>
      <div className={style.filterHeader}>
        <MdFilterList className={style.filterIcon} />
        <span className={style.filterLabel}>Filter by</span>
      </div>
      
      <div className={style.filterOptions}>
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={`${style.filterBtn} ${activeFilter === option.id ? style.active : ''}`}
            onClick={() => onFilterChange(option.id)}
          >
            <span className={style.filterText}>{option.label}</span>
            {option.count > 0 && (
              <span className={style.filterCount}>{option.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationFilter; 