'use client';

import { Header } from '@/components/layout/header';
import { Hero } from '@/app/(home)/hero';
import { Schemes } from '@/app/(home)/schemes';
import { SuccessStories } from '@/app/(home)/success-stories';
import { Footer } from '@/components/layout/footer';
import { Credibility } from '@/app/(home)/credibility';
import { PlatformOverview } from '@/app/(home)/overview';
import { AnimationShowcase } from '@/components/animation-showcase';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ScrollRevealContainer } from '@/animations/scrollreveal-utils';
import { ConfettiEffect } from '@/animations/mojs-utils';
import { useThreeScene } from '@/animations';
import { ThreeUtils } from '@/animations/three-utils';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'animate.css/animate.min.css';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to background gradient
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Background wave animation with Three.js
  const waveRef = useThreeScene((container) => {
    return ThreeUtils.createWaveEffect(container, {
      color: 0x0099ff,
      amplitude: 0.5,
      frequency: 0.005
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize ScrollReveal for all sections
    const timer = setTimeout(() => {
      import('@/animations/scrollreveal-utils').then(({ ScrollRevealUtils }) => {
        ScrollRevealUtils.revealSequence([
          '.credibility-section',
          '.overview-section', 
          '.schemes-section',
          '.success-stories-section'
        ], 300);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      } 
    }
  };

  const MotionSection = ({ 
    children, 
    className = "",
    delay = 0 
  }: { 
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) => (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: { 
            duration: 0.8,
            delay,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 20
          } 
        }
      }}
    >
      {children}
    </motion.section>
  );

  const scrollToTop = () => {
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen relative overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background Wave Animation */}
      <div 
        ref={waveRef}
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
      />
      
      {/* Gradient Background that changes with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.3, 0.6, 1],
            [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
              'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
              'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(236, 72, 153, 0.03) 100%)',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%)'
            ]
          )
        }}
      />

      <div className="relative z-10">
        <Header />
        
        <main ref={mainRef} className="flex-grow">
          <Hero />
          
          <ScrollRevealContainer 
            animation="fadeInUp" 
            delay={200}
            className="credibility-section"
          >
            <MotionSection delay={0.1}>
              <Credibility />
            </MotionSection>
          </ScrollRevealContainer>
          
          <ScrollRevealContainer 
            animation="fadeInLeft" 
            delay={400}
            className="overview-section"
          >
            <MotionSection delay={0.2}>
              <PlatformOverview />
            </MotionSection>
          </ScrollRevealContainer>
          
          <ScrollRevealContainer 
            animation="fadeInRight" 
            delay={600}
            className="schemes-section"
          >
            <MotionSection delay={0.3}>
              <Schemes />
            </MotionSection>
          </ScrollRevealContainer>
          
          <ScrollRevealContainer 
            animation="fadeInUp" 
            delay={700}
            className="animation-showcase-section"
          >
            <MotionSection delay={0.35}>
              <AnimationShowcase 
                title="Experience Our Animation Library"
                description="Discover the power of our comprehensive animation system featuring 10+ JavaScript libraries working in perfect harmony."
              />
            </MotionSection>
          </ScrollRevealContainer>

          <ScrollRevealContainer 
            animation="fadeInScale" 
            delay={800}
            className="success-stories-section"
          >
            <MotionSection delay={0.4}>
              <SuccessStories />
            </MotionSection>
          </ScrollRevealContainer>
        </main>
        
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0 
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Confetti Effect */}
      <ConfettiEffect trigger={showConfetti} />

      {/* Loading Screen Animation (optional) */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ 
          delay: 2,
          duration: 1,
          ease: "easeInOut"
        }}
        style={{ pointerEvents: 'none' }}
        onAnimationComplete={() => {
          // Remove the loading screen from DOM after animation
          const loadingScreen = document.querySelector('.loading-screen');
          if (loadingScreen) {
            loadingScreen.remove();
          }
        }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.h2
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Loading FarmSaathi
          </motion.h2>
        </div>
      </motion.div>
    </motion.div>
  );
}
