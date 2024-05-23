import PageTitle from "@/components/page-title";
import TransactionForm from "../../_common/transaction-form";
import TransactionModel from "@/models/transaction-model";

async function EditTransaction({ params }: { params: { id: string } }) {
  const transaction = await TransactionModel.findById(params.id);
  return (
    <div>
      <PageTitle title="แก้ไขธุรกรรม" />
      <TransactionForm
        isEdit={true}
        initialValues={JSON.parse(JSON.stringify(transaction))}
      />
    </div>
  );
}

export default EditTransaction;