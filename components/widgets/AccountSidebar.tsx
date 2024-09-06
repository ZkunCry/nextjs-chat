"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavigationWrapper";
import { useParams, usePathname } from "next/navigation";
import SideBar from "./SideBar";
type Props = {
  navLinks?: NavLink[];
  className: string;
};
const AccountSidebar = ({ navLinks = [], className = "" }: Props) => {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  return (
    <SideBar className={className}>
      <NavigationMenu className="flex space-x-2 max-w-full lg:flex-col lg:space-x-0 lg:space-y-1">
        {navLinks.map((link, index) => {
          return (
            <NavigationMenuLink
              key={link.label}
              active={`${link.href}/${id}` === pathname}
              href={`${link.href}/${id}`}
              className={cn(
                "inline-flex !w-full !justify-start",
                navigationMenuTriggerStyle()
              )}
            >
              {link.label}
            </NavigationMenuLink>
          );
        })}
      </NavigationMenu>
    </SideBar>
  );
};

export default AccountSidebar;
