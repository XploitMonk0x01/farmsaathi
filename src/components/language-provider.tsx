
'use client';

import { createContext, useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { languages } from '@/lib/languages';

type LanguageContextType = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // This effect runs only on the client side, after hydration.
    // It prevents a mismatch between server-rendered and client-rendered content.
    const browserLang = navigator.language.split('-')[0];
    if (languages.some(l => l.code === browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
