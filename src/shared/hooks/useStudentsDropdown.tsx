import { useState, useRef, useEffect } from 'react';

export const useStudentsDropdown = (onStudentsChange: (selectedStudents: { id: string; name: string, groupName: string }[]) => void) => {
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string, groupName: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (id: string, name: string, groupName: string) => {
    setError('');
    if (selectedStudents.some(student => student.id === id)) {
      const updatedStudents = selectedStudents.filter(student => student.id !== id);
      setSelectedStudents(updatedStudents);
      onStudentsChange(updatedStudents);
    } else if (selectedStudents.length < 2) {
      const updatedStudents = [...selectedStudents, { id, name, groupName }];
      setSelectedStudents(updatedStudents);
      onStudentsChange(updatedStudents);
    } else {
      setError('Нельзя выбрать больше двух.');
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayTitle =
    selectedStudents.length === 2
      ? `${selectedStudents.map(student => student.id).join(', ')}`
      : 'Выбрать студентов';

  return {
    isOpen,
    error,
    selectedStudents,
    dropdownRef,
    handleSelect,
    toggleDropdown,
    displayTitle,
    searchTerm,
    handleSearchChange,
  };
};