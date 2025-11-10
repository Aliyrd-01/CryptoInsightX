import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, TrendingUp, Repeat, User, Mail } from "lucide-react";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/auth');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-card">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation('/')}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover-elevate px-2 py-1 rounded-lg transition-all"
              data-testid="button-logo"
            >
              Crypto Analyzer
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium" data-testid="text-user-name">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-user-email">
                  {user.email}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="default"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {user.name || 'Trader'}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trading dashboard is ready. Access powerful tools to analyze markets and execute trades.
            </p>
          </div>

          <Card className="p-8 border-primary/20 backdrop-blur-sm" data-testid="card-user-profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user.name || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover-elevate transition-all duration-300 border-primary/20" data-testid="card-trading-analyzer">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/50">
                    Coming Soon
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Trading Analyzer</h3>
                  <p className="text-muted-foreground">
                    Real-time indicator analysis, entry/exit signals, and smart trade recommendations powered by AI.
                  </p>
                </div>
                <Button className="w-full" disabled data-testid="button-launch-analyzer">
                  Launch Analyzer
                </Button>
              </div>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-300 border-secondary/20" data-testid="card-arbitrage-tool">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <Repeat className="w-7 h-7 text-secondary" />
                  </div>
                  <Badge variant="outline" className="text-secondary border-secondary/50">
                    Coming Soon
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Arbitrage Tool</h3>
                  <p className="text-muted-foreground">
                    Multi-exchange scanning, instant opportunity alerts, and automated execution for maximum profit.
                  </p>
                </div>
                <Button className="w-full" disabled data-testid="button-launch-arbitrage">
                  Launch Arbitrage Tool
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
