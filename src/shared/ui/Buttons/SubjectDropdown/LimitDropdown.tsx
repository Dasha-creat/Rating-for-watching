import React, { useEffect, useState } from 'react';
import { useLimitDropdown } from '../../../hooks/useLimitDropdown';
import { fetchSubjects, Subject } from '../../../../entities/Subject/index';
import './Limitdropdown.css';

interface ILimitDropdownProps {
  title: string;
  onChange: (selected: Subject[]) => void;
  items: Subject[];
}

export const LimitDropdown: React.FC<ILimitDropdownProps> = ({ title, onChange, items }) => {
  const [elements, setElements] = useState<Subject[]>(items);

  useEffect(() => {
    if (items.length > 0) {
      setElements(items);
    } else {
      const getSubjects = async () => {
        try {
          const subjectsData = await fetchSubjects();
          const subjects = subjectsData.map((subject) => new Subject(subject.id, subject.name));
          setElements(subjects);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
      getSubjects();
    }
  }, [items]);

  const {
    isOpen,
    setIsOpen,
    selectedItems,
    toggleItemSelection,
    error,
    dropdownRef,
  } = useLimitDropdown(elements, onChange);

  return (
    <div className="main-div" ref={dropdownRef}>
      {error && <div className="error-text">{error}</div>}
      <button onClick={() => setIsOpen(!isOpen)} className="button criteria-button custom-button">
        {title}
      </button>
      {isOpen && (
        <div className="container">
          <div className="mini-container">
            {elements.map(({ id, name }) => (
              <a
                key={id}
                className={`dropdown-common ${selectedItems.includes(id) ? 'fourtwo dropdown-includes' : 'button four'}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleItemSelection(id);
                }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};