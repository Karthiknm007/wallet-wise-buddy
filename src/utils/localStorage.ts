
// Types
export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  income: number;
  limit: number;
}

export interface SavingsGoal {
  target: number;
  current: number;
  name: string;
}

// Storage Keys
const EXPENSES_KEY = "wallet-wise-expenses";
const BUDGET_KEY = "wallet-wise-budget";
const SAVINGS_GOAL_KEY = "wallet-wise-savings";

// Expenses Functions
export const getExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem(EXPENSES_KEY);
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

export const addExpense = (expense: Omit<Expense, "id">) => {
  const expenses = getExpenses();
  const newExpense = {
    ...expense,
    id: crypto.randomUUID(),
  };
  
  localStorage.setItem(EXPENSES_KEY, JSON.stringify([newExpense, ...expenses]));
  return newExpense;
};

export const deleteExpense = (id: string) => {
  const expenses = getExpenses();
  const updatedExpenses = expenses.filter(expense => expense.id !== id);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
};

// Budget Functions
export const getBudget = (): Budget => {
  const storedBudget = localStorage.getItem(BUDGET_KEY);
  return storedBudget 
    ? JSON.parse(storedBudget) 
    : { income: 0, limit: 0 };
};

export const updateBudget = (budget: Budget) => {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
};

// Savings Functions
export const getSavingsGoal = (): SavingsGoal => {
  const storedGoal = localStorage.getItem(SAVINGS_GOAL_KEY);
  return storedGoal 
    ? JSON.parse(storedGoal) 
    : { target: 0, current: 0, name: "Savings Goal" };
};

export const updateSavingsGoal = (goal: SavingsGoal) => {
  localStorage.setItem(SAVINGS_GOAL_KEY, JSON.stringify(goal));
};

export const updateSavingsCurrent = (amount: number) => {
  const goal = getSavingsGoal();
  const updatedGoal = { ...goal, current: amount };
  localStorage.setItem(SAVINGS_GOAL_KEY, JSON.stringify(updatedGoal));
};

// Summary and Stats
export const getCurrentMonthExpenses = (): Expense[] => {
  const expenses = getExpenses();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
};

export const getCurrentMonthTotal = (): number => {
  const expenses = getCurrentMonthExpenses();
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getExpensesByCategory = () => {
  const expenses = getCurrentMonthExpenses();
  const categoryTotals: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });
  
  return categoryTotals;
};

export const clearAllData = () => {
  localStorage.removeItem(EXPENSES_KEY);
  localStorage.removeItem(BUDGET_KEY);
  localStorage.removeItem(SAVINGS_GOAL_KEY);
};
