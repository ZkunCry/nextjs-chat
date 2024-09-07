"use client";
import React, { useId } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavigationWrapper";
import { usePathname } from "next/navigation";
type Props = {
  navLinks: NavLink[];
};
const NavigationNews = ({ navLinks = [] }: Props) => {
  const id = useId();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <NavigationMenu className="w-full flex-1 mt-[16px] !max-w-[100%]">
      <div className="w-full overflow-hidden">
        <NavigationMenuList className="gap-5 overflow-x-auto pb-[10px]  !justify-evenly">
          {navLinks.length
            ? navLinks.map((item, index) => {
                console.log(item.href === pathname);
                return (
                  <NavigationMenuItem
                    className={`relative ${
                      pathname === item.href
                        ? "after:content-['']  after:absolute after:w-full after:h-[2px] after:rounded-lg after:bg-blue-500 after:bottom-0 after:left-0"
                        : ""
                    }`}
                    key={`${id}-${index}`}
                  >
                    <NavigationMenuLink
                      className={cn(
                        `${
                          pathname === item.href
                            ? "dark:!text-white !text-black"
                            : ""
                        } text-[1rem] relative font-medium text-gray-500`,
                        navigationMenuTriggerStyle()
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })
            : ""}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

export default NavigationNews;
