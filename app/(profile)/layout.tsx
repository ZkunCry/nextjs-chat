import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import PageHeader from "@/components/widgets/PageHeader";
import SideBar from "@/components/widgets/SideBar";

const navLinksSideBar = [
  { href: "/profile", label: "Profile" },
  { href: "/account", label: "Account" },
];
export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <PageHeader />
      <div className="flex container  ">
        <div className="flex flex-col  w-full inner border mt-[10px] rounded-lg p-7">
          <div className="header border-b w-full">
            <h1 className="font-bold text-[32px]">Settings</h1>
            <p className="text-gray-400 mb-4">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row mt-[16px] gap-6">
            <SideBar navLinks={navLinksSideBar} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
