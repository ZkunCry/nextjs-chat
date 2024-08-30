import { cn } from "@/lib/utils";

const Header = ({
  className,
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <header className={cn("w-full border-b", className)} {...props}>
      {children}
    </header>
  );
};

export default Header;
