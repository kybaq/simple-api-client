// src/components/Common/Button.tsx
import React from 'react';
import '@/styles/common-controls.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'default';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const classes = ['btn'];
  if (loading || disabled) {
    classes.push('btn-disabled');
  } else {
    if (variant === 'primary') classes.push('btn-primary');
    else if (variant === 'danger') classes.push('btn-danger');
  }
  if (className) classes.push(className);

  return (
    <button className={classes.join(' ')} disabled={disabled || loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
