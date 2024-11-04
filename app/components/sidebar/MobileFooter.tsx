"use client";
import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-secondary       
        border-t-[1px]
        border-t-neutral
        lg:hidden
  "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          onClick={route.onClick}
          active={route.active}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
