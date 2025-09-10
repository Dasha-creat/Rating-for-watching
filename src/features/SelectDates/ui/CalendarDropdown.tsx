import React from 'react';
import { CalendarDropdown } from '../../../shared/ui/index';
import 'react-calendar/dist/Calendar.css';

interface ICalendarSelectButton {
  value: [Date, Date] | null;
  onChange: (date: [Date, Date] | null) => void;
  title: string;
}

export const CalendarSelectButton: React.FC<ICalendarSelectButton> = ({ value, onChange, title }) => {
  return (
    <CalendarDropdown
      onChange={onChange}
      value={value}
      title={title}
    />
  );
};