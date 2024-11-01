"use client";
import clsx from "clsx";
interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth,
  type,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    `,
        disabled && "loading loading-spinner w-10 mx-auto",
        fullWidth && "w-full",
        secondary ? "text-secondary" : "text-base-300",
        danger && "btn btn-error",
        !secondary && !danger && "btn btn-primary"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
