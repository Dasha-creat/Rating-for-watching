import { useState, useRef, useEffect } from 'react';

interface IStudent {
  name: string;
  id: string;
  groupName: string;
}

export const useSearchDropdown = (elements: IStudent[]) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredElements = elements.filter((element) =>
    element.name && element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return {
    isOpen,
    searchTerm,
    dropdownRef,
    filteredElements,
    handleToggleDropdown,
    handleSearchChange,
    setIsOpen,
  };
};
