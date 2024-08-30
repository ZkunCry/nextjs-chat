import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/widgets/Header";

export default function Loading() {
  return (
    <div>
      <Header>
        <div className="flex container justify-between items-center py-4">
          <Skeleton className="w-[150px] h-[36px]" />
          <div className="flex gap-4">
            <Skeleton className="w-[50px] h-[36px]" />
            <Skeleton className="w-[36px] h-[36px]" />
          </div>
        </div>
      </Header>
    </div>
  );
}
