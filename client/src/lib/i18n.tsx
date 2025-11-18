import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'uk' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    uk: string;
    ru: string;
  };
}

const translations: Translations = {
  'header.tradingAnalyzer': {
    en: 'Trading Analyzer',
    uk: 'Торговий Аналізатор',
    ru: 'Торговый Анализатор'
  },
  'header.arbitrageTool': {
    en: 'Arbitrage Tool',
    uk: 'Інструмент Арбітражу',
    ru: 'Инструмент Арбитража'
  },
  'header.prices': {
    en: 'Prices',
    uk: 'Тарифи',
    ru: 'Тарифы'
  },
  'header.signIn': {
    en: 'Sign In',
    uk: 'Увійти',
    ru: 'Войти'
  },
  'header.signUp': {
    en: 'Sign Up',
    uk: 'Реєстрація',
    ru: 'Регистрация'
  },
  'header.dashboard': {
    en: 'Dashboard',
    uk: 'Панель',
    ru: 'Панель'
  },
  'hero.title': {
    en: 'Smart Trading Tools for Crypto Markets',
    uk: 'Розумні Торгові Інструменти для Крипторинків',
    ru: 'Умные Торговые Инструменты для Крипторынков'
  },
  'hero.description': {
    en: 'Advanced analysis and arbitrage tools designed for serious traders. Get real-time signals, indicator analysis, and maximize your profit potential across exchanges.',
    uk: 'Передові інструменти аналізу та арбітражу для серйозних трейдерів. Отримуйте сигнали в реальному часі, аналіз індикаторів та максимізуйте потенціал прибутку на біржах.',
    ru: 'Передовые инструменты анализа и арбитража для серьезных трейдеров. Получайте сигналы в реальном времени, анализ индикаторов и максимизируйте потенциал прибыли на биржах.'
  },
  'hero.downloadApp': {
    en: 'Download App',
    uk: 'Завантажити',
    ru: 'Скачать'
  },
  'hero.demoMode': {
    en: 'Demo Mode',
    uk: 'Демо Режим',
    ru: 'Демо Режим'
  },
  'hero.learnMore': {
    en: 'Learn More',
    uk: 'Дізнатися Більше',
    ru: 'Узнать Больше'
  },
  'trading.badge': {
    en: 'Product 1',
    uk: 'Продукт 1',
    ru: 'Продукт 1'
  },
  'trading.title': {
    en: 'Trading Analyzer',
    uk: 'Торговий Аналізатор',
    ru: 'Торговый Анализатор'
  },
  'trading.description': {
    en: 'Professional-grade trading analysis tool that combines technical indicators, market data, and AI insights to help you make informed trading decisions.',
    uk: 'Професійний інструмент торгового аналізу, який поєднує технічні індикатори, ринкові дані та AI для прийняття обґрунтованих торгових рішень.',
    ru: 'Профессиональный инструмент торгового анализа, который объединяет технические индикаторы, рыночные данные и AI для принятия обоснованных торговых решений.'
  },
  'trading.feature1.title': {
    en: 'Real-Time Market Analysis',
    uk: 'Аналіз Ринку в Реальному Часі',
    ru: 'Анализ Рынка в Реальном Времени'
  },
  'trading.feature1.description': {
    en: 'Get instant insights with live data from major exchanges and advanced charting tools',
    uk: 'Отримуйте миттєві інсайти з актуальними даними з основних бірж та передовими графічними інструментами',
    ru: 'Получайте мгновенные инсайты с актуальными данными с основных бирж и передовыми графическими инструментами'
  },
  'trading.feature2.title': {
    en: 'Technical Indicators',
    uk: 'Технічні Індикатори',
    ru: 'Технические Индикаторы'
  },
  'trading.feature2.description': {
    en: 'Access 50+ built-in indicators including RSI, MACD, Bollinger Bands, and more',
    uk: 'Доступ до 50+ вбудованих індикаторів, включаючи RSI, MACD, смуги Боллінджера та інші',
    ru: 'Доступ к 50+ встроенным индикаторам, включая RSI, MACD, полосы Боллинджера и другие'
  },
  'trading.feature3.title': {
    en: 'AI-Powered Signals',
    uk: 'Сигнали на основі AI',
    ru: 'Сигналы на основе AI'
  },
  'trading.feature3.description': {
    en: 'Machine learning algorithms analyze patterns and generate buy/sell signals',
    uk: 'Алгоритми машинного навчання аналізують патерни та генерують сигнали купівлі/продажу',
    ru: 'Алгоритмы машинного обучения анализируют паттерны и генерируют сигналы покупки/продажи'
  },
  'trading.feature4.title': {
    en: 'Portfolio Tracking',
    uk: 'Відстеження Портфеля',
    ru: 'Отслеживание Портфеля'
  },
  'trading.feature4.description': {
    en: 'Monitor your holdings across multiple exchanges in one unified dashboard',
    uk: 'Відстежуйте свої активи на кількох біржах в єдиній панелі',
    ru: 'Отслеживайте свои активы на нескольких биржах в единой панели'
  },
  'trading.downloadButton': {
    en: 'Download Trading Analyzer',
    uk: 'Завантажити Торговий Аналізатор',
    ru: 'Скачать Торговый Анализатор'
  },
  'arbitrage.badge': {
    en: 'Product 2',
    uk: 'Продукт 2',
    ru: 'Продукт 2'
  },
  'arbitrage.title': {
    en: 'Arbitrage Trading Tool',
    uk: 'Інструмент Арбітражної Торгівлі',
    ru: 'Инструмент Арбитражной Торговли'
  },
  'arbitrage.description': {
    en: 'Exploit price differences across multiple exchanges with our advanced arbitrage scanner. Maximize profits with minimal risk through automated detection and execution.',
    uk: 'Використовуйте різницю цін на кількох біржах з нашим передовим сканером арбітражу. Максимізуйте прибуток з мінімальним ризиком через автоматичне виявлення та виконання.',
    ru: 'Используйте разницу цен на нескольких биржах с нашим передовым сканером арбитража. Максимизируйте прибыль с минимальным риском через автоматическое обнаружение и исполнение.'
  },
  'arbitrage.feature1.title': {
    en: 'Multi-Exchange Scanner',
    uk: 'Сканер Кількох Бірж',
    ru: 'Сканер Нескольких Бирж'
  },
  'arbitrage.feature1.description': {
    en: 'Simultaneously monitor prices across 20+ major crypto exchanges',
    uk: 'Одночасно відстежуйте ціни на 20+ основних криптобіржах',
    ru: 'Одновременно отслеживайте цены на 20+ основных криптобиржах'
  },
  'arbitrage.feature2.title': {
    en: 'Opportunity Alerts',
    uk: 'Оповіщення про Можливості',
    ru: 'Оповещения о Возможностях'
  },
  'arbitrage.feature2.description': {
    en: 'Get instant notifications when profitable arbitrage opportunities arise',
    uk: 'Отримуйте миттєві сповіщення про прибуткові арбітражні можливості',
    ru: 'Получайте мгновенные уведомления о прибыльных арбитражных возможностях'
  },
  'arbitrage.feature3.title': {
    en: 'Profit Calculator',
    uk: 'Калькулятор Прибутку',
    ru: 'Калькулятор Прибыли'
  },
  'arbitrage.feature3.description': {
    en: 'Factor in trading fees, withdrawal costs, and slippage for accurate profit estimates',
    uk: 'Враховуйте торгові комісії, витрати на виведення та проковзування для точних оцінок прибутку',
    ru: 'Учитывайте торговые комиссии, расходы на вывод и проскальзывание для точных оценок прибыли'
  },
  'arbitrage.feature4.title': {
    en: 'Automated Execution',
    uk: 'Автоматичне Виконання',
    ru: 'Автоматическое Исполнение'
  },
  'arbitrage.feature4.description': {
    en: 'Execute trades automatically to capitalize on fleeting opportunities',
    uk: 'Виконуйте угоди автоматично, щоб скористатися швидкоплинними можливостями',
    ru: 'Исполняйте сделки автоматически, чтобы воспользоваться быстротечными возможностями'
  },
  'arbitrage.downloadButton': {
    en: 'Download Arbitrage Tool',
    uk: 'Завантажити Інструмент Арбітражу',
    ru: 'Скачать Инструмент Арбитража'
  },
  'stats.title': {
    en: 'Trusted by Traders Worldwide',
    uk: 'Довіряють Трейдери по Всьому Світу',
    ru: 'Доверяют Трейдеры по Всему Миру'
  },
  'stats.description': {
    en: 'Join thousands of successful traders using our tools to enhance their trading strategies',
    uk: 'Приєднуйтесь до тисяч успішних трейдерів, які використовують наші інструменти для покращення торгових стратегій',
    ru: 'Присоединяйтесь к тысячам успешных трейдеров, использующих наши инструменты для улучшения торговых стратегий'
  },
  'stats.activeUsers': {
    en: 'Active Users',
    uk: 'Активних Користувачів',
    ru: 'Активных Пользователей'
  },
  'stats.dailyTrades': {
    en: 'Daily Trades',
    uk: 'Щоденних Угод',
    ru: 'Ежедневных Сделок'
  },
  'stats.tradingVolume': {
    en: 'Trading Volume',
    uk: 'Обсяг Торгівлі',
    ru: 'Объем Торговли'
  },
  'cta.title': {
    en: 'Ready to Start Trading Smarter?',
    uk: 'Готові Розпочати Розумну Торгівлю?',
    ru: 'Готовы Начать Умную Торговлю?'
  },
  'cta.description': {
    en: 'Join thousands of successful traders and take your crypto trading to the next level with our advanced tools',
    uk: 'Приєднуйтесь до тисяч успішних трейдерів та виведіть свою криптоторгівлю на новий рівень з нашими передовими інструментами',
    ru: 'Присоединяйтесь к тысячам успешных трейдеров и выведите свою криптоторговлю на новый уровень с нашими передовыми инструментами'
  },
  'cta.tryDemo': {
    en: 'Try Demo Mode',
    uk: 'Спробувати Демо',
    ru: 'Попробовать Демо'
  },
  'cta.noCard': {
    en: 'No credit card required',
    uk: 'Кредитна картка не потрібна',
    ru: 'Кредитная карта не требуется'
  },
  'cta.freeDemo': {
    en: 'Free demo available',
    uk: 'Безкоштовне демо доступне',
    ru: 'Бесплатное демо доступно'
  },
  'footer.description': {
    en: 'Professional trading tools for the modern crypto trader. Analyze, execute, and profit with confidence.',
    uk: 'Професійні торгові інструменти для сучасного криптотрейдера. Аналізуйте, виконуйте та отримуйте прибуток з впевненістю.',
    ru: 'Профессиональные торговые инструменты для современного криптотрейдера. Анализируйте, исполняйте и получайте прибыль с уверенностью.'
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    uk: 'Швидкі Посилання',
    ru: 'Быстрые Ссылки'
  },
  'footer.contactUs': {
    en: 'Contact Us',
    uk: 'Зв\'яжіться з Нами',
    ru: 'Свяжитесь с Нами'
  },
  'footer.copyright': {
    en: 'All rights reserved.',
    uk: 'Всі права захищені.',
    ru: 'Все права защищены.'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    uk: 'Політика Конфіденційності',
    ru: 'Политика Конфиденциальности'
  },
  'footer.terms': {
    en: 'Terms of Service',
    uk: 'Умови Використання',
    ru: 'Условия Использования'
  },
  'auth.title': {
    en: 'Access your trading dashboard',
    uk: 'Доступ до вашої панелі',
    ru: 'Доступ к вашей панели'
  },
  'auth.email': {
    en: 'Email',
    uk: 'Електронна Пошта',
    ru: 'Электронная Почта'
  },
  'auth.password': {
    en: 'Password',
    uk: 'Пароль',
    ru: 'Пароль'
  },
  'auth.name': {
    en: 'Name (Optional)',
    uk: 'Ім\'я (Опціонально)',
    ru: 'Имя (Опционально)'
  },
  'auth.confirmPassword': {
    en: 'Confirm Password',
    uk: 'Підтвердити Пароль',
    ru: 'Подтвердить Пароль'
  },
  'auth.signingIn': {
    en: 'Signing in...',
    uk: 'Вхід...',
    ru: 'Вход...'
  },
  'auth.signingUp': {
    en: 'Signing up...',
    uk: 'Реєстрація...',
    ru: 'Регистрация...'
  },
  'dashboard.welcome': {
    en: 'Welcome back',
    uk: 'З поверненням',
    ru: 'С возвращением'
  },
  'dashboard.description': {
    en: 'Your trading dashboard is ready. Access powerful tools to analyze markets and execute trades.',
    uk: 'Ваша торгова панель готова. Отримайте доступ до потужних інструментів для аналізу ринків та здійснення угод.',
    ru: 'Ваша торговая панель готова. Получите доступ к мощным инструментам для анализа рынков и совершения сделок.'
  },
  'dashboard.profile': {
    en: 'Profile Information',
    uk: 'Інформація Профілю',
    ru: 'Информация Профиля'
  },
  'dashboard.name': {
    en: 'Name',
    uk: 'Ім\'я',
    ru: 'Имя'
  },
  'dashboard.notSet': {
    en: 'Not set',
    uk: 'Не встановлено',
    ru: 'Не установлено'
  },
  'dashboard.comingSoon': {
    en: 'Coming Soon',
    uk: 'Незабаром',
    ru: 'Скоро'
  },
  'dashboard.tradingDescription': {
    en: 'Advanced technical analysis with real-time market data and AI-powered insights',
    uk: 'Розширений технічний аналіз з даними ринку в реальному часі та інсайтами на основі AI',
    ru: 'Расширенный технический анализ с данными рынка в реальном времени и инсайтами на основе AI'
  },
  'dashboard.arbitrageDescription': {
    en: 'Automatically detect and execute profitable arbitrage opportunities across exchanges',
    uk: 'Автоматично виявляйте та виконуйте прибуткові арбітражні можливості на біржах',
    ru: 'Автоматически обнаруживайте и исполняйте прибыльные арбитражные возможности на биржах'
  },
  'dashboard.launchAnalyzer': {
    en: 'Launch Analyzer',
    uk: 'Запустити Аналізатор',
    ru: 'Запустить Анализатор'
  },
  'dashboard.launchTool': {
    en: 'Launch Tool',
    uk: 'Запустити Інструмент',
    ru: 'Запустить Инструмент'
  },
  'download.title': {
    en: 'Download Our Tools',
    uk: 'Завантажити Наші Інструменти',
    ru: 'Скачать Наши Инструменты'
  },
  'download.description': {
    en: 'Get the latest versions of our professional trading tools. Available for Windows, macOS, and Linux.',
    uk: 'Отримайте останні версії наших професійних торгових інструментів. Доступно для Windows, macOS та Linux.',
    ru: 'Получите последние версии наших профессиональных торговых инструментов. Доступно для Windows, macOS и Linux.'
  },
  'download.tradingDescription': {
    en: 'Professional-grade trading analysis tool with AI-powered insights and real-time market data.',
    uk: 'Професійний інструмент торгового аналізу з інсайтами на основі AI та даними ринку в реальному часі.',
    ru: 'Профессиональный инструмент торгового анализа с инсайтами на основе AI и данными рынка в реальном времени.'
  },
  'download.arbitrageDescription': {
    en: 'Advanced arbitrage scanner that identifies and executes profitable cross-exchange opportunities.',
    uk: 'Розширений сканер арбітражу, який виявляє та виконує прибуткові можливості між біржами.',
    ru: 'Расширенный сканер арбитража, который обнаруживает и исполняет прибыльные возможности между биржами.'
  },
  'download.downloadFor': {
    en: 'Download for:',
    uk: 'Завантажити для:',
    ru: 'Скачать для:'
  },
  'prices.title': {
    en: 'Choose Your Plan',
    uk: 'Оберіть Свій План',
    ru: 'Выберите Свой План'
  },
  'prices.description': {
    en: 'Select the perfect plan for your trading needs',
    uk: 'Оберіть ідеальний план для ваших торгових потреб',
    ru: 'Выберите идеальный план для ваших торговых нужд'
  },
  'prices.free': {
    en: 'Free',
    uk: 'Безкоштовно',
    ru: 'Бесплатно'
  },
  'prices.pro': {
    en: 'Pro',
    uk: 'Pro',
    ru: 'Pro'
  },
  'prices.proPlus': {
    en: 'Pro+',
    uk: 'Pro+',
    ru: 'Pro+'
  },
  'prices.select': {
    en: 'Select Plan',
    uk: 'Обрати',
    ru: 'Выбрать'
  },
  'prices.currentPlan': {
    en: 'Current Plan',
    uk: 'Поточний План',
    ru: 'Текущий План'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
