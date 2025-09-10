import { StudentDropdown } from '../../../shared/ui/index'

interface IStudentSelectButton {
  elements: Array<{ name: string; id: string; groupName: string; }>;
  onSelect: (id: string) => void;
  title: string;
};

export const StudentSelectButton: React.FC<IStudentSelectButton> = ({ elements, onSelect, title }) => {
  return (
    <StudentDropdown
      elements={elements} 
      title={title} 
      property="name" 
      onSelect={onSelect}
    />
  )
}