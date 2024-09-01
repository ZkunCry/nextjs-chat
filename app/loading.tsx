import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/widgets/Header";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <Header>
        <div className="flex container justify-between items-center py-4">
          <Skeleton className="w-[150px] h-[36px]" />
          <div className="flex gap-4">
            <Skeleton className="w-[50px] h-[36px]" />
            <Skeleton className="w-[36px] h-[36px]" />
          </div>
        </div>
      </Header>
      <div className="flex flex-1 flex-col items-center justify-center">
        <LoaderCircle size={60} className="animate-spin" />
      </div>
    </div>
  );
}
