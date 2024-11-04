"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="">
      <label
        className="
    block
    text-sm
    font-medium
    leading-6
    text-base-300
    "
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            `
          form-input
          block
          w-full 
          
          rounded-md
          border-0
          py-1.5
          text-primary-content
          shadow-sm
          ring-1
          ring-inset
          ring-base-300
          placeholder:text-secondary
          focus:ring-2
          focus:ring-inset
          focus:ring-base-200
          sm:text-sm
          sm:leading-6`,
            errors[id] && "focus:ring-error",
            disabled && "loading loading-spinner w-8 mx-auto"
          )}
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    </div>
  );
};

export default Input;
