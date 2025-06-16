/**
 * Client-side Performance Monitor
 * Tracks real page load times and sends data to console/analytics
 */

import React from 'react';

interface PerformanceMetric {
  page: string;
  loadTime: number;
  timestamp: number;
  userAgent: string;
  connectionType?: string;
  renderTime?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

class PerformanceMonitor {
  private startTime: number = 0;
  private pageName: string = '';

  startPageLoad(pageName: string) {
    this.pageName = pageName;
    this.startTime = performance.now();
    
    // Mark the start of page load
    performance.mark(`page-load-start-${pageName}`);
  }

  endPageLoad() {
    if (!this.startTime || !this.pageName) return;

    const endTime = performance.now();
    const loadTime = Math.round(endTime - this.startTime);
    
    // Mark the end of page load
    performance.mark(`page-load-end-${this.pageName}`);
    performance.measure(
      `page-load-${this.pageName}`,
      `page-load-start-${this.pageName}`,
      `page-load-end-${this.pageName}`
    );

    // Get Web Vitals if available
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime;
    const largestContentfulPaint = paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime;

    // Get connection info if available
    const connection = (navigator as any).connection;
    const connectionType = connection?.effectiveType || 'unknown';

    const metric: PerformanceMetric = {
      page: this.pageName,
      loadTime,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      connectionType,
      firstContentfulPaint: firstContentfulPaint ? Math.round(firstContentfulPaint) : undefined,
      largestContentfulPaint: largestContentfulPaint ? Math.round(largestContentfulPaint) : undefined,
    };

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Performance: ${this.pageName}`);
      console.log(`⏱️  Total Load Time: ${loadTime}ms`);
      console.log(`🎨 First Contentful Paint: ${firstContentfulPaint ? Math.round(firstContentfulPaint) + 'ms' : 'N/A'}`);
      console.log(`🖼️  Largest Contentful Paint: ${largestContentfulPaint ? Math.round(largestContentfulPaint) + 'ms' : 'N/A'}`);
      console.log(`🌐 Connection: ${connectionType}`);
      console.groupEnd();
    }

    // Store in localStorage for analysis
    this.storeMetric(metric);

    // Send to analytics (if configured)
    this.sendToAnalytics(metric);

    // Reset
    this.startTime = 0;
    this.pageName = '';
  }

  private storeMetric(metric: PerformanceMetric) {
    try {
      const stored = localStorage.getItem('openqase-performance-metrics');
      const metrics: PerformanceMetric[] = stored ? JSON.parse(stored) : [];
      
      // Keep only last 50 metrics
      metrics.push(metric);
      if (metrics.length > 50) {
        metrics.shift();
      }
      
      localStorage.setItem('openqase-performance-metrics', JSON.stringify(metrics));
    } catch (error) {
      console.warn('Failed to store performance metric:', error);
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to your analytics service (Google Analytics, Mixpanel, etc.)
    // For now, we'll just log slow pages
    if (metric.loadTime > 1000) {
      console.warn(`🐌 Slow page detected: ${metric.page} took ${metric.loadTime}ms`);
    }
  }

  // Get stored metrics for analysis
  getStoredMetrics(): PerformanceMetric[] {
    try {
      const stored = localStorage.getItem('openqase-performance-metrics');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to retrieve performance metrics:', error);
      return [];
    }
  }

  // Clear stored metrics
  clearMetrics() {
    localStorage.removeItem('openqase-performance-metrics');
  }

  // Get performance summary
  getPerformanceSummary() {
    const metrics = this.getStoredMetrics();
    if (metrics.length === 0) return null;

    const loadTimes = metrics.map(m => m.loadTime);
    const average = Math.round(loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length);
    const slowest = Math.max(...loadTimes);
    const fastest = Math.min(...loadTimes);
    
    const slowPages = metrics.filter(m => m.loadTime > 1000);
    const pageStats = metrics.reduce((acc, metric) => {
      if (!acc[metric.page]) {
        acc[metric.page] = { count: 0, totalTime: 0, avgTime: 0 };
      }
      acc[metric.page].count++;
      acc[metric.page].totalTime += metric.loadTime;
      acc[metric.page].avgTime = Math.round(acc[metric.page].totalTime / acc[metric.page].count);
      return acc;
    }, {} as Record<string, { count: number; totalTime: number; avgTime: number }>);

    return {
      totalMeasurements: metrics.length,
      averageLoadTime: average,
      fastestLoad: fastest,
      slowestLoad: slowest,
      slowPagesCount: slowPages.length,
      pageStats,
      slowPages: slowPages.map(p => ({ page: p.page, loadTime: p.loadTime }))
    };
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for React components
export function usePerformanceMonitor(pageName: string) {
  React.useEffect(() => {
    performanceMonitor.startPageLoad(pageName);
    
    return () => {
      performanceMonitor.endPageLoad();
    };
  }, [pageName]);
}

// Utility to log performance summary to console
export function logPerformanceSummary() {
  const summary = performanceMonitor.getPerformanceSummary();
  if (!summary) {
    console.log('📊 No performance data available yet');
    return;
  }

  console.group('📊 OpenQase Performance Summary');
  console.log(`📈 Total Measurements: ${summary.totalMeasurements}`);
  console.log(`⚡ Average Load Time: ${summary.averageLoadTime}ms`);
  console.log(`🚀 Fastest Load: ${summary.fastestLoad}ms`);
  console.log(`🐌 Slowest Load: ${summary.slowestLoad}ms`);
  console.log(`⚠️  Slow Pages (>1s): ${summary.slowPagesCount}`);
  
  if (summary.slowPages.length > 0) {
    console.group('🐌 Slow Pages:');
    summary.slowPages.forEach(page => {
      console.log(`  - ${page.page}: ${page.loadTime}ms`);
    });
    console.groupEnd();
  }

  console.group('📄 Page Statistics:');
  Object.entries(summary.pageStats).forEach(([page, stats]) => {
    console.log(`  - ${page}: ${stats.avgTime}ms avg (${stats.count} loads)`);
  });
  console.groupEnd();
  
  console.groupEnd();
}

// Add to window for debugging
if (typeof window !== 'undefined') {
  (window as any).openqasePerformance = {
    monitor: performanceMonitor,
    summary: logPerformanceSummary,
    clear: () => performanceMonitor.clearMetrics()
  };
} 