import { TrendingUp, Target, BarChart3, Zap, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useLanguage } from '@/lib/i18n';
import analyzerImage from "@assets/generated_images/Trading_analyzer_clay_character_5152b1a0.png";

export default function TradingAnalyzerSection() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      titleKey: "trading.feature1.title",
      descriptionKey: "trading.feature1.description"
    },
    {
      icon: Target,
      titleKey: "trading.feature2.title",
      descriptionKey: "trading.feature2.description"
    },
    {
      icon: BarChart3,
      titleKey: "trading.feature3.title",
      descriptionKey: "trading.feature3.description"
    },
    {
      icon: Zap,
      titleKey: "trading.feature4.title",
      descriptionKey: "trading.feature4.description"
    }
  ];
  
  return (
    <section id="trading-analyzer" className="relative py-20 lg:py-32 overflow-hidden" data-testid="section-trading-analyzer">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-3xl" />
            <Card className="relative p-8 backdrop-blur-sm border-primary/20">
              <img 
                src={analyzerImage} 
                alt="Trading analyzer tool" 
                className="w-full h-auto rounded-xl"
                data-testid="img-trading-analyzer"
              />
              <div className="absolute -top-4 -right-4">
                <Badge className="px-4 py-2 text-sm bg-primary/90 backdrop-blur-sm">
                  AI Powered
                </Badge>
              </div>
            </Card>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/50" data-testid="badge-product-1">
                {t('trading.badge')}
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {t('trading.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('trading.description')}
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate transition-all duration-300 border-card-border"
                  data-testid={`card-feature-${index}`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(feature.descriptionKey)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="pt-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setLocation('/download#trading-analyzer')}
              >
                <Download className="mr-2 h-5 w-5" />
                {t('trading.downloadButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
