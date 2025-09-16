import React from 'react';
import { EmailComponent } from '../types/EmailTypes';
import { EmailComponentRenderer } from './EmailComponents';

interface EmailPreviewProps {
  components: EmailComponent[];
  onClose: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ components, onClose }) => {
  const generateHTML = () => {
    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 0;
        }
        .email-content {
            padding: 20px;
        }
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
`;

    components.forEach((component) => {
      switch (component.type) {
        case 'text':
          html += `
            <div style="${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">
                ${component.content}
            </div>
`;
          break;
        case 'image':
          html += `
            <img src="${component.attributes?.src || ''}" alt="${component.attributes?.alt || ''}" style="${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">
`;
          break;
        case 'button':
          html += `
            <div style="text-align: ${component.styles.textAlign || 'center'}; ${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">
                <a href="${component.attributes?.href || '#'}" style="display: inline-block; padding: ${component.styles.padding || '12px 24px'}; background-color: ${component.styles.backgroundColor || '#2563eb'}; color: ${component.styles.color || '#ffffff'}; text-decoration: none; border-radius: ${component.styles.borderRadius || '6px'}; font-size: ${component.styles.fontSize || '16px'}; font-weight: ${component.styles.fontWeight || '600'};">
                    ${component.content}
                </a>
            </div>
`;
          break;
        case 'divider':
          html += `
            <hr style="border: none; height: 1px; background-color: ${component.styles.backgroundColor || '#e5e7eb'}; margin: ${component.styles.margin || '20px 0'};">
`;
          break;
        case 'spacer':
          html += `
            <div style="height: ${component.styles.height || '20px'}; background-color: transparent;"></div>
`;
          break;
      }
    });

    html += `
        </div>
    </div>
</body>
</html>
`;

    return html;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Email Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadHTML}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download HTML
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="max-w-2xl mx-auto bg-white border rounded-lg">
            <div className="p-6">
              {components.map((component) => (
                <EmailComponentRenderer
                  key={component.id}
                  component={component}
                  isEditable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};