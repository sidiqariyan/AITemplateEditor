import React from 'react';
import { EmailComponent } from '../types/EmailTypes';
import { Play, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface EmailComponentProps {
  component: EmailComponent;
  onEdit?: (component: EmailComponent) => void;
  onDelete?: (id: string) => void;
  isEditable?: boolean;
}

export const EmailComponentRenderer: React.FC<EmailComponentProps> = ({
  component,
  onEdit,
  onDelete,
  isEditable = true
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(component);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(component.id);
    }
  };

  const baseStyles = {
    ...component.styles,
    position: 'relative' as const,
    cursor: isEditable ? 'pointer' : 'default',
  };

  const renderDeleteButton = () => {
    if (!isEditable) return null;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs opacity-0 hover:opacity-100 transition-opacity z-10"
      >
        ×
      </button>
    );
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div dangerouslySetInnerHTML={{ __html: component.content || 'Click to edit text' }} />
            {renderDeleteButton()}
          </div>
        );

      case 'image':
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <img
              src={component.attributes?.src || 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt={component.attributes?.alt || 'Email image'}
              style={{
                width: component.styles.width || '100%',
                height: component.styles.height || 'auto',
                display: 'block',
                borderRadius: component.styles.borderRadius || '0',
              }}
            />
            {renderDeleteButton()}
          </div>
        );

      case 'button':
        return (
          <div
            style={{ textAlign: component.styles.textAlign || 'center', ...baseStyles }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <a
              href={component.attributes?.href || '#'}
              target={component.attributes?.target || '_blank'}
              style={{
                display: 'inline-block',
                padding: component.styles.padding || '12px 24px',
                backgroundColor: component.styles.backgroundColor || '#2563eb',
                color: component.styles.color || '#ffffff',
                textDecoration: 'none',
                borderRadius: component.styles.borderRadius || '6px',
                fontSize: component.styles.fontSize || '16px',
                fontWeight: component.styles.fontWeight || '600',
                boxShadow: component.styles.boxShadow || 'none',
              }}
            >
              {component.content || 'Click Here'}
            </a>
            {renderDeleteButton()}
          </div>
        );

      case 'header':
        return (
          <div
            style={{
              ...baseStyles,
              backgroundColor: component.styles.backgroundColor || '#ffffff',
              padding: component.styles.padding || '20px',
              borderBottom: '1px solid #e5e7eb',
            }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: component.styles.color || '#1f2937' }}>
                {component.content || 'Your Brand'}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                {component.attributes?.href || 'View in browser'}
              </div>
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'footer':
        return (
          <div
            style={{
              ...baseStyles,
              backgroundColor: component.styles.backgroundColor || '#f9fafb',
              padding: component.styles.padding || '20px',
              borderTop: '1px solid #e5e7eb',
              fontSize: '12px',
              color: component.styles.color || '#6b7280',
              textAlign: 'center' as const,
            }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div dangerouslySetInnerHTML={{ __html: component.content || 'Footer content - contact info, unsubscribe link' }} />
            {renderDeleteButton()}
          </div>
        );

      case 'social':
        const socialIcons = [
          { name: 'facebook', icon: Facebook, url: 'https://facebook.com' },
          { name: 'twitter', icon: Twitter, url: 'https://twitter.com' },
          { name: 'instagram', icon: Instagram, url: 'https://instagram.com' },
          { name: 'linkedin', icon: Linkedin, url: 'https://linkedin.com' },
          { name: 'youtube', icon: Youtube, url: 'https://youtube.com' },
        ];

        return (
          <div
            style={{ ...baseStyles, textAlign: 'center' }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '10px' }}>
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    style={{
                      display: 'inline-block',
                      padding: '8px',
                      backgroundColor: component.styles.backgroundColor || '#6b7280',
                      borderRadius: '50%',
                      color: '#ffffff',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'columns':
        const columnCount = component.attributes?.columns || 2;
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ display: 'flex', gap: '20px' }}>
              {Array.from({ length: columnCount }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px dashed #d1d5db',
                    textAlign: 'center',
                    color: '#6b7280',
                  }}
                >
                  Column {index + 1}
                </div>
              ))}
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'product':
        return (
          <div
            style={{
              ...baseStyles,
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
            }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <img
              src={component.attributes?.src || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300'}
              alt={component.attributes?.alt || 'Product'}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px', marginBottom: '15px' }}
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1f2937' }}>
              {component.attributes?.title || 'Product Name'}
            </h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '0 0 15px 0' }}>
              {component.attributes?.price || '$99.99'}
            </p>
            <a
              href={component.attributes?.href || '#'}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {component.content || 'Buy Now'}
            </a>
            {renderDeleteButton()}
          </div>
        );

      case 'video':
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src={component.attributes?.src || 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt="Video thumbnail"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  padding: '15px',
                  color: '#ffffff',
                }}
              >
                <Play size={30} />
              </div>
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'personalized':
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#fef3c7', 
              border: '1px dashed #f59e0b',
              borderRadius: '4px',
              fontSize: component.styles.fontSize || '16px',
              color: component.styles.color || '#92400e'
            }}>
              {component.content || 'Hello {{FirstName}}, welcome to our newsletter!'}
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'container':
        return (
          <div
            style={{
              ...baseStyles,
              backgroundColor: component.styles.backgroundColor || '#ffffff',
              padding: component.styles.padding || '20px',
              borderRadius: component.styles.borderRadius || '0',
              border: component.styles.border || 'none',
              backgroundImage: component.styles.backgroundImage ? `url(${component.styles.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <div style={{ 
              padding: '20px', 
              border: '2px dashed #d1d5db', 
              borderRadius: '6px',
              textAlign: 'center',
              color: '#6b7280',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
              {component.content || 'Container - Drop components here'}
            </div>
            {renderDeleteButton()}
          </div>
        );

      case 'divider':
        return (
          <div
            style={baseStyles}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            <hr
              style={{
                border: 'none',
                height: '1px',
                backgroundColor: component.styles.backgroundColor || '#e5e7eb',
                margin: component.styles.margin || '20px 0',
              }}
            />
            {renderDeleteButton()}
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{
              ...baseStyles,
              height: component.styles.height || '20px',
              backgroundColor: 'transparent',
            }}
            onClick={handleEdit}
            className={`${isEditable ? 'hover:outline-2 hover:outline-blue-400 hover:outline-dashed' : ''} transition-all duration-200`}
          >
            {renderDeleteButton()}
          </div>
        );

      default:
        return null;
    }
  };

  return renderComponent();
};