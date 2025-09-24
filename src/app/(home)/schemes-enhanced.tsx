'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TranslatableText } from '@/components/translatable-text'
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardHeader,
  AnimatedCardTitle,
  GlassCard,
  GradientCard,
} from '@/components/ui/animated-card'
import {
  AnimatedButton,
  PrimaryButton,
  GradientButton,
} from '@/components/ui/animated-button'
import { Badge } from '@/components/ui/badge'
import {
  Sprout,
  Tractor,
  Droplets,
  Banknote,
  IndianRupee,
  Calendar,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { GSAPUtils } from '@/animations/gsap-utils'
import { AnimeUtils } from '@/animations/anime-utils'
import { useThreeScene } from '@/animations/three-utils'
import { ThreeUtils } from '@/animations/three-utils'
import { NumberCounter } from '@/animations/typed-utils'
import { ClickBurst } from '@/animations/mojs-utils'
import 'animate.css'

export function Schemes() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const schemesRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const [animationStarted, setAnimationStarted] = useState(false)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Three.js background effect
  const bgRef = useThreeScene((container) => {
    return ThreeUtils.createParticleBackground(container, {
      particleCount: 50,
      particleColor: 0x16a085,
      animationSpeed: 0.0005,
      particleSize: 0.7,
    })
  }, [])

  const schemes = [
    {
      icon: Sprout,
      title: 'PM-Kisan Samman Nidhi',
      description:
        'Financial support of ₹6,000 per year to all landholding farmer families across the nation.',
      amount: '₹6,000',
      period: 'per year',
      beneficiaries: '12+ Crore',
      category: 'Direct Transfer',
      color: 'bg-green-500/10 text-green-600',
      bgGradient:
        'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
    },
    {
      icon: Tractor,
      title: 'Kisan Credit Card (KCC)',
      description:
        'Provides farmers with timely access to credit for their agricultural and farming needs.',
      amount: '₹3 Lakh',
      period: 'credit limit',
      beneficiaries: '7+ Crore',
      category: 'Credit Facility',
      color: 'bg-blue-500/10 text-blue-600',
      bgGradient:
        'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
    },
    {
      icon: Droplets,
      title: 'PM Krishi Sinchayee Yojana',
      description:
        "Aims to enhance water use efficiency with the motto of 'More crop per drop'.",
      amount: '₹93,068',
      period: 'crore allocated',
      beneficiaries: '2+ Crore',
      category: 'Irrigation',
      color: 'bg-cyan-500/10 text-cyan-600',
      bgGradient:
        'from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
    },
    {
      icon: Banknote,
      title: 'PM Fasal Bima Yojana',
      description:
        'Comprehensive crop insurance service to farmers for their agricultural yields.',
      amount: '₹90,000',
      period: 'crore coverage',
      beneficiaries: '5.5+ Crore',
      category: 'Insurance',
      color: 'bg-purple-500/10 text-purple-600',
      bgGradient:
        'from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20',
    },
  ]

  const schemeStats = [
    {
      icon: Users,
      label: 'Farmers Enrolled',
      value: 25,
      suffix: '+ Crore',
      color: 'text-green-600',
    },
    {
      icon: IndianRupee,
      label: 'Total Investment',
      value: 2.8,
      suffix: ' Lakh Crore',
      color: 'text-blue-600',
    },
    {
      icon: Calendar,
      label: 'Active Schemes',
      value: 150,
      suffix: '+',
      color: 'text-purple-600',
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: 85,
      suffix: '%',
      color: 'text-orange-600',
    },
  ]

  const keyBenefits = [
    'Direct bank transfers with zero corruption',
    '24/7 online application and tracking',
    'Multi-language support for accessibility',
    'Instant approval for eligible farmers',
    'Integrated with Aadhaar for verification',
    'Real-time status updates and notifications',
  ]

  useEffect(() => {
    if (
      isInView &&
      !animationStarted &&
      headerRef.current &&
      statsRef.current &&
      schemesRef.current
    ) {
      setAnimationStarted(true)

      // Animate header
      GSAPUtils.staggerFadeIn(Array.from(headerRef.current.children), {
        delay: 0.2,
        stagger: 0.15,
        y: 60,
        duration: 0.8,
      })

      // Animate stats
      GSAPUtils.staggerFadeIn(Array.from(statsRef.current.children), {
        delay: 0.6,
        stagger: 0.1,
        y: 40,
        duration: 0.7,
      })

      // Animate scheme cards
      GSAPUtils.staggerFadeIn(Array.from(schemesRef.current.children), {
        delay: 1.0,
        stagger: 0.2,
        y: 80,
        duration: 0.8,
        ease: 'back.out(1.5)',
      })

      // Animate benefits
      if (benefitsRef.current) {
        GSAPUtils.staggerFadeIn(Array.from(benefitsRef.current.children), {
          delay: 1.8,
          stagger: 0.08,
          x: -40,
          duration: 0.6,
        })
      }
    }
  }, [isInView, animationStarted])

  const handleSchemeHover = (element: HTMLElement) => {
    AnimeUtils.elasticScale(element, { scale: 1.02, duration: 300 }).catch(
      () => {}
    )

    // Add icon rotation effect
    const icon = element.querySelector('[data-icon]')
    if (icon) {
      AnimeUtils.iconPulse(icon as HTMLElement).catch(() => {})
    }

    // Add magnetic effect to button
    const button = element.querySelector('[data-button]')
    if (button) {
      GSAPUtils.magneticEffect(button as HTMLElement)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      {/* Three.js Background */}
      <div ref={bgRef} className="absolute inset-0 opacity-25" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Award className="w-4 h-4 mr-2 text-emerald-600 animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">
              Government Schemes
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate__animated animate__fadeInUp">
            <TranslatableText text="Empower Your Farm with Government Support" />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            <TranslatableText text="Access comprehensive government schemes designed to support farmers with financial aid, credit facilities, and insurance coverage." />
          </p>
        </div>

        {/* Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {schemeStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
              >
                <motion.div
                  className={`inline-flex p-3 rounded-xl mb-3 ${stat.color
                    .replace('text-', 'bg-')
                    .replace('-600', '-500/10')}`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </motion.div>
                <div
                  className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                >
                  <NumberCounter
                    finalNumber={stat.value}
                    suffix={stat.suffix}
                    startDelay={1000 + index * 200}
                  />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  <TranslatableText text={stat.label} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Schemes Grid */}
        <div ref={schemesRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {schemes.map((scheme, index) => {
            const IconComponent = scheme.icon
            return (
              <GradientCard
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${scheme.bgGradient} border-0 hover:shadow-2xl transition-all duration-500`}
                onMouseEnter={(e) =>
                  handleSchemeHover(e.currentTarget as HTMLElement)
                }
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <IconComponent className="w-full h-full" />
                </div>

                <AnimatedCardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`p-4 rounded-2xl ${scheme.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                    >
                      <IconComponent className="w-8 h-8" data-icon />
                    </motion.div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2 bg-white/80">
                        {scheme.category}
                      </Badge>
                      <div className="space-y-1">
                        <div
                          className={`text-2xl font-bold ${
                            scheme.color.split(' ')[1]
                          }`}
                        >
                          {scheme.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {scheme.period}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatedCardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    <TranslatableText text={scheme.title} />
                  </AnimatedCardTitle>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{scheme.beneficiaries} farmers enrolled</span>
                  </div>
                </AnimatedCardHeader>

                <AnimatedCardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    <TranslatableText text={scheme.description} />
                  </p>

                  <ClickBurst>
                    <GradientButton
                      className="w-full group-hover:scale-105 transition-transform duration-300"
                      data-button
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </GradientButton>
                  </ClickBurst>
                </AnimatedCardContent>
              </GradientCard>
            )
          })}
        </div>

        {/* Key Benefits Section */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 backdrop-blur-sm border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              <TranslatableText text="Why Choose FarmSaathi for Government Schemes?" />
            </h3>
            <p className="text-muted-foreground">
              <TranslatableText text="Experience seamless access to all government benefits through our unified platform" />
            </p>
          </div>

          <div
            ref={benefitsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors"
                whileHover={{ x: 5 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  <TranslatableText text={benefit} />
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <ClickBurst>
              <PrimaryButton size="lg" className="animate-pulse">
                <Sparkles className="w-5 h-5 mr-2" />
                <TranslatableText text="Get Started Today" />
              </PrimaryButton>
            </ClickBurst>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
