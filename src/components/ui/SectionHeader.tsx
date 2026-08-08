import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-text",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="label mb-4">{eyebrow}</p>}
      <h2 className="heading-lg">{title}</h2>
      {description && (
        <p
          className={cn(
            "body-lg mt-5 max-w-prose",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
