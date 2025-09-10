import React, { useState, useRef, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarSelector.css';

interface ICalendarDropdownProps {
  value: [Date, Date] | null;
  onChange: (date: [Date, Date] | null) => void;
  title: string;
  selectRange?: boolean;
}

export const CalendarSelectButton: React.FC<ICalendarDropdownProps> = ({ value, onChange, title, selectRange = true }) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCalendarChange: CalendarProps['onChange'] = (newValue) => {
    onChange(newValue as [Date, Date] | null);
    setCalendarOpen(false);
  };

  return (
    <div className="main-div">
      <button
        className="button custom-button button-calendar"
        onClick={() => setCalendarOpen(prev => !prev)}
      >
        {title}
      </button>
      {calendarOpen && (
        <div ref={calendarRef} className="calendar-div">
          <Calendar
            className="button calendar"
            onChange={handleCalendarChange}
            selectRange={selectRange}
            value={value as CalendarProps['value']}
          />
        </div>
      )}
    </div>
  );
};