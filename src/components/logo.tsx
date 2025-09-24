import { cn } from "@/lib/utils";
import { Wheat } from "lucide-react";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("inline-flex items-center justify-center p-1 bg-primary rounded-full text-primary-foreground", className)}>
            <Wheat className="h-full w-full" />
        </div>
    );
}
