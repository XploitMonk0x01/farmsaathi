
'use client';

import Link from "next/link";
import { Logo } from "@/components/logo";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { TranslatableText } from "../translatable-text";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAdvancedButton, useIconAnimation } from "@/animations";
import { ClickBurst } from "@/animations/mojs-utils";
import { Menu, X } from "lucide-react";
import 'animate.css';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useIconAnimation('float');
    const loginButtonRef = useAdvancedButton();
    const registerButtonRef = useAdvancedButton();
    
    const { scrollY } = useScroll();
    const headerBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
    );
    const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 10;
            setIsScrolled(scrolled);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Animate header on mount
        if (headerRef.current) {
            import('@/animations/gsap-utils').then(({ GSAPUtils }) => {
                GSAPUtils.slideInFromLeft(headerRef.current!, { 
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out" 
                });
            });
        }
    }, []);

    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 500, damping: 30 }
        }
    };

    const mobileMenuVariants = {
        closed: { 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        open: { 
            opacity: 1, 
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <>
            <motion.header 
                ref={headerRef}
                style={{ backgroundColor: headerBackground }}
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-md",
                    isScrolled 
                        ? "shadow-lg shadow-black/5 border-b border-white/10" 
                        : "bg-transparent"
                )}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <motion.div variants={itemVariants}>
                            <Link 
                                href="/" 
                                className="flex items-center gap-3 group"
                            >
                                <motion.div
                                    ref={logoRef}
                                    style={{ scale: logoScale }}
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative"
                                >
                                    <Logo className="h-8 w-8 transition-all duration-300 group-hover:text-primary" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-primary/20"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1.5, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                                <motion.span 
                                    className="text-xl font-bold font-headline text-foreground group-hover:text-primary transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    FarmSaathi
                                </motion.span>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <motion.div 
                            variants={itemVariants}
                            className="hidden md:flex items-center gap-6"
                        >
                            <nav className="flex items-center gap-6">
                                {['Features', 'Solutions', 'Success Stories', 'Contact'].map((item, index) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Link 
                                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                                        >
                                            <TranslatableText text={item} />
                                            <motion.div
                                                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                                                initial={{ scaleX: 0 }}
                                                whileHover={{ scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center gap-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LanguageSelector />
                            </motion.div>
                            
                            <div className="hidden sm:flex items-center gap-2">
                                <ClickBurst color="#4ecdc4">
                                    <Button 
                                        ref={loginButtonRef}
                                        variant="ghost"
                                        className="animate__animated animate__fadeInRight animate__delay-1s hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <TranslatableText text="Login" />
                                    </Button>
                                </ClickBurst>
                                
                                <ClickBurst color="#ff6b6b">
                                    <Button 
                                        ref={registerButtonRef}
                                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-primary-foreground animate__animated animate__fadeInRight animate__delay-1s shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <TranslatableText text="Register" />
                                    </Button>
                                </ClickBurst>
                            </div>

                            {/* Mobile Menu Button */}
                            <motion.button
                                className="md:hidden p-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-white/10"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate={isMobileMenuOpen ? "open" : "closed"}
                >
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col gap-4">
                            {['Features', 'Solutions', 'Success Stories', 'Contact'].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ 
                                        x: isMobileMenuOpen ? 0 : -50, 
                                        opacity: isMobileMenuOpen ? 1 : 0 
                                    }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <Link 
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-foreground hover:text-primary transition-colors duration-300 py-2 block"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <TranslatableText text={item} />
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                className="flex flex-col gap-2 pt-4 border-t border-white/10"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ 
                                    y: isMobileMenuOpen ? 0 : 20, 
                                    opacity: isMobileMenuOpen ? 1 : 0 
                                }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                <Button variant="ghost" className="w-full justify-start">
                                    <TranslatableText text="Login" />
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-primary to-blue-600">
                                    <TranslatableText text="Register" />
                                </Button>
                            </motion.div>
                        </nav>
                    </div>
                </motion.div>
            </motion.header>
        </>
    );
}
