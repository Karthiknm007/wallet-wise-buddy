
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-full bg-background">
      {!hideNav && <Navbar />}
      <main className="flex-1 pb-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
