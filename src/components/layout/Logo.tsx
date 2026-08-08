import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizes = {
  sm: { img: 36, text: "text-[13px]", sub: "text-[9px]" },
  md: { img: 44, text: "text-[15px]", sub: "text-[10px]" },
  lg: { img: 56, text: "text-lg", sub: "text-xs" },
};

export function Logo({
  className,
  showText = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/logo.jpg"
        alt="ISB Security Solutions"
        width={s.img}
        height={s.img}
        className="object-contain"
        style={{ width: s.img, height: s.img }}
        priority
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn(s.text, "font-semibold tracking-tight text-ink")}>
            ISB
          </span>
          <span
            className={cn(
              s.sub,
              "font-medium tracking-wider text-ink-muted uppercase"
            )}
          >
            Security Solutions
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex" aria-label="ISB Security Solutions home">
        {content}
      </Link>
    );
  }

  return content;
}
