import React from 'react';
import { Type, Image, MousePointer, Minus, Space, Move, Layout, Heater as Header, FolderRoot as Footer, Share2, Grid, Package, Video, User } from 'lucide-react';

interface ComponentLibraryProps {
  onDragStart: (e: React.DragEvent, type: string) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onDragStart }) => {
  const componentCategories = [
    {
      title: 'Basic Elements',
      components: [
        {
          type: 'text',
          icon: Type,
          label: 'Text Block',
          description: 'Add text content with formatting',
        },
        {
          type: 'image',
          icon: Image,
          label: 'Image',
          description: 'Add images with alt text',
        },
        {
          type: 'button',
          icon: MousePointer,
          label: 'CTA Button',
          description: 'Call-to-action buttons with links',
        },
        {
          type: 'divider',
          icon: Minus,
          label: 'Divider',
          description: 'Horizontal dividing lines',
        },
        {
          type: 'spacer',
          icon: Space,
          label: 'Spacer',
          description: 'Add vertical spacing',
        },
      ]
    },
    {
      title: 'Layout Elements',
      components: [
        {
          type: 'container',
          icon: Layout,
          label: 'Container',
          description: 'Section container with background',
        },
        {
          type: 'columns',
          icon: Grid,
          label: 'Columns',
          description: 'Multi-column layout',
        },
        {
          type: 'header',
          icon: Header,
          label: 'Header',
          description: 'Email header with logo & nav',
        },
        {
          type: 'footer',
          icon: Footer,
          label: 'Footer',
          description: 'Email footer with links',
        },
      ]
    },
    {
      title: 'Advanced Elements',
      components: [
        {
          type: 'social',
          icon: Share2,
          label: 'Social Icons',
          description: 'Social media icon links',
        },
        {
          type: 'product',
          icon: Package,
          label: 'Product Block',
          description: 'Product showcase with price',
        },
        {
          type: 'video',
          icon: Video,
          label: 'Video',
          description: 'Video thumbnail with play button',
        },
        {
          type: 'personalized',
          icon: User,
          label: 'Personalized Text',
          description: 'Dynamic content with placeholders',
        },
      ]
    }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Move className="w-5 h-5" />
        Components
      </h2>
      
      <div className="space-y-6">
        {componentCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.components.map((component) => {
                const Icon = component.icon;
                return (
                  <div
                    key={component.type}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', component.type);
                      e.dataTransfer.effectAllowed = 'copy';
                      onDragStart(e, component.type);
                    }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 hover:border-blue-300 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 text-sm">
                        {component.label}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">{component.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Quick Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Drag components to the canvas</li>
          <li>• Click to edit properties</li>
          <li>• Use containers for sections</li>
          <li>• Add personalization with {'{{fields}}'}</li>
        </ul>
      </div>
    </div>
  );
};