import { InputProps } from './Input.config';

const Input = ({
  value,
  onChange,
  placeholder,
  inputType = 'text',
}: InputProps) => (
  <input
    className="min-h-[36px] px-3 py-1 text-sm border-1 border-[#a1a1a1] rounded-[8px]"
    placeholder={placeholder}
    type={inputType}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export default Input;
