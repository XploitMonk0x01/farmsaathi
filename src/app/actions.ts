
'use server';

import { translateDynamicContent } from '@/ai/flows/translate-dynamic-content';
import type { TranslateDynamicContentInput } from '@/ai/flows/translate-dynamic-content';

export async function translateText(
  input: TranslateDynamicContentInput
): Promise<string> {
  // Do not translate if the text is short or just a number
  if (!input.text || input.text.trim().length < 2 || !isNaN(Number(input.text))) {
    return input.text;
  }
  
  try {
    const { translatedText } = await translateDynamicContent(input);
    return translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    // In case of an error, return the original text.
    // This provides a graceful fallback.
    return input.text;
  }
}
