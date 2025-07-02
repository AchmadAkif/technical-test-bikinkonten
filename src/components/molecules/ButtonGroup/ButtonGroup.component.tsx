'use client';

import { useState } from 'react';

import { ButtonGroupProps } from './ButtonGroup.config';

const buttons = [
  { id: 'All', label: 'All' },
  { id: 'Action', label: 'Action' },
  { id: 'Adventure', label: 'Adventure' },
  { id: 'Sci-Fi', label: 'Sci-Fi' },
  { id: 'Fantasy', label: 'Fantasy' },
  { id: 'Drama', label: 'Drama' },
  { id: 'Mystery', label: 'Mystery' },
  { id: 'Award Winning', label: 'Award Winning' },
];

const ButtonGroup = ({
  name = 'category',
  defaultValue,
  onChange,
}: ButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className="row flex gap-1" role="radiogroup">
      {buttons.map(button => (
        <label
          key={button.id}
          className={`
            rounded-md py-2 px-4 border border-[#a1a1a1] text-center text-sm 
            transition-all shadow-md hover:shadow-lg cursor-pointer
            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
            ${
              selectedValue === button.id
                ? 'bg-black text-white border-black shadow-none'
                : 'bg-transparent text-black hover:bg-gray-50'
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={button.id}
            checked={selectedValue === button.id}
            onChange={() => handleChange(button.id)}
            className="sr-only"
          />
          {button.label}
        </label>
      ))}
    </div>
  );
};

export default ButtonGroup;
