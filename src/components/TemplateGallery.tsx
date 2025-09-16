import React, { useState, useEffect } from 'react';
import { EmailTemplate } from '../types/EmailTypes';
import { EmailComponentRenderer } from './EmailComponents';
import { 
  Edit, Eye, Download, Trash2, Plus, Sparkles, Search, Filter, 
  Star, Heart, Copy, Share2, TrendingUp, Calendar, User,
  Grid, List, SortAsc, SortDesc, Loader2, RefreshCw, X // Added X import
} from 'lucide-react';
import { AITemplateGenerator } from './AITemplateGenerator';

interface TemplateGalleryProps {
  onCreateNew: () => void;
  onEditTemplate: (template: EmailTemplate) => void;
  onPreviewTemplate: (template: EmailTemplate) => void;
  userId?: string;
}

interface TemplateStats {
  totalTemplates: number;
  totalViews: number;
  totalDownloads: number;
  totalUses: number;
  aiGeneratedCount: number;
  publicCount: number;
  averageRating: number;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onCreateNew,
  onEditTemplate,
  onPreviewTemplate,
  userId
}) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [stats, setStats] = useState<TemplateStats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Templates', icon: '📄' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'realestate', name: 'Real Estate', icon: '🏠' },
    { id: 'food', name: 'Food & Restaurant', icon: '🍕' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'fashion', name: 'Fashion', icon: '👔' },
    { id: 'nonprofit', name: 'Non-Profit', icon: '🤝' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'saas', name: 'SaaS', icon: '☁️' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'updatedAt', label: 'Last Modified' },
    { value: 'name', label: 'Name' },
    { value: 'rating.average', label: 'Rating' },
    { value: 'usage.views', label: 'Views' },
    { value: 'usage.uses', label: 'Uses' }
  ];

  useEffect(() => {
    fetchTemplates();
    fetchStats();
  }, [currentPage, selectedCategory, searchTerm, sortBy, sortOrder]);

const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to view templates');
        setTemplates([]);
        setLoading(false);
        return;
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sortBy,
        sortOrder,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:5000/api/templates?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
          setTemplates([]);
          return;
        }
        
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch templates';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Handle different response structures
      let templatesData = [];
      let paginationData = { totalPages: 1 };

      if (data.success) {
        // If response has success flag
        if (data.data) {
          if (Array.isArray(data.data)) {
            // Direct array of templates
            templatesData = data.data;
          } else if (data.data.templates) {
            // Nested templates array
            templatesData = data.data.templates;
            paginationData = data.data.pagination || paginationData;
          }
        }
      } else if (data.templates) {
        // Direct templates property
        templatesData = data.templates;
        paginationData = data.pagination || paginationData;
      } else if (Array.isArray(data)) {
        // Direct array response
        templatesData = data;
      }

      // Transform template data to match frontend expectations
      const transformedTemplates = templatesData.map(template => ({
        id: template._id || template.id,
        name: template.name || 'Untitled Template',
        subject: template.subject || '',
        preheader: template.preheader || '',
        components: template.components || [],
        settings: template.settings || {},
        category: template.category || 'other',
        tags: template.tags || [],
        isPublic: template.isPublic || false,
        isPremium: template.isPremium || false,
        isAIGenerated: template.isAIGenerated || false,
        aiPrompt: template.aiPrompt || '',
        createdBy: template.createdBy,
        thumbnailUrl: template.thumbnailUrl,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        rating: {
          average: template.averageRating || template.rating || 0,
          count: template.ratingCount || 0
        },
        usage: {
          views: template.usageCount || 0,
          uses: template.usageCount || 0,
          downloads: 0 // Add if your backend tracks this
        },
        htmlContent: template.htmlContent || ''
      }));

      setTemplates(transformedTemplates);
      setTotalPages(paginationData.totalPages || Math.ceil(templatesData.length / 12) || 1);
      
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      
      if (error.message.includes('fetch')) {
        setError('Cannot connect to server. Please ensure the backend is running on http://localhost:5000');
      } else {
        setError(error.message || 'Failed to load templates. Please try again.');
      }
      
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };


 const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return; // Don't fetch stats if no token
    }

    const response = await fetch('http://localhost:5000/api/templates/stats/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        return;
      }
      throw new Error('Failed to fetch stats');
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      if (data.success) {
        setStats(data.data.overview || data.data);
      }
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Don't set error for stats as it's not critical
  }
};

const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const config = {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    throw new Error('Session expired. Please log in again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
};
  
 const deleteTemplate = async (id) => {
  if (!confirm('Are you sure you want to delete this template?')) {
    return;
  }

  try {
    await apiRequest(`http://localhost:5000/api/templates/${id}`, {
      method: 'DELETE'
    });

    setTemplates(templates.filter(template => template.id !== id));
    fetchStats(); // Refresh stats
  } catch (error) {
    console.error('Error deleting template:', error);
    setError(error.message);
  }
};

// Updated duplicateTemplate function
const duplicateTemplate = async (templateId: string) => {
  try {
    await apiService.duplicateTemplate(templateId);
    fetchTemplates(); // Refresh templates
    fetchStats(); // Refresh stats
  } catch (error: any) {
    console.error('Error duplicating template:', error);
    setError(error.message || 'Failed to duplicate template');
  }
};

  const downloadTemplate = async (template: EmailTemplate) => {
  try {
    // Increment download count on backend if needed
    // This would require a separate API endpoint to track downloads
    
    // Download template as JSON
    const templateData = JSON.stringify(template, null, 2);
    const blob = new Blob([templateData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name || 'template'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading template:', error);
    setError('Failed to download template');
  }
};

  const handleAIGenerate = async (generatedTemplate: EmailTemplate) => {
    // Template is already saved in the AI generator component
    fetchTemplates();
    fetchStats();
  };

  const filteredTemplates = templates;

  const generateTemplatePreview = (template: EmailTemplate) => {
    // Enhanced preview generation based on template analysis
    const hasHeader = template.components?.some(c => c.type === 'header') || 
                      template.htmlContent?.includes('<header') || 
                      template.htmlContent?.includes('header');
    
    const hasImage = template.components?.some(c => c.type === 'image') || 
                     template.htmlContent?.includes('<img') || 
                     template.htmlContent?.includes('background-image');
    
    const hasButton = template.components?.some(c => c.type === 'button') || 
                      template.htmlContent?.includes('<button') || 
                      template.htmlContent?.includes('btn');
    
    const hasProduct = template.components?.some(c => c.type === 'product') || 
                       template.htmlContent?.includes('product') || 
                       template.htmlContent?.includes('price');

    // Color extraction from template
    const getTemplateColors = () => {
      if (template.settings?.backgroundColor && template.settings.backgroundColor !== '#f4f4f4') {
        return {
          primary: template.settings.backgroundColor,
          secondary: '#ffffff',
          accent: '#007bff'
        };
      }
      
      // Try to extract colors from HTML content
      const colorMatches = template.htmlContent?.match(/#[0-9A-Fa-f]{6}/g) || [];
      return {
        primary: colorMatches[0] || '#007bff',
        secondary: colorMatches[1] || '#ffffff', 
        accent: colorMatches[2] || '#28a745'
      };
    };

    const colors = getTemplateColors();
    
    let previewElements = [];
    
    if (hasHeader) {
      previewElements.push(
        <div 
          key="header" 
          className="h-12 rounded-t-lg flex items-center px-4"
          style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}
        >
          <div className="w-20 h-4 bg-white bg-opacity-90 rounded"></div>
          <div className="ml-auto w-16 h-3 bg-white bg-opacity-70 rounded"></div>
        </div>
      );
    }
    
    previewElements.push(
      <div key="content" className="p-4 bg-white flex-1">
        <div className="w-3/4 h-6 rounded mb-3" style={{ backgroundColor: colors.primary }}></div>
        <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
        <div className="w-5/6 h-2 bg-gray-300 rounded mb-4"></div>
        
        {hasImage && (
          <div 
            className="w-full h-20 rounded mb-4 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${colors.secondary}40, ${colors.primary}40)` }}
          >
            <div className="w-8 h-8 bg-gray-400 rounded opacity-70"></div>
          </div>
        )}
        
        {hasProduct && (
          <div className="border border-gray-200 rounded p-3 mb-4">
            <div 
              className="w-full h-16 rounded mb-2"
              style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}20)` }}
            ></div>
            <div className="w-2/3 h-3 bg-gray-600 rounded mb-1"></div>
            <div className="w-1/3 h-4 rounded" style={{ backgroundColor: colors.accent }}></div>
          </div>
        )}
        
        <div className="w-4/5 h-2 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/5 h-2 bg-gray-300 rounded mb-4"></div>
        
        {hasButton && (
          <div className="flex justify-center">
            <div 
              className="w-24 h-8 rounded"
              style={{ backgroundColor: colors.primary }}
            ></div>
          </div>
        )}
      </div>
    );
    
    previewElements.push(
      <div key="footer" className="h-8 bg-gray-100 rounded-b-lg flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }}></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    );
    
    return previewElements;
  };

  const StatsCard = ({ title, value, icon, change }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? '+' : ''}{change.value}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Templates"
                value={stats.totalTemplates}
                icon={<Grid className="w-6 h-6 text-blue-600" />}
              />
              <StatsCard
                title="Total Views"
                value={stats.totalViews.toLocaleString()}
                icon={<Eye className="w-6 h-6 text-green-600" />}
              />
              <StatsCard
                title="AI Generated"
                value={stats.aiGeneratedCount}
                icon={<Sparkles className="w-6 h-6 text-purple-600" />}
              />
              <StatsCard
                title="Avg Rating"
                value={stats.averageRating ? stats.averageRating.toFixed(1) : '0.0'}
                icon={<Star className="w-6 h-6 text-yellow-600" />}
              />
            </div>
          )}

          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Templates</h1>
              <p className="text-gray-600">Manage your email templates with AI-powered generation</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAIGenerator(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5" />
                AI Generator
              </button>
              <button
                onClick={onCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Create Template
              </button>
              <button
                onClick={fetchTemplates}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search, Filter and Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <optgroup key={option.value} label={option.label}>
                    <option value={`${option.value}-desc`}>
                      {option.label} (Newest first)
                    </option>
                    <option value={`${option.value}-asc`}>
                      {option.label} (Oldest first)
                    </option>
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-5 h-5 text-red-500">⚠️</div>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Templates Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading templates...</p>
            </div>
          </div>
        ) : filteredTemplates.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-sm max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'No templates found' : 'No templates yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or browse different categories' 
                  : 'Create your first email template to get started'}
              </p>
              <div className="flex justify-center gap-3">
                {searchTerm || selectedCategory !== 'all' ? (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : null}
                <button
                  onClick={() => setShowAIGenerator(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Try AI Generator
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Templates Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                  >
                    {/* Template Preview */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <div className="absolute inset-0 p-2">
                        <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
                          {generateTemplatePreview(template)}
                        </div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="flex gap-3">
                          <button
                            onClick={() => onPreviewTemplate(template)}
                            className="p-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                            title="Preview"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => onEditTemplate(template)}
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                            title="Edit Template"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => duplicateTemplate(template.id)}
                            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-lg"
                            title="Duplicate"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Category & AI Badge */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {template.category || 'Custom'}
                        </span>
                        {template.isAIGenerated && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Share functionality
                          }}
                          className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {template.subject || 'Professional email template'}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {template.rating?.average ? template.rating.average.toFixed(1) : '0.0'}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({template.rating?.count || 0})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {template.usage?.views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {template.usage?.downloads || 0}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(template.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadTemplate(template);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTemplate(template.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          {template.isAIGenerated ? (
                            <Sparkles className="w-6 h-6 text-purple-600" />
                          ) : (
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(template.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {template.usage?.views || 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              {template.rating?.average ? template.rating.average.toFixed(1) : '0.0'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onPreviewTemplate(template)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onEditTemplate(template)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => duplicateTemplate(template.id)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadTemplate(template)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* AI Template Generator Modal */}
      {showAIGenerator && (
        <AITemplateGenerator
          onGenerate={handleAIGenerate}
          onClose={() => setShowAIGenerator(false)}
          userId={userId}
        />
      )}
    </div>
  );
};