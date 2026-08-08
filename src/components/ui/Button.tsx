import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-bg hover:bg-gold-light focus-visible:outline-gold disabled:opacity-50",
  secondary:
    "border border-border bg-transparent text-ink hover:border-gold/40 hover:bg-surface focus-visible:outline-gold",
  ghost: "text-ink-secondary hover:text-ink focus-visible:outline-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, onClick, ...rest } = props;
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
