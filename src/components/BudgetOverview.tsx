
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getBudget, getCurrentMonthTotal } from "@/utils/localStorage";

const BudgetOverview = () => {
  const [budget, setBudget] = useState({ income: 0, limit: 0 });
  const [spent, setSpent] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const storedBudget = getBudget();
    setBudget(storedBudget);
    
    const currentMonthTotal = getCurrentMonthTotal();
    setSpent(currentMonthTotal);
    
    const calculatedProgress = storedBudget.limit 
      ? Math.min(Math.round((currentMonthTotal / storedBudget.limit) * 100), 100) 
      : 0;
    setProgress(calculatedProgress);
  }, []);
  
  const getRemainingBudget = () => {
    if (!budget.limit) return 0;
    const remaining = budget.limit - spent;
    return remaining > 0 ? remaining : 0;
  };
  
  const getStatusColor = () => {
    if (progress > 95) return "text-destructive";
    if (progress > 75) return "text-orange-500"; 
    return "text-green-500";
  };
  
  return (
    <Card className="glass p-6 rounded-2xl border transform transition-all duration-300 shadow-sm hover:shadow-md animate-scale-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Monthly Budget</h3>
          <span className={`font-semibold ${getStatusColor()}`}>
            ${getRemainingBudget().toFixed(2)} left
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ${spent.toFixed(2)} of ${budget.limit.toFixed(2)}
            </span>
            <span className={`font-medium ${getStatusColor()}`}>
              {progress}%
            </span>
          </div>
          
          <Progress 
            value={progress} 
            className={`h-2 ${
              progress > 95 
                ? "bg-gray-200" 
                : "bg-gray-200"
            }`} 
          />
        </div>
      </div>
    </Card>
  );
};

export default BudgetOverview;
