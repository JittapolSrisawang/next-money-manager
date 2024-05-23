import Filters from "./filters";
import Statistics from "./statistics";
import { GetTransactions } from "@/server-actions/transactions";

async function DashboardData({ searchParams } = { searchParams: {} }) {
  const transactions = await GetTransactions(searchParams);
  console.log(transactions.length);
  return (
    <div>
      <Filters searchParams={searchParams} />
      <Statistics transactions={transactions} />
    </div>
  );
}
export default DashboardData;
