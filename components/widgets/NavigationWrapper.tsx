import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ModeToggle from "@/components/widgets/ModeToggle";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import { cookies } from "next/headers";
import { getIdFromCookie } from "@/services/cookie/cookie";
export type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks?: NavLink[];
};
const NavigationWrapper = ({ navLinks = [] }: Props) => {
  const id = getIdFromCookie();
  const isLogged = cookies().get("loggedIn")?.value;
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
        {isLogged ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "border rounded-lg !p-2",
                navigationMenuTriggerStyle()
              )}
              href={`/profile/${id}`}
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
