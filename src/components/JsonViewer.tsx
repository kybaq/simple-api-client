// src/components/Common/JsonViewer.tsx
import React from 'react';
import { tryFormatJson } from '@/utils/JsonViewer';
import '@/styles/json-viewer.css';

interface JsonViewerProps {
  content: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ content }) => {
  const formatted = tryFormatJson(content);
  let isJson = false;

  try {
    JSON.parse(content);
    isJson = true;
  } catch {
    isJson = false;
  }

  if (!isJson) {
    return <pre className="json-viewer">{content}</pre>;
  }

  const highlighted = formatted
    .replace(/(&)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|[-]?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            return `<span class="json-key">${match}</span>`;
          } else {
            return `<span class="json-string">${match}</span>`;
          }
        } else if (/true|false/.test(match)) {
          return `<span class="json-boolean">${match}</span>`;
        } else if (/null/.test(match)) {
          return `<span class="json-null">${match}</span>`;
        }
        return `<span class="json-number">${match}</span>`;
      }
    );

  return <pre className="json-viewer" dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

export default JsonViewer;
