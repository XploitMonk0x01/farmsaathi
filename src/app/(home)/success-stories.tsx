import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TranslatableText } from "@/components/translatable-text";
import { motion } from "framer-motion";

export function SuccessStories() {
    const stories = [
        {
            name: "Ramesh Kumar",
            location: "Punjab",
            quote: "Using the AI advisory, I increased my wheat yield by 20%! The market connect feature got me a better price than ever before.",
            image: PlaceHolderImages.find(p => p.id === 'success-story-1'),
        },
        {
            name: "Sunita Devi",
            location: "Maharashtra",
            quote: "The language translation is a blessing. I can finally understand all the schemes and apply for them myself without any help.",
            image: PlaceHolderImages.find(p => p.id === 'success-story-2'),
        },
        {
            name: "Arjun Singh",
            location: "Uttar Pradesh",
            quote: "I sold my produce directly to a buyer in another state through this platform. No middlemen, full profit in my bank account!",
            image: PlaceHolderImages.find(p => p.id === 'success-story-3'),
        }
    ];

    const cardVariants = {
        hover: { 
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    return (
        <section className="py-12 lg:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        <TranslatableText text="Stories of Success from Our Farmers" />
                    </h2>
                    <div className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        <TranslatableText text="Hear directly from farmers who have transformed their lives with FarmSaathi." />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                         <motion.div key={index} variants={cardVariants} whileHover="hover">
                            <Card className="overflow-hidden shadow-lg h-full">
                                <CardContent className="p-6 text-center">
                                    {story.image && (
                                        <Image
                                            src={story.image.imageUrl}
                                            alt={`Portrait of ${story.name}`}
                                            width={120}
                                            height={120}
                                            className="rounded-full mx-auto mb-4 border-4 border-primary"
                                            data-ai-hint={story.image.imageHint}
                                        />
                                    )}
                                    <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 text-left">
                                        <TranslatableText text={`“${story.quote}”`} />
                                    </blockquote>
                                    <p className="mt-4 font-bold text-lg text-foreground">
                                        <TranslatableText text={story.name} />
                                    </p>
                                    <p className="text-sm text-primary font-semibold">
                                        <TranslatableText text={story.location} />
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}