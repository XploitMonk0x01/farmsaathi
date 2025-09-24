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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <Credibility />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <PlatformOverview />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <Schemes />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <SuccessStories />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
