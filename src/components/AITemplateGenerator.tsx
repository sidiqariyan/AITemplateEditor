import React, { useState } from 'react';
import { EmailTemplate } from '../types/EmailTypes';
import { apiService } from '../services/api';
import { Sparkles, Wand2, X, Loader2, AlertCircle } from 'lucide-react';

interface AITemplateGeneratorProps {
  onGenerate: (template: EmailTemplate) => void;
  onClose: () => void;
  onEditTemplate: (template: EmailTemplate) => void;
}

export const AITemplateGenerator: React.FC<AITemplateGeneratorProps> = ({
  onGenerate,
  onClose,
  onEditTemplate,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [error, setError] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [generatedTemplate, setGeneratedTemplate] = useState<EmailTemplate | null>(null);

  const templateSuggestions = [
    {
      id: 'marketing',
      category: 'marketing',
      title: 'Welcome Email',
      description: 'Onboard new users with a warm welcome',
      prompt: 'Create a welcome email for new users signing up to our platform. Include a friendly greeting, brief introduction to our services, and a call-to-action button to get started.'
    },
    {
      id: 'newsletter',
      category: 'newsletter',
      title: 'Newsletter',
      description: 'Weekly newsletter with updates and articles',
      prompt: 'Design a weekly newsletter template with a header, featured article section, news updates, and social media links in the footer.'
    },
    {
      id: 'promotional',
      category: 'promotional',
      title: 'Promotional Email',
      description: 'Product promotion with discount offer',
      prompt: 'Create a promotional email for a 30% off sale. Include product showcase, discount code, urgency messaging, and clear call-to-action buttons.'
    },
    {
      id: 'ecommerce',
      category: 'ecommerce',
      title: 'E-commerce Product',
      description: 'Product announcement with purchase options',
      prompt: 'Design an e-commerce email showcasing a new product launch. Include product images, features, pricing, and buy now buttons.'
    },
    {
      id: 'business',
      category: 'business',
      title: 'Event Invitation',
      description: 'Invite users to an upcoming event',
      prompt: 'Create an event invitation email for a webinar. Include event details, speaker information, date/time, and registration button.'
    },
    {
      id: 'other',
      category: 'other',
      title: 'Feedback Request',
      description: 'Ask customers for reviews and feedback',
      prompt: 'Design a feedback request email asking customers to review their recent purchase. Include star rating, review button, and incentive offer.'
    }
  ];

  const generateTemplate = async (userPrompt: string) => {
    setIsGenerating(true);
    setError('');
    
    try {
      // Find the selected template suggestion to get the correct category
      const selectedSuggestion = templateSuggestions.find(t => t.id === selectedTemplate);
      const category = selectedSuggestion?.category || 'other';
      
      const response = await apiService.generateTemplate(
        userPrompt, 
        category,
        templateName || undefined
      );
      
      const template = response.template;
      setGeneratedTemplate(template);
      
      // Call onGenerate to update the gallery
      onGenerate(template);
      
    } catch (error: any) {
      console.error('Error generating template:', error);
      setError(error.message || 'Failed to generate template. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate your email template');
      return;
    }
    
    if (prompt.trim().length < 10) {
      setError('Please provide a more detailed prompt (at least 10 characters)');
      return;
    }
    
    generateTemplate(prompt);
  };

  const handleSuggestionClick = (suggestion: typeof templateSuggestions[0]) => {
    setPrompt(suggestion.prompt);
    setSelectedTemplate(suggestion.id);
    setTemplateName(suggestion.title);
    setError('');
  };

  const handleEditNow = () => {
    if (generatedTemplate) {
      // Close the modal first, then redirect to editor with the generated template
      onClose();
      // Use setTimeout to ensure modal closes before navigation
      setTimeout(() => {
        onEditTemplate(generatedTemplate);
      }, 100);
    }
  };

  const handleViewInGallery = () => {
    // Just close the modal, template is already in gallery
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            AI Email Template Generator
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Success Message with Actions */}
            {generatedTemplate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 text-green-500">✅</div>
                  <p className="text-green-700 font-medium">Template generated successfully!</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEditNow}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Edit Template Now
                  </button>
                  <button
                    onClick={handleViewInGallery}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View in Gallery
                  </button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Template Name Input */}
            <div>
              <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-2">
                Template Name (Optional)
              </label>
              <input
                type="text"
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="My Awesome Email Template"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Template Suggestions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Start Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templateSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTemplate === suggestion.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-800 mb-2">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Or Describe Your Email</h3>
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setError('');
                  }}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows={6}
                  placeholder="Describe the email template you want to create. For example:

'Create a welcome email for new customers signing up for our fitness app. Include a motivational message, app features overview, and a button to start their first workout. Use energetic colors like orange and blue.'

Be specific about:
• Purpose (welcome, promotion, newsletter, etc.)
• Target audience
• Key content to include
• Preferred colors or style
• Call-to-action buttons needed"
                />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips for Better Results:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Mention the email type (welcome, promotional, newsletter, etc.)</li>
                    <li>• Specify your target audience and tone (professional, friendly, urgent)</li>
                    <li>• Include desired colors, images, or branding elements</li>
                    <li>• Describe the main call-to-action you want</li>
                    <li>• Add any specific content sections needed</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">🔧 Setup Required:</h4>
                  <p className="text-sm text-yellow-700">
                    Make sure your server has the <code className="bg-yellow-200 px-1 rounded">SONAR_API_KEY</code> environment variable set with your Perplexity AI API key.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Template
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};