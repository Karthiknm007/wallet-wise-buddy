
import { useEffect, useState } from "react";
import { getSavingsGoal } from "@/utils/localStorage";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SavingsGoal = () => {
  const [goal, setGoal] = useState({ target: 0, current: 0, name: "" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedGoal = getSavingsGoal();
    setGoal(savedGoal);
    
    if (savedGoal.target > 0) {
      const calculatedProgress = Math.min(
        Math.round((savedGoal.current / savedGoal.target) * 100),
        100
      );
      setProgress(calculatedProgress);
    }
  }, []);

  if (!goal.target) {
    return null;
  }

  return (
    <Card className="glass p-6 rounded-2xl border transform transition-all duration-300 shadow-sm hover:shadow-md animate-scale-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">{goal.name}</h3>
          <span className="font-semibold text-primary">
            ${goal.current.toFixed(2)} of ${goal.target.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {progress}% saved
            </span>
            <span className="font-medium text-primary">
              ${(goal.target - goal.current).toFixed(2)} to go
            </span>
          </div>

          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </Card>
  );
};

export default SavingsGoal;
