import React from 'react';
import { SubjectDrodown } from '../../../shared/ui/index';

interface ISubjectSelectButton {
  items: { id: string; name: string }[];
  title: string;
  onChange: (selectedItems: { id: string; name: string }[]) => void;
}

export const SubjectSelectButton: React.FC<ISubjectSelectButton> = ({ items, title, onChange }) => {
  return (
    <SubjectDrodown
      title={title}
      items={items} 
      onChange={onChange}
    />
  );
};