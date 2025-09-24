'use client';

import { useEffect, useRef } from "react";
import { AnimatedCard, AnimatedCardContent, GlassCard } from "@/components/ui/animated-card";
import { TranslatableText } from "@/components/translatable-text";
import { Award, Building, IndianRupee, Users, Shield, Star, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { NumberCounter, TypedText } from "@/animations/typed-utils";
import { useNumberCounter, useIconAnimation, useThreeScene } from "@/animations";
import { ThreeUtils } from "@/animations/three-utils";
import { ClickBurst } from "@/animations/mojs-utils";
import { PopmotionUtils } from "@/animations/popmotion-utils";
import 'animate.css';

export function Credibility() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    
    // Three.js background animation
    const backgroundRef = useThreeScene((container) => {
        return ThreeUtils.createParticleBackground(container, {
            particleCount: 50,
            particleColor: 0x0099ff,
            animationSpeed: 0.0002
        });
    }, []);

    const stats = [
        {
            icon: <IndianRupee className="h-8 w-8 text-green-500" />,
            value: 50000,
            prefix: "₹",
            suffix: "+",
            label: "Average Income Increase",
            description: "Monthly income boost for farmers",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <Users className="h-8 w-8 text-blue-500" />,
            value: 250000,
            suffix: "+",
            label: "Farmers Benefiting",
            description: "Active users across India",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: <Building className="h-8 w-8 text-purple-500" />,
            value: 15,
            suffix: "+",
            label: "State Govt. Partnerships",
            description: "Official state collaborations",
            color: "from-purple-500 to-indigo-600"
        },
        {
            icon: <Award className="h-8 w-8 text-orange-500" />,
            value: 100,
            suffix: "%",
            label: "ICAR Approved Technology",
            description: "Certified agricultural solutions",
            color: "from-orange-500 to-red-600"
        },
    ];

    const partners = [
        { name: "Digital India", description: "Part of the Digital India Mission", icon: <Shield className="w-5 h-5" /> },
        { name: "PM-KISAN", description: "Integrated with PM-KISAN Scheme", icon: <Star className="w-5 h-5" /> },
        { name: "Ministry of Agriculture", description: "Official Platform", icon: <CheckCircle className="w-5 h-5" /> },
        { name: "MyGov", description: "Citizen Engagement Platform", icon: <TrendingUp className="w-5 h-5" /> },
    ];

    const achievements = [
        "Government of India Recognition",
        "ICAR Technology Certification", 
        "Digital India Initiative Partner",
        "Farmer Welfare Award 2024"
    ];

    useEffect(() => {
        // Animate stats on scroll
        if (statsRef.current) {
            import('@/animations/scrollreveal-utils').then(({ ScrollRevealUtils }) => {
                ScrollRevealUtils.revealCards('.stat-card', { interval: 150 });
                ScrollRevealUtils.revealStagger('.partner-badge', { interval: 100 });
            });
        }

        // Add parallax effect to section
        if (sectionRef.current) {
            import('@/animations/gsap-utils').then(({ GSAPUtils }) => {
                GSAPUtils.parallaxScroll(sectionRef.current!, 0.2);
            });
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <section 
            ref={sectionRef}
            className="relative py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-green-900/10 overflow-hidden"
        >
            {/* Three.js Background Animation */}
            <div 
                ref={backgroundRef}
                className="absolute inset-0 opacity-10"
                style={{ pointerEvents: 'none' }}
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <motion.div 
                            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                        >
                            <Shield className="w-4 h-4 mr-2 text-primary" />
                            <span className="text-sm font-medium text-primary">Trusted & Verified</span>
                        </motion.div>
                    </motion.div>

                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-headline mb-6"
                    >
                        <TypedText
                            strings={[
                                "Built on Trust and Credibility",
                                "Government Endorsed Platform",
                                "Farmers' Trusted Partner"
                            ]}
                            className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
                            typeSpeed={60}
                            backDelay={2000}
                        />
                    </motion.h2>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-lg text-muted-foreground"
                    >
                        <span className="animate__animated animate__fadeInUp animate__delay-1s">
                            <TranslatableText text="Endorsed by the Government of India and trusted by farmers nationwide. Our platform combines cutting-edge technology with agricultural expertise." />
                        </span>
                    </motion.div>
                </motion.div>
                
                {/* Stats Grid */}
                <motion.div 
                    ref={statsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="stat-card"
                        >
                            <ClickBurst color="#4ecdc4">
                                <GlassCard 
                                    className="h-full group perspective-1000"
                                    magnetic
                                >
                                    <AnimatedCardContent className="p-6 text-center">
                                        {/* Animated Icon */}
                                        <motion.div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r mb-4"
                                            style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                                            whileHover={{ 
                                                scale: 1.1, 
                                                rotate: 360,
                                                transition: { duration: 0.6 }
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.2 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {stat.icon}
                                            </motion.div>
                                        </motion.div>

                                        {/* Animated Number Counter */}
                                        <div className="text-3xl md:text-4xl font-bold mb-2">
                                            <NumberCounter
                                                finalNumber={stat.value}
                                                prefix={stat.prefix}
                                                suffix={stat.suffix}
                                                className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                                            />
                                        </div>

                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            <TranslatableText text={stat.label} />
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            <TranslatableText text={stat.description} />
                                        </p>

                                        {/* Hover Effect Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                                    </AnimatedCardContent>
                                </GlassCard>
                            </ClickBurst>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Achievements Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                        <TranslatableText text="Key Achievements" />
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: "rgba(59, 130, 246, 0.1)"
                                }}
                            >
                                <span className="text-sm font-medium text-primary">
                                    <TranslatableText text={achievement} />
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Partners Section */}
                <motion.div 
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h3 
                        variants={itemVariants}
                        className="text-xl font-semibold text-muted-foreground mb-8"
                    >
                        <TranslatableText text="Our Valued Partners & Integrations" />
                    </motion.h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                className="partner-badge group"
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.05,
                                    y: -5,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="p-6 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/80 transition-all duration-300">
                                    <div className="flex items-center justify-center mb-3">
                                        <motion.div
                                            className="p-3 bg-primary/10 rounded-full"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {partner.icon}
                                        </motion.div>
                                    </div>
                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                        <TranslatableText text={partner.name} />
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <TranslatableText text={partner.description} />
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
