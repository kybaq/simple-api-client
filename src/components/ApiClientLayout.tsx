// src/components/Common/ApiClientLayout.tsx
import React, { ReactNode } from 'react';
import '@/styles/layout.css';

interface ApiClientLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const ApiClientLayout: React.FC<ApiClientLayoutProps> = ({ header, footer, children }) => {
  return (
    <div className="api-client-container">
      {header && <div className="api-client-header">{header}</div>}
      <div className="api-client-body">{children}</div>
      {footer && <div className="api-client-footer">{footer}</div>}
    </div>
  );
};

export default ApiClientLayout;
