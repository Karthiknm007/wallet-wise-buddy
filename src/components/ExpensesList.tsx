
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Expense, getExpenses, deleteExpense } from "@/utils/localStorage";
import { getCategoryIcon, getCategoryColor, getCategoryLabel } from "@/utils/categoryIcons";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setExpenses(getExpenses());
    toast.success("Expense deleted successfully");
    setDeleteId(null);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground animate-fade-in">
        <p>No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="font-medium text-lg">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.map((expense) => {
          const CategoryIcon = getCategoryIcon(expense.category as any);
          const color = getCategoryColor(expense.category as any);
          
          return (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-card rounded-xl border animate-scale-in"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-full" 
                  style={{ backgroundColor: `${color}20` }}
                >
                  <CategoryIcon 
                    className="w-5 h-5" 
                    style={{ color }}
                  />
                </div>
                <div>
                  <div className="font-medium">
                    {expense.description || getCategoryLabel(expense.category as any)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(expense.date)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="font-medium">${expense.amount.toFixed(2)}</div>
                <AlertDialog open={deleteId === expense.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(expense.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this expense. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDelete(expense.id)}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesList;
