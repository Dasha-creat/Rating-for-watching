import React from 'react';
import { Roza } from '../../../shared/ui/index';

interface IElement {
  id: string;  
  name: string;  
}

interface IGradesData {
  [subjectId: string]: number;
}

interface IRozaScheme {
  gradesData: IGradesData;
  elements: IElement[];
  isLoading: boolean;
}

export const RozaScheme: React.FC<IRozaScheme> = ({ gradesData, elements, isLoading }) => {
  return (
    <Roza
      gradesData={gradesData}
      elements={elements}
      isLoading={isLoading}
    />
  );
};
