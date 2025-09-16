import React, { useState } from 'react';
import { EmailTemplate } from '../types/EmailTypes';
import { Settings, X, Smartphone, Monitor } from 'lucide-react';

interface TemplateSettingsProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onClose: () => void;
}

export const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  template,
  onSave,
  onClose,
}) => {
  const [settings, setSettings] = useState(template.settings);
  const [subject, setSubject] = useState(template.subject || '');
  const [preheader, setPreheader] = useState(template.preheader || '');

  const handleSave = () => {
    onSave({
      ...template,
      subject,
      preheader,
      settings,
    });
    onClose();
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Template Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* Email Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Email Metadata</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email subject line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preheader Text
              </label>
              <input
                type="text"
                value={preheader}
                onChange={(e) => setPreheader(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short preview text that appears after subject line"
              />
              <p className="text-xs text-gray-500 mt-1">
                This text appears in email previews. Keep it under 90 characters.
              </p>
            </div>
          </div>

          {/* Layout Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Layout Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Width
              </label>
              <select
                value={settings.width || '600px'}
                onChange={(e) => updateSetting('width', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="600px">600px (Standard)</option>
                <option value="650px">650px (Wide)</option>
                <option value="700px">700px (Extra Wide)</option>
                <option value="100%">100% (Full Width)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  className="w-16 h-10 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={settings.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Font Family
              </label>
              <select
                value={settings.fontFamily || 'Arial, sans-serif'}
                onChange={(e) => updateSetting('fontFamily', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="Tahoma, sans-serif">Tahoma</option>
              </select>
            </div>
          </div>

          {/* Responsive Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Responsive Design</h3>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="responsive"
                checked={settings.responsive !== false}
                onChange={(e) => updateSetting('responsive', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="responsive" className="text-sm font-medium text-gray-700">
                Enable responsive design for mobile devices
              </label>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Responsive Features</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Automatic mobile optimization</li>
                <li>• Responsive images and buttons</li>
                <li>• Mobile-friendly font sizes</li>
                <li>• Touch-friendly click targets</li>
              </ul>
            </div>
          </div>

          {/* Personalization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Personalization</h3>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Available Placeholders</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-yellow-700">
                <div><code>{'{{FirstName}}'}</code> - First name</div>
                <div><code>{'{{LastName}}'}</code> - Last name</div>
                <div><code>{'{{Email}}'}</code> - Email address</div>
                <div><code>{'{{Company}}'}</code> - Company name</div>
                <div><code>{'{{Date}}'}</code> - Current date</div>
                <div><code>{'{{CustomField}}'}</code> - Custom field</div>
              </div>
            </div>
          </div>

          {/* Email Client Compatibility */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Email Client Compatibility</h3>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Tested Email Clients</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                <div>✓ Gmail</div>
                <div>✓ Outlook 2016+</div>
                <div>✓ Apple Mail</div>
                <div>✓ Yahoo Mail</div>
                <div>✓ Thunderbird</div>
                <div>✓ Mobile clients</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};