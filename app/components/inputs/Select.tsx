import React from "react";
import ReactSelect from "react-select";
interface SelectProps {
  disabled?: boolean;
  label: string;
  options: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
  value: Record<string, any>;
}

const Select: React.FC<SelectProps> = ({
  disabled,
  label,
  options,
  onChange,
  value,
}) => {
  return (
    <div className="z-[100]">
      <label htmlFor="" className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 100,
            }),
          }}
          classNames={{
            control: () => "text-sm text-base-300",
            
          }}
        />
      </div>
    </div>
  );
};

export default Select;
