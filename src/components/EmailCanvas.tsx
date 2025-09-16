import React, { useState } from 'react';
import { EmailComponent } from '../types/EmailTypes';
import { EmailComponentRenderer } from './EmailComponents';
import { Plus, GripVertical } from 'lucide-react';

interface EmailCanvasProps {
  components: EmailComponent[];
  onDrop: (e: React.DragEvent, insertIndex?: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onEditComponent: (component: EmailComponent) => void;
  onDeleteComponent: (id: string) => void;
  onReorderComponents: (dragIndex: number, hoverIndex: number) => void;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({
  components,
  onDrop,
  onDragOver,
  onEditComponent,
  onDeleteComponent,
  onReorderComponents,
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedComponentIndex, setDraggedComponentIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof index === 'number') {
      setDragOverIndex(index);
    }
    onDragOver(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only clear if we're actually leaving the drop zone
    const relatedTarget = e.relatedTarget as Element;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, insertIndex?: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(null);
    
    // Check if it's a component reorder
    const draggedIndex = e.dataTransfer.getData('componentIndex');
    if (draggedIndex && typeof insertIndex === 'number') {
      const dragIndex = parseInt(draggedIndex);
      if (dragIndex !== insertIndex && dragIndex !== insertIndex - 1) {
        onReorderComponents(dragIndex, insertIndex > dragIndex ? insertIndex - 1 : insertIndex);
      }
      return;
    }
    
    onDrop(e, insertIndex);
  };

  const handleComponentDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('componentIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    setDraggedComponentIndex(index);
  };

  const handleComponentDragEnd = () => {
    setDraggedComponentIndex(null);
    setDragOverIndex(null);
  };

  const renderDropZone = (index: number) => (
    <div
      key={`drop-zone-${index}`}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, index)}
      className={`transition-all duration-200 ${
        dragOverIndex === index
          ? 'h-16 bg-blue-50 border-2 border-dashed border-blue-400 rounded-lg mx-4 my-2'
          : 'h-2 hover:h-8 hover:bg-blue-50 hover:border hover:border-dashed hover:border-blue-300 hover:rounded-lg hover:mx-4'
      }`}
    >
      {dragOverIndex === index && (
        <div className="h-full flex items-center justify-center">
          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <Plus className="w-4 h-4" />
            Drop component here
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border min-h-96">
            {components.length === 0 ? (
              <div 
                onDragOver={(e) => handleDragOver(e, 0)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 0)}
                className={`h-96 flex items-center justify-center border-2 border-dashed rounded-lg m-4 transition-all duration-200 ${
                  dragOverIndex === 0 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-center text-gray-500 p-6">
                  <div className="text-4xl mb-4">📧</div>
                  <p className="text-lg font-medium">Your email canvas is empty</p>
                  <p className="text-sm">Drag components from the sidebar to get started</p>
                </div>
              </div>
            ) : (
              <div className="py-4">
                {/* Drop zone at the beginning */}
                {renderDropZone(0)}
                
                {components.map((component, index) => (
                  <div key={component.id}>
                    <div
                      draggable
                      onDragStart={(e) => handleComponentDragStart(e, index)}
                      onDragEnd={handleComponentDragEnd}
                      className={`relative group mx-4 my-2 transition-all duration-200 ${
                        draggedComponentIndex === index ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      {/* Drag handle */}
                      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-700">
                          <GripVertical className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Component wrapper with hover effects */}
                      <div className="relative border border-transparent hover:border-blue-300 rounded-lg transition-all duration-200">
                        <EmailComponentRenderer
                          component={component}
                          onEdit={onEditComponent}
                          onDelete={onDeleteComponent}
                          isEditable={true}
                        />
                      </div>
                    </div>
                    
                    {/* Drop zone after each component */}
                    {renderDropZone(index + 1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};