'use client';

import * as React from 'react';
import { Bot, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { generateSectionSummary, GenerateSectionSummaryOutput } from '@/ai/flows/generate-section-summary'; // Assuming this path is correct

interface SectionCardProps {
  id: string;
  title: string;
  content: string | React.ReactNode;
  children?: React.ReactNode;
}

export function SectionCard({ id, title, content, children }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [summary, setSummary] = React.useState<GenerateSectionSummaryOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = React.useState(false);

  const handleGenerateSummary = async () => {
    if (summary || isLoading) return; // Don't regenerate if already exists or loading

    setIsLoading(true);
    setError(null);
    setHasGenerated(true); // Mark as attempted generation

    try {
      // Extract text content for the AI if content is ReactNode
      const textContent = typeof content === 'string'
        ? content
        : React.Children.toArray(content)
            .map(child => typeof child === 'string' ? child : '') // Simplistic extraction, might need refinement
            .join(' ');

       if (!textContent.trim()) {
         throw new Error("No text content found to summarize.");
       }

      const result = await generateSectionSummary({ sectionContent: textContent });
      setSummary(result);
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while generating the summary.");
      setSummary(null); // Ensure summary is cleared on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card id={id} className="mb-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-semibold text-primary">{title}</CardTitle>
         <Button
          variant="ghost"
          size="sm"
          onClick={handleGenerateSummary}
          disabled={isLoading || !!summary || hasGenerated}
          aria-label={`Generate summary for ${title}`}
          className="text-accent hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
             <Bot className="mr-2 h-4 w-4" />
          )}
          {summary ? 'Summary Generated' : (isLoading ? 'Generating...' : 'AI Summary')}
        </Button>
      </CardHeader>
      <CardContent>
         {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {summary && !error && (
           <div className="mb-4 rounded-md border border-primary/20 bg-primary/5 p-4">
             <p className="text-sm font-medium text-primary-foreground/80">
               <Bot className="inline-block h-4 w-4 mr-1 align-text-bottom" /> AI Summary: <span className="italic">{summary.summary}</span>
             </p>
           </div>
        )}

        {/* Full Content (collapsible) */}
        <div className={cn("prose prose-lg max-w-none transition-all duration-500 ease-in-out overflow-hidden", isExpanded ? "max-h-[5000px] opacity-100" : "max-h-40 opacity-70")}>
          {typeof content === 'string' ? (
            <p className="text-muted-foreground">{content}</p>
          ) : (
            content
          )}
          {children}
        </div>

         {/* Expand/Collapse Button */}
         <div className="mt-4 flex justify-end">
           <Button
             variant="link"
             onClick={() => setIsExpanded(!isExpanded)}
             className="text-accent hover:text-accent/80 px-0"
             aria-expanded={isExpanded}
             aria-controls={`content-${id}`}
           >
             {isExpanded ? (
                <>
                 Collapse <ChevronUp className="ml-1 h-4 w-4" />
               </>
             ) : (
               <>
                 Read More <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
          </Button>
         </div>

      </CardContent>
    </Card>
  );
}

// Add basic prose styling to globals.css or here if preferred
// Example (add to globals.css):
// .prose h3 { @apply text-xl font-semibold mb-3 mt-6; }
// .prose p { @apply mb-4 leading-relaxed; }
// .prose ul { @apply list-disc pl-6 mb-4; }
// .prose li { @apply mb-1; }
