import React from 'react';

interface BooleanInputProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
  label,
  name,
  value,
  onChange,
  icon: Icon
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          {label}
        </div>
      </label>
      
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Ya</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-red-600 focus:ring-red-500"
          />
          <span className="text-sm text-gray-700">Tidak</span>
        </label>
      </div>
    </div>
  );
};

export default BooleanInput;