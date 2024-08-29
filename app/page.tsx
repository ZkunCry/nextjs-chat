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
import PageHeader from "@/components/widgets/PageHeader";

export default function Home() {
  return (
    <div>
      <PageHeader />
    </div>
  );
}
