import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  ChevronRightIcon,
  CodeBracketIcon, 
  ServerIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  PuzzlePieceIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import '../styles/animations.css';

interface SocialLink {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function DocsPage() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, this would trigger a search
    console.log('Searching for:', searchQuery);
  };

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
          <Link to="/pricing" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Pricing</Link>
          <Link to="/docs" className="text-emerald-400 font-medium">Documentation</Link>
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
          <Link to="/pricing" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Pricing</Link>
          <Link to="/docs" className="block text-emerald-400 py-2 text-lg font-medium">Documentation</Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Side Navigation (Desktop) */}
        <aside className="hidden md:block w-64 fixed top-20 bottom-0 left-0 bg-gray-900/20 border-r border-white/5 overflow-y-auto">
          <div className="px-4 py-6">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full rounded-md bg-gray-800/50 py-2 pl-10 pr-4 text-sm text-white border border-white/10 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <nav className="space-y-8">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {section.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-emerald-400"
                      >
                        {item.name}
                        {item.tag && (
                          <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                            {item.tag}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-md transition-transform duration-300 transform ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Documentation</h2>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full rounded-md bg-gray-800/50 py-2 pl-10 pr-4 text-sm text-white border border-white/10 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <nav className="space-y-8">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {section.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-emerald-400"
                      >
                        {item.name}
                        {item.tag && (
                          <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                            {item.tag}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 md:px-8 pt-24 pb-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <span>Documentation</span>
              </div>
              
              <h1 className="text-3xl font-bold text-white sm:text-4xl mb-6">Documentation</h1>
              <p className="text-lg text-gray-300">
                Welcome to the Nimbic AI documentation. Learn how to integrate, configure, and maximize the benefits of our AI-powered documentation system.
              </p>
            </div>
            
            {/* Getting Started Card */}
            <div className="mb-12 rounded-xl bg-gradient-to-br from-emerald-900/20 to-gray-800/40 backdrop-blur-sm border border-emerald-500/20 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <RocketLaunchIcon className="h-6 w-6 text-emerald-400 mr-2" />
                Getting Started
              </h2>
              <p className="text-gray-300 mb-6">
                New to Nimbic AI? Follow our quick start guide to set up your first project in minutes. Learn the basics and start generating documentation right away.
              </p>
              <Link 
                to="/docs/getting-started" 
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Start here
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Documentation Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {categories.map((category) => (
                <div 
                  key={category.title} 
                  className="rounded-xl bg-gray-800/40 backdrop-blur-sm p-6 border border-white/5 hover:border-emerald-500/20 transition-all"
                >
                  <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                    <category.icon className="h-5 w-5 text-emerald-400 mr-2" />
                    {category.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {category.links.map((link) => (
                      <li key={link.title}>
                        <Link 
                          to={link.href} 
                          className="text-sm text-gray-300 hover:text-emerald-400 transition-colors flex items-center"
                        >
                          <ChevronRightIcon className="h-3 w-3 mr-1 text-gray-400" />
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={category.href} 
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center"
                  >
                    View all
                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
            
            {/* API Reference */}
            <div className="mb-12 rounded-xl bg-gray-800/40 backdrop-blur-sm p-6 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <CodeBracketIcon className="h-6 w-6 text-emerald-400 mr-2" />
                API Reference
              </h2>
              <p className="text-gray-300 mb-6">
                Comprehensive documentation for the Nimbic AI REST API. Explore endpoints, parameters, authentication, and example requests.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/docs/api/authentication"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-3 hover:border-emerald-500/20 transition-all"
                >
                  <h3 className="font-medium text-white mb-1">Authentication</h3>
                  <p className="text-sm text-gray-400">Learn how to authenticate with the API</p>
                </Link>
                <Link
                  to="/docs/api/endpoints"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-3 hover:border-emerald-500/20 transition-all"
                >
                  <h3 className="font-medium text-white mb-1">Endpoints</h3>
                  <p className="text-sm text-gray-400">Explore available API endpoints</p>
                </Link>
                <Link
                  to="/docs/api/webhooks"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-3 hover:border-emerald-500/20 transition-all"
                >
                  <h3 className="font-medium text-white mb-1">Webhooks</h3>
                  <p className="text-sm text-gray-400">Configure event notifications</p>
                </Link>
                <Link
                  to="/docs/api/rate-limits"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-3 hover:border-emerald-500/20 transition-all"
                >
                  <h3 className="font-medium text-white mb-1">Rate Limits</h3>
                  <p className="text-sm text-gray-400">Understand API usage limits</p>
                </Link>
              </div>
            </div>
            
            {/* Recent Updates */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4">Recent Updates</h2>
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div 
                    key={update.title} 
                    className="rounded-lg bg-gray-800/30 p-4 border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{update.title}</h3>
                      <span className="text-xs text-gray-400">{update.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{update.description}</p>
                    <Link 
                      to={update.href} 
                      className="text-sm text-emerald-400 hover:text-emerald-300 inline-flex items-center"
                    >
                      Read more
                      <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Help & Support */}
            <div className="rounded-xl bg-gray-800/40 backdrop-blur-sm p-6 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:support@nimbic-ai.com"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-4 hover:border-emerald-500/20 transition-all flex items-center"
                >
                  <div className="flex-shrink-0 bg-emerald-500/10 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email Support</h3>
                    <p className="text-xs text-gray-400">support@nimbic-ai.com</p>
                  </div>
                </a>
                <Link
                  to="/docs/faq"
                  className="rounded-md bg-gray-900/50 border border-white/5 p-4 hover:border-emerald-500/20 transition-all flex items-center"
                >
                  <div className="flex-shrink-0 bg-emerald-500/10 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">FAQ</h3>
                    <p className="text-xs text-gray-400">Common questions & answers</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
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

// Sidebar navigation
const sidebarSections = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/docs/introduction' },
      { name: 'Quick Start', href: '/docs/quick-start' },
      { name: 'Installation', href: '/docs/installation' },
      { name: 'Configuration', href: '/docs/configuration' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { name: 'How It Works', href: '/docs/how-it-works' },
      { name: 'AI Engine', href: '/docs/ai-engine' },
      { name: 'Documentation Types', href: '/docs/documentation-types' },
      { name: 'Templates', href: '/docs/templates' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { name: 'GitHub', href: '/docs/integrations/github' },
      { name: 'GitLab', href: '/docs/integrations/gitlab', tag: 'Beta' },
      { name: 'Bitbucket', href: '/docs/integrations/bitbucket' },
      { name: 'VS Code Extension', href: '/docs/integrations/vscode' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { name: 'Authentication', href: '/docs/api/authentication' },
      { name: 'Endpoints', href: '/docs/api/endpoints' },
      { name: 'Webhooks', href: '/docs/api/webhooks' },
      { name: 'Rate Limits', href: '/docs/api/rate-limits' },
      { name: 'Error Handling', href: '/docs/api/errors' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { name: 'Custom Parsers', href: '/docs/advanced/custom-parsers' },
      { name: 'Documentation Rules', href: '/docs/advanced/documentation-rules' },
      { name: 'Advanced Configuration', href: '/docs/advanced/advanced-configuration' },
      { name: 'Enterprise SSO', href: '/docs/advanced/enterprise-sso' },
    ],
  },
];

// Documentation categories
const categories = [
  {
    title: 'Core Concepts',
    description: 'Understand how Nimbic AI works and learn about the core technologies that power our documentation system.',
    icon: BookOpenIcon,
    href: '/docs/core-concepts',
    links: [
      { title: 'How It Works', href: '/docs/how-it-works' },
      { title: 'AI Engine', href: '/docs/ai-engine' },
      { title: 'Documentation Types', href: '/docs/documentation-types' },
    ],
  },
  {
    title: 'Integrations',
    description: 'Connect Nimbic AI with your existing tools and services for seamless documentation workflows.',
    icon: PuzzlePieceIcon,
    href: '/docs/integrations',
    links: [
      { title: 'GitHub Integration', href: '/docs/integrations/github' },
      { title: 'GitLab Integration', href: '/docs/integrations/gitlab' },
      { title: 'VS Code Extension', href: '/docs/integrations/vscode' },
    ],
  },
  {
    title: 'Guides',
    description: 'Step-by-step tutorials and guides to help you get the most out of Nimbic AI.',
    icon: DocumentTextIcon,
    href: '/docs/guides',
    links: [
      { title: 'Setting Up Templates', href: '/docs/guides/templates' },
      { title: 'Custom Documentation Rules', href: '/docs/guides/custom-rules' },
      { title: 'CI/CD Integration', href: '/docs/guides/cicd-integration' },
    ],
  },
  {
    title: 'API Reference',
    description: 'Detailed documentation for the Nimbic AI REST API to integrate with your own applications.',
    icon: CodeBracketIcon,
    href: '/docs/api',
    links: [
      { title: 'Authentication', href: '/docs/api/authentication' },
      { title: 'Endpoints', href: '/docs/api/endpoints' },
      { title: 'Webhooks', href: '/docs/api/webhooks' },
    ],
  },
];

// Recent updates
const recentUpdates = [
  {
    title: 'GitLab Integration Now in Beta',
    date: 'April 12, 2025',
    description: 'We\'ve launched our GitLab integration in beta. Now you can automatically generate documentation for your GitLab repositories with the same powerful features available for GitHub.',
    href: '/docs/changelog/gitlab-beta',
  },
  {
    title: 'New API Endpoints for Template Management',
    date: 'April 5, 2025',
    description: 'We\'ve added new API endpoints for managing documentation templates programmatically. Check out the updated API documentation for details.',
    href: '/docs/changelog/template-api',
  },
  {
    title: 'Advanced Configuration Options',
    date: 'March 28, 2025',
    description: 'Nimbic AI now supports more granular configuration options for controlling how documentation is generated, including custom parsers and language-specific rules.',
    href: '/docs/changelog/advanced-config',
  },
];

// Social media links
const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// Footer navigation
const footerNavigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: '/docs' }
  ]
};