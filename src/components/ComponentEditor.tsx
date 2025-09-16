import React, { useState, useEffect, useRef } from 'react';
import { EmailComponent } from '../types/EmailTypes';
import { X, Plus, Trash2, Upload, Eye, EyeOff, Copy, Move, RotateCw, Palette, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface ComponentEditorProps {
  component: EmailComponent | null;
  onSave: (component: EmailComponent) => void;
  onClose: () => void;
}

export const ComponentEditor: React.FC<ComponentEditorProps> = ({
  component,
  onSave,
  onClose,
}) => {
  const [editedComponent, setEditedComponent] = useState<EmailComponent | null>(component);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content');
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedComponent(component);
    if (component?.attributes?.src) {
      setImagePreview(component.attributes.src);
    }
  }, [component]);

  if (!editedComponent) return null;

  const handleSave = () => {
    if (editedComponent) {
      onSave(editedComponent);
      onClose();
    }
  };

  const updateComponent = (field: string, value: any) => {
    setEditedComponent(prev => {
      if (!prev) return null;
      
      if (field.startsWith('styles.')) {
        const styleField = field.replace('styles.', '');
        return {
          ...prev,
          styles: {
            ...prev.styles,
            [styleField]: value,
          },
        };
      }
      
      if (field.startsWith('attributes.')) {
        const attrField = field.replace('attributes.', '');
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            [attrField]: value,
          },
        };
      }
      
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        updateComponent('attributes.src', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTabButtons = () => (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setActiveTab('content')}
        className={`px-4 py-2 font-medium text-sm ${
          activeTab === 'content'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Content
      </button>
      <button
        onClick={() => setActiveTab('style')}
        className={`px-4 py-2 font-medium text-sm ${
          activeTab === 'style'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Style
      </button>
      <button
        onClick={() => setActiveTab('advanced')}
        className={`px-4 py-2 font-medium text-sm ${
          activeTab === 'advanced'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Advanced
      </button>
    </div>
  );

  const renderDimensionControls = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width
        </label>
        <div className="flex">
          <input
            type="text"
            value={editedComponent.styles.width || '100%'}
            onChange={(e) => updateComponent('styles.width', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="100%"
          />
          <select
            value={editedComponent.styles.width?.includes('%') ? '%' : 'px'}
            onChange={(e) => {
              const currentValue = editedComponent.styles.width || '100%';
              const numericValue = currentValue.replace(/[^\d]/g, '');
              updateComponent('styles.width', numericValue + e.target.value);
            }}
            className="border border-l-0 border-gray-300 rounded-r-md px-2 bg-gray-50"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height
        </label>
        <div className="flex">
          <input
            type="text"
            value={editedComponent.styles.height || 'auto'}
            onChange={(e) => updateComponent('styles.height', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="auto"
          />
          <select
            value={editedComponent.styles.height === 'auto' ? 'auto' : editedComponent.styles.height?.includes('%') ? '%' : 'px'}
            onChange={(e) => {
              if (e.target.value === 'auto') {
                updateComponent('styles.height', 'auto');
              } else {
                const currentValue = editedComponent.styles.height || '200px';
                const numericValue = currentValue.replace(/[^\d]/g, '') || '200';
                updateComponent('styles.height', numericValue + e.target.value);
              }
            }}
            className="border border-l-0 border-gray-300 rounded-r-md px-2 bg-gray-50"
          >
            <option value="auto">auto</option>
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderImageEditor = () => (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          {imagePreview ? (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
              />
            </div>
          ) : (
            <div className="mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
          
          <div className="flex justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </button>
            
            {imagePreview && (
              <button
                onClick={() => {
                  setImagePreview('');
                  updateComponent('attributes.src', '');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or enter image URL
        </label>
        <input
          type="url"
          value={editedComponent.attributes?.src || ''}
          onChange={(e) => {
            updateComponent('attributes.src', e.target.value);
            setImagePreview(e.target.value);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      {/* Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alt Text (Important for accessibility)
        </label>
        <input
          type="text"
          value={editedComponent.attributes?.alt || ''}
          onChange={(e) => updateComponent('attributes.alt', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the image"
        />
      </div>

      {/* Dimensions */}
      {renderDimensionControls()}

      {/* Object Fit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Fit
        </label>
        <select
          value={editedComponent.styles.objectFit || 'cover'}
          onChange={(e) => updateComponent('styles.objectFit', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="cover">Cover (crop to fit)</option>
          <option value="contain">Contain (fit entire image)</option>
          <option value="fill">Fill (stretch to fit)</option>
          <option value="none">None (original size)</option>
        </select>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Alignment
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateComponent('styles.display', 'block')}
            className={`p-2 border rounded-md flex items-center gap-1 ${
              editedComponent.styles.display === 'block' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
            Left
          </button>
          <button
            onClick={() => {
              updateComponent('styles.display', 'block');
              updateComponent('styles.margin', '0 auto');
            }}
            className={`p-2 border rounded-md flex items-center gap-1 ${
              editedComponent.styles.margin === '0 auto' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
            Center
          </button>
          <button
            onClick={() => {
              updateComponent('styles.display', 'block');
              updateComponent('styles.margin', '0 0 0 auto');
            }}
            className={`p-2 border rounded-md flex items-center gap-1 ${
              editedComponent.styles.margin === '0 0 0 auto' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            <AlignRight className="w-4 h-4" />
            Right
          </button>
        </div>
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link URL (optional)
        </label>
        <input
          type="url"
          value={editedComponent.attributes?.href || ''}
          onChange={(e) => updateComponent('attributes.href', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );

  const renderAdvancedStyles = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Advanced Styling
      </h4>
      
      {/* Border */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Width
          </label>
          <input
            type="text"
            value={editedComponent.styles.borderWidth || '0'}
            onChange={(e) => updateComponent('styles.borderWidth', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Style
          </label>
          <select
            value={editedComponent.styles.borderStyle || 'solid'}
            onChange={(e) => updateComponent('styles.borderStyle', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Color
          </label>
          <input
            type="color"
            value={editedComponent.styles.borderColor || '#000000'}
            onChange={(e) => updateComponent('styles.borderColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Shadow */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Box Shadow
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateComponent('styles.boxShadow', 'none')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.boxShadow === 'none' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            None
          </button>
          <button
            onClick={() => updateComponent('styles.boxShadow', '0 1px 3px rgba(0,0,0,0.12)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.boxShadow === '0 1px 3px rgba(0,0,0,0.12)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Small
          </button>
          <button
            onClick={() => updateComponent('styles.boxShadow', '0 4px 6px rgba(0,0,0,0.1)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.boxShadow === '0 4px 6px rgba(0,0,0,0.1)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => updateComponent('styles.boxShadow', '0 10px 25px rgba(0,0,0,0.15)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.boxShadow === '0 10px 25px rgba(0,0,0,0.15)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Large
          </button>
        </div>
        <input
          type="text"
          value={editedComponent.styles.boxShadow || 'none'}
          onChange={(e) => updateComponent('styles.boxShadow', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
          placeholder="Custom: 0 2px 4px rgba(0,0,0,0.1)"
        />
      </div>

      {/* Transform */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transform
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={editedComponent.styles.transform || ''}
            onChange={(e) => updateComponent('styles.transform', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="rotate(0deg) scale(1)"
          />
          <div className="flex gap-1">
            <button
              onClick={() => updateComponent('styles.transform', 'rotate(90deg)')}
              className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
            >
              <RotateCw className="w-3 h-3" />
            </button>
            <button
              onClick={() => updateComponent('styles.transform', 'scale(1.1)')}
              className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
            >
              Scale
            </button>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Filters
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => updateComponent('styles.filter', 'none')}
            className={`px-3 py-1 text-xs border rounded ${
              !editedComponent.styles.filter || editedComponent.styles.filter === 'none' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            None
          </button>
          <button
            onClick={() => updateComponent('styles.filter', 'grayscale(100%)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.filter === 'grayscale(100%)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Grayscale
          </button>
          <button
            onClick={() => updateComponent('styles.filter', 'sepia(100%)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.filter === 'sepia(100%)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Sepia
          </button>
          <button
            onClick={() => updateComponent('styles.filter', 'blur(2px)')}
            className={`px-3 py-1 text-xs border rounded ${
              editedComponent.styles.filter === 'blur(2px)' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            Blur
          </button>
        </div>
        <input
          type="text"
          value={editedComponent.styles.filter || 'none'}
          onChange={(e) => updateComponent('styles.filter', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
          placeholder="Custom: brightness(1.2) contrast(1.1)"
        />
      </div>

      {/* Opacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Opacity: {Math.round((editedComponent.styles.opacity || 1) * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={editedComponent.styles.opacity || 1}
          onChange={(e) => updateComponent('styles.opacity', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderBasicStyles = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">Basic Styling</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <input
            type="text"
            value={editedComponent.styles.fontSize || '16px'}
            onChange={(e) => updateComponent('styles.fontSize', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="16px"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Family
          </label>
          <select
            value={editedComponent.styles.fontFamily || 'Arial, sans-serif'}
            onChange={(e) => updateComponent('styles.fontFamily', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <input
            type="color"
            value={editedComponent.styles.color || '#000000'}
            onChange={(e) => updateComponent('styles.color', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={editedComponent.styles.backgroundColor || '#ffffff'}
            onChange={(e) => updateComponent('styles.backgroundColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <input
            type="text"
            value={editedComponent.styles.padding || '10px'}
            onChange={(e) => updateComponent('styles.padding', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="10px"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Margin
          </label>
          <input
            type="text"
            value={editedComponent.styles.margin || '0'}
            onChange={(e) => updateComponent('styles.margin', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Radius
        </label>
        <input
          type="text"
          value={editedComponent.styles.borderRadius || '0'}
          onChange={(e) => updateComponent('styles.borderRadius', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0"
        />
      </div>
    </div>
  );

  const renderContentTab = () => {
    switch (editedComponent.type) {
      case 'image':
        return renderImageEditor();
      
      case 'text':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Content (HTML supported)
              </label>
              <textarea
                value={editedComponent.content}
                onChange={(e) => updateComponent('content', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={6}
                placeholder="Enter your text here... You can use HTML tags like <b>, <i>, <br>, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Align
              </label>
              <select
                value={editedComponent.styles.textAlign || 'left'}
                onChange={(e) => updateComponent('styles.textAlign', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={editedComponent.content}
                onChange={(e) => updateComponent('content', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Click here"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <input
                type="url"
                value={editedComponent.attributes?.href || ''}
                onChange={(e) => updateComponent('attributes.href', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link Target
              </label>
              <select
                value={editedComponent.attributes?.target || '_blank'}
                onChange={(e) => updateComponent('attributes.target', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="_blank">New window</option>
                <option value="_self">Same window</option>
              </select>
            </div>
          </div>
        );

      // Add other component types here...
      default:
        return <div>Content editing for {editedComponent.type} component</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            Edit {editedComponent.type.charAt(0).toUpperCase() + editedComponent.type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {renderTabButtons()}
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'content' && renderContentTab()}
          {activeTab === 'style' && renderBasicStyles()}
          {activeTab === 'advanced' && renderAdvancedStyles()}
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={() => {
              // Copy component functionality
              navigator.clipboard.writeText(JSON.stringify(editedComponent, null, 2));
            }}
            className="px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};