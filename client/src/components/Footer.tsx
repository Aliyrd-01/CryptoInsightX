import { Mail, Send, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative border-t border-border/50 bg-card/50 backdrop-blur-sm" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Crypto Analyzer
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t('footer.quickLinks')}</h4>
            <div className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="justify-start px-0 h-auto"
                data-testid="link-trading-analyzer"
                onClick={() => {
                  const element = document.getElementById('trading-analyzer');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#trading-analyzer';
                  }
                }}
              >
                {t('header.tradingAnalyzer')}
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start px-0 h-auto"
                data-testid="link-arbitrage-tool"
                onClick={() => {
                  const element = document.getElementById('arbitrage-tool');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#arbitrage-tool';
                  }
                }}
              >
                {t('header.arbitrageTool')}
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start px-0 h-auto"
                data-testid="link-demo"
                onClick={() => console.log('Navigate to Demo')}
              >
                {t('hero.demoMode')}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t('footer.contactUs')}</h4>
            <div className="space-y-3">
              <a 
                href="mailto:contact@cryptoanalyzer.com" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-email"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>contact@cryptoanalyzer.com</span>
              </a>
              <a 
                href="https://t.me/cryptoanalyzer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-telegram"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Send className="w-5 h-5 text-secondary" />
                </div>
                <span>@cryptoanalyzer</span>
              </a>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                size="icon" 
                variant="outline"
                data-testid="button-github"
                onClick={() => console.log('GitHub clicked')}
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                data-testid="button-twitter"
                onClick={() => console.log('Twitter clicked')}
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Crypto Analyzer. {t('footer.copyright')}</p>
            <div className="flex gap-6">
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-sm"
                data-testid="link-privacy"
                onClick={() => console.log('Privacy policy clicked')}
              >
                {t('footer.privacy')}
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-sm"
                data-testid="link-terms"
                onClick={() => console.log('Terms clicked')}
              >
                {t('footer.terms')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
