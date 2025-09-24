'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { TranslatableText } from '@/components/translatable-text'
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardHeader,
  AnimatedCardTitle,
  GlassCard,
  FloatingCard,
} from '@/components/ui/animated-card'
import { AnimatedButton, PrimaryButton } from '@/components/ui/animated-button'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import {
  Star,
  MapPin,
  TrendingUp,
  Calendar,
  Users,
  Award,
  Heart,
  ArrowRight,
  Quote,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { GSAPUtils } from '@/animations/gsap-utils'
import { AnimeUtils } from '@/animations/anime-utils'
import { useThreeScene } from '@/animations/three-utils'
import { ThreeUtils } from '@/animations/three-utils'
import { NumberCounter } from '@/animations/typed-utils'
import { TypedText } from '@/animations/typed-utils'
import { ClickBurst } from '@/animations/mojs-utils'
import 'animate.css'

export function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const storiesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [activeStory, setActiveStory] = useState(0)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Three.js background effect with golden particles
  const bgRef = useThreeScene((container) => {
    return ThreeUtils.createParticleBackground(container, {
      particleCount: 60,
      particleColor: 0xffd700,
      animationSpeed: 0.0004,
      particleSize: 0.5,
    })
  }, [])

  const successStories = [
    {
      name: 'Ravi Kumar',
      location: 'Punjab, India',
      crop: 'Wheat & Rice',
      image: PlaceHolderImages.find((p) => p.id === 'success-ravi'),
      beforeIncome: '₹2.5 Lakhs',
      afterIncome: '₹6.8 Lakhs',
      improvement: '172% increase',
      story:
        "Using FarmSaathi's AI recommendations and connecting with direct buyers, I transformed my 5-acre farm into a profitable enterprise.",
      achievements: [
        'Best Farmer Award 2023',
        'Organic Certification',
        'Community Leader',
      ],
      testimonial:
        'FarmSaathi changed everything. The market connections alone increased my profit by 60%.',
      rating: 5,
      year: '2023',
    },
    {
      name: 'Priya Sharma',
      location: 'Maharashtra, India',
      crop: 'Cotton & Sugarcane',
      image: PlaceHolderImages.find((p) => p.id === 'success-priya'),
      beforeIncome: '₹1.8 Lakhs',
      afterIncome: '₹4.2 Lakhs',
      improvement: '133% increase',
      story:
        'The government scheme integration helped me get ₹3 lakh credit instantly. Smart irrigation advice saved 40% water cost.',
      achievements: [
        'Women Farmer Excellence',
        'Water Conservation Award',
        'Technology Adopter',
      ],
      testimonial:
        'As a woman farmer, FarmSaathi gave me confidence and the right tools to succeed.',
      rating: 5,
      year: '2023',
    },
    {
      name: 'Suresh Patel',
      location: 'Gujarat, India',
      crop: 'Organic Vegetables',
      image: PlaceHolderImages.find((p) => p.id === 'success-suresh'),
      beforeIncome: '₹3.2 Lakhs',
      afterIncome: '₹8.5 Lakhs',
      improvement: '165% increase',
      story:
        "Switched to organic farming with FarmSaathi's guidance. Now I supply to premium restaurants and export companies.",
      achievements: [
        'Organic Pioneer Award',
        'Export Excellence',
        'Innovation Leader',
      ],
      testimonial:
        'The platform connected me with organic buyers I never knew existed. Life-changing!',
      rating: 5,
      year: '2024',
    },
  ]

  const impactStats = [
    {
      label: 'Farmers Empowered',
      value: 125000,
      suffix: '+',
      color: 'text-green-600',
      icon: Users,
    },
    {
      label: 'Income Increase',
      value: 156,
      suffix: '%',
      color: 'text-blue-600',
      icon: TrendingUp,
    },
    {
      label: 'Success Stories',
      value: 15000,
      suffix: '+',
      color: 'text-purple-600',
      icon: Trophy,
    },
    {
      label: 'Awards Won',
      value: 250,
      suffix: '+',
      color: 'text-orange-600',
      icon: Award,
    },
  ]

  const testimonialQuotes = [
    "FarmSaathi is not just an app, it's a farming revolution in your pocket.",
    'From traditional farming to modern agriculture - FarmSaathi made it possible.',
    "The best investment I made was trusting FarmSaathi with my farm's future.",
    'Every farmer deserves the success that FarmSaathi can bring.',
  ]

  useEffect(() => {
    if (
      isInView &&
      !animationStarted &&
      headerRef.current &&
      statsRef.current &&
      storiesRef.current
    ) {
      setAnimationStarted(true)

      // Animate header
      GSAPUtils.staggerFadeIn(Array.from(headerRef.current.children), {
        delay: 0.3,
        stagger: 0.2,
        y: 60,
        duration: 0.8,
      })

      // Animate stats
      GSAPUtils.staggerFadeIn(Array.from(statsRef.current.children), {
        delay: 0.8,
        stagger: 0.1,
        y: 40,
        duration: 0.7,
      })

      // Animate story cards
      GSAPUtils.staggerFadeIn(Array.from(storiesRef.current.children), {
        delay: 1.2,
        stagger: 0.25,
        y: 80,
        duration: 0.8,
        ease: 'back.out(1.3)',
      })

      // Animate testimonials
      if (testimonialsRef.current) {
        GSAPUtils.staggerFadeIn(Array.from(testimonialsRef.current.children), {
          delay: 2.0,
          stagger: 0.15,
          x: -50,
          duration: 0.6,
        })
      }
    }
  }, [isInView, animationStarted])

  const handleStoryHover = (element: HTMLElement, index: number) => {
    setActiveStory(index)
    AnimeUtils.elasticScale(element, { scale: 1.02, duration: 300 }).catch(
      () => {}
    )

    const icon = element.querySelector('[data-icon]')
    if (icon) {
      AnimeUtils.iconPulse(icon as HTMLElement).catch(() => {})
    }
  }

  const handleQuoteHover = (element: HTMLElement) => {
    AnimeUtils.elasticScale(element, { scale: 1.05, duration: 250 }).catch(
      () => {}
    )
    GSAPUtils.fadeInUp(element, { duration: 0.3, y: -5 })
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
    >
      {/* Three.js Background */}
      <div ref={bgRef} className="absolute inset-0 opacity-20" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Trophy className="w-4 h-4 mr-2 text-amber-600 animate-bounce" />
            <span className="text-sm font-medium text-amber-700">
              Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            <TypedText
              strings={['Real Farmers, Real Success']}
              className="gradient-text"
              typeSpeed={80}
              showCursor={false}
              loop={false}
            />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <TranslatableText text="Discover how FarmSaathi has transformed the lives of thousands of farmers across India through technology, community, and innovation." />
          </p>
        </div>

        {/* Impact Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                }}
              >
                <motion.div
                  className={`inline-flex p-3 rounded-xl mb-3 ${stat.color
                    .replace('text-', 'bg-')
                    .replace('-600', '-500/10')}`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </motion.div>
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}
                >
                  <NumberCounter
                    finalNumber={stat.value}
                    suffix={stat.suffix}
                    startDelay={1200 + index * 200}
                  />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  <TranslatableText text={stat.label} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Success Stories Grid */}
        <div ref={storiesRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {successStories.map((story, index) => (
            <FloatingCard
              key={index}
              className={`group relative overflow-hidden transition-all duration-500 ${
                index === activeStory ? 'ring-2 ring-primary shadow-2xl' : ''
              }`}
              onMouseEnter={(e) =>
                handleStoryHover(e.currentTarget as HTMLElement, index)
              }
            >
              {/* Farmer Image */}
              {story.image && (
                <div className="relative aspect-w-16 aspect-h-12 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={story.image.imageUrl}
                      alt={story.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                      data-ai-hint={story.image.imageHint}
                    />
                  </motion.div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-primary">
                      {story.year}
                    </Badge>
                  </div>
                </div>
              )}

              <AnimatedCardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <AnimatedCardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                      {story.name}
                    </AnimatedCardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        data-icon
                      />
                    ))}
                  </div>
                </div>

                <Badge variant="outline" className="mb-3">
                  {story.crop}
                </Badge>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Before</div>
                    <div className="font-semibold">{story.beforeIncome}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">After</div>
                    <div className="font-semibold text-green-600">
                      {story.afterIncome}
                    </div>
                  </div>
                </div>

                <div className="text-center py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    <NumberCounter
                      finalNumber={parseInt(
                        story.improvement.match(/\d+/)?.[0] || '0'
                      )}
                      suffix="% increase"
                      startDelay={1500 + index * 300}
                    />
                  </div>
                </div>
              </AnimatedCardHeader>

              <AnimatedCardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <TranslatableText text={story.story} />
                </p>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Achievements:</div>
                  {story.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <Award className="w-3 h-3 mr-2 text-amber-500" />
                      {achievement}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm italic text-muted-foreground">
                      "{story.testimonial}"
                    </p>
                  </div>
                </div>
              </AnimatedCardContent>
            </FloatingCard>
          ))}
        </div>

        {/* Testimonial Quotes */}
        <div ref={testimonialsRef} className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonialQuotes.map((quote, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10"
              whileHover={{ scale: 1.02 }}
              onMouseEnter={(e) =>
                handleQuoteHover(e.currentTarget as HTMLElement)
              }
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-lg italic font-medium text-muted-foreground">
                "{quote}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <ClickBurst>
              <PrimaryButton size="lg" className="animate-pulse">
                <Heart className="w-5 h-5 mr-2" />
                <TranslatableText text="Share Your Story" />
              </PrimaryButton>
            </ClickBurst>

            <AnimatedButton variant="outline" size="lg" className="group">
              <span>View All Stories</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            <TranslatableText text="Join thousands of successful farmers. Your success story could be next!" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}
