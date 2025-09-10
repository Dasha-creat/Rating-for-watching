import React from 'react';
import { CalendarDropdown } from '../../../shared/ui/index';

interface IGradeCalendarProps {
  value: [Date, Date] | null;
  onChange: (date: [Date, Date] | null) => void;
  title: string;
}

export const GradeCalendar: React.FC<IGradeCalendarProps> = ({ value, onChange, title }) => {
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      onChange([date, date]);
    } else {
      onChange(date);
    }
  };

  return (
    <CalendarDropdown
      value={value}
      title={title}
      onChange={handleDateChange}
    />
  );
};