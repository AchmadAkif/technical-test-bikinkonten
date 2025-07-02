export interface InputProps {
  inputType: 'text' | 'email' | 'password' | 'number' | 'file';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
