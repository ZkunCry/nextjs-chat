import { Skeleton } from "@/components/ui/skeleton";
import { CircleIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <LoaderCircle size={40} className="animate-spin" />
    </div>
  );
}
