import { useState } from 'react';

type DateRange = [Date, Date];

interface IUseCalendarSelector {
  dateRange: DateRange;
  isOpen: boolean;
  toggleCalendar: () => void;
  handleDateChange: (newRange: DateRange) => void;
}

export const useCalendarSelector = (
  initialRange: DateRange = [new Date(), new Date()]
): IUseCalendarSelector => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCalendar = () => setIsOpen(prev => !prev);

  const handleDateChange = (newRange: DateRange) => {
    setDateRange(newRange);
    setIsOpen(false);
  };

  return {
    dateRange,
    isOpen,
    toggleCalendar,
    handleDateChange,
  };
};