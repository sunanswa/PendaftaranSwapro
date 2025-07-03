import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
  maxLength?: number;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  rows = 4,
  maxLength,
  icon: Icon
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    ${error 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
      : 'border-gray-200 bg-white hover:border-gray-300'
    }
    text-gray-900 placeholder-gray-400
  `;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">{placeholder || `Pilih ${label}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      
      {maxLength && (
        <p className="text-xs text-gray-400 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default FormInput;