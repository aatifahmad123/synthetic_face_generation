'use server';

/**
 * @fileOverview An AI agent for summarizing sections of the Synthetic Faces Explorer project.
 *
 * - generateSectionSummary - A function that generates a summary for a given section.
 * - GenerateSectionSummaryInput - The input type for the generateSectionSummary function.
 * - GenerateSectionSummaryOutput - The return type for the generateSectionSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateSectionSummaryInputSchema = z.object({
  sectionContent: z
    .string()
    .describe('The content of the section to be summarized.'),
});
export type GenerateSectionSummaryInput = z.infer<typeof GenerateSectionSummaryInputSchema>;

const GenerateSectionSummaryOutputSchema = z.object({
  summary: z.string().describe('A short summary of the section content.'),
});
export type GenerateSectionSummaryOutput = z.infer<typeof GenerateSectionSummaryOutputSchema>;

export async function generateSectionSummary(input: GenerateSectionSummaryInput): Promise<GenerateSectionSummaryOutput> {
  return generateSectionSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSectionSummaryPrompt',
  input: {
    schema: z.object({
      sectionContent: z
        .string()
        .describe('The content of the section to be summarized.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A short summary of the section content.'),
    }),
  },
  prompt: `Summarize the following content in one sentence:\n\n{{sectionContent}}`,
});

const generateSectionSummaryFlow = ai.defineFlow<
  typeof GenerateSectionSummaryInputSchema,
  typeof GenerateSectionSummaryOutputSchema
>(
  {
    name: 'generateSectionSummaryFlow',
    inputSchema: GenerateSectionSummaryInputSchema,
    outputSchema: GenerateSectionSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
