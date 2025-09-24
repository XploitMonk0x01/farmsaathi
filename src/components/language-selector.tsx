
'use client';

import { useLanguage } from '@/hooks/use-language';
import { languages } from '@/lib/languages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto gap-2 border-0 bg-transparent text-foreground hover:bg-primary/10 focus:ring-0 focus:ring-offset-0">
        <Globe className="h-5 w-5" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="font-sans">{lang.nativeName} ({lang.name})</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
