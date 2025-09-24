import { Card, CardContent } from "@/components/ui/card";
import { TranslatableText } from "@/components/translatable-text";
import { Award, Building, IndianRupee, Users } from "lucide-react";

export function Credibility() {
    const stats = [
        {
            icon: <IndianRupee className="h-8 w-8 text-primary" />,
            value: "₹50,000+",
            label: "Average Income Increase",
        },
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            value: "2.5 Lakh+",
            label: "Farmers Benefiting",
        },
        {
            icon: <Building className="h-8 w-8 text-primary" />,
            value: "15+",
            label: "State Govt. Partnerships",
        },
        {
            icon: <Award className="h-8 w-8 text-primary" />,
            value: "ICAR Approved",
            label: "ICAR Approved Technology",
        },
    ];

    const partners = [
        { name: "Digital India", description: "Part of the Digital India Mission" },
        { name: "PM-KISAN", description: "Integrated with PM-KISAN Scheme" },
        { name: "Ministry of Agriculture", description: "Official Platform" },
        { name: "MyGov", description: "Citizen Engagement Platform" },
    ];

    return (
        <section className="py-12 lg:py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        <TranslatableText text="Built on Trust and Credibility" />
                    </h2>
                    <div className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        <TranslatableText text="Endorsed by the Government of India and trusted by farmers nationwide." />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="text-center bg-background shadow-lg border-primary/20 border">
                            <CardContent className="p-6">
                                {stat.icon}
                                <p className="text-3xl font-bold text-primary mt-2">
                                    <TranslatableText text={stat.value} />
                                </p>
                                <p className="text-muted-foreground mt-1">
                                    <TranslatableText text={stat.label} />
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-6">
                        <TranslatableText text="Our Valued Partners &amp; Integrations" />
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                        {partners.map(partner => (
                            <div key={partner.name} className="font-bold text-muted-foreground text-lg opacity-75 hover:opacity-100 transition-opacity">
                                <TranslatableText text={partner.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
