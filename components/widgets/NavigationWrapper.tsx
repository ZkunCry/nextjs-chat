"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ModeToggle from "@/components/widgets/ModeToggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";
import { CircleUser } from "lucide-react";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks?: NavLink[];
};
const NavigationWrapper = ({ navLinks = [] }: Props) => {
  const { accessToken, isHydrate } = useStore(useAuth, (state) => ({
    accessToken: state.accessToken,
    isHydrate: state.isHydrate,
  }));

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {navLinks.map((link, index) => {
          return (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink
                className={cn(
                  "border rounded-lg",
                  navigationMenuTriggerStyle()
                )}
                href={link.href}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
        {!accessToken && !isHydrate ? (
          <Skeleton className="w-[36px] h-[36px]" />
        ) : accessToken ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "border rounded-lg !p-2",
                navigationMenuTriggerStyle()
              )}
              href={`/profile/${localStorage.getItem("id")}`}
            >
              <CircleUser />
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "border rounded-lg p-2",
                navigationMenuTriggerStyle()
              )}
              href={"/signin"}
            >
              SignIn
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationWrapper;
