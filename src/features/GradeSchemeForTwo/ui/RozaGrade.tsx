import React from 'react';
import { RozaForTwo } from '../../../shared/ui/index';

interface IElement {
  id: string;  
  name: string;  
}

interface IGradesData {
  [studentId: string]: { 
    [subjectId: string]: number;
};
}

interface IRozaScheme {
  gradesForTwo: IGradesData | undefined;
  elements: IElement[];
  isLoading: boolean;
}

export const RozaSchemeForTwo: React.FC<IRozaScheme> = ({ gradesForTwo, elements, isLoading }) => {
  return (
    <RozaForTwo
      gradesForTwo={gradesForTwo}
      elements={elements}
      isLoading={isLoading}
    />
  );
};