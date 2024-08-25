import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import Header from "@/components/widgets/Header";
import ModeToggle from "@/components/widgets/ModeToggle";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      <Header>
        <div className="flex container justify-between items-center py-4">
          <Link
            href={"/"}
            className="font-bold text-xl dark:text-white py-2 px-4 border rounded-lg"
          >
            NextJsPosts
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    "border rounded-lg",
                    navigationMenuTriggerStyle()
                  )}
                  href={"/"}
                >
                  Войти
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Header>
    </div>
  );
}
