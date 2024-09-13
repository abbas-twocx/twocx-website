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
        size === "xl" && "text-6xl md:text-7xl",
        size === "lg" && "text-6xl md:text-6xl",
        size === "md" && "text-3xl md:text-4xl",
        size === "sm" && "text-xl md:text-2xl",
        className
      )}
    >
      {children}
    </Comp>
  );
}
