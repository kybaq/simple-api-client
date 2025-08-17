// src/components/Common/Input.tsx
import React from 'react';
import '@/styles/common-controls.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const classes = ['input'];
  if (className) classes.push(className);

  return <input className={classes.join(' ')} {...props} />;
};

export default Input;
