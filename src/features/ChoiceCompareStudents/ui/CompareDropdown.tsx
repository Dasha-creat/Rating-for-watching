import React from 'react';
import { CompareStudentsDropdown } from '../../../shared/ui/index';

interface ICompareButton {
  elements: Array<{ id: string; name: string }>;
  onStudentsChange: (selectedStudents: { id: string; name: string }[]) => void;
}

export const TwoStudentsSelectButton: React.FC<ICompareButton> = ({ elements, onStudentsChange }) => {
  return (
    <CompareStudentsDropdown 
      elements={elements} 
      onStudentsChange={onStudentsChange}
    />
  );
};