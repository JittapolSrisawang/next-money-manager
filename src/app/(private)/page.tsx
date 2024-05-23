import LinkButton from "@/components/link-button";
import DashboardData from "./_dashboard-components/dashboard-data";
import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import Loader from "@/components/loader";

async function Homepage({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="หน้าหลัก" />
        <LinkButton title="การทำธุรกรรม" path="/transactions" />
      </div>

      <Suspense
        fallback={
          <div className="h-40">
            <Loader />
          </div>
        }
        key={suspenseKey}
      >
        <DashboardData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
export default Homepage;
