
import Layout from "@/components/layout/Layout";
import ExpenseForm from "@/components/ExpenseForm";

const AddExpense = () => {
  return (
    <Layout>
      <div className="container px-4 pt-6 pb-20">
        <h1 className="text-2xl font-semibold mb-6">Add Expense</h1>
        <ExpenseForm />
      </div>
    </Layout>
  );
};

export default AddExpense;
