'use client';

import * as React from "react";
import { motion, MotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useAdvancedButton, useClickEffect } from "@/animations";
import { ClickBurst } from "@/animations/mojs-utils";

const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:from-primary/90 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-destructive-foreground hover:from-red-600 hover:to-red-700 hover:shadow-lg",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-md",
        secondary: "bg-gradient-to-r from-secondary to-gray-200 text-secondary-foreground hover:from-secondary/80 hover:to-gray-300 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-md transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 hover:shadow-xl transform hover:-translate-y-1",
        neon: "bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        bounce: "hover:animate-bounce",
        pulse: "animate-pulse hover:animate-none",
        wiggle: "hover:animate-pulse",
        glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
        float: "animate-float",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof animatedButtonVariants>,
    Omit<MotionProps, 'children'> {
  asChild?: boolean;
  ripple?: boolean;
  magnetic?: boolean;
  burst?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    asChild = false, 
    ripple = true,
    magnetic = false,
    burst = true,
    loading = false,
    loadingText = "Loading...",
    children, 
    ...props 
  }, ref) => {
    const buttonRef = useAdvancedButton();
    const clickRef = useClickEffect(burst ? 'burst' : ripple ? 'ripple' : 'none');
    
    const buttonMotionProps = {
      whileHover: { 
        scale: magnetic ? 1.05 : 1.02,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      whileTap: { 
        scale: 0.95,
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: "easeOut" },
      ...props
    };

    const ButtonComponent = (
      <motion.button
        className={cn(animatedButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={loading}
        {...buttonMotionProps}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Button content */}
        <span className="relative z-10">
          {loading ? loadingText : children}
        </span>
        
        {/* Ripple effect container */}
        {ripple && <div className="absolute inset-0 overflow-hidden rounded-md" />}
      </motion.button>
    );

    return burst ? (
      <ClickBurst>
        {ButtonComponent}
      </ClickBurst>
    ) : (
      ButtonComponent
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Preset button components
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<AnimatedButtonProps, 'variant'>>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      variant="default"
      animation="glow"
      magnetic
      {...props}
    />
  )
);

export const GlassButton = React.forwardRef<HTMLButtonElement, Omit<AnimatedButtonProps, 'variant'>>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      variant="glass"
      animation="float"
      {...props}
    />
  )
);

export const NeonButton = React.forwardRef<HTMLButtonElement, Omit<AnimatedButtonProps, 'variant'>>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      variant="neon"
      animation="glow"
      {...props}
    />
  )
);

export const GradientButton = React.forwardRef<HTMLButtonElement, Omit<AnimatedButtonProps, 'variant'>>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      variant="gradient"
      animation="none"
      magnetic
      {...props}
    />
  )
);

// CSS for custom animations
const buttonAnimationStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = buttonAnimationStyles;
  document.head.appendChild(styleElement);
}

export { AnimatedButton, animatedButtonVariants };
export type { AnimatedButtonProps };