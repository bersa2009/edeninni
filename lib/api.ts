/**
 * API Service for backend communication
 * 
 * This service handles all HTTP requests to the backend API
 * Currently configured for future backend integration
 */

import { logError, logWarn, logInfo } from './logger';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiRequestBody {
  [key: string]: unknown;
}

export interface AnalysisRequestBody extends ApiRequestBody {
  audioFile: File | Blob;
  fileName: string;
  metadata?: {
    duration?: number;
    sampleRate?: number;
    channels?: number;
  };
}

export interface FeedbackRequestBody extends ApiRequestBody {
  rating: 'correct' | 'incorrect';
  comment?: string;
  timestamp: string;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      const controller = new AbortController();
      
      // Set timeout
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logError(`API request failed: ${endpoint}`, 'ApiService', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: ApiRequestBody): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: ApiRequestBody): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Upload file (for audio files)
  async uploadFile<T>(
    endpoint: string,
    file: File | Blob,
    fileName: string
  ): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file, fileName);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout * 2); // Longer timeout for uploads

      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        // Don't set Content-Type header for FormData, let browser set it
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      logError(`File upload failed: ${endpoint}`, 'ApiService', error);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

// Default API configuration
const defaultConfig: ApiConfig = {
  baseUrl: __DEV__ 
    ? 'http://localhost:3000/api' // Development
    : 'https://your-api.com/api', // Production
  timeout: 10000,
};

// Export singleton instance
export const api = new ApiService(defaultConfig);

// Specific API endpoints for the baby cry analyzer
export const babyAnalyzerApi = {
  // Upload audio file for analysis
  analyzeAudio: async (audioFile: File | Blob, fileName: string) => {
    return api.uploadFile('/analyze', audioFile, fileName);
  },

  // Get user's analysis history
  getAnalysisHistory: async () => {
    return api.get('/history');
  },

  // Save analysis result
  saveAnalysis: async (result: import('../types').AnalysisResult) => {
    return api.post('/analysis', result);
  },

  // Get recommendations based on cry type
  getRecommendations: async (cryType: string) => {
    return api.get(`/recommendations/${cryType}`);
  },

  // Submit user feedback
  submitFeedback: async (analysisId: string, feedback: FeedbackRequestBody) => {
    return api.post(`/feedback/${analysisId}`, feedback);
  },

  // Check API health
  healthCheck: async () => {
    return api.get('/health');
  },
};

// Error handling utilities
export const handleApiError = (error: ApiResponse<unknown>) => {
  if (error.error) {
    logError('API Error encountered', 'ApiService', { error: error.error });
    // You can add toast notifications, error logging, etc. here
    return error.error;
  }
  return 'Bilinmeyen bir hata oluştu';
};

// Request interceptor for adding auth tokens
export const setAuthToken = (token: string) => {
  defaultConfig.headers = {
    ...defaultConfig.headers,
    'Authorization': `Bearer ${token}`,
  };
};