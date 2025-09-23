/**
 * Performance Optimization Utilities
 * 
 * This module provides performance monitoring and optimization
 * utilities for the baby cry analyzer app
 */

import { logInfo, logWarn } from './logger';

// Performance metrics interface
export interface PerformanceMetrics {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  category: 'ui' | 'audio' | 'analysis' | 'storage' | 'navigation';
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private activeTimers = new Map<string, number>();
  private maxMetricsSize = 100;

  // Start performance measurement
  startMeasurement(name: string, category: PerformanceMetrics['category'], metadata?: Record<string, unknown>): void {
    const startTime = Date.now();
    this.activeTimers.set(name, startTime);
    
    const metric: PerformanceMetrics = {
      name,
      startTime,
      category,
      metadata,
    };
    
    this.metrics.push(metric);
    
    // Keep metrics size manageable
    if (this.metrics.length > this.maxMetricsSize) {
      this.metrics.shift();
    }
  }

  // End performance measurement
  endMeasurement(name: string): PerformanceMetrics | null {
    const endTime = Date.now();
    const startTime = this.activeTimers.get(name);
    
    if (!startTime) {
      logWarn(`Performance measurement not found: ${name}`, 'PerformanceMonitor');
      return null;
    }
    
    const duration = endTime - startTime;
    this.activeTimers.delete(name);
    
    // Find and update the metric
    const metricIndex = this.metrics.findIndex(m => m.name === name && !m.endTime);
    if (metricIndex !== -1) {
      this.metrics[metricIndex].endTime = endTime;
      this.metrics[metricIndex].duration = duration;
      
      // Log slow operations
      if (duration > 3000) { // 3 seconds
        logWarn(`Slow operation detected: ${name} took ${duration}ms`, 'PerformanceMonitor');
      }
      
      return this.metrics[metricIndex];
    }
    
    return null;
  }

  // Get performance report
  getReport(): {
    totalMeasurements: number;
    averageDurations: Record<string, number>;
    slowOperations: PerformanceMetrics[];
    categoryBreakdown: Record<string, number>;
  } {
    const completedMetrics = this.metrics.filter(m => m.duration !== undefined);
    
    // Calculate averages by operation name
    const averageDurations: Record<string, number> = {};
    const operationCounts: Record<string, number> = {};
    
    completedMetrics.forEach(metric => {
      if (!averageDurations[metric.name]) {
        averageDurations[metric.name] = 0;
        operationCounts[metric.name] = 0;
      }
      averageDurations[metric.name] += metric.duration!;
      operationCounts[metric.name]++;
    });
    
    Object.keys(averageDurations).forEach(name => {
      averageDurations[name] = Math.round(averageDurations[name] / operationCounts[name]);
    });
    
    // Find slow operations (>2 seconds)
    const slowOperations = completedMetrics.filter(m => m.duration! > 2000);
    
    // Category breakdown
    const categoryBreakdown: Record<string, number> = {};
    completedMetrics.forEach(metric => {
      categoryBreakdown[metric.category] = (categoryBreakdown[metric.category] || 0) + 1;
    });
    
    return {
      totalMeasurements: completedMetrics.length,
      averageDurations,
      slowOperations,
      categoryBreakdown,
    };
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics = [];
    this.activeTimers.clear();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions
export const startTimer = (name: string, category: PerformanceMetrics['category'], metadata?: Record<string, unknown>) => {
  performanceMonitor.startMeasurement(name, category, metadata);
};

export const endTimer = (name: string) => {
  return performanceMonitor.endMeasurement(name);
};

// Performance decorator for async functions
export function measurePerformance<T extends (...args: any[]) => Promise<any>>(
  name: string,
  category: PerformanceMetrics['category'],
  fn: T
): T {
  return (async (...args: Parameters<T>) => {
    startTimer(name, category, { args: args.length });
    try {
      const result = await fn(...args);
      endTimer(name);
      return result;
    } catch (error) {
      endTimer(name);
      throw error;
    }
  }) as T;
}

// Memory usage monitoring
export const getMemoryUsage = (): { used: number; total?: number } => {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
    };
  }
  
  return { used: 0 };
};

// Bundle size optimization helpers
export const lazy = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return React.lazy(() => {
    startTimer('lazy-load-component', 'ui');
    return importFn().then(module => {
      endTimer('lazy-load-component');
      return module;
    });
  });
};

// React performance hooks
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return React.useCallback(callback, deps);
};

export const useMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return React.useMemo(factory, deps);
};

// Image optimization helpers
export const optimizeImageProps = (source: any, width?: number, height?: number) => {
  return {
    source,
    style: width && height ? { width, height } : undefined,
    resizeMode: 'contain' as const,
    // Add performance optimizations
    fadeDuration: 0, // Disable fade animation for faster loading
    progressiveRenderingEnabled: true,
    shouldRasterizeIOS: true,
  };
};

// List performance optimization
export const getItemLayout = (itemHeight: number) => (
  _: any,
  index: number
) => ({
  length: itemHeight,
  offset: itemHeight * index,
  index,
});

// Network request optimization
export const createCacheKey = (url: string, params?: Record<string, any>): string => {
  const paramsString = params ? JSON.stringify(params) : '';
  return `${url}_${paramsString}`;
};

// Storage optimization
export const batchStorageOperations = async <T>(
  operations: (() => Promise<T>)[]
): Promise<T[]> => {
  startTimer('batch-storage-operations', 'storage', { count: operations.length });
  
  try {
    const results = await Promise.all(operations.map(op => op()));
    endTimer('batch-storage-operations');
    return results;
  } catch (error) {
    endTimer('batch-storage-operations');
    throw error;
  }
};

// React import to fix the lazy function
import React from 'react';