import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sprout, Tractor, Droplets, Banknote } from "lucide-react";
import { TranslatableText } from "@/components/translatable-text";
import { Button } from "@/components/ui/button";

export function Schemes() {
    const schemes = [
        {
            icon: <Sprout className="w-8 h-8 text-primary" />,
            title: "PM-Kisan Samman Nidhi",
            description: "Financial support of ₹6,000 per year to all landholding farmer families.",
        },
        {
            icon: <Tractor className="w-8 h-8 text-primary" />,
            title: "Kisan Credit Card (KCC)",
            description: "Provides farmers with timely access to credit for their agricultural needs.",
        },
        {
            icon: <Droplets className="w-8 h-8 text-primary" />,
            title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
            description: "Aims to enhance water use efficiency with 'More crop per drop'.",
        },
        {
            icon: <Banknote className="w-8 h-8 text-primary" />,
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Insurance service to farmers for their yields.",
        },
    ];

    return (
        <section className="py-12 lg:py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        <TranslatableText text="Access Key Government Schemes" />
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        <TranslatableText text="Stay informed about and apply for beneficial government schemes directly from our platform." />
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {schemes.map((scheme, index) => (
                        <Card key={index} className="flex flex-col bg-background shadow-md hover:border-primary transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {scheme.icon}
                                <CardTitle className="font-headline text-lg">
                                    <TranslatableText text={scheme.title} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>
                                    <TranslatableText text={scheme.description} />
                                </CardDescription>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                                    <TranslatableText text="Learn More" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
