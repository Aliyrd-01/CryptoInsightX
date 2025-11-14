import { Repeat, Timer, DollarSign, Shield, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import arbitrageImage from "@assets/generated_images/Arbitrage_tool_clay_character_9f75fc74.png";

const features = [
  {
    icon: Repeat,
    title: "Multi-Exchange Scanning",
    description: "Monitor prices across major exchanges in real-time for arbitrage opportunities"
  },
  {
    icon: Timer,
    title: "Instant Opportunity Alerts",
    description: "Get notified immediately when profitable price differences are detected"
  },
  {
    icon: DollarSign,
    title: "Profit Calculation",
    description: "Automatic calculation of potential profits including all fees and slippage"
  },
  {
    icon: Shield,
    title: "Automated Execution Options",
    description: "Execute arbitrage trades automatically with customizable risk parameters"
  }
];

export default function ArbitrageToolSection() {
  const [, setLocation] = useLocation();
  
  return (
    <section id="arbitrage-tool" className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-card overflow-hidden" data-testid="section-arbitrage-tool">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-secondary border-secondary/50" data-testid="badge-product-2">
                Product 2
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Arbitrage Trading Tool
              </h2>
              <p className="text-lg text-muted-foreground">
                Exploit price differences across multiple exchanges with our advanced arbitrage scanner. Maximize profits with minimal risk through automated detection and execution.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate transition-all duration-300 border-card-border"
                  data-testid={`card-arbitrage-feature-${index}`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-secondary" />
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
            
            <div className="pt-4">
              <Button 
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setLocation('/download#arbitrage-tool')}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Arbitrage Tool
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 via-transparent to-accent/20 rounded-3xl blur-3xl" />
            <Card className="relative p-8 backdrop-blur-sm border-secondary/20">
              <img 
                src={arbitrageImage} 
                alt="Arbitrage trading tool" 
                className="w-full h-auto rounded-xl"
                data-testid="img-arbitrage-tool"
              />
              <div className="absolute -top-4 -right-4">
                <Badge className="px-4 py-2 text-sm bg-secondary/90 backdrop-blur-sm text-secondary-foreground">
                  24/7 Monitoring
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
