"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  /** Compact style for mega menu rows */
  variant?: "top" | "mega" | "mobile";
  description?: string;
};

export function NavigationLink({
  href,
  children,
  className,
  onNavigate,
  variant = "top",
  description,
}: Props) {
  const pathname = usePathname();
  const pathOnly = href.split("#")[0] || href;
  const active =
    pathOnly === "/"
      ? pathname === "/"
      : pathname === pathOnly || pathname.startsWith(pathOnly + "/");

  if (variant === "mega") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "block px-3 py-2.5 transition-colors",
          active
            ? "bg-surface text-ink"
            : "text-ink-secondary hover:bg-surface/80 hover:text-ink",
          className
        )}
      >
        <span className={cn("text-[13px] font-medium", active && "text-gold")}>
          {children}
        </span>
        {description && (
          <span className="mt-0.5 block text-[12px] leading-snug text-ink-muted">
            {description}
          </span>
        )}
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "block min-h-[44px] px-3 py-3 text-[15px] font-medium transition-colors",
          active ? "text-gold" : "text-ink-secondary hover:text-ink",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative px-2.5 py-2 text-[13px] font-medium transition-colors",
        active ? "text-ink" : "text-ink-secondary hover:text-ink",
        className
      )}
    >
      {children}
      {active && (
        <span
          className="absolute bottom-0 left-2.5 right-2.5 h-px bg-gold"
          aria-hidden
        />
      )}
    </Link>
  );
}
