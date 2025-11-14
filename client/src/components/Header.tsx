import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation('/')}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover-elevate px-2 py-1 rounded-lg transition-all"
            data-testid="button-logo"
          >
            Crypto Analyzer
          </button>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const element = document.getElementById('trading-analyzer');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  setLocation('/#trading-analyzer');
                }
              }}
            >
              Trading Analyzer
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const element = document.getElementById('arbitrage-tool');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  setLocation('/#arbitrage-tool');
                }
              }}
            >
              Arbitrage Tool
            </Button>
            {loading ? (
              <div className="w-24 h-9 bg-muted/50 animate-pulse rounded-lg" />
            ) : user ? (
              <Button 
                size="default"
                data-testid="button-dashboard"
                onClick={() => setLocation('/dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="default"
                  data-testid="button-sign-in"
                  onClick={() => setLocation('/auth')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  size="default"
                  data-testid="button-sign-up"
                  onClick={() => setLocation('/auth?mode=signup')}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
