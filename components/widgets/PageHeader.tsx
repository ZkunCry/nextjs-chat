import Header from "@/components/widgets/Header";
import Link from "next/link";
import NavigationWrapper from "./NavigationWrapper";

const PageHeader = async () => {
  return (
    <Header>
      <div className="flex container justify-between items-center py-4">
        <Link
          href={"/"}
          className="font-bold text-xl dark:text-white py-2 px-4 border rounded-lg"
        >
          NextJsPosts
        </Link>
        <NavigationWrapper />
      </div>
    </Header>
  );
};
export default PageHeader;
