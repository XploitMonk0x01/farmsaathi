'use client';
import { Header } from '@/components/layout/header';
import { Hero } from '@/app/(home)/hero';
import { Schemes } from '@/app/(home)/schemes';
import { SuccessStories } from '@/app/(home)/success-stories';
import { Footer } from '@/components/layout/footer';
import { Credibility } from '@/app/(home)/credibility';
import { PlatformOverview } from '@/app/(home)/overview';
import { motion } from 'framer-motion';

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const MotionSection = ({ children }: { children: React.ReactNode }) => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MotionSection>
          <Credibility />
        </MotionSection>
        <MotionSection>
          <PlatformOverview />
        </MotionSection>
        <MotionSection>
          <Schemes />
        </MotionSection>
        <MotionSection>
          <SuccessStories />
        </MotionSection>
      </main>
      <Footer />
    </div>
  );
}
