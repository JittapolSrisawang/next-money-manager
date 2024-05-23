import { TransactionType } from "@/interfaces";
import StatisticsCard from "./statistics-card";

function Statistics({ transactions }: { transactions: TransactionType[] }) {
  let totalIncome = 0;
  let totalExpense = 0;
  let totalTransactions = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "รายรับ") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
    totalTransactions += 1;
  });

  let totalBalance = totalIncome - totalExpense;

  return (
    <div className="m-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatisticsCard
          title="Total Income"
          value={totalIncome}
          icon="./income.png"
          valueColor="#436850"
          isCurrency={true}
        />

        <StatisticsCard
          title="Total Expense"
          value={totalExpense}
          icon="./expenses.png"
          valueColor="#6D2932"
          isCurrency={true}
        />

        <StatisticsCard
          title="Total Transactions"
          value={totalTransactions}
          icon="./transaction.png"
          valueColor="#474F7A"
          isCurrency={false}
        />

        <StatisticsCard
          title="Balance"
          value={totalBalance}
          icon="./wallet.png"
          valueColor="#7E2553"
          isCurrency={true}
        />
      </div>
    </div>
  );
}
export default Statistics;
