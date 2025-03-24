
import { useEffect, useState } from "react";
import { getBudget, getCurrentMonthTotal } from "@/utils/localStorage";
import Layout from "@/components/layout/Layout";
import BudgetOverview from "@/components/BudgetOverview";
import SavingsGoal from "@/components/SavingsGoal";
import ExpensesList from "@/components/ExpensesList";
import CategoryPieChart from "@/components/CategoryPieChart";

const Dashboard = () => {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [budget, setBudget] = useState({ income: 0, limit: 0 });

  useEffect(() => {
    setMonthlyTotal(getCurrentMonthTotal());
    setBudget(getBudget());
  }, []);

  return (
    <Layout>
      <div className="container px-4 pt-6 pb-20 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">WalletWise</h1>
          <div className="text-right">
            <p className="text-lg font-medium">${monthlyTotal.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <BudgetOverview />
            <SavingsGoal />
          </div>

          <div className="space-y-4">
            <CategoryPieChart />
            <ExpensesList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
