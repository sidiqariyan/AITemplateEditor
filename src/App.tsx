import React, { useState } from 'react';
import { useEffect } from 'react';
import { EmailTemplate } from './types/EmailTypes';
import { apiService } from './services/api';
import { AuthModal } from './components/Auth/AuthModal';
import { TemplateGallery } from './components/TemplateGallery';
import { EmailBuilder } from './components/EmailBuilder';
import { EmailPreview } from './components/EmailPreview';
import { User, LogOut, Settings } from 'lucide-react';

type AppView = 'gallery' | 'builder' | 'preview';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('gallery');
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate | undefined>();
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | undefined>();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await apiService.getCurrentUser();
        setUser(response.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setCurrentView('gallery');
  };
  const handleCreateNew = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCurrentTemplate(undefined);
    setCurrentView('builder');
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCurrentTemplate(template);
    setCurrentView('builder');
  };

  const handlePreviewTemplate = (template: EmailTemplate) => {
    setPreviewTemplate(template);
  };

  const handleSaveTemplate = (template: EmailTemplate) => {
    // Template is already saved to backend in EmailBuilder
    setCurrentView('gallery');
  };

  const handleBackToGallery = () => {
    setCurrentView('gallery');
  };

  const handleClosePreview = () => {
    setPreviewTemplate(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ET</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Email Template Builder</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'gallery' && (
        <TemplateGallery
          user={user}
          onCreateNew={handleCreateNew}
          onEditTemplate={handleEditTemplate}
          onPreviewTemplate={handlePreviewTemplate}
        />
      )}
      
      {currentView === 'builder' && (
        <EmailBuilder
          template={currentTemplate}
          onSave={handleSaveTemplate}
          onBack={handleBackToGallery}
        />
      )}
      
      {previewTemplate && (
        <EmailPreview
          components={previewTemplate.components}
          onClose={handleClosePreview}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;