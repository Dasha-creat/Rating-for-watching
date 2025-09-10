import { useState, useEffect, useRef } from 'react';

interface IElement {
  id: string;
  name: string;
}

export const useLimitDropdown = (
  elements: IElement[],
  onChange: (selected: IElement[]) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleItemSelection = (id: string) => {
    setError('');
    let updatedSelectedItems;
    if (selectedItems.includes(id)) {
      updatedSelectedItems = selectedItems.filter(selectedId => selectedId !== id);
    } else {
      if (selectedItems.length >= 8) {
        setError('Максимум 8 критериев.');
        return;
      }
      updatedSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems.map(id => elements.find(el => el.id === id)!));
  };

  useEffect(() => {
    if (selectedItems.length < 3 && !isOpen) {
      setError('Минимум 3 критерия.');
    } else if (selectedItems.length > 8) {
      setError('Максимум 8 критериев.');
    } else {
      setError('');
    }
  }, [isOpen, selectedItems.length]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    selectedItems,
    toggleItemSelection,
    error,
    dropdownRef
  };
};