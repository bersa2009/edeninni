/**
 * Local Storage Service using AsyncStorage
 * 
 * Handles all local data persistence for the baby cry analyzer app
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnalysisResult } from '../types';
import { logError, logWarn, logInfo, devLog } from './logger';

// Storage keys
const STORAGE_KEYS = {
  ANALYSIS_HISTORY: 'analysis_history',
  USER_PREFERENCES: 'user_preferences',
  APP_SETTINGS: 'app_settings',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LAST_ANALYSIS: 'last_analysis',
  MODEL_VERSION: 'model_version',
  PERMISSION_STATUS: 'permission_status',
} as const;

// Type definitions for stored data
export interface UserPreferences {
  language: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  autoSaveResults: boolean;
}

export interface AppSettings {
  recordingQuality: 'low' | 'medium' | 'high';
  analysisTimeout: number;
  maxHistoryItems: number;
  enableAnalytics: boolean;
}

export interface AnalysisHistoryItem extends AnalysisResult {
  id: string;
  audioPath?: string;
  duration?: number;
  confidence?: number;
  userFeedback?: 'correct' | 'incorrect' | null;
}

// Storage service class
class StorageService {
  // Generic methods
  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      logError(`Failed to save data to storage`, 'StorageService', { key, error });
      return false;
    }
  }

  async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue === null) {
        return defaultValue || null;
      }
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      logError(`Failed to read data from storage`, 'StorageService', { key, error });
      return defaultValue || null;
    }
  }

  async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      logError(`Failed to remove data from storage`, 'StorageService', { key, error });
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      logError('Failed to clear storage', 'StorageService', error);
      return false;
    }
  }

  // Analysis History
  async getAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
    const history = await this.getItem<AnalysisHistoryItem[]>(
      STORAGE_KEYS.ANALYSIS_HISTORY, 
      []
    );
    return history || [];
  }

  async saveAnalysisResult(result: AnalysisResult, audioPath?: string): Promise<boolean> {
    try {
      const history = await this.getAnalysisHistory();
      
      const newItem: AnalysisHistoryItem = {
        ...result,
        id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        audioPath,
        duration: 0, // Could be calculated from audio file
      };

      // Add to beginning of array
      history.unshift(newItem);

      // Keep only last 50 items to prevent storage bloat
      const maxItems = await this.getMaxHistoryItems();
      if (history.length > maxItems) {
        history.splice(maxItems);
      }

      logInfo('Analysis result saved to history', 'StorageService', { 
        analysisId: newItem.id,
        totalHistoryItems: history.length 
      });
      return await this.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, history);
    } catch (error) {
      logError('Failed to save analysis result', 'StorageService', error);
      return false;
    }
  }

  async updateAnalysisFeedback(analysisId: string, feedback: 'correct' | 'incorrect'): Promise<boolean> {
    try {
      const history = await this.getAnalysisHistory();
      const index = history.findIndex(item => item.id === analysisId);
      
      if (index !== -1) {
        history[index].userFeedback = feedback;
        return await this.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, history);
      }
      
      return false;
    } catch (error) {
      logError('Failed to update analysis feedback', 'StorageService', { analysisId, error });
      return false;
    }
  }

  async clearAnalysisHistory(): Promise<boolean> {
    return await this.removeItem(STORAGE_KEYS.ANALYSIS_HISTORY);
  }

  // User Preferences
  async getUserPreferences(): Promise<UserPreferences> {
    const defaultPreferences: UserPreferences = {
      language: 'tr',
      soundEnabled: true,
      vibrationEnabled: true,
      theme: 'light',
      autoSaveResults: true,
    };

    const preferences = await this.getItem<UserPreferences>(
      STORAGE_KEYS.USER_PREFERENCES,
      defaultPreferences
    );

    return preferences || defaultPreferences;
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<boolean> {
    try {
      const currentPreferences = await this.getUserPreferences();
      const updatedPreferences = { ...currentPreferences, ...preferences };
      return await this.setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
    } catch (error) {
      logError('Failed to update user preferences', 'StorageService', error);
      return false;
    }
  }

  // App Settings
  async getAppSettings(): Promise<AppSettings> {
    const defaultSettings: AppSettings = {
      recordingQuality: 'high',
      analysisTimeout: 30000, // 30 seconds
      maxHistoryItems: 50,
      enableAnalytics: true,
    };

    const settings = await this.getItem<AppSettings>(
      STORAGE_KEYS.APP_SETTINGS,
      defaultSettings
    );

    return settings || defaultSettings;
  }

  async updateAppSettings(settings: Partial<AppSettings>): Promise<boolean> {
    try {
      const currentSettings = await this.getAppSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      return await this.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
    } catch (error) {
      logError('Failed to update app settings', 'StorageService', error);
      return false;
    }
  }

  // Helper methods
  async getMaxHistoryItems(): Promise<number> {
    const settings = await this.getAppSettings();
    return settings.maxHistoryItems;
  }

  async isOnboardingCompleted(): Promise<boolean> {
    return (await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED)) || false;
  }

  async setOnboardingCompleted(): Promise<boolean> {
    return await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
  }

  async getLastAnalysis(): Promise<AnalysisHistoryItem | null> {
    return await this.getItem<AnalysisHistoryItem>(STORAGE_KEYS.LAST_ANALYSIS);
  }

  async setLastAnalysis(analysis: AnalysisHistoryItem): Promise<boolean> {
    return await this.setItem(STORAGE_KEYS.LAST_ANALYSIS, analysis);
  }

  async getModelVersion(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.MODEL_VERSION);
  }

  async setModelVersion(version: string): Promise<boolean> {
    return await this.setItem(STORAGE_KEYS.MODEL_VERSION, version);
  }

  // Storage info and cleanup
  async getStorageInfo(): Promise<{
    totalItems: number;
    historyItems: number;
    estimatedSize: string;
  }> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const history = await this.getAnalysisHistory();
      
      // Rough size estimation
      let totalSize = 0;
      for (const key of allKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }

      return {
        totalItems: allKeys.length,
        historyItems: history.length,
        estimatedSize: `${(totalSize / 1024).toFixed(2)} KB`,
      };
    } catch (error) {
      logError('Failed to get storage info', 'StorageService', error);
      return {
        totalItems: 0,
        historyItems: 0,
        estimatedSize: '0 KB',
      };
    }
  }

  async cleanupOldData(): Promise<boolean> {
    try {
      // Remove old analysis history beyond limit
      const history = await this.getAnalysisHistory();
      const maxItems = await this.getMaxHistoryItems();
      
      if (history.length > maxItems) {
        const trimmedHistory = history.slice(0, maxItems);
        await this.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, trimmedHistory);
      }

      // Remove old audio files if they exist
      // This would need to be implemented based on your file storage strategy

      logInfo('Storage cleanup completed', 'StorageService');
      return true;
    } catch (error) {
      logError('Failed to cleanup old data', 'StorageService', error);
      return false;
    }
  }
}

// Export singleton instance
export const storage = new StorageService();

// Convenience functions
export const saveAnalysis = (result: AnalysisResult, audioPath?: string) => 
  storage.saveAnalysisResult(result, audioPath);

export const getAnalysisHistory = () => 
  storage.getAnalysisHistory();

export const getUserPreferences = () => 
  storage.getUserPreferences();

export const updateUserPreferences = (preferences: Partial<UserPreferences>) => 
  storage.updateUserPreferences(preferences);

export const getAppSettings = () => 
  storage.getAppSettings();

export const isFirstLaunch = async () => 
  !(await storage.isOnboardingCompleted());