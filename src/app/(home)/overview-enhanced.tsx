'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TranslatableText } from '@/components/translatable-text'
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardHeader,
  AnimatedCardTitle,
  FloatingCard,
} from '@/components/ui/animated-card'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import {
  BrainCircuit,
  Globe,
  LandPlot,
  Users,
  Smartphone,
  TrendingUp,
  Shield,
  Lightbulb,
  Target,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import { GSAPUtils } from '@/animations/gsap-utils'
import { AnimeUtils } from '@/animations/anime-utils'
import { useThreeScene } from '@/animations/three-utils'
import { ThreeUtils } from '@/animations/three-utils'
import { NumberCounter } from '@/animations/typed-utils'
import 'animate.css'

export function PlatformOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [animationStarted, setAnimationStarted] = useState(false)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Three.js background effect
  const bgRef = useThreeScene((container) => {
    return ThreeUtils.createParticleBackground(container, {
      particleCount: 40,
      particleColor: 0x10b981,
      animationSpeed: 0.0006,
      particleSize: 0.6,
    })
  }, [])

  const mainFeatures = [
    {
      title: 'Smart Advisory',
      description:
        'Get crop advice in your local language and dialect, powered by AI to maximize your yield.',
      icon: BrainCircuit,
      image: PlaceHolderImages.find((p) => p.id === 'overview-advisory'),
      badge: 'AI-Powered',
      color: 'bg-blue-500/10 text-blue-600',
      stats: { number: 95, suffix: '% accuracy' },
    },
    {
      title: 'Market Connection',
      description:
        'Sell directly to buyers across the nation, ensuring you get the best price for your produce.',
      icon: Globe,
      image: PlaceHolderImages.find((p) => p.id === 'overview-market'),
      badge: 'Nationwide',
      color: 'bg-green-500/10 text-green-600',
      stats: { number: 30, suffix: '% more profit' },
    },
    {
      title: 'Government Integration',
      description:
        'Access all government benefits, schemes, and subsidies easily through a single, unified platform.',
      icon: LandPlot,
      image: PlaceHolderImages.find((p) => p.id === 'overview-schemes'),
      badge: 'Official',
      color: 'bg-purple-500/10 text-purple-600',
      stats: { number: 150, suffix: '+ schemes' },
    },
    {
      title: 'Community Support',
      description:
        'Learn from successful farmers in your region and share your knowledge with the community.',
      icon: Users,
      image: PlaceHolderImages.find((p) => p.id === 'overview-community'),
      badge: 'Social',
      color: 'bg-orange-500/10 text-orange-600',
      stats: { number: 50000, suffix: '+ farmers' },
    },
  ]

  const additionalFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description:
        'Access everything from your smartphone, even with slow internet connections.',
      badge: 'Mobile',
      color: 'bg-indigo-500/10 text-indigo-600',
      stats: { number: 99, suffix: '% mobile' },
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description:
        'Your farming data is protected with bank-level security and privacy.',
      badge: 'Security',
      color: 'bg-red-500/10 text-red-600',
      stats: { number: 256, suffix: '-bit encryption' },
    },
    {
      icon: Lightbulb,
      title: 'Smart Insights',
      description:
        "Get personalized recommendations based on your farm's specific conditions.",
      badge: 'Personalized',
      color: 'bg-yellow-500/10 text-yellow-600',
      stats: { number: 85, suffix: '% accuracy' },
    },
    {
      icon: Zap,
      title: 'Real-time Data',
      description:
        'Weather, prices, and alerts delivered instantly to help you make quick decisions.',
      badge: 'Live',
      color: 'bg-cyan-500/10 text-cyan-600',
      stats: { number: 24, suffix: '/7 updates' },
    },
  ]

  const overviewStats = [
    {
      label: 'Active Farmers',
      value: 125000,
      suffix: '+',
      color: 'text-green-600',
    },
    {
      label: 'Crops Supported',
      value: 50,
      suffix: '+',
      color: 'text-blue-600',
    },
    { label: 'Languages', value: 12, suffix: '+', color: 'text-purple-600' },
    { label: 'Success Rate', value: 92, suffix: '%', color: 'text-orange-600' },
  ]

  useEffect(() => {
    if (
      isInView &&
      !animationStarted &&
      headerRef.current &&
      statsRef.current &&
      gridRef.current
    ) {
      setAnimationStarted(true)

      // Animate header
      GSAPUtils.staggerFadeIn(Array.from(headerRef.current.children), {
        delay: 0.3,
        stagger: 0.2,
        y: 50,
        duration: 0.8,
      })

      // Animate stats
      GSAPUtils.staggerFadeIn(Array.from(statsRef.current.children), {
        delay: 0.8,
        stagger: 0.1,
        y: 30,
        duration: 0.6,
      })

      // Animate main features
      const mainCards = gridRef.current.querySelectorAll('[data-main-feature]')
      GSAPUtils.staggerFadeIn(Array.from(mainCards), {
        delay: 1.2,
        stagger: 0.15,
        y: 60,
        duration: 0.8,
        ease: 'back.out(1.4)',
      })

      // Animate additional features
      const additionalCards = gridRef.current.querySelectorAll(
        '[data-additional-feature]'
      )
      GSAPUtils.staggerFadeIn(Array.from(additionalCards), {
        delay: 1.8,
        stagger: 0.1,
        y: 40,
        duration: 0.7,
      })
    }
  }, [isInView, animationStarted])

  const handleFeatureHover = (element: HTMLElement) => {
    AnimeUtils.elasticScale(element, { scale: 1.02, duration: 300 }).catch(
      () => {}
    )

    const icon = element.querySelector('[data-icon]')
    if (icon) {
      AnimeUtils.iconPulse(icon as HTMLElement).catch(() => {})
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      {/* Three.js Background */}
      <div ref={bgRef} className="absolute inset-0 opacity-20" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Platform Overview
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            <TranslatableText text="A Unified Platform for Modern Agriculture" />
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            <TranslatableText text="From sowing to selling, FarmSaathi is your digital companion at every step of your farming journey." />
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {overviewStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className={`text-2xl md:text-3xl font-bold mb-1 ${stat.color}`}
              >
                <NumberCounter
                  finalNumber={stat.value}
                  suffix={stat.suffix}
                  startDelay={1000 + index * 150}
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">
                <TranslatableText text={stat.label} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div ref={gridRef} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <FloatingCard
                  key={index}
                  className="group overflow-hidden"
                  data-main-feature
                  onMouseEnter={(e) =>
                    handleFeatureHover(e.currentTarget as HTMLElement)
                  }
                >
                  {feature.image && (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={feature.image.imageUrl}
                          alt={feature.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                          data-ai-hint={feature.image.imageHint}
                        />
                      </motion.div>
                    </div>
                  )}

                  <AnimatedCardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                      >
                        <IconComponent className="w-6 h-6" data-icon />
                      </motion.div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {feature.badge}
                        </Badge>
                        <div
                          className={`text-lg font-bold ${
                            feature.color.split(' ')[1]
                          }`}
                        >
                          <NumberCounter
                            finalNumber={feature.stats.number}
                            suffix={feature.stats.suffix}
                            startDelay={1500 + index * 200}
                          />
                        </div>
                      </div>
                    </div>

                    <AnimatedCardTitle className="text-xl group-hover:text-primary transition-colors">
                      <TranslatableText text={feature.title} />
                    </AnimatedCardTitle>
                  </AnimatedCardHeader>

                  <AnimatedCardContent>
                    <p className="text-muted-foreground">
                      <TranslatableText text={feature.description} />
                    </p>
                  </AnimatedCardContent>
                </FloatingCard>
              )
            })}
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <AnimatedCard
                  key={index}
                  className="group p-6 h-full hover:shadow-xl transition-all duration-300"
                  data-additional-feature
                  onMouseEnter={(e) =>
                    handleFeatureHover(e.currentTarget as HTMLElement)
                  }
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <IconComponent className="w-8 h-8" data-icon />
                    </motion.div>

                    <div>
                      <Badge variant="outline" className="mb-2">
                        {feature.badge}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        <TranslatableText text={feature.title} />
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        <TranslatableText text={feature.description} />
                      </p>
                      <div
                        className={`text-lg font-bold ${
                          feature.color.split(' ')[1]
                        }`}
                      >
                        <NumberCounter
                          finalNumber={feature.stats.number}
                          suffix={feature.stats.suffix}
                          startDelay={2200 + index * 100}
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
