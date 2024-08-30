import PageHeader from "@/components/widgets/PageHeader";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PageHeader />
      </Suspense>
    </div>
  );
}
