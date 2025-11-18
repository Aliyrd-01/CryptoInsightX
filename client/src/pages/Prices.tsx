import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Plan = 'free' | 'pro' | 'pro_plus';

export default function Prices() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
    enabled: !!user,
  });

  const selectPlanMutation = useMutation({
    mutationFn: async (plan: Plan) => {
      return await apiRequest('/api/user/plan', {
        method: 'PATCH',
        body: JSON.stringify({ plan }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      toast({
        title: t('prices.success') || 'Plan updated successfully',
        description: t('prices.successDesc') || 'Your plan has been updated',
      });
    },
    onError: () => {
      toast({
        title: t('prices.error') || 'Error',
        description: t('prices.errorDesc') || 'Failed to update plan',
        variant: 'destructive',
      });
    },
  });

  const plans = [
    {
      id: 'free' as Plan,
      name: t('prices.free'),
      price: '$0',
      features: [],
    },
    {
      id: 'pro' as Plan,
      name: t('prices.pro'),
      price: '$29',
      features: [],
      popular: true,
    },
    {
      id: 'pro_plus' as Plan,
      name: t('prices.proPlus'),
      price: '$99',
      features: [],
    },
  ];

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      toast({
        title: t('prices.loginRequired') || 'Login required',
        description: t('prices.loginRequiredDesc') || 'Please login to select a plan',
        variant: 'destructive',
      });
      return;
    }
    selectPlanMutation.mutate(plan);
  };

  const userPlan = (currentUser as any)?.plan || 'free';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('prices.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('prices.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-8 relative ${
                  plan.popular
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-card-border'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    data-testid="badge-popular"
                  >
                    Popular
                  </Badge>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.id !== 'free' && (
                        <span className="text-muted-foreground">/mo</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={selectPlanMutation.isPending || userPlan === plan.id}
                    data-testid={`button-select-${plan.id}`}
                  >
                    {userPlan === plan.id
                      ? t('prices.currentPlan')
                      : t('prices.select')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
