import React from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
}) => {
  let buttonSizeClasses = "";
  switch (size) {
    case "small":
      buttonSizeClasses = "px-3 py-2 text-sm";
      break;
    case "medium":
      buttonSizeClasses = "px-4 py-2 text-base";
      break;
    case "large":
      buttonSizeClasses = "px-5 py-3 text-lg";
      break;
  }

  let buttonVariantClasses = "";
  switch (variant) {
    case "primary":
      buttonVariantClasses =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";
      break;
    case "secondary":
      buttonVariantClasses =
        "bg-gray-500 hover:bg-gray-700 text-white font-bold rounded";
      break;
    case "outline":
      buttonVariantClasses =
        "border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold rounded";
      break;
  }

  return (
    <motion.button
      className={`transition-default ${buttonSizeClasses} ${buttonVariantClasses} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      aria-label="Button label"
    >
      {children}
    </motion.button>
  );
};

export default Button;