import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      inline-flex 
      w-1/2
      justify-center 
      btn 
      btn-neutral 
      text-neutral-content
      px-4 
      py-2
      shadow-sm
      ring-1
      ring-inset
      ring-base-200
      focus:outline-offset-0
      "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
