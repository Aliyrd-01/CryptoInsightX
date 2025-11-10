import { TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import analyzerImage from "@assets/generated_images/Trading_analyzer_clay_character_5152b1a0.png";

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Indicator Analysis",
    description: "Advanced technical analysis across multiple timeframes with AI-powered insights"
  },
  {
    icon: Target,
    title: "Entry/Exit Point Detection",
    description: "Smart algorithms identify optimal trade opportunities based on market conditions"
  },
  {
    icon: BarChart3,
    title: "Smart Trade Recommendations",
    description: "Get actionable trading signals with risk assessment and profit targets"
  },
  {
    icon: Zap,
    title: "Historical Performance Tracking",
    description: "Track your trading history and analyze performance metrics over time"
  }
];

export default function TradingAnalyzerSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" data-testid="section-trading-analyzer">
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
                Product 1
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Trading Analyzer
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional-grade trading analysis tool that combines technical indicators, market data, and AI insights to help you make informed trading decisions.
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
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
