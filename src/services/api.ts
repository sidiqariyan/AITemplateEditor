const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check content type first
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }

      const data = await response.json();

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 401) {
          this.logout(); // Clear invalid token
          if (data.code === 'TOKEN_EXPIRED') {
            throw new Error('Your session has expired. Please log in again.');
          }
          throw new Error('Authentication failed. Please log in again.');
        }
        
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // Handle the response structure
      if (data.success === false) {
        throw new Error(data.message || 'Operation failed');
      }

      // Return the entire response object for successful responses
      // This preserves the structure from your backend
      return data;
      
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Handle response structure where token might be in data or directly in response
    const token = response.data?.token || response.token;
    if (token) {
      this.token = token;
      localStorage.setItem('authToken', token);
    }
    
    return response.data || response;
  }

  // Updated register method to handle response structure  
  async register(name: string, email: string, password: string) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    // Handle response structure where token might be in data or directly in response
    const token = response.data?.token || response.token;
    if (token) {
      this.token = token;
      localStorage.setItem('authToken', token);
    }
    
    return response.data || response;
  }

  async getCurrentUser() {
    const response = await this.request('/auth/me');
    return response.data?.user || response.user || response;
  }

  // Add token validation method
  isAuthenticated(): boolean {
    if (!this.token) return false;
    
    try {
      // Basic JWT token validation
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // Updated logout to use consistent token key
  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Template methods
  async getTemplates(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    ).toString() : '';
    
    const response = await this.request(`/templates${queryString}`);
    
    // Handle paginated response structure
    return {
      templates: response.data?.templates || response.templates || [],
      pagination: response.data?.pagination || response.pagination || {}
    };
  }

  async getMyTemplates(page = 1, limit = 20) {
    const response = await this.request(`/templates/my-templates?page=${page}&limit=${limit}`);
    return response.data || response;
  }

  async getTemplate(id: string) {
    const response = await this.request(`/templates/${id}`);
    return response.data || response;
  }

  async createTemplate(templateData: any) {
    const response = await this.request('/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
    return response.data || response;
  }

  async updateTemplate(id: string, templateData: any) {
    const response = await this.request(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    });
    return response.data || response;
  }

  async deleteTemplate(id: string) {
    const response = await this.request(`/templates/${id}`, {
      method: 'DELETE',
    });
    return response.data || response;
  }

  async cloneTemplate(id: string) {
    const response = await this.request(`/templates/${id}/clone`, {
      method: 'POST',
    });
    return response.data || response;
  }

  async toggleFavorite(id: string) {
    const response = await this.request(`/templates/${id}/favorite`, {
      method: 'POST',
    });
    return response.data || response;
  }

  async rateTemplate(id: string, rating: number) {
    const response = await this.request(`/templates/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    });
    return response.data || response;
  }

  async duplicateTemplate(id: string) {
    const response = await this.request(`/templates/${id}/duplicate`, {
      method: 'POST',
    });
    return response.data || response;
  }

  // Add missing stats method
  async getTemplateStats() {
    const response = await this.request('/templates/stats/dashboard');
    return response.data || response;
  }

  // AI methods
  async generateTemplate(prompt: string, category?: string, templateName?: string) {
    const response = await this.request('/ai/generate-template', {
      method: 'POST',
      body: JSON.stringify({ prompt, category, templateName }),
    });
    // The backend returns { success: true, message: '...', template: {...} }
    // So we return the whole response object
    return response;
  }

  async getAISuggestions(category: string) {
    const response = await this.request(`/ai/suggestions/${category}`);
    return response.data || response;
  }

  async enhanceTemplate(id: string, enhancementType: string, prompt?: string) {
    const response = await this.request(`/ai/enhance-template/${id}`, {
      method: 'POST',
      body: JSON.stringify({ enhancementType, prompt }),
    });
    return response.data || response;
  }

  // Admin methods
  async getAdminDashboard() {
    const response = await this.request('/admin/dashboard');
    return response.data || response;
  }

  async getAdminUsers(params?: { page?: number; limit?: number; search?: string }) {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    const response = await this.request(`/admin/users${queryString}`);
    return response.data || response;
  }

  async getAdminTemplates(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    isPublic?: boolean;
  }) {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    const response = await this.request(`/admin/templates${queryString}`);
    return response.data || response;
  }

  async createAdminTemplate(templateData: any) {
    const response = await this.request('/admin/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
    return response.data || response;
  }

  async updateAdminTemplate(id: string, data: any) {
    const response = await this.request(`/admin/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data || response;
  }

  async deleteAdminTemplate(id: string) {
    const response = await this.request(`/admin/templates/${id}`, {
      method: 'DELETE',
    });
    return response.data || response;
  }

  async updateUserRole(id: string, role: string) {
    const response = await this.request(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return response.data || response;
  }

  async deactivateUser(id: string) {
    const response = await this.request(`/admin/users/${id}/deactivate`, {
      method: 'PUT',
    });
    return response.data || response;
  }
}

export const apiService = new ApiService();