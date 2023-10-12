// Styles
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  click?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", click }) => {
  return (
    <button onClick={click} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
