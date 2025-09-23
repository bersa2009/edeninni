/**
 * Production-safe logging utility
 * 
 * This logger automatically disables console output in production builds
 * and provides structured logging capabilities
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: unknown;
}

class Logger {
  private isDevelopment = __DEV__;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  private createLogEntry(
    level: LogLevel, 
    message: string, 
    context?: string, 
    data?: unknown
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    // Keep log history for debugging
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }

    return entry;
  }

  private shouldLog(level: LogLevel): boolean {
    // Always log errors and warnings
    if (level === 'error' || level === 'warn') {
      return true;
    }
    
    // Log info and debug only in development
    return this.isDevelopment;
  }

  debug(message: string, context?: string, data?: unknown): void {
    if (this.shouldLog('debug')) {
      const entry = this.createLogEntry('debug', message, context, data);
      console.debug(`[DEBUG${context ? ` ${context}` : ''}] ${message}`, data || '');
    }
  }

  info(message: string, context?: string, data?: unknown): void {
    if (this.shouldLog('info')) {
      const entry = this.createLogEntry('info', message, context, data);
      console.info(`[INFO${context ? ` ${context}` : ''}] ${message}`, data || '');
    }
  }

  warn(message: string, context?: string, data?: unknown): void {
    if (this.shouldLog('warn')) {
      const entry = this.createLogEntry('warn', message, context, data);
      console.warn(`[WARN${context ? ` ${context}` : ''}] ${message}`, data || '');
    }
  }

  error(message: string, context?: string, error?: Error | unknown): void {
    if (this.shouldLog('error')) {
      const entry = this.createLogEntry('error', message, context, error);
      console.error(`[ERROR${context ? ` ${context}` : ''}] ${message}`, error || '');
      
      // In production, you might want to send errors to a logging service
      if (!this.isDevelopment) {
        this.sendToLoggingService(entry);
      }
    }
  }

  private sendToLoggingService(entry: LogEntry): void {
    // TODO: Implement logging service integration (Sentry, LogRocket, etc.)
    // For now, just store in memory
  }

  // Get recent logs for debugging
  getRecentLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logHistory.filter(entry => entry.level === level);
    }
    return [...this.logHistory];
  }

  // Clear log history
  clearHistory(): void {
    this.logHistory = [];
  }

  // Performance logging
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience functions
export const logDebug = (message: string, context?: string, data?: unknown) => 
  logger.debug(message, context, data);

export const logInfo = (message: string, context?: string, data?: unknown) => 
  logger.info(message, context, data);

export const logWarn = (message: string, context?: string, data?: unknown) => 
  logger.warn(message, context, data);

export const logError = (message: string, context?: string, error?: Error | unknown) => 
  logger.error(message, context, error);

// Development-only logging
export const devLog = (message: string, data?: unknown) => {
  if (__DEV__) {
    console.log(`[DEV] ${message}`, data || '');
  }
};