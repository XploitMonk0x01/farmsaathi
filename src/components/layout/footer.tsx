import { Logo } from "@/components/logo";
import { TranslatableText } from "../translatable-text";
import { Separator } from "../ui/separator";

export function Footer() {
    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Logo className="h-10 w-10" />
                            <p className="text-xl font-bold font-headline">FarmSaathi</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <TranslatableText text="Empowering India's farmers with technology." />
                        </p>
                    </div>
                    
                    <div className="text-sm">
                        <h4 className="font-bold mb-3"><TranslatableText text="Official Platform" /></h4>
                        <p className="text-muted-foreground">
                            <TranslatableText text="Government of India" />
                        </p>
                        <p className="text-muted-foreground">
                           <TranslatableText text="Ministry of Agriculture &amp; Farmers Welfare" />
                        </p>
                    </div>

                    <div className="text-sm">
                        <h4 className="font-bold mb-3"><TranslatableText text="Quick Links" /></h4>
                        <ul className="space-y-2">
                           <li><a href="#" className="text-muted-foreground hover:text-primary"><TranslatableText text="Privacy Policy" /></a></li>
                           <li><a href="#" className="text-muted-foreground hover:text-primary"><TranslatableText text="Terms of Service" /></a></li>
                           <li><a href="#" className="text-muted-foreground hover:text-primary"><TranslatableText text="Contact Us" /></a></li>
                        </ul>
                    </div>

                </div>
                <Separator className="my-8" />
                <div className="text-center text-xs text-muted-foreground">
                    <p>
                        <TranslatableText text="© 2025 FarmSaathi, A Digital India Initiative. All Rights Reserved." />
                    </p>
                </div>
            </div>
        </footer>
    );
}
