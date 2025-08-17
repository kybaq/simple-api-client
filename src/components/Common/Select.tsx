// src/components/Common/Select.tsx
import React from 'react';
import '@/styles/common-controls.css';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  const classes = ['select'];
  if (className) classes.push(className);

  return (
    <select className={classes.join(' ')} {...props}>
      {children}
    </select>
  );
};

export default Select;
