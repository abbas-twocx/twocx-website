import clsx from "clsx";
import { ReactNode } from "react";

interface HeadingProps {
  as?: keyof JSX.IntrinsicElements;
  size?: "xl" | "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
}

export function Heading({
  as: Comp = "h1",
  size = "lg",
  children,
  className,
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "line-clamp-4 font-bold leading-tight",
        size === "xl" && "text-h1-m md:text-h1",
        size === "lg" && "text-h2-m md:text-h2",
        size === "md" && "text-h3-m md:text-h3",
        size === "sm" && "text-h4-m md:text-h4",
        className
      )}
    >
      {children}
    </Comp>
  );
}
