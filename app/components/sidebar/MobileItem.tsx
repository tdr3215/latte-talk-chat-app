"use client";
import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  icon: IconType;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-neutral-content
        hover:text-base-content
        hover:bg-neutral
        `,
        active && "text-base-content bg-neutral"
      )}
    >
      <Icon className="h-6 w-6 " />
    </Link>
  );
};

export default MobileItem;
