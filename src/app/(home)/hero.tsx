'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TranslatableText } from "@/components/translatable-text";
import { ArrowRight, Video, Sparkles } from "lucide-react";
import { HeroTypedText } from "@/animations/typed-utils";
import { useAdvancedHero, useAdvancedButton, useThreeScene } from "@/animations";
import { ThreeUtils } from "@/animations/three-utils";
import { MojsUtils, ClickBurst } from "@/animations/mojs-utils";
import { LottieAnimation, LottieUtils } from "@/animations/lottie-utils";
import { motion } from "framer-motion";
import 'animate.css';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const heroRef = useAdvancedHero();
  const primaryButtonRef = useAdvancedButton();
  const secondaryButtonRef = useAdvancedButton();
  const particleContainerRef = useRef<HTMLDivElement>(null);
  
  // Three.js particle background
  const particleRef = useThreeScene((container) => {
    return ThreeUtils.createParticleBackground(container, {
      particleCount: 150,
      particleColor: 0x4ecdc4,
      animationSpeed: 0.0005
    });
  }, []);

  // Floating geometry
  const geometryRef = useThreeScene((container) => {
    return ThreeUtils.createFloatingGeometry(container, {
      geometry: 'torus',
      color: 0x00ff88,
      wireframe: true
    });
  }, []);

  useEffect(() => {
    // Create floating particles with Mo.js
    if (particleContainerRef.current) {
      MojsUtils.createFloatingBubbles(particleContainerRef.current, 12);
    }

    // Add scroll-triggered animations
    const timer = setTimeout(() => {
      import('@/animations/scrollreveal-utils').then(({ ScrollRevealUtils }) => {
        ScrollRevealUtils.revealHero('.hero-content');
        ScrollRevealUtils.revealStagger('.hero-button', { delay: 800, interval: 200 });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        staggerChildren: 0.3,
        delayChildren: 0.5
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image with Parallax */}
      {heroImage && (
        <motion.div
          className="absolute inset-0 hero-background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        </motion.div>
      )}

      {/* Three.js Particle Background */}
      <div 
        ref={particleRef}
        className="absolute inset-0 opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      {/* Three.js Floating Geometry */}
      <div 
        ref={geometryRef}
        className="absolute top-10 right-10 w-32 h-32 opacity-20"
        style={{ pointerEvents: 'none' }}
      />

      {/* Mo.js Floating Particles */}
      <div 
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>

      <motion.div 
        className="relative z-10 text-center p-4 max-w-4xl mx-auto hero-content"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span className="text-sm font-medium animate__animated animate__fadeInUp">
              AI-Powered Agricultural Revolution
            </span>
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
        >
          <HeroTypedText 
            strings={[
              "Empowering 146 Million Farmers",
              "Digital Innovation for Agriculture",
              "Smart Farming for Everyone"
            ]}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          />
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-slate-200 mb-10"
        >
          <span className="animate__animated animate__fadeInUp animate__delay-1s">
            <TranslatableText text="AI-Powered Crop Advisory, Direct Market Access, and Government Schemes, all in your language." />
          </span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <ClickBurst color="#4ecdc4">
            <Button 
              ref={primaryButtonRef}
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-base shadow-xl transform transition-all duration-300 hover:shadow-2xl hero-button animate__animated animate__pulse animate__infinite animate__slower"
            >
              <TranslatableText text="Start Your Smart Farming Journey" />
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ClickBurst>

          <ClickBurst color="#ff6b6b">
            <Button 
              ref={secondaryButtonRef}
              size="lg" 
              variant="outline" 
              className="font-bold text-base bg-white/10 backdrop-blur-sm border-white/50 hover:bg-white/20 text-white hover:text-white transition-all duration-300 hero-button"
            >
              <Video className="mr-2 h-5 w-5" />
              <TranslatableText text="Watch How It Works" />
            </Button>
          </ClickBurst>
        </motion.div>

        {/* Lottie Loading Animation (when needed) */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <div className="w-16 h-16 opacity-30">
            <LottieAnimation
              animationData={null} // Will be replaced with actual Lottie data
              className="w-full h-full"
              loop={true}
              autoplay={true}
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
