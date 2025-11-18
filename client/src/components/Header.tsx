import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const { t } = useLanguage();

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
              {t('header.tradingAnalyzer')}
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
              {t('header.arbitrageTool')}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation('/prices')}
              data-testid="button-prices"
            >
              {t('header.prices')}
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
                {t('header.dashboard')}
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
                  {t('header.signIn')}
                </Button>
                <LanguageSwitcher />
                <Button 
                  size="default"
                  data-testid="button-sign-up"
                  onClick={() => setLocation('/auth?mode=signup')}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t('header.signUp')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
