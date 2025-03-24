
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSavingsGoal, updateSavingsGoal, updateSavingsCurrent } from "@/utils/localStorage";

const Savings = () => {
  const [goal, setGoal] = useState({ target: 0, current: 0, name: "Savings Goal" });
  const [newTarget, setNewTarget] = useState("");
  const [newCurrent, setNewCurrent] = useState("");
  const [newName, setNewName] = useState("");
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const savedGoal = getSavingsGoal();
    setGoal(savedGoal);
    
    if (savedGoal.target > 0) {
      setNewTarget(savedGoal.target.toString());
      setNewCurrent(savedGoal.current.toString());
      setNewName(savedGoal.name);
      
      const calculatedProgress = Math.min(
        Math.round((savedGoal.current / savedGoal.target) * 100),
        100
      );
      setProgress(calculatedProgress);
    }
  }, []);
  
  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetAmount = parseFloat(newTarget);
    
    if (isNaN(targetAmount) || targetAmount <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }
    
    const currentAmount = parseFloat(newCurrent) || 0;
    
    if (isNaN(currentAmount) || currentAmount < 0) {
      toast.error("Please enter a valid current amount");
      return;
    }
    
    if (currentAmount > targetAmount) {
      toast.error("Current amount cannot exceed target amount");
      return;
    }
    
    const name = newName.trim() || "Savings Goal";
    
    updateSavingsGoal({
      target: targetAmount,
      current: currentAmount,
      name,
    });
    
    setGoal({
      target: targetAmount,
      current: currentAmount,
      name,
    });
    
    const calculatedProgress = Math.min(
      Math.round((currentAmount / targetAmount) * 100),
      100
    );
    
    setProgress(calculatedProgress);
    toast.success("Savings goal updated");
  };
  
  const handleAddToSavings = (e: React.FormEvent) => {
    e.preventDefault();
    
    const addAmount = parseFloat(newCurrent);
    
    if (isNaN(addAmount) || addAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const newCurrentAmount = Math.min(goal.current + addAmount, goal.target);
    
    updateSavingsCurrent(newCurrentAmount);
    
    setGoal({
      ...goal,
      current: newCurrentAmount,
    });
    
    setNewCurrent("");
    
    const calculatedProgress = Math.min(
      Math.round((newCurrentAmount / goal.target) * 100),
      100
    );
    
    setProgress(calculatedProgress);
    toast.success(`Added $${addAmount.toFixed(2)} to your savings`);
  };
  
  return (
    <Layout>
      <div className="container px-4 pt-6 pb-20 animate-fade-in">
        <h1 className="text-2xl font-semibold mb-6">Savings Goals</h1>
        
        {goal.target > 0 ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
              <CardDescription>
                ${goal.current.toFixed(2)} saved of ${goal.target.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <form onSubmit={handleAddToSavings} className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                  />
                </div>
                <Button type="submit">
                  Add to Savings
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : null}
        
        <Card>
          <CardHeader>
            <CardTitle>{goal.target > 0 ? "Update Goal" : "Create a Savings Goal"}</CardTitle>
            <CardDescription>
              Set a target amount you want to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateGoal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Emergency Fund"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount ($)</Label>
                <Input
                  id="target"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                />
              </div>
              
              {!goal.target && (
                <div className="space-y-2">
                  <Label htmlFor="current">Current Savings ($)</Label>
                  <Input
                    id="current"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {goal.target > 0 ? "Update Goal" : "Create Goal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Savings;
