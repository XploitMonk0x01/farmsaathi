'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TranslatableText } from '@/components/translatable-text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  const features = [
    {
      title: 'Smart Advisory',
      description:
        'Get crop advice in your local language and dialect, powered by AI to maximize your yield.',
      icon: <BrainCircuit className="w-8 h-8 text-accent" />,
      image: PlaceHolderImages.find((p) => p.id === 'overview-advisory'),
    },
    {
      title: 'Market Connection',
      description:
        'Sell directly to buyers across the nation, ensuring you get the best price for your produce.',
      icon: <Globe className="w-8 h-8 text-accent" />,
      image: PlaceHolderImages.find((p) => p.id === 'overview-market'),
    },
    {
      title: 'Government Integration',
      description:
        'Access all government benefits, schemes, and subsidies easily through a single, unified platform.',
      icon: <LandPlot className="w-8 h-8 text-accent" />,
      image: PlaceHolderImages.find((p) => p.id === 'overview-schemes'),
    },
    {
      title: 'Community Support',
      description:
        'Learn from successful farmers in your region and share your knowledge with the community.',
      icon: <Users className="w-8 h-8 text-accent" />,
      image: PlaceHolderImages.find((p) => p.id === 'overview-community'),
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 10px 30px -5px rgba(0,0,0,0.1)',
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            <TranslatableText text="A Unified Platform for Modern Agriculture" />
          </h2>
          <div className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            <TranslatableText text="From sowing to selling, FarmSaathi is your digital companion at every step of your farming journey." />
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card className="overflow-hidden shadow-lg h-full">
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
                <CardHeader className="flex flex-row items-start gap-4">
                  {feature.icon}
                  <div>
                    <CardTitle className="text-2xl text-primary font-headline">
                      <TranslatableText text={feature.title} />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <TranslatableText text={feature.description} />
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
