'use client';

import { useEffect } from 'react';
import { measurePageLoad } from '@/lib/performance-debug';

interface PerformanceMonitorProps {
  pageName: string;
  contentType?: string;
}

/**
 * Client-side performance monitoring component
 * Add this to pages to track real user performance metrics
 */
export function PerformanceMonitor({ pageName, contentType }: PerformanceMonitorProps) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Measure page load performance
    measurePageLoad();

    // Track custom timing metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const nav = entry as PerformanceNavigationTiming;
          
          console.log(`🌐 [PERF] Client-side metrics for ${pageName}:`);
          console.log(`   - DNS Lookup: ${nav.domainLookupEnd - nav.domainLookupStart}ms`);
          console.log(`   - TCP Connect: ${nav.connectEnd - nav.connectStart}ms`);
          console.log(`   - TLS Setup: ${nav.secureConnectionStart ? nav.connectEnd - nav.secureConnectionStart : 0}ms`);
          console.log(`   - Server Response: ${nav.responseEnd - nav.requestStart}ms`);
          console.log(`   - DOM Processing: ${nav.domComplete - nav.responseEnd}ms`);
          console.log(`   - Page Load Complete: ${nav.loadEventEnd - nav.fetchStart}ms`);
        }

        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`🎨 [PERF] Largest Contentful Paint (${pageName}): ${entry.startTime.toFixed(2)}ms`);
        }

        if (entry.entryType === 'first-input') {
          const fid = entry as PerformanceEventTiming;
          console.log(`👆 [PERF] First Input Delay (${pageName}): ${fid.processingStart - fid.startTime}ms`);
        }

        if (entry.entryType === 'layout-shift') {
          const cls = entry as any; // TypeScript doesn't have LayoutShift type
          if (!cls.hadRecentInput) {
            console.log(`📐 [PERF] Cumulative Layout Shift (${pageName}): ${cls.value}`);
          }
        }
      });
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Some performance metrics not supported:', error);
    }

    // Track resource loading times
    const resourceObserver = new PerformanceObserver((list) => {
      const slowResources = list.getEntries()
        .filter((entry) => entry.duration > 100) // Resources taking more than 100ms
        .map((entry) => ({
          name: entry.name,
          duration: entry.duration,
          size: (entry as PerformanceResourceTiming).transferSize || 0
        }));

      if (slowResources.length > 0) {
        console.log(`🐌 [PERF] Slow resources on ${pageName}:`);
        slowResources.forEach((resource) => {
          console.log(`   - ${resource.name}: ${resource.duration.toFixed(2)}ms (${resource.size} bytes)`);
        });
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource timing not supported:', error);
    }

    // Detect client-side JavaScript execution time
    const startTime = performance.now();
    
    // Use requestIdleCallback to measure when the page becomes idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        const idleTime = performance.now() - startTime;
        console.log(`💤 [PERF] Time to interactive (${pageName}): ${idleTime.toFixed(2)}ms`);
      });
    }

    // Track any API calls that happen after page load
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url] = args;
      const fetchStart = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const fetchTime = performance.now() - fetchStart;
        
        // Only log if it's an API call (not static assets)
        if (typeof url === 'string' && (url.includes('/api/') || url.includes('supabase'))) {
          console.log(`🌐 [PERF] API Call (${pageName}): ${url} - ${fetchTime.toFixed(2)}ms`);
        }
        
        return response;
      } catch (error) {
        const fetchTime = performance.now() - fetchStart;
        console.error(`❌ [PERF] Failed API Call (${pageName}): ${url} - ${fetchTime.toFixed(2)}ms`, error);
        throw error;
      }
    };

    // Track memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log(`💾 [PERF] Memory usage (${pageName}):`);
      console.log(`   - Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   - Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   - Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    }

    // Clean up observers
    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
      window.fetch = originalFetch;
    };
  }, [pageName, contentType]);

  // This component doesn't render anything visible
  return null;
}

// Enhanced version with visual indicators (optional)
export function VisualPerformanceMonitor({ pageName, contentType }: PerformanceMonitorProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add a visual indicator for slow loading
    const indicator = document.createElement('div');
    indicator.id = 'perf-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: orange;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      z-index: 9999;
      display: none;
    `;
    indicator.textContent = 'Loading...';
    document.body.appendChild(indicator);

    // Show indicator if page takes more than 1 second
    const slowLoadTimeout = setTimeout(() => {
      indicator.style.display = 'block';
      indicator.textContent = `${pageName} loading slowly...`;
      indicator.style.background = 'red';
    }, 1000);

    // Hide indicator when page is fully loaded
    window.addEventListener('load', () => {
      clearTimeout(slowLoadTimeout);
      indicator.style.display = 'none';
    });

    return () => {
      clearTimeout(slowLoadTimeout);
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    };
  }, [pageName]);

  return <PerformanceMonitor pageName={pageName} contentType={contentType} />;
}