import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}