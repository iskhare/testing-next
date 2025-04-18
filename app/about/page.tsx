import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  UsersIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  HeartIcon,
  DocumentTextIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import '../styles/animations.css';

// Type definitions
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
}

interface Value {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavigationItem {
  name: string;
  href: string;
}

interface FooterNavigation {
  product: NavigationItem[];
  company: NavigationItem[];
}

export default function AboutPage() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Team data
  const team: TeamMember[] = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former engineering lead at Google, passionate about developer tools and documentation.",
      imageUrl: "/images/team/alex.jpg",
      linkedinUrl: "https://linkedin.com/in/alexchen",
      twitterUrl: "https://twitter.com/alexchen",
      githubUrl: "https://github.com/alexchen"
    },
    // Add more team members as needed
  ];

  // Our company values
  const values: Value[] = [
    {
      name: 'Developer-First',
      description: 'We build tools that enhance the developer experience and reduce friction in the software development lifecycle.',
      icon: LightBulbIcon
    },
    {
      name: 'Continuous Evolution',
      description: 'Just as software continuously evolves, so should its documentation.',
      icon: ArrowRightIcon
    },
    {
      name: 'Intelligence with Purpose',
      description: 'We leverage AI not for its own sake, but to solve real problems that developers face every day.',
      icon: CpuChipIcon
    },
    {
      name: 'Radical Transparency',
      description: 'We believe in open communication—with our team, our customers, and our community.',
      icon: DocumentTextIcon
    },
    {
      name: 'Collaborative Excellence',
      description: 'Great software is built by teams working together.',
      icon: UsersIcon
    },
    {
      name: 'Human-Centered Design',
      description: 'Behind every line of code is a human being.',
      icon: HeartIcon
    }
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
        </svg>
      )
    }
  ];

  // Footer navigation
  const footerNavigation: FooterNavigation = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Integrations', href: '/integrations' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ]
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
          <Link to="/pricing" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Pricing</Link>
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
            Our Mission
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            We're building the future of technical documentation to help engineering teams build better software together.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-invert mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Our Story</h2>
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-white/5 mb-12">
              <p className="text-xl font-medium text-gray-200 italic">
                "Every developer has experienced the frustration of outdated documentation. We started Nimbic AI to ensure no engineer ever wastes another minute searching for answers that should be at their fingertips."
              </p>
              <div className="mt-6 flex items-center">
                <img 
                  src="/images/founder.jpg" 
                  alt="Alex Chen, Founder & CEO" 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.currentTarget;
                    target.src = "https://via.placeholder.com/48";
                  }}
                />
                <div>
                  <p className="text-base font-semibold text-white">Alex Chen</p>
                  <p className="text-sm text-gray-400">Founder & CEO</p>
                </div>
              </div>
            </div>
            
            <p>
              Nimbic AI was born in 2023 out of a simple observation: developers spend too much time writing and maintaining documentation, and yet it's almost always incomplete, outdated, or missing entirely.
            </p>
            
            <p>
              Our founding team met while working at a rapidly growing startup where they experienced firsthand the challenges of keeping documentation in sync with a fast-evolving codebase. After trying various documentation tools and processes without success, they realized the problem needed a fundamentally new approach.
            </p>
            
            <p>
              The insight was clear: documentation should be automatically generated and continuously updated alongside the code itself. By leveraging advances in AI and natural language processing, we could create a system that understands code at a deep level and generates clear, comprehensive documentation that evolves as the code changes.
            </p>
            
            <p>
              In early 2024, we were accepted into Y Combinator's Winter batch, where we refined our product and vision. Since then, we've been growing rapidly, helping engineering teams of all sizes maintain living documentation that actually reflects their codebase.
            </p>
            
            <p>
              Today, Nimbic AI is used by hundreds of engineering teams around the world, from startups to Fortune 500 companies, saving thousands of developer hours and helping teams build better software together.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="bg-gray-900/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Our Values
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Drives Us
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              These core principles guide everything we do at Nimbic AI.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div 
                  key={value.name} 
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/60 transition-all duration-300 border border-white/5 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 h-full flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <value.icon className="h-6 w-6 flex-none text-emerald-400" aria-hidden="true" />
                    </div>
                    <span className="text-lg">{value.name}</span>
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Meet the passionate team behind Nimbic AI.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt={person.name}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.currentTarget;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                <p className="text-base leading-7 text-gray-300">{person.role}</p>
                <p className="mt-4 text-sm leading-6 text-gray-400">{person.bio}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  {person.linkedinUrl && (
                    <li>
                      <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </li>
                  )}
                  {person.twitterUrl && (
                    <li>
                      <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  )}
                  {person.githubUrl && (
                    <li>
                      <a href={person.githubUrl} className="text-gray-400 hover:text-gray-300">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Y Combinator Section */}
      <div className="bg-gray-900/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Backed By
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Y Combinator
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We're proud to be part of Y Combinator's Winter 2024 batch, working alongside the world's most innovative startups.
            </p>
          </div>
          
          <div className="mx-auto flex justify-center">
            <div className="rounded-xl bg-gray-800/30 backdrop-blur-sm p-8 border border-white/5 hover:border-emerald-500/20 transition-all">
              <img className="h-16" src="/yc-logo.svg" alt="Y Combinator" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Get in Touch
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Contact Us
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 flex flex-col items-center text-center">
              <div className="rounded-full bg-emerald-500/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">For general inquiries</p>
              <a href="mailto:info@nimbic-ai.com" className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors">
                info@nimbic-ai.com
              </a>
            </div>
            
            <div className="rounded-xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 flex flex-col items-center text-center">
              <div className="rounded-full bg-emerald-500/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
              <p className="text-gray-300">Technical assistance</p>
              <a href="mailto:support@nimbic-ai.com" className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors">
                support@nimbic-ai.com
              </a>
            </div>
            
            <div className="rounded-xl bg-gray-800/40 backdrop-blur-sm p-8 border border-white/5 flex flex-col items-center text-center">
              <div className="rounded-full bg-emerald-500/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Office</h3>
              <p className="text-gray-300">San Francisco, CA</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors">
                View Map
              </a>
            </div>
          </div>
          
          <div className="mx-auto max-w-2xl mt-16 text-center">
            <p className="text-gray-300">
              Follow us on social media
            </p>
            <div className="mt-6 flex justify-center space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-950 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Subscribe to our newsletter for product updates, industry insights, and company news.
            </p>
            <form className="mt-10 flex max-w-md mx-auto gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Subscribe
              </button>
            </form>
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
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-1 xl:mt-0">
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
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
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