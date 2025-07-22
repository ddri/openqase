import * as React from "react";
import { Steps, Step } from "./steps";
import { processMarkdown } from '@/lib/markdown-server';

interface StepsRendererProps {
  stepsMarkup: string;
}

// Simple parser for <steps><step title="...">...</step></steps>
export const StepsRenderer: React.FC<StepsRendererProps> = ({ stepsMarkup }) => {
  // Extract <step title="...">...</step> blocks
  const stepRegex = /<step\s+title=["']([^"']+)["']\s*>([\s\S]*?)<\/step>/gi;
  const steps: { title: string; content: string }[] = [];

  let match;
  while ((match = stepRegex.exec(stepsMarkup))) {
    steps.push({
      title: match[1],
      content: match[2].trim(),
    });
  }

  if (steps.length === 0) {
    return null;
  }

  return (
    <Steps>
      {steps.map((step, idx) => (
        <Step key={idx} title={step.title} number={idx + 1}>
          <div dangerouslySetInnerHTML={{ __html: processMarkdown(step.content) }} />
        </Step>
      ))}
    </Steps>
  );
}; 