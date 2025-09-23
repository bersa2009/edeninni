/**
 * Centralized Error Handling System
 * 
 * This module provides comprehensive error handling utilities
 * for the baby cry analyzer app
 */

import { logError, logWarn } from './logger';

// Error types for better categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  PERMISSION = 'PERMISSION',
  AUDIO_RECORDING = 'AUDIO_RECORDING',
  AI_ANALYSIS = 'AI_ANALYSIS',
  STORAGE = 'STORAGE',
  NAVIGATION = 'NAVIGATION',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
}

// Severity levels
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Custom error interface
export interface AppError {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  originalError?: Error | unknown;
  context?: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// Error recovery strategies
export interface ErrorRecovery {
  canRecover: boolean;
  recoveryAction?: () => Promise<void>;
  fallbackAction?: () => void;
  userMessage: string;
  actionButtonText?: string;
}

class ErrorHandler {
  private errorHistory: AppError[] = [];
  private maxHistorySize = 50;

  // Create standardized error
  createError(
    type: ErrorType,
    severity: ErrorSeverity,
    message: string,
    originalError?: Error | unknown,
    context?: string
  ): AppError {
    const appError: AppError = {
      type,
      severity,
      message,
      originalError,
      context,
      timestamp: new Date().toISOString(),
    };

    // Add to history
    this.errorHistory.push(appError);
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift();
    }

    return appError;
  }

  // Handle error with appropriate logging and recovery
  handleError(appError: AppError): ErrorRecovery {
    // Log based on severity
    if (appError.severity === ErrorSeverity.CRITICAL || appError.severity === ErrorSeverity.HIGH) {
      logError(appError.message, appError.context, appError.originalError);
    } else {
      logWarn(appError.message, appError.context, appError.originalError);
    }

    // Determine recovery strategy based on error type
    return this.getRecoveryStrategy(appError);
  }

  private getRecoveryStrategy(error: AppError): ErrorRecovery {
    switch (error.type) {
      case ErrorType.NETWORK:
        return {
          canRecover: true,
          recoveryAction: async () => {
            // Retry network operation
            await new Promise(resolve => setTimeout(resolve, 1000));
          },
          userMessage: 'Bağlantı hatası oluştu. Tekrar deneyin.',
          actionButtonText: 'Tekrar Dene',
        };

      case ErrorType.PERMISSION:
        return {
          canRecover: true,
          fallbackAction: () => {
            // Navigate to settings or show permission guide
          },
          userMessage: 'Mikrofon izni gerekli. Lütfen ayarlardan izin verin.',
          actionButtonText: 'Ayarlara Git',
        };

      case ErrorType.AUDIO_RECORDING:
        return {
          canRecover: true,
          recoveryAction: async () => {
            // Reset audio session
            await new Promise(resolve => setTimeout(resolve, 500));
          },
          userMessage: 'Ses kayıt hatası. Lütfen tekrar deneyin.',
          actionButtonText: 'Tekrar Dene',
        };

      case ErrorType.AI_ANALYSIS:
        return {
          canRecover: true,
          recoveryAction: async () => {
            // Retry analysis or use fallback
            await new Promise(resolve => setTimeout(resolve, 1000));
          },
          userMessage: 'Analiz sırasında hata oluştu. Tekrar deneyin.',
          actionButtonText: 'Tekrar Analiz Et',
        };

      case ErrorType.STORAGE:
        return {
          canRecover: true,
          recoveryAction: async () => {
            // Clear corrupted data or reset storage
          },
          userMessage: 'Veri kayıt hatası. Uygulama verilerini sıfırlayabilirsiniz.',
          actionButtonText: 'Verileri Sıfırla',
        };

      case ErrorType.VALIDATION:
        return {
          canRecover: true,
          userMessage: 'Geçersiz veri girişi. Lütfen kontrol edin.',
          actionButtonText: 'Tamam',
        };

      default:
        return {
          canRecover: false,
          userMessage: 'Beklenmeyen bir hata oluştu. Uygulamayı yeniden başlatın.',
          actionButtonText: 'Tamam',
        };
    }
  }

  // Get recent errors for debugging
  getRecentErrors(type?: ErrorType): AppError[] {
    if (type) {
      return this.errorHistory.filter(error => error.type === type);
    }
    return [...this.errorHistory];
  }

  // Clear error history
  clearHistory(): void {
    this.errorHistory = [];
  }

  // Check if error is recoverable
  isRecoverable(error: AppError): boolean {
    return this.getRecoveryStrategy(error).canRecover;
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();

// Convenience functions for common error types
export const handleNetworkError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.NETWORK,
    ErrorSeverity.MEDIUM,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

export const handlePermissionError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.PERMISSION,
    ErrorSeverity.HIGH,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

export const handleAudioError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.AUDIO_RECORDING,
    ErrorSeverity.HIGH,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

export const handleAnalysisError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.AI_ANALYSIS,
    ErrorSeverity.MEDIUM,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

export const handleStorageError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.STORAGE,
    ErrorSeverity.MEDIUM,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

export const handleValidationError = (message: string, originalError?: unknown, context?: string) => {
  const error = errorHandler.createError(
    ErrorType.VALIDATION,
    ErrorSeverity.LOW,
    message,
    originalError,
    context
  );
  return errorHandler.handleError(error);
};

// Global error handler for uncaught errors
export const setupGlobalErrorHandler = () => {
  // React Native global error handler
  const globalAny = global as any;
  const originalHandler = globalAny.ErrorUtils?.getGlobalHandler?.();
  
  if (globalAny.ErrorUtils?.setGlobalHandler) {
    globalAny.ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
      const appError = errorHandler.createError(
        ErrorType.UNKNOWN,
        isFatal ? ErrorSeverity.CRITICAL : ErrorSeverity.HIGH,
        error.message,
        error,
        'GlobalErrorHandler'
      );
      
      errorHandler.handleError(appError);
      
      // Call original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }
};