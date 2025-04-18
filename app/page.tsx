"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon, Cog6ToothIcon, ArrowPathIcon, CodeBracketIcon, ServerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import '../styles/animations.css';

export default function LandingPage() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Demo content for the animated showcase
  const demoSteps = [
    { title: "Code Analysis", description: "AI scans your repository" },
    { title: "Documentation Generation", description: "Creating comprehensive docs" },
    { title: "Real-time Updates", description: "Keeping docs in sync with code" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    
    // Enhanced demo animation
    const demoInterval = setInterval(() => {
      setDemoActive(true);
      setTimeout(() => {
        setDemoActive(false);
        setTimeout(() => {
          setCurrentDemo(prev => (prev + 1) % demoSteps.length);
        }, 500);
      }, 3500);
    }, 4000);
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
      clearInterval(demoInterval);
    };
  }, [scrolled, demoSteps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
      {/* Enhanced animated background particles */}
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

      {/* Enhanced header with improved navigation */}
      <div 
        className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : ''
        }`}
      >
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Nimbic AI" width={40} height={40} className="h-10 w-auto" />
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Features</Link>
          <Link href="/pricing" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Pricing</Link>
          <Link href="/docs" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">Documentation</Link>
        </div>
        
        {/* Enhanced sign in button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="rounded-md bg-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-brand-accent/80 transition-all duration-300 border border-white/10 hover:border-brand-accent/50 shadow-sm hover:shadow-brand-accent/20 hover:shadow-md flex items-center space-x-1 group"
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
          <Link href="/features" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Features</Link>
          <Link href="/pricing" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Pricing</Link>
          <Link href="/docs" className="block text-gray-300 hover:text-emerald-400 transition-colors py-2 text-lg font-medium">Documentation</Link>
        </div>
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Enhanced gradient circles */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-400 to-cyan-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{animation: 'pulse 8s ease-in-out infinite alternate'}} 
          />
        </div>

        <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-32 flex flex-col md:flex-row items-center gap-12">
          {/* Enhanced hero section */}
          <div className="text-center md:text-left md:w-3/5">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">AI-Powered</span>
              <span className="block">Documentation for</span>
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text" style={{textShadow: '0 0 30px rgba(107, 218, 174, 0.3)'}}>
                Modern Development
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto md:mx-0">
              Automatically generate and maintain internal documentation that evolves with your codebase. Keep your team in sync with intelligent insights and real-time updates.
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent transition-all duration-200 hover:scale-105"
              >
                Get started
              </Link>
              <Link
                href="/docs"
                className="text-base font-semibold leading-6 text-gray-300 flex items-center hover:text-emerald-400 transition-colors group px-2 py-1"
              >
                Learn more <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            {/* Y Combinator with improved styling */}
            <div className="mt-12 flex items-center justify-center md:justify-start">
              <div>
                <img src="/yc-logo.svg" alt="Y Combinator" className="h-14" />
              </div>
            </div>
          </div>
          
          {/* Enhanced animated illustration */}
          <div className="hidden md:flex md:w-2/5 relative justify-center items-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-emerald-500/10 animate-pulse-slow" />
            </div>
            <div className="relative z-10 bg-gray-800/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-xl">
              <div className="p-4 bg-gray-900/50 rounded-lg border border-white/5 mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-xs text-gray-400">Terminal</div>
                </div>
                <div className="font-mono text-xs text-gray-300">
                  <div>$ nimbic init</div>
                  <div className={`mt-2 ${demoActive ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {demoSteps[currentDemo].title}: {demoSteps[currentDemo].description}...
                  </div>
                  <div className={`h-4 w-24 bg-emerald-400/30 rounded mt-2 ${demoActive ? 'animate-pulse' : ''}`}></div>
                </div>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg border border-white/5">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-xs text-gray-400">docs/README.md</div>
                </div>
                <div className="font-mono text-xs text-gray-300">
                  <div className="text-emerald-400"># Project Documentation</div>
                  <div className="text-gray-400 mt-1">Generated by Nimbic AI</div>
                  <div className="mt-2">This repository contains...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom gradient */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-500 to-cyan-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{animation: 'pulse 8s ease-in-out infinite alternate-reverse'}} 
          />
        </div>
      </div>

      {/* Enhanced divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-sm text-gray-400">How it works</span>
        </div>
      </div>

      {/* How it works section - NEW */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-emerald-400">
            Streamlined workflow
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Documentation that builds itself
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our AI agent analyzes your codebase to generate comprehensive documentation that stays in sync with your code.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>
          
          {/* Steps */}
          <div className="relative">
            {workflow.map((step, index) => (
              <div key={step.title} className={`relative ${index !== workflow.length - 1 ? 'mb-16' : ''}`}>
                <div className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-emerald-500/10 transition-all w-full max-w-lg ${index % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <step.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className={`${index % 2 === 0 ? 'ml-6' : 'mr-6'}`}>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-gray-300">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 border-2 border-emerald-500 shadow">
                    <span className="text-emerald-500 font-semibold">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-gray-900/50">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-400">
            Deploy faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to understand your codebase
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            From automatic documentation generation to intelligent code analysis,
            we provide the tools you need to maintain a healthy codebase.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 border border-white/5 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 group"
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white mb-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 flex-none text-emerald-400" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link href={feature.href} className="text-sm font-semibold leading-6 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      {/* Enhanced Demo Section - NEW */}
      <div className="bg-gray-900/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              See it in action
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How Nimbic AI transforms your docs
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Watch how our AI automatically generates comprehensive documentation that evolves with your codebase.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/5">
            <div className="p-3 bg-gray-900/70 border-b border-white/5 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">
                nimbic-demo.ai/docs
              </div>
            </div>
            <div className="p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center mb-3">
                    <svg className="h-5 w-5 text-emerald-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    <span className="font-mono text-xs text-gray-300">authMiddleware.js</span>
                  </div>
                  <div className="font-mono text-xs text-gray-300 leading-relaxed">
                    <div><span className="text-blue-400">const</span> <span className="text-yellow-400">jwt</span> = <span className="text-blue-400">require</span>(<span className="text-green-400">'jsonwebtoken'</span>);</div>
                    <div><span className="text-blue-400">const</span> <span className="text-yellow-400">User</span> = <span className="text-blue-400">require</span>(<span className="text-green-400">'../models/User'</span>);</div>
                    <div className="mt-2"><span className="text-purple-400">async function</span> <span className="text-yellow-400">authMiddleware</span>(req, res, next) {'{'}</div>
                    <div className="ml-4"><span className="text-blue-400">try</span> {'{'}</div>
                    <div className="ml-8"><span className="text-blue-400">const</span> token = req.header(<span className="text-green-400">'x-auth-token'</span>);</div>
                    <div className="ml-8"><span className="text-green-400">// Check for token</span></div>
                    <div className="ml-8"><span className="text-blue-400">if</span> (!token) {'{'}</div>
                    <div className="ml-12"><span className="text-blue-400">return</span> res.status(401).json({'{'} msg: <span className="text-green-400">'No token, authorization denied'</span> {'}'});</div>
                    <div className="ml-8">{'}'}</div>
                    <div className="ml-8"><span className="text-green-400">// Verify token</span></div>
                    <div className="ml-8"><span className="text-blue-400">const</span> decoded = <span className="text-blue-400">await</span> jwt.verify(token, process.env.JWT_SECRET);</div>
                    <div className="ml-8">req.user = decoded.user;</div>
                    <div className="ml-8">next();</div>
                    <div className="ml-4">{'}'} <span className="text-blue-400">catch</span> (err) {'{'}</div>
                    <div className="ml-8">res.status(401).json({'{'} msg: <span className="text-green-400">'Token is not valid'</span> {'}'});</div>
                    <div className="ml-4">{'}'}</div>
                    <div>{'}'}</div>
                    <div className="mt-2">module.exports = authMiddleware;</div>
                  </div>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5 flex flex-col">
                  <div className="flex items-center mb-3">
                    <svg className="h-5 w-5 text-emerald-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-mono text-xs text-gray-300">authMiddleware.md</span>
                    <span className="ml-auto text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">Auto-generated</span>
                  </div>
                  <div className="font-serif text-xs text-gray-300 leading-relaxed flex-grow overflow-auto">
                    <p className="text-lg font-medium text-white">Authentication Middleware</p>
                    <p className="mt-2 text-gray-300">This middleware handles JWT authentication for protected routes.</p>
                    <p className="mt-4 text-sm font-medium text-emerald-400">Functionality:</p>
                    <ul className="mt-2 space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span>Extracts JWT token from request headers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span>Verifies token authenticity using JWT_SECRET environment variable</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span>Attaches user data to request object when authenticated</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span>Returns appropriate error responses for authentication failures</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm font-medium text-emerald-400">Usage Example:</p>
                    <div className="mt-2 p-2 bg-gray-800 rounded font-mono text-xs">
                      <div><span className="text-blue-400">const</span> authMiddleware = <span className="text-blue-400">require</span>(<span className="text-green-400">'./middleware/auth'</span>);</div>
                      <div className="mt-1">router.get(<span className="text-green-400">'/profile'</span>, authMiddleware, profileController);</div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400 italic">Last updated: 15 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action - NEW */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-900 via-indigo-950 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your documentation?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join leading engineering teams who are saving hours every week with automated documentation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-emerald-400 transition-colors"
              >
                Get started
              </Link>
              <Link
                href="/demo"
                className="text-base font-semibold leading-6 text-white flex items-center hover:text-emerald-400 transition-colors"
              >
                Request a demo <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced footer */}
      <footer className="bg-gray-900 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="space-y-8">
              <img className="h-10" src="/logo.svg" alt="Nimbic AI" />
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

// Enhanced features with clearer icons and navigation
const features = [
  {
    name: 'Automatic Documentation',
    description: 'Generate comprehensive documentation from your codebase automatically. Keep it in sync with your code through continuous updates.',
    icon: BookOpenIcon,
    href: '/features/auto-docs',
  },
  {
    name: 'Intelligent Analysis',
    description: 'Get insights into your codebase with AI-powered analysis. Understand dependencies, patterns, and potential improvements.',
    icon: Cog6ToothIcon,
    href: '/features/analysis',
  },
  {
    name: 'Real-time Updates',
    description: 'Documentation that stays current with your code. Every commit triggers automatic updates to keep your docs fresh.',
    icon: ArrowPathIcon,
    href: '/features/updates',
  },
];

// New workflow section data
const workflow = [
  {
    title: 'Connect your repository',
    description: 'Link your GitHub repository with a few clicks. We request only the necessary permissions to access your code securely.',
    icon: CodeBracketIcon,
  },
  {
    title: 'AI analyzes your codebase',
    description: 'Our AI engine scans your code, understands its structure, and identifies key components and relationships.',
    icon: ServerIcon,
  },
  {
    title: 'Documentation is generated',
    description: 'Comprehensive documentation is created in a separate repository, keeping your internal knowledge organized and accessible.',
    icon: BookOpenIcon,
  },
  {
    title: 'Sync with every change',
    description: 'As your codebase evolves, your documentation updates automatically, ensuring it never becomes outdated.',
    icon: ArrowPathIcon,
  }
];

// Footer navigation
const footerNavigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: '/docs' }
  ]
};

// Social media links
const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://x.com/NimbicAI/',
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
    href: 'https://www.linkedin.com/company/nimbic-ai/',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];