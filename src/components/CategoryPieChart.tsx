
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { getExpensesByCategory } from "@/utils/localStorage";
import { getCategoryColor, getCategoryLabel, CATEGORIES } from "@/utils/categoryIcons";
import { Card } from "@/components/ui/card";

const CategoryPieChart = () => {
  const [data, setData] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const categoryTotals = getExpensesByCategory();
    
    const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
      name: getCategoryLabel(category as any),
      value: amount,
      color: getCategoryColor(category as any)
    }));
    
    setData(chartData);
    setTotal(chartData.reduce((sum, item) => sum + item.value, 0));
  }, []);
  
  // If no data, show empty state
  if (data.length === 0) {
    return (
      <Card className="glass p-6 rounded-2xl text-center">
        <h3 className="font-medium mb-2">Spending by Category</h3>
        <p className="text-muted-foreground text-sm">
          Add expenses to see your spending breakdown
        </p>
      </Card>
    );
  }
  
  return (
    <Card className="glass p-6 rounded-2xl">
      <h3 className="font-medium mb-4">Spending by Category</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryPieChart;
