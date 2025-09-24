'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AnimatedCard, 
  AnimatedCardContent, 
  AnimatedCardHeader, 
  AnimatedCardTitle,
  GlassCard,
  FloatingCard,
  GradientCard 
} from '@/components/ui/animated-card';
import { 
  AnimatedButton, 
  PrimaryButton, 
  GlassButton, 
  NeonButton, 
  GradientButton 
} from '@/components/ui/animated-button';
import { TranslatableText } from '@/components/translatable-text';
import { 
  Sparkles, 
  Zap, 
  Star, 
  Heart, 
  Rocket,
  Wand2,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { 
  useAdvancedHero,
  useThreeScene,
  useClickEffect,
  useNumberCounter
} from '@/animations';
import { ThreeUtils } from '@/animations/three-utils';
import { TypedText, NumberCounter } from '@/animations/typed-utils';
import { ConfettiEffect, ClickBurst } from '@/animations/mojs-utils';
import { LottieAnimation } from '@/animations/lottie-utils';
import 'animate.css';

interface DemoSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function AnimationShowcase({ title, description, className = "" }: DemoSectionProps) {
  const [activeDemo, setActiveDemo] = useState<string>('buttons');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [numbers, setNumbers] = useState({ users: 0, projects: 0, satisfaction: 0 });
  
  const showcaseRef = useAdvancedHero();
  
  // Three.js demo scenes
  const particleRef = useThreeScene((container) => {
    return ThreeUtils.createParticleBackground(container, {
      particleCount: 80,
      particleColor: 0x4ecdc4,
      animationSpeed: 0.001
    });
  }, []);

  const geometryRef = useThreeScene((container) => {
    return ThreeUtils.createFloatingGeometry(container, {
      geometry: 'torus',
      color: 0xff6b6b,
      wireframe: true
    });
  }, []);

  const waveRef = useThreeScene((container) => {
    return ThreeUtils.createWaveEffect(container, {
      color: 0x00ff88,
      amplitude: 0.8,
      frequency: 0.01
    });
  }, []);

  useEffect(() => {
    // Animate numbers on mount
    const timer = setTimeout(() => {
      setNumbers({
        users: 125000,
        projects: 450,
        satisfaction: 98
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const demoSections = [
    {
      id: 'buttons',
      title: 'Interactive Buttons',
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <PrimaryButton onClick={triggerConfetti}>
            <Sparkles className="w-4 h-4 mr-2" />
            Primary
          </PrimaryButton>
          <GlassButton>
            <Star className="w-4 h-4 mr-2" />
            Glass Effect
          </GlassButton>
          <NeonButton>
            <Zap className="w-4 h-4 mr-2" />
            Neon Glow
          </NeonButton>
          <GradientButton>
            <Rocket className="w-4 h-4 mr-2" />
            Gradient
          </GradientButton>
          <AnimatedButton variant="outline" animation="bounce">
            <Heart className="w-4 h-4 mr-2" />
            Bounce
          </AnimatedButton>
          <AnimatedButton variant="secondary" magnetic>
            <Wand2 className="w-4 h-4 mr-2" />
            Magnetic
          </AnimatedButton>
        </div>
      )
    },
    {
      id: 'cards',
      title: 'Animated Cards',
      component: (
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard>
            <AnimatedCardHeader>
              <AnimatedCardTitle>Glass Card</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <p className="text-muted-foreground">Beautiful glassmorphism effect with backdrop blur</p>
            </AnimatedCardContent>
          </GlassCard>
          
          <FloatingCard>
            <AnimatedCardHeader>
              <AnimatedCardTitle>Floating Card</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <p className="text-muted-foreground">Hover for elegant floating animation</p>
            </AnimatedCardContent>
          </FloatingCard>
          
          <GradientCard>
            <AnimatedCardHeader>
              <AnimatedCardTitle>Gradient Card</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <p className="text-muted-foreground">Subtle gradient background with tilt effect</p>
            </AnimatedCardContent>
          </GradientCard>
        </div>
      )
    },
    {
      id: 'text',
      title: 'Text Animations',
      component: (
        <div className="space-y-8 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Typing Effect</h3>
            <TypedText
              strings={[
                "Welcome to FarmSaathi! 🌾",
                "Empowering Farmers with AI 🤖", 
                "Digital Agriculture Revolution 🚀"
              ]}
              className="text-xl text-primary"
              typeSpeed={50}
              backDelay={2000}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Active Users</h4>
              <div className="text-3xl font-bold text-blue-600">
                <NumberCounter
                  finalNumber={numbers.users}
                  suffix="+"
                  className="gradient-text"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Projects</h4>
              <div className="text-3xl font-bold text-green-600">
                <NumberCounter
                  finalNumber={numbers.projects}
                  suffix="+"
                  className="gradient-text"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Satisfaction</h4>
              <div className="text-3xl font-bold text-purple-600">
                <NumberCounter
                  finalNumber={numbers.satisfaction}
                  suffix="%"
                  className="gradient-text"
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'threejs',
      title: '3D Effects',
      component: (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative h-64 bg-black/5 rounded-lg overflow-hidden">
            <div ref={particleRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-white font-bold text-lg">Floating Particles</h4>
            </div>
          </div>
          
          <div className="relative h-64 bg-black/5 rounded-lg overflow-hidden">
            <div ref={geometryRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-white font-bold text-lg">3D Geometry</h4>
            </div>
          </div>
          
          <div className="relative h-64 bg-black/5 rounded-lg overflow-hidden">
            <div ref={waveRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-white font-bold text-lg">Wave Effect</h4>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      ref={showcaseRef}
      className={`py-20 relative overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Animation Showcase</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TypedText
              strings={[title]}
              className="gradient-text"
              typeSpeed={80}
              showCursor={false}
              loop={false}
            />
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <TranslatableText text={description} />
          </p>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {demoSections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveDemo(section.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeDemo === section.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-white/60 hover:bg-white/80 text-foreground border border-white/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TranslatableText text={section.title} />
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AnimatedCard className="mb-8">
              <AnimatedCardHeader>
                <AnimatedCardTitle>
                  {demoSections.find(s => s.id === activeDemo)?.title}
                </AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent className="p-8">
                {demoSections.find(s => s.id === activeDemo)?.component}
              </AnimatedCardContent>
            </AnimatedCard>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Controls */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-center gap-4">
            <ClickBurst>
              <AnimatedButton
                onClick={triggerConfetti}
                variant="gradient"
                size="lg"
                className="animate-bounce-slow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Trigger Confetti
              </AnimatedButton>
            </ClickBurst>
            
            <AnimatedButton
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset View
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Confetti Effect */}
      <ConfettiEffect trigger={showConfetti} />
    </section>
  );
}