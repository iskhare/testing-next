import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckIcon, 
  XMarkIcon,
  ServerIcon, 
  UserGroupIcon, 
  RocketLaunchIcon,
  BuildingOffice2Icon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import '../styles/animations.css';

interface Feature {
  name: string;
  description?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NavigationItem {
  name: string;
  href: string;
}

interface FooterNavigation {
  product: NavigationItem[];
}

export default function PricingPage() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeatureTooltip, setShowFeatureTooltip] = useState<string | null>(null);
  
  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Helper function to render feature availability
  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <CheckIcon className="h-5 w-5 flex-shrink-0 text-emerald-400" />
        </div>
      );
    } else if (value === false) {
      return (
        <div className="flex items-center justify-center">
          <XMarkIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
        </div>
      );
    } else {
      return <span className="text-gray-300">{value}</span>;
    }
  };

  // Plan features
  const starterFeatures: Feature[] = [
    { name: "1 repository", description: "Connect a single GitHub repository for documentation." },
    { name: "Up to 5 team members", description: "Grant access to 5 members of your development team." },
    { name: "Automatic documentation", description: "AI-powered documentation generation from your codebase." },
    { name: "Basic code analysis", description: "Fundamental code structure and dependency analysis." },
    { name: "GitHub integration", description: "Connect with GitHub for continuous documentation." },
    { name: "Community support", description: "Access to our community forums and knowledge base." }
  ];

  const proFeatures: Feature[] = [
    { name: "Up to 5 repositories", description: "Connect multiple repositories for comprehensive documentation." },
    { name: "Up to 15 team members", description: "Grant access to more members of your development team." },
    { name: "Advanced code analysis", description: "Deeper insights into code structure, patterns, and potential improvements." },
    { name: "Custom documentation templates", description: "Create and customize templates to match your team's standards." },
    { name: "API documentation", description: "Generate interactive API documentation automatically." },
    { name: "Email support", description: "Direct email support with 24-hour response time." },
    { name: "Everything in Starter", description: "All features included in the Starter plan." }
  ];

  const teamFeatures: Feature[] = [
    { name: "Up to 15 repositories", description: "Connect multiple repositories across your organization." },
    { name: "Up to 50 team members", description: "Scale access across larger development teams." },
    { name: "Collaborative editing", description: "Allow team members to collaborate on documentation improvements." },
    { name: "Advanced permissions", description: "Granular access controls for different team members." },
    { name: "Documentation analytics", description: "Track documentation usage and identify improvement opportunities." },
    { name: "Priority support", description: "Faster response times and dedicated support channels." },
    { name: "Everything in Pro", description: "All features included in the Pro plan." }
  ];

  const enterpriseFeatures: Feature[] = [
    { name: "Unlimited repositories", description: "No limits on the number of connected repositories." },
    { name: "Unlimited team members", description: "Scale across your entire organization without restrictions." },
    { name: "Custom integrations", description: "Integration with your existing tools and workflow." },
    { name: "Dedicated account manager", description: "Personalized support and strategic guidance." },
    { name: "On-premise deployment option", description: "Deploy within your own infrastructure for maximum security." },
    { name: "Custom SLAs", description: "Service level agreements tailored to your organization's needs." },
    { name: "Everything in Team", description: "All features included in the Team plan." }
  ];

  // Feature comparison table
  const featureComparison = [
    { 
      name: "Repositories", 
      starter: "1", 
      pro: "Up to 5",
      team: "Up to 15",
      enterprise: "Unlimited"
    },
    { 
      name: "Team Members", 
      starter: "Up to 5", 
      pro: "Up to 15",
      team: "Up to 50",
      enterprise: "Unlimited"
    },
    { 
      name: "Auto Documentation", 
      starter: true, 
      pro: true,
      team: true,
      enterprise: true
    },
    { 
      name: "Code Analysis", 
      starter: "Basic", 
      pro: "Advanced",
      team: "Advanced",
      enterprise: "Advanced+"
    },
    { 
      name: "Custom Templates", 
      starter: false, 
      pro: true,
      team: true,
      enterprise: true
    },
    { 
      name: "API Documentation", 
      starter: false, 
      pro: true,
      team: true,
      enterprise: true
    },
    { 
      name: "Collaborative Editing", 
      starter: false, 
      pro: false,
      team: true,
      enterprise: true
    },
    { 
      name: "Analytics", 
      starter: false, 
      pro: false,
      team: true,
      enterprise: "Advanced"
    },
    { 
      name: "GitHub Integration", 
      starter: true, 
      pro: true,
      team: true,
      enterprise: true
    },
    { 
      name: "Access Controls", 
      starter: "Basic", 
      pro: "Standard",
      team: "Advanced",
      enterprise: "Enterprise-grade"
    },
    { 
      name: "Support", 
      starter: "Community", 
      pro: "Email",
      team: "Priority",
      enterprise: "Dedicated"
    },
    { 
      name: "SLA", 
      starter: false, 
      pro: false,
      team: "99.9% uptime",
      enterprise: "Custom"
    }
  ];

  // Enterprise features
  const enterpriseIncluded = [
    "Unlimited repositories and team members",
    "Enterprise-grade security features",
    "Custom deployment options (cloud or on-premise)",
    "Single sign-on (SSO) integration",
    "Advanced audit logging and compliance",
    "Custom SLAs with guaranteed uptime",
    "Dedicated account manager",
    "Priority 24/7 support",
    "Custom integrations with your existing tools",
    "Strategic implementation consulting",
    "Employee training and onboarding",
    "Quarterly business reviews"
  ];

  // Pricing FAQs
  const pricingFaqs: FAQ[] = [
    {
      question: "How does the repository limit work?",
      answer: "Each plan allows you to connect a specific number of GitHub repositories to Nimbic AI. For example, the Starter plan allows 1 repository, while Pro supports up to 5. If you need to document more repositories, you can upgrade to a higher tier plan or contact sales for a custom enterprise solution."
    },
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. When upgrading, the new plan takes effect immediately. When downgrading, the change will take effect at the end of your current billing cycle."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial of our Pro plan with no credit card required. This gives you full access to all Pro features so you can thoroughly test Nimbic AI with your codebase before committing to a subscription."
    },
    {
      question: "How does billing work?",
      answer: "We offer both monthly and annual billing options. Annual billing provides a 20% discount compared to monthly. You can pay using major credit cards, and for Enterprise plans, we also support invoicing."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "If you approach your plan limits, we'll notify you so you can decide whether to upgrade to a higher tier. We won't automatically charge you for overages or restrict access to your documentation without warning."
    },
    {
      question: "Do you offer discounts for startups or non-profits?",
      answer: "Yes, we offer special pricing for eligible startups, non-profit organizations, and educational institutions. Please contact our sales team to learn more about our discount programs."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We prioritize your security and privacy. Your code never leaves your environment, as all processing occurs within your infrastructure. We maintain strict access controls and are SOC 2 compliant. Enterprise plans include additional security features like on-premise deployment options."
    }
  ];

  // Footer navigation
  const footerNavigation: FooterNavigation = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Documentation', href: '/docs' }
    ]
  };

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 20 + 10}s linear infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div 
        className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : ''
        }`}
      >
        <div className="flex items-center">
          <Link to="/">
            <img className="h-10 w-auto" src="/logo.svg" alt="Nimbic AI" />
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Features</Link>
          <Link to="/pricing" className="text-emerald-400 font-medium">Pricing</Link>
          <Link to="/docs" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Documentation</Link>
        </div>
        
        {/* Sign in button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="rounded-md bg-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-500/80 transition-all duration-300 border border-white/10 hover:border-emerald-500/50 shadow-sm hover:shadow-emerald-500/20 hover:shadow-md flex items-center space-x-1 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:translate-x-0.5 transition-transform">Sign In</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center w-8 h-8 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed top-16 inset-x-0 z-40 bg-gray-900/95 backdrop-blur-md shadow-lg transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="p-4 space-y-4">
          <Link to="/features" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Features</Link>
          <Link to="/pricing" className="block text-emerald-400 py-2 text-lg font-medium">Pricing</Link>
          <Link to="/docs" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Documentation</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative px-6 pt-32 pb-16 sm:pt-40 lg:px-8 text-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-400 to-cyan-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{animation: 'pulse 8s ease-in-out infinite alternate'}} 
          />
        </div>
        
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose the plan that's right for your team and scale as you grow. No hidden fees, no surprises.
          </p>
          
          {/* Billing period toggle */}
          <div className="mt-12 flex justify-center">
            <div className="relative flex rounded-full bg-gray-800/60 p-1 backdrop-blur-sm">
              <button
                type="button"
                className={`relative w-32 rounded-full py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                  billingPeriod === 'monthly'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`relative ml-0.5 w-32 rounded-full py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                  billingPeriod === 'annual'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual
                
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Starter Plan */}
            <div className="relative flex flex-col rounded-2xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 shadow-xl transition-all">
              <div className="mb-5">
                <div className="flex items-center">
                  <RocketLaunchIcon className="h-8 w-8 text-emerald-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Starter</h3>
                </div>
                <p className="mt-2 text-gray-400">Perfect for small teams and startups</p>
                <div className="mt-5">
                  <span className="text-5xl font-bold text-white">${billingPeriod === 'monthly' ? '49' : '39'}</span>
                  <span className="text-gray-400 ml-2">/ month {billingPeriod === 'annual' ? '(billed annually)' : ''}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-400">Per repository</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {starterFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    <div className="ml-3">
                      <span className="text-white">{feature.name}</span>
                      {feature.description && (
                        <div className="relative">
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-gray-300"
                            onMouseEnter={() => setShowFeatureTooltip(feature.name)}
                            onMouseLeave={() => setShowFeatureTooltip(null)}
                          >
                            <QuestionMarkCircleIcon className="h-4 w-4" />
                          </button>
                          {showFeatureTooltip === feature.name && (
                            <div className="absolute left-6 top-0 z-10 w-72 rounded-lg bg-gray-900 p-3 text-sm text-gray-300 shadow-lg ring-1 ring-gray-700">
                              {feature.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/signup?plan=starter"
                className="mt-auto block w-full rounded-md bg-white/10 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-500/80 transition-colors duration-300 border border-white/10 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                Get started
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="relative flex flex-col rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-800/40 backdrop-blur-sm p-8 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 transition-all">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                <div className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-gray-900">
                  Most Popular
                </div>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center">
                  <UserGroupIcon className="h-8 w-8 text-emerald-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Pro</h3>
                </div>
                <p className="mt-2 text-gray-400">For growing development teams</p>
                <div className="mt-5">
                  <span className="text-5xl font-bold text-white">${billingPeriod === 'monthly' ? '149' : '119'}</span>
                  <span className="text-gray-400 ml-2">/ month {billingPeriod === 'annual' ? '(billed annually)' : ''}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-400">Up to 5 repositories</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {proFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    <div className="ml-3">
                      <span className="text-white">{feature.name}</span>
                      {feature.description && (
                        <div className="relative">
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-gray-300"
                            onMouseEnter={() => setShowFeatureTooltip(feature.name)}
                            onMouseLeave={() => setShowFeatureTooltip(null)}
                          >
                            <QuestionMarkCircleIcon className="h-4 w-4" />
                          </button>
                          {showFeatureTooltip === feature.name && (
                            <div className="absolute left-6 top-0 z-10 w-72 rounded-lg bg-gray-900 p-3 text-sm text-gray-300 shadow-lg ring-1 ring-gray-700">
                              {feature.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/signup?plan=pro"
                className="mt-auto block w-full rounded-md bg-emerald-500 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                Get started
              </Link>
            </div>
            
            {/* Team Plan */}
            <div className="relative flex flex-col rounded-2xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 shadow-xl transition-all">
              <div className="mb-5">
                <div className="flex items-center">
                  <ServerIcon className="h-8 w-8 text-emerald-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Team</h3>
                </div>
                <p className="mt-2 text-gray-400">For larger development teams</p>
                <div className="mt-5">
                  <span className="text-5xl font-bold text-white">${billingPeriod === 'monthly' ? '349' : '279'}</span>
                  <span className="text-gray-400 ml-2">/ month {billingPeriod === 'annual' ? '(billed annually)' : ''}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-400">Up to 15 repositories</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {teamFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    <div className="ml-3">
                      <span className="text-white">{feature.name}</span>
                      {feature.description && (
                        <div className="relative">
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-gray-300"
                            onMouseEnter={() => setShowFeatureTooltip(feature.name)}
                            onMouseLeave={() => setShowFeatureTooltip(null)}
                          >
                            <QuestionMarkCircleIcon className="h-4 w-4" />
                          </button>
                          {showFeatureTooltip === feature.name && (
                            <div className="absolute left-6 top-0 z-10 w-72 rounded-lg bg-gray-900 p-3 text-sm text-gray-300 shadow-lg ring-1 ring-gray-700">
                              {feature.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/signup?plan=team"
                className="mt-auto block w-full rounded-md bg-white/10 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-500/80 transition-colors duration-300 border border-white/10 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                Get started
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="relative flex flex-col rounded-2xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 shadow-xl transition-all">
              <div className="mb-5">
                <div className="flex items-center">
                  <BuildingOffice2Icon className="h-8 w-8 text-emerald-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Enterprise</h3>
                </div>
                <p className="mt-2 text-gray-400">For organizations with complex needs</p>
                <div className="mt-5">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-400">Unlimited repositories</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {enterpriseFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    <div className="ml-3">
                      <span className="text-white">{feature.name}</span>
                      {feature.description && (
                        <div className="relative">
                          <button
                            type="button"
                            className="ml-1 text-gray-400 hover:text-gray-300"
                            onMouseEnter={() => setShowFeatureTooltip(feature.name)}
                            onMouseLeave={() => setShowFeatureTooltip(null)}
                          >
                            <QuestionMarkCircleIcon className="h-4 w-4" />
                          </button>
                          {showFeatureTooltip === feature.name && (
                            <div className="absolute left-6 top-0 z-10 w-72 rounded-lg bg-gray-900 p-3 text-sm text-gray-300 shadow-lg ring-1 ring-gray-700">
                              {feature.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/contact-sales"
                className="mt-auto block w-full rounded-md bg-white/10 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-500/80 transition-colors duration-300 border border-white/10 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Comparison Table */}
      <div className="bg-gray-900/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Plan Comparison
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Compare Plan Features
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Find the right plan for your team's needs with our detailed feature comparison.
            </p>
          </div>
          
          <div className="mt-16 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Feature</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Starter</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Pro</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Team</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {featureComparison.map((feature) => (
                    <tr key={feature.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{feature.name}</td>
                      <td className="px-3 py-4 text-center">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {renderFeatureValue(feature.pro)}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {renderFeatureValue(feature.team)}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {renderFeatureValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Common Questions About Pricing
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Everything you need to know about our pricing plans and billing.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl divide-y divide-gray-700">
            {pricingFaqs.map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-3 text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enterprise Section */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-950 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Need a custom solution?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our enterprise plan includes custom features, dedicated support, and flexible deployment options to meet the unique needs of your organization.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl rounded-3xl ring-1 ring-white/10 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto lg:px-12">
              <h3 className="text-2xl font-bold tracking-tight text-white">Enterprise Features</h3>
              <p className="mt-6 text-base leading-7 text-gray-300">
                Get everything in the Team plan plus additional enterprise-grade features designed for larger organizations.
              </p>
              
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-base font-semibold leading-6 text-emerald-400">What's included</h4>
                <div className="h-px flex-auto bg-gray-700"></div>
              </div>
              
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {enterpriseIncluded.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-emerald-400" aria-hidden="true" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center p-8 text-center lg:w-80 lg:flex-shrink-0 lg:border-l lg:border-white/10 lg:p-12">
              <div className="flex items-center justify-center">
                <ShieldCheckIcon className="h-16 w-16 text-emerald-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-300">
                Custom pricing based on your organization's size and needs
              </p>
              <Link
                to="/contact-sales"
                className="mt-8 block w-full rounded-md bg-emerald-500 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                Contact Sales
              </Link>
              <p className="mt-4 text-xs text-gray-500">
                Invoicing available. Volume discounts for large organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Money Back Guarantee */}
      <div className="bg-gray-900/70 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              30-Day Money Back Guarantee
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Try Nimbic AI risk-free. If you're not satisfied within 30 days, we'll refund your payment. No questions asked.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="space-y-8">
              <Link to="/">
                <img className="h-10" src="/logo.svg" alt="Nimbic AI" />
              </Link>
              <p className="text-sm leading-6 text-gray-400">
                Automated documentation for modern engineering teams.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-1 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.product.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 flex items-center justify-between">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Nimbic AI. All rights reserved.
            </p>
            <div className="flex items-center">
              <img src="/yc-logo.svg" alt="Y Combinator" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}