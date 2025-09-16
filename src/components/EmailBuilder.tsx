import React, { useState, useEffect } from 'react';
import { EmailComponent, EmailTemplate } from '../types/EmailTypes';
import { apiService } from '../services/api';
import { ComponentLibrary } from './ComponentLibrary';
import { EmailCanvas } from './EmailCanvas';
import { EmailPreview } from './EmailPreview';
import { ComponentEditor } from './ComponentEditor';
import { HTMLEditor } from './HTMLEditor';
import { TemplateSettings } from './TemplateSettings';
import { AITemplateGenerator } from './AITemplateGenerator';
import { Eye, Save, ArrowLeft, Download, Code, Settings, Smartphone, Monitor, Sparkles } from 'lucide-react';

interface EmailBuilderProps {
  template?: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onBack: () => void;
}

export const EmailBuilder: React.FC<EmailBuilderProps> = ({
  template,
  onSave,
  onBack,
}) => {
  const [components, setComponents] = useState<EmailComponent[]>(template?.components || []);
  const [showPreview, setShowPreview] = useState(false);
  const [showHTMLEditor, setShowHTMLEditor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingComponent, setEditingComponent] = useState<EmailComponent | null>(null);
  const [templateName, setTemplateName] = useState(template?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate>(
    template || {
      id: '',
      name: '',
      subject: '',
      preheader: '',
      components: [],
      settings: {
        width: '600px',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        responsive: true,
      },
      createdAt: '',
      updatedAt: '',
    }
  );
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Auto-save functionality
  useEffect(() => {
    if (template && components.length > 0) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 5000); // Auto-save every 5 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [components, templateName, currentTemplate.settings]);

  const handleAutoSave = async () => {
    if (!template || !templateName.trim()) return;

    try {
      setSaveStatus('saving');
      const updatedTemplate: EmailTemplate = {
        ...currentTemplate,
        id: template.id,
        name: templateName,
        components,
        updatedAt: new Date().toISOString(),
      };

      await apiService.updateTemplate(template.id, updatedTemplate);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const createComponent = (type: string): EmailComponent => {
    const baseComponent = {
      id: generateId(),
      type: type as EmailComponent['type'],
      content: '',
      styles: {},
      attributes: {},
    };

    switch (type) {
      case 'text':
        return {
          ...baseComponent,
          content: 'Your text here',
          styles: {
            fontSize: '16px',
            color: '#000000',
            textAlign: 'left',
            padding: '10px 0',
            lineHeight: '1.5',
          },
        };

      case 'image':
        return {
          ...baseComponent,
          content: '',
          styles: {
            width: '100%',
            height: 'auto',
            padding: '10px 0',
          },
          attributes: {
            src: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600',
            alt: 'Email image',
          },
        };

      case 'button':
        return {
          ...baseComponent,
          content: 'Click Here',
          styles: {
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
          },
          attributes: {
            href: '#',
            target: '_blank',
          },
        };

      case 'header':
        return {
          ...baseComponent,
          content: 'Your Brand',
          styles: {
            backgroundColor: '#ffffff',
            padding: '20px',
            color: '#1f2937',
          },
          attributes: {
            href: 'View in browser',
          },
        };

      case 'footer':
        return {
          ...baseComponent,
          content: `
            <p>© 2024 Your Company. All rights reserved.</p>
            <p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>
            <p>123 Main St, City, State 12345</p>
          `,
          styles: {
            backgroundColor: '#f9fafb',
            padding: '20px',
            color: '#6b7280',
            fontSize: '12px',
            textAlign: 'center',
          },
        };

      case 'social':
        return {
          ...baseComponent,
          content: '',
          styles: {
            backgroundColor: '#6b7280',
            padding: '20px 0',
            textAlign: 'center',
          },
        };

      case 'columns':
        return {
          ...baseComponent,
          content: '',
          styles: {
            padding: '20px 0',
          },
          attributes: {
            columns: 2,
          },
        };

      case 'product':
        return {
          ...baseComponent,
          content: 'Buy Now',
          styles: {
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
          },
          attributes: {
            src: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'Product Name',
            price: '$99.99',
            href: '#',
          },
        };

      case 'video':
        return {
          ...baseComponent,
          content: '',
          styles: {
            padding: '20px 0',
            textAlign: 'center',
          },
          attributes: {
            src: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600',
            videoUrl: 'https://youtube.com/watch?v=example',
          },
        };

      case 'personalized':
        return {
          ...baseComponent,
          content: 'Hello {{FirstName}}, welcome to our newsletter!',
          styles: {
            fontSize: '16px',
            color: '#92400e',
            padding: '10px',
            backgroundColor: '#fef3c7',
            borderRadius: '4px',
          },
        };

      case 'container':
        return {
          ...baseComponent,
          content: 'Container - Drop components here',
          styles: {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
          },
        };

      case 'divider':
        return {
          ...baseComponent,
          content: '',
          styles: {
            backgroundColor: '#e5e7eb',
            margin: '20px 0',
          },
        };

      case 'spacer':
        return {
          ...baseComponent,
          content: '',
          styles: {
            height: '20px',
          },
        };

      default:
        return baseComponent;
    }
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, insertIndex?: number) => {
    e.preventDefault();
    e.stopPropagation();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      const newComponent = createComponent(componentType);
      if (typeof insertIndex === 'number') {
        setComponents(prev => {
          const newComponents = [...prev];
          newComponents.splice(insertIndex, 0, newComponent);
          return newComponents;
        });
      } else {
        setComponents(prev => [...prev, newComponent]);
      }
    }
  };

  const handleEditComponent = (component: EmailComponent) => {
    setEditingComponent(component);
  };

  const handleSaveComponent = (updatedComponent: EmailComponent) => {
    setComponents(prev =>
      prev.map(comp => comp.id === updatedComponent.id ? updatedComponent : comp)
    );
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const handleReorderComponents = (dragIndex: number, hoverIndex: number) => {
    setComponents(prev => {
      const newComponents = [...prev];
      const draggedComponent = newComponents[dragIndex];
      newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, draggedComponent);
      return newComponents;
    });
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    handleSaveTemplateToBackend();
  };

  const handleSaveTemplateToBackend = async () => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const templateData: EmailTemplate = {
      ...currentTemplate,
      id: template?.id || generateId(),
      name: templateName,
      components,
      createdAt: template?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

      if (template?.id) {
        // Update existing template
        await apiService.updateTemplate(template.id, templateData);
      } else {
        // Create new template
        const response = await apiService.createTemplate(templateData);
        templateData.id = response.template._id;
      }

      setSaveStatus('saved');
      onSave(templateData);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error: any) {
      console.error('Save failed:', error);
      setSaveStatus('error');
      alert(error.message || 'Failed to save template');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHTML = (html: string) => {
    // Save HTML to localStorage or handle as needed
    console.log('HTML saved:', html);
  };

  const handleSaveSettings = (updatedTemplate: EmailTemplate) => {
    setCurrentTemplate(updatedTemplate);
  };

  const handleAIGenerate = (generatedTemplate: EmailTemplate) => {
    setComponents(generatedTemplate.components);
    setTemplateName(generatedTemplate.name);
    setCurrentTemplate(generatedTemplate);
    setShowAIGenerator(false);
  };

  const generateHTML = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${currentTemplate.name}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: ${currentTemplate.settings.fontFamily || 'Arial, sans-serif'};
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: ${currentTemplate.settings.width || '600px'};
            margin: 20px auto;
            background-color: ${currentTemplate.settings.backgroundColor || '#ffffff'};
            padding: 0;
        }
        ${currentTemplate.settings.responsive ? `
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
        }` : ''}
    </style>
</head>
<body>
    <div class="email-container">`;

    components.forEach((component) => {
      switch (component.type) {
        case 'text':
          html += `
        <div style="${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">
            ${component.content}
        </div>`;
          break;
        case 'image':
          html += `
        <img src="${component.attributes?.src || ''}" alt="${component.attributes?.alt || ''}" style="${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">`;
          break;
        case 'button':
          html += `
        <div style="text-align: ${component.styles.textAlign || 'center'}; ${Object.entries(component.styles).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}">
            <a href="${component.attributes?.href || '#'}" target="${component.attributes?.target || '_blank'}" style="display: inline-block; padding: ${component.styles.padding || '12px 24px'}; background-color: ${component.styles.backgroundColor || '#2563eb'}; color: ${component.styles.color || '#ffffff'}; text-decoration: none; border-radius: ${component.styles.borderRadius || '6px'}; font-size: ${component.styles.fontSize || '16px'}; font-weight: ${component.styles.fontWeight || '600'};">
                ${component.content}
            </a>
        </div>`;
          break;
        // Add other component types as needed
      }
    });

    html += `
    </div>
</body>
</html>`;

    return html;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName || 'email-template'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Templates
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="text-lg font-semibold text-gray-900 border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
            />
            {/* Save Status Indicator */}
            <div className="flex items-center gap-2">
              {saveStatus === 'saving' && (
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="text-green-600 text-sm">✓ Saved</div>
              )}
              {saveStatus === 'error' && (
                <div className="text-red-600 text-sm">⚠ Save failed</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Preview Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
                  previewMode === 'desktop' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
                  previewMode === 'mobile' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </button>
            </div>

            <button
              onClick={() => setShowAIGenerator(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => setShowHTMLEditor(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Code className="w-4 h-4" />
              HTML Editor
            </button>
            <button
              onClick={downloadHTML}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download HTML
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSaveTemplate}
              disabled={isSaving || !templateName.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Template
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        <ComponentLibrary onDragStart={handleDragStart} />
        <div className={`flex-1 flex flex-col ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
          {/* Canvas Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Email Canvas</h2>
              <div className="text-sm text-gray-500">
                {components.length} component{components.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          
          {/* Scrollable Canvas */}
          <EmailCanvas
            components={components}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onEditComponent={handleEditComponent}
            onDeleteComponent={handleDeleteComponent}
            onReorderComponents={handleReorderComponents}
          />
        </div>
      </div>

      {/* Modals */}
      {showPreview && (
        <EmailPreview
          components={components}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showHTMLEditor && (
        <HTMLEditor
          template={{ ...currentTemplate, components }}
          onSave={handleSaveHTML}
          onClose={() => setShowHTMLEditor(false)}
        />
      )}

      {showSettings && (
        <TemplateSettings
          template={{ ...currentTemplate, components }}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showAIGenerator && (
        <AITemplateGenerator
          onGenerate={handleAIGenerate}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      {editingComponent && (
        <ComponentEditor
          component={editingComponent}
          onSave={handleSaveComponent}
          onClose={() => setEditingComponent(null)}
        />
      )}
    </div>
  );
};