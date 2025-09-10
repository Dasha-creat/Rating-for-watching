import React, { useState } from 'react';
import { arrow } from '../../../assets/index';
import { useSearchDropdown } from '../../../hooks/useSearchDropdown';
import './SearchDropdown.css';

interface IStudent {
  name: string;
  id: string;
  groupName: string;
}

interface ISearchDropdown {
  elements: IStudent[];
  title: string;
  property?: keyof IStudent;
  onSelect: (id: string) => void;
}

export const SearchDropdown: React.FC<ISearchDropdown> = ({ elements, title, onSelect }) => {
  const {
    isOpen,
    searchTerm,
    dropdownRef,
    filteredElements,
    handleToggleDropdown,
    handleSearchChange,
  } = useSearchDropdown(elements);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="custom-button button main-button"
      >
        <div className="button-items four">
          {selectedId || title}
          <img src={arrow} alt="arrow" width={"25rem"} />
        </div>
      </button>
      {isOpen && (
        <div className="student-list">
          <div className="mini-student-list ">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Поиск..."
              className="input"
            />
          </div>
          <div className="list">
          {filteredElements.map((post) => (
            <div
              key={post.id}
              onClick={() => handleItemClick(post.id)}
              className={`button hover:fourtwo student four ${selectedId === post.id ? 'selected-class' : ''}`}
            >
              {post.id}
           </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};