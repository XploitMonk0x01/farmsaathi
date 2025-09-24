
'use client';

import Link from "next/link";
import { Logo } from "@/components/logo";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { TranslatableText } from "../translatable-text";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
        )}>
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo className="h-8 w-8" />
                        <span className="text-xl font-bold font-headline text-foreground">
                            FarmSamvad
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSelector />
                        <div className="hidden sm:flex items-center gap-2">
                            <Button variant="ghost">
                                <TranslatableText text="Login" />
                            </Button>
                            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                <TranslatableText text="Register" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
