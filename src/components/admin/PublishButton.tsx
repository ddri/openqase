'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValidationModal } from './ValidationModal';
import { ValidationIssues } from '@/utils/form-validation';

interface PublishButtonProps {
  isPublished: boolean;
  onPublish: () => Promise<void>;
  onUnpublish: () => Promise<void>;
  validateContent: () => boolean | ValidationIssues;
  disabled?: boolean;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onTabChange?: (tab: string) => void;
  getTabLabel?: (tab: string) => string;
}

/**
 * PublishButton Component
 * 
 * A button that handles publishing and unpublishing content with validation.
 * 
 * @param isPublished - Whether the content is currently published
 * @param onPublish - Function to call when publishing content
 * @param onUnpublish - Function to call when unpublishing content
 * @param validateContent - Function to validate content before publishing
 * @param disabled - Whether the button is disabled
 * @param className - Additional CSS classes
 * @param size - The size of the button
 * @param onTabChange - Function to call when a tab is clicked in the validation modal
 * @param getTabLabel - Function to get a human-readable label for a tab
 */
export function PublishButton({
  isPublished,
  onPublish,
  onUnpublish,
  validateContent,
  disabled = false,
  className,
  size = 'default',
  onTabChange,
  getTabLabel = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1)
}: PublishButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationIssues, setValidationIssues] = useState<ValidationIssues>({});
  
  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    if (!isPublished) {
      // Validate content before publishing
      const validationResult = validateContent();
      
      if (validationResult === true) {
        // Content is valid, proceed with publishing
        setIsLoading(true);
        try {
          await onPublish();
        } catch (error) {
          console.error('Error publishing content:', error);
        } finally {
          setIsLoading(false);
        }
      } else if (typeof validationResult === 'object') {
        // Content is invalid, show validation modal
        setValidationIssues(validationResult);
        setShowValidationModal(true);
      }
    } else {
      // Unpublish content
      setIsLoading(true);
      try {
        await onUnpublish();
      } catch (error) {
        console.error('Error unpublishing content:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <>
      <Button
        type="button"
        variant={isPublished ? "default" : "outline"}
        size={size}
        className={cn(
          isPublished ? "bg-green-600 hover:bg-green-700 text-white" : "",
          "min-w-[100px]",
          className
        )}
        onClick={handleClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isPublished ? 'Unpublishing...' : 'Publishing...'}
          </>
        ) : (
          <>
            {isPublished ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Published
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </>
        )}
      </Button>
      
      <ValidationModal
        open={showValidationModal}
        onOpenChange={setShowValidationModal}
        issues={validationIssues}
        onTabChange={onTabChange}
        getTabLabel={getTabLabel}
      />
    </>
  );
}

export default PublishButton;