'use server';

/**
 * @fileOverview Implements a Genkit flow to translate dynamic content into the user's selected language.
 *
 * - translateDynamicContent - A function that translates input text to a target language.
 * - TranslateDynamicContentInput - The input type for the translateDynamicContent function.
 * - TranslateDynamicContentOutput - The return type for the translateDynamicContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateDynamicContentInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The target language code (e.g., en, hi, bn).'),
});
export type TranslateDynamicContentInput = z.infer<
  typeof TranslateDynamicContentInputSchema
>;

const TranslateDynamicContentOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateDynamicContentOutput = z.infer<
  typeof TranslateDynamicContentOutputSchema
>;

export async function translateDynamicContent(
  input: TranslateDynamicContentInput
): Promise<TranslateDynamicContentOutput> {
  return translateDynamicContentFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: TranslateDynamicContentInputSchema},
  output: {schema: TranslateDynamicContentOutputSchema},
  prompt: `Translate the following text to {{targetLanguage}}:\n\n{{text}}`,
});

const translateDynamicContentFlow = ai.defineFlow(
  {
    name: 'translateDynamicContentFlow',
    inputSchema: TranslateDynamicContentInputSchema,
    outputSchema: TranslateDynamicContentOutputSchema,
  },
  async input => {
    const {output} = await translatePrompt(input);
    return output!;
  }
);
