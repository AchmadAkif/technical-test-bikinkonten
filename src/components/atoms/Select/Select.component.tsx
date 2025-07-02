import { SelectProps } from './Select.config';

const sortList = [
  {
    value: 'popularity',
    title: 'Popularity',
  },
  {
    value: 'year',
    title: 'Year',
  },
];

const Select = ({ value, onChange }: SelectProps) => {
  return (
    <select
      name="sort"
      defaultValue={value}
      onChange={e => onChange?.(e.target.value)}
      className="p-2 py-1 border-1 border-[#a1a1a1] rounded-md"
    >
      {sortList.map(option => (
        <option key={option.title} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
