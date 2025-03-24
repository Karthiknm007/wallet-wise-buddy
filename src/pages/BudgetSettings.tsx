
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudget, updateBudget, clearAllData } from "@/utils/localStorage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BudgetSettings = () => {
  const [income, setIncome] = useState("");
  const [limit, setLimit] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  useEffect(() => {
    const budget = getBudget();
    if (budget.income) setIncome(budget.income.toString());
    if (budget.limit) setLimit(budget.limit.toString());
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numericIncome = parseFloat(income);
    const numericLimit = parseFloat(limit);
    
    if (isNaN(numericIncome) || numericIncome < 0) {
      toast.error("Please enter a valid income amount");
      return;
    }
    
    if (isNaN(numericLimit) || numericLimit <= 0) {
      toast.error("Please enter a valid spending limit");
      return;
    }
    
    updateBudget({
      income: numericIncome,
      limit: numericLimit,
    });
    
    toast.success("Budget settings updated");
  };
  
  const handleReset = () => {
    clearAllData();
    setIncome("");
    setLimit("");
    setShowResetDialog(false);
    toast.success("All data has been reset");
  };
  
  return (
    <Layout>
      <div className="container px-4 pt-6 pb-20 animate-fade-in">
        <h1 className="text-2xl font-semibold mb-6">Budget Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>
              Set your monthly income and spending limit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income ($)</Label>
                <Input
                  id="income"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="limit">Monthly Spending Limit ($)</Label>
                <Input
                  id="limit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Save Budget Settings
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Reset all your data including expenses, budget and savings
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Reset All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your
                    expenses, budget and savings data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>
                    Yes, reset everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default BudgetSettings;
