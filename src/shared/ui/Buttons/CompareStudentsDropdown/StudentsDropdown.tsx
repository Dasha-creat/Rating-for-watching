import React from 'react';
import { useStudentsDropdown } from '../../../hooks/useStudentsDropdown';
import { arrow } from '../../../assets';
import './StudentsDropdown.css';

interface IStudentsDropdown {
  elements: Array<{ id: string; name: string, groupName: string }>;
  onStudentsChange: (selectedStudents: { id: string; name: string, groupName: string }[]) => void;
}

export const StudentsDropdown: React.FC<IStudentsDropdown> = ({ elements, onStudentsChange }) => {
  const {
    isOpen,
    error,
    selectedStudents,
    dropdownRef,
    handleSelect,
    toggleDropdown,
    displayTitle,
    searchTerm,
    handleSearchChange
  } = useStudentsDropdown(onStudentsChange); 

  const filteredElements = elements.filter((element) =>
    element.name && element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="students-dropdown" ref={dropdownRef}>
      {selectedStudents.length < 2 && !error && (
        <div className="error-text">Нужно выбрать двух студентов.</div>
      )}
      {error && <div className="error-text">{error}</div>}
      <button
        onClick={toggleDropdown}
        className="button custom-button extra"
      >
        <div className="textarrow">
          {displayTitle}
          <img src={arrow} alt="arrow" width={"25rem"} />
        </div>
      </button>
      {isOpen && (
      <div className="container">
        <div className="mini-container">
          <div className='mini-input'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Поиск..."
            className="input"
          />
          </div>
          {filteredElements.map(({ id, name, groupName }) => (
            <div
              key={id}
              className={`dropdown-items ${selectedStudents.some(student => student.id === id) ? 'fourtwo dropdown-includes' : 'button four'}`}
              onClick={() => handleSelect(id, name, groupName)}
            >
              {id}
            </div>
          ))}
    </div>
  </div>
)}
    </div>
  );
};