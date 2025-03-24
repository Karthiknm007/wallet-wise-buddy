
import { useLocation, Link } from "react-router-dom";
import { Home, PlusCircle, Settings, Wallet, LineChart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <nav className="flex items-center justify-around h-16 max-w-lg mx-auto">
        <NavItem 
          to="/" 
          icon={<Home className="w-6 h-6" />}
          label="Home"
          isActive={isActive("/")} 
        />
        <NavItem 
          to="/add" 
          icon={<PlusCircle className="w-6 h-6" />}
          label="Add"
          isActive={isActive("/add")} 
        />
        <NavItem 
          to="/savings" 
          icon={<Wallet className="w-6 h-6" />}
          label="Savings"
          isActive={isActive("/savings")} 
        />
        <NavItem 
          to="/budget" 
          icon={<Settings className="w-6 h-6" />}
          label="Budget"
          isActive={isActive("/budget")} 
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <div className="flex flex-col items-center">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  );
};

export default Navbar;
