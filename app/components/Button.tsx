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
        disabled && "loading loading-spinner w-8 mx-auto",
        fullWidth && "w-full",
        secondary
          ? "text-secondary btn bg-primary mx-2 hover:bg-primary hover:opacity-70 transition"
          : "text-accent-content bg-base-300 hover:bg-base-300/75 hover:border-base-300/75 border-base-300",
        danger && "btn btn-error",
        !secondary && !danger && "btn btn-primary"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
