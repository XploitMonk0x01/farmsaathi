'use client';

import * as React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAdvancedCard } from "@/animations";
import { cva, type VariantProps } from "class-variance-authority";

const animatedCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "hover:shadow-lg hover:-translate-y-1",
        glass: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:shadow-xl",
        gradient: "bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-green-900/20 hover:shadow-xl",
        neon: "border-2 border-cyan-400/30 bg-black/80 backdrop-blur-md hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        floating: "shadow-lg hover:shadow-2xl transform hover:scale-105",
      },
      animation: {
        none: "",
        hover: "hover:scale-105",
        tilt: "hover:rotate-1",
        bounce: "hover:animate-bounce",
        pulse: "hover:animate-pulse",
        glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "hover",
    },
  }
);

export interface AnimatedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedCardVariants>,
    Omit<MotionProps, 'children'> {
  magnetic?: boolean;
  parallax?: boolean;
  reveal?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    className, 
    variant,
    animation,
    magnetic = false,
    parallax = false,
    reveal = true,
    children,
    ...props 
  }, ref) => {
    const cardRef = useAdvancedCard();

    const cardMotionProps = {
      initial: reveal ? { opacity: 0, y: 50, scale: 0.95 } : {},
      whileInView: reveal ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        }
      } : {},
      viewport: { once: true, amount: 0.2 },
      whileHover: {
        y: -8,
        rotateX: magnetic ? 5 : 0,
        rotateY: magnetic ? 5 : 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
      ...props
    };

    return (
      <motion.div
        ref={ref}
        className={cn(animatedCardVariants({ variant, animation }), className)}
        {...cardMotionProps}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Background pattern (optional) */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-green-500" />
        </div>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { reveal?: boolean }
>(({ className, reveal = true, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    initial={reveal ? { opacity: 0, x: -20 } : {}}
    whileInView={reveal ? { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.2, duration: 0.5 }
    } : {}}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
));
AnimatedCardHeader.displayName = "AnimatedCardHeader";

const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { reveal?: boolean }
>(({ className, reveal = true, children, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    initial={reveal ? { opacity: 0, y: -10 } : {}}
    whileInView={reveal ? { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, duration: 0.5 }
    } : {}}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.h3>
));
AnimatedCardTitle.displayName = "AnimatedCardTitle";

const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { reveal?: boolean }
>(({ className, reveal = true, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    initial={reveal ? { opacity: 0, y: 10 } : {}}
    whileInView={reveal ? { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.4, duration: 0.5 }
    } : {}}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.p>
));
AnimatedCardDescription.displayName = "AnimatedCardDescription";

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { reveal?: boolean; stagger?: boolean }
>(({ className, reveal = true, stagger = true, children, ...props }, ref) => (
  <motion.div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    initial={reveal ? { opacity: 0, y: 20 } : {}}
    whileInView={reveal ? { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: stagger ? 0.5 : 0, 
        duration: 0.6,
        staggerChildren: 0.1
      }
    } : {}}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
));
AnimatedCardContent.displayName = "AnimatedCardContent";

const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { reveal?: boolean }
>(({ className, reveal = true, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    initial={reveal ? { opacity: 0, x: 20 } : {}}
    whileInView={reveal ? { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.6, duration: 0.5 }
    } : {}}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
));
AnimatedCardFooter.displayName = "AnimatedCardFooter";

// Preset card components
export const GlassCard = React.forwardRef<HTMLDivElement, Omit<AnimatedCardProps, 'variant'>>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="glass"
      animation="glow"
      magnetic
      {...props}
    />
  )
);

export const FloatingCard = React.forwardRef<HTMLDivElement, Omit<AnimatedCardProps, 'variant'>>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="floating"
      animation="hover"
      {...props}
    />
  )
);

export const GradientCard = React.forwardRef<HTMLDivElement, Omit<AnimatedCardProps, 'variant'>>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="gradient"
      animation="tilt"
      {...props}
    />
  )
);

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardFooter,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
};