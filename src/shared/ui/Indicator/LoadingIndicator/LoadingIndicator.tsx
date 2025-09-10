import React from 'react';
import './LoadingIndicator.css';

interface ILoadingIndicator {
  text: string;
};

export const LoadingIndicator: React.FC<ILoadingIndicator> = ({ text }) => (
  <div className="loading-indicator">
    <p className="loading-text">{text}</p>
    <div className="loading-spinner"></div>
  </div>
);