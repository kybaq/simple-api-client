// src/components/Common/Textarea.tsx
import React from 'react';
import '@/styles/common-controls.css';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  const classes = ['textarea'];
  if (className) classes.push(className);

  return <textarea className={classes.join(' ')} {...props} />;
};

export default Textarea;
