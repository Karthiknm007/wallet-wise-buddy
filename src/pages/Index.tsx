
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Wallet, PieChart, BarChart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Index = () => {
  const [isGettingStarted, setIsGettingStarted] = useState(false);
  
  const handleContinue = () => {
    window.location.href = "/dashboard";
  };

  if (isGettingStarted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-md w-full space-y-8 animate-scale-in">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Let's get started</h1>
            <p className="text-muted-foreground">
              WalletWise helps you track expenses, plan your budget, and reach your savings goals.
            </p>
          </div>
          
          <Card className="bg-card/50 border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>No account needed!</CardTitle>
              <CardDescription>
                Your data is stored securely on your device only
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-4">
              <Lock className="w-12 h-12 text-muted-foreground" />
            </CardContent>
          </Card>
          
          <Button 
            size="lg" 
            className="w-full mt-6 py-6 text-lg"
            onClick={handleContinue}
          >
            Continue to Dashboard
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-background to-muted/20">
      <main className="flex-1 flex flex-col justify-center p-6 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="animate-scale-in">
            <div className="inline-flex items-center justify-center p-4 mb-6 bg-primary text-primary-foreground rounded-full">
              <Wallet className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">WalletWise</h1>
            <p className="text-muted-foreground text-lg">
              Your simple, personal budget tracker
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center animate-fade-in animation-delay-200">
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <BarChart className="w-10 h-10 mb-3 text-primary" />
                <h3 className="font-medium">Track Expenses</h3>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <PieChart className="w-10 h-10 mb-3 text-primary" />
                <h3 className="font-medium">Budget Plans</h3>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            size="lg" 
            className="w-full mt-6 py-6 text-lg animate-fade-in animation-delay-300"
            onClick={() => setIsGettingStarted(true)}
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
      
      <footer className="p-4 text-center">
        <p className="text-sm text-muted-foreground">
          A simple budget tracker for everyone
        </p>
      </footer>
    </div>
  );
};

export default Index;
