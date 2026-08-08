import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Container({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-8",
        narrow ? "max-w-narrow" : "max-w-content",
        className
      )}
    >
      {children}
    </div>
  );
}
