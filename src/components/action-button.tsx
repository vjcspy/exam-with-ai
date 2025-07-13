import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function ActionButton({
  children,
  className,
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "h-12 px-4 text-sm font-medium border border-border rounded-sm transition-colors",
        variant === "default" 
          ? "bg-background text-foreground hover:bg-secondary" 
          : "bg-transparent hover:bg-secondary/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}