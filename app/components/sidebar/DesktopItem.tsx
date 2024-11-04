"use client";
import clsx from "clsx";

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
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
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-neutral-content
            hover:text-base-content
            hover:bg-neutral
            `,
          active && "text-base-content bg-neutral"
        )}
      >
        <Icon className="h6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
