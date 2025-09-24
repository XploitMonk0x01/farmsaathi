import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TranslatableText } from "@/components/translatable-text";
import { ArrowRight, Video } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
      <div className="relative z-10 text-center p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight font-headline shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
          <TranslatableText text="Empowering 146 Million Farmers Through Digital Innovation" />
        </h1>
        <div className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-slate-200 shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">
          <TranslatableText text="AI-Powered Crop Advisory, Direct Market Access, and Government Schemes, all in your language." />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg">
            <TranslatableText text="Start Your Smart Farming Journey" />
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="font-bold text-base bg-white/10 backdrop-blur-sm border-white/50 hover:bg-white/20">
            <Video className="mr-2 h-5 w-5" />
            <TranslatableText text="Watch How It Works" />
          </Button>
        </div>
      </div>
    </section>
  );
}
