import React, { useState } from 'react';

interface ITableCellProps {
  initialValue: number | string;
  onValueChange: (value: number) => void;
}

export const TableCell: React.FC<ITableCellProps> = React.memo(({ initialValue, onValueChange }) => {
  const [cellValue, setCellValue] = useState<number | string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setCellValue(e.target.value === '' ? '' : newValue);
    onValueChange(newValue);
  };

  return (
    <input
      type="number"
      className="w-full p-2 border-none outline-none"
      value={cellValue}
      onChange={handleChange}
    />
  );
});