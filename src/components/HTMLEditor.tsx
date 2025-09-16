import React, { useState, useEffect } from 'react';
import { EmailTemplate } from '../types/EmailTypes';
import { Code, Eye, Download, X } from 'lucide-react';

interface HTMLEditorProps {
  template: EmailTemplate;
  onSave: (html: string) => void;
  onClose: () => void;
}

export const HTMLEditor: React.FC<HTMLEditorProps> = ({
  template,
  onSave,
  onClose,
}) => {
  const [htmlCode, setHtmlCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    generateHTML();
  }, [template]);

  const generateHTML = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${template.name}</title>
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Email styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f4f4f4;
            font-family: ${template.settings.fontFamily || 'Arial, sans-serif'};
        }
        
        .email-container {
            max-width: ${template.settings.width || '600px'};
            margin: 0 auto;
            background-color: ${template.settings.backgroundColor || '#ffffff'};
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-center {
                text-align: center !important;
            }
            .mobile-full-width {
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">`;

    template.components.forEach((component) => {
      const styles = Object.entries(component.styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ');

      switch (component.type) {
        case 'header':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="${styles}">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="font-size: 24px; font-weight: bold; color: ${component.styles.color || '#1f2937'};">
                                ${component.content || 'Your Brand'}
                            </td>
                            <td style="text-align: right; font-size: 14px; color: #6b7280;">
                                <a href="#" style="color: #6b7280; text-decoration: none;">
                                    ${component.attributes?.href || 'View in browser'}
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
          break;

        case 'text':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="${styles}">
                    ${component.content || 'Your text here'}
                </td>
            </tr>
        </table>`;
          break;

        case 'image':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="${styles}">
                    <img src="${component.attributes?.src || ''}" 
                         alt="${component.attributes?.alt || ''}" 
                         style="width: ${component.styles.width || '100%'}; height: ${component.styles.height || 'auto'}; display: block;">
                </td>
            </tr>
        </table>`;
          break;

        case 'button':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="text-align: ${component.styles.textAlign || 'center'}; ${styles}">
                    <a href="${component.attributes?.href || '#'}" 
                       target="${component.attributes?.target || '_blank'}"
                       style="display: inline-block; padding: ${component.styles.padding || '12px 24px'}; 
                              background-color: ${component.styles.backgroundColor || '#2563eb'}; 
                              color: ${component.styles.color || '#ffffff'}; 
                              text-decoration: none; 
                              border-radius: ${component.styles.borderRadius || '6px'}; 
                              font-size: ${component.styles.fontSize || '16px'}; 
                              font-weight: ${component.styles.fontWeight || '600'};">
                        ${component.content || 'Click Here'}
                    </a>
                </td>
            </tr>
        </table>`;
          break;

        case 'divider':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="${styles}">
                    <hr style="border: none; height: 1px; background-color: ${component.styles.backgroundColor || '#e5e7eb'}; margin: ${component.styles.margin || '20px 0'};">
                </td>
            </tr>
        </table>`;
          break;

        case 'spacer':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="height: ${component.styles.height || '20px'}; line-height: ${component.styles.height || '20px'}; font-size: 1px;">&nbsp;</td>
            </tr>
        </table>`;
          break;

        case 'footer':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="${styles}">
                    ${component.content || 'Footer content'}
                </td>
            </tr>
        </table>`;
          break;

        case 'social':
          html += `
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="text-align: center; ${styles}">
                    <a href="https://facebook.com" style="display: inline-block; margin: 0 10px;">
                        <img src="https://via.placeholder.com/32x32/4267B2/ffffff?text=f" alt="Facebook" width="32" height="32">
                    </a>
                    <a href="https://twitter.com" style="display: inline-block; margin: 0 10px;">
                        <img src="https://via.placeholder.com/32x32/1DA1F2/ffffff?text=t" alt="Twitter" width="32" height="32">
                    </a>
                    <a href="https://instagram.com" style="display: inline-block; margin: 0 10px;">
                        <img src="https://via.placeholder.com/32x32/E4405F/ffffff?text=i" alt="Instagram" width="32" height="32">
                    </a>
                </td>
            </tr>
        </table>`;
          break;

        default:
          // Handle other component types
          break;
      }
    });

    html += `
    </div>
</body>
</html>`;

    setHtmlCode(html);
  };

  const handleSave = () => {
    onSave(htmlCode);
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Code className="w-5 h-5" />
            HTML Editor
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={downloadHTML}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex h-[calc(90vh-120px)]">
          {/* HTML Editor */}
          <div className={`${showPreview ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-gray-800">HTML Code</h3>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm border-none outline-none resize-none"
              style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-1/2">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-medium text-gray-800">Live Preview</h3>
              </div>
              <div className="h-full overflow-auto p-4 bg-gray-100">
                <iframe
                  srcDoc={htmlCode}
                  className="w-full h-full border border-gray-300 rounded bg-white"
                  title="Email Preview"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save HTML
          </button>
        </div>
      </div>
    </div>
  );
};