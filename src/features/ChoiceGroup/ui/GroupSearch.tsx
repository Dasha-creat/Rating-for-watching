import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { GroupDropdown } from '../../../shared/ui/index';

interface IGroupSelectButton {
  elements: Array<{ name: string; id: string; }>;
  onSelect: (name: string, id: string) => void;
  title: string;
};

export const GroupSelectButton: React.FC<IGroupSelectButton> = ({ onSelect, title }) => {
  const groups = useSelector((state: RootState) => state.mainPage.groups);

  return (
    <GroupDropdown
      elements={groups} 
      title={title}  
      onSelect={onSelect} 
    />
  );
};
