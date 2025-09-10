import React from 'react';
import { RozaForPeriods } from '../../../shared/ui/index';

interface IElement {
  id: string;
  name: string;
}

interface IGradesData {
  [subjectId: string]: number;
}

interface IRozaSchemeForPeriodsProps {
  gradesDataFirst: IGradesData;
  gradesDataSecond: IGradesData;
  elements: IElement[];
  isLoading: boolean;
  firstPeriodLabel: string; 
  secondPeriodLabel: string;
}

export const RozaSchemeForPeriods: React.FC<IRozaSchemeForPeriodsProps> = ({
  gradesDataFirst,
  gradesDataSecond,
  elements,
  isLoading,
  firstPeriodLabel,
  secondPeriodLabel, 
}) => {
  return (
    <RozaForPeriods
      gradesDataFirst={gradesDataFirst}
      gradesDataSecond={gradesDataSecond}
      elements={elements}
      isLoading={isLoading}
      firstPeriodLabel={firstPeriodLabel}
      secondPeriodLabel={secondPeriodLabel} 
    />
  );
};