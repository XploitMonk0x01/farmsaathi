
'use client';
import { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { translateText } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";

// Simple in-memory cache to avoid re-translating the same text during a session.
const translationCache = new Map<string, string>();

interface TranslatableTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
}

export function TranslatableText({ text, as: Component = 'span', className }: TranslatableTextProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const cacheKey = useMemo(() => `${language}:${text}`, [language, text]);

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(text);
      return;
    }

    if (!text || text.trim() === '') {
        setTranslatedText('');
        return;
    }

    const translate = async () => {
      if (translationCache.has(cacheKey)) {
        setTranslatedText(translationCache.get(cacheKey)!);
        return;
      }

      setIsLoading(true);
      try {
        const result = await translateText({ text, targetLanguage: language });
        if (result !== text) {
            translationCache.set(cacheKey, result);
        }
        setTranslatedText(result);
      } catch (error) {
        console.error('Translation error:', error);
        toast({
          variant: "destructive",
          title: "Translation Failed",
          description: "Could not translate content. Showing original text.",
        });
        setTranslatedText(text); // Fallback to original text
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [language, text, cacheKey, toast]);

  if (isLoading) {
    // Render a skeleton that roughly matches the text size
    const baseWidth = Math.min(text.length * 0.5, 100);
    return <Skeleton className="h-5 my-1" style={{width: `${baseWidth}%`, minWidth: '50px'}} />;
  }

  return <Component className={className}>{translatedText}</Component>;
}
