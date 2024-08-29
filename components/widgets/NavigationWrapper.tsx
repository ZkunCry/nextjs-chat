import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ModeToggle from "@/components/widgets/ModeToggle";
import { cn } from "@/lib/utils";
import React from "react";
type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};
const NavigationWrapper = ({ navLinks }: Props) => {
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
                Войти
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationWrapper;
