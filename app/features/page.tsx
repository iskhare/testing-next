"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpenIcon, 
  Cog6ToothIcon, 
  ArrowPathIcon, 
  CodeBracketIcon, 
  ServerIcon, 
  ShieldCheckIcon,
  EyeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  KeyIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartBarIcon,
  CommandLineIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import '@/styles/animations.css';

// Feature categories
const categories = [
  { id: 'documentation', name: 'Documentation' },
  { id: 'analysis', name: 'Code Analysis' },
  { id: 'collaboration', name: 'Collaboration' },
  { id: 'integration', name: 'Integrations' },
  { id: 'security', name: 'Security' }
];

// Feature data
const features = [
  {
    name: 'Automatic Documentation Generation',
    shortDescription: 'Automatically create comprehensive documentation from your codebase with AI-powered analysis.',
    description: 'Our advanced AI analyzes your codebase and automatically generates clear, comprehensive documentation that explains code functionality, structure, and usage. The documentation evolves as your code changes, ensuring it\'s always up-to-date.',
    icon: BookOpenIcon,
    category: 'documentation',
    tags: ['AI-Powered', 'Time-saving', 'Documentation'],
    benefits: [
      'Save hundreds of developer hours by automating documentation tasks',
      'Ensure documentation stays in sync with code through continuous updates',
      'Standardize documentation format across your entire organization',
      'Improve onboarding experience for new team members'
    ],
    example: '// Sample auto-generated documentation for a function\n\n/**\n * authenticateUser(credentials)\n * \n * Authenticates a user with provided credentials against the database\n * and generates a signed JWT token on success.\n * \n * @param {Object} credentials - User login credentials\n * @param {string} credentials.email - User\'s email address\n * @param {string} credentials.password - User\'s password (will be hashed)\n * \n * @returns {Promise<string>} JWT token on successful authentication\n * @throws {AuthError} If credentials are invalid\n * \n * @dependencies: jsonwebtoken, bcrypt, User model\n * @lastUpdated: 2 hours ago by PR #123\n */\n',
    learnMoreLink: '/features/auto-docs'
  },
  {
    name: 'Real-time Documentation Updates',
    shortDescription: 'Keep documentation synchronized with your codebase through continuous integration.',
    description: 'With our real-time synchronization, documentation is automatically updated whenever code changes are committed. This ensures your team always has access to the most current documentation without manual intervention.',
    icon: ArrowPathIcon,
    category: 'documentation',
    tags: ['CI/CD', 'Real-time', 'Documentation'],
    benefits: [
      'Eliminate outdated documentation with automatic updates',
      'Trace documentation changes alongside code changes in version history',
      'Maintain documentation accuracy as your codebase evolves',
      'Reduce technical debt from documentation drift'
    ],
    example: '// Commit: #f3a2e94 (15 minutes ago)\n// Author: jane.doe@company.com\n// Message: Update user authentication method\n\n--- Updated Documentation Files ---\n  > auth/authentication.md\n  > api/endpoints/users.md\n  > schemas/user.md',
    learnMoreLink: '/features/real-time-updates'
  },
  {
    name: 'Intelligent Code Analysis',
    shortDescription: 'Gain deep insights into code structure, dependencies, and potential improvements.',
    description: 'Our AI-powered code analysis engine examines your codebase to identify patterns, dependencies, and optimization opportunities. This provides valuable insights to improve code quality and maintainability.',
    icon: Cog6ToothIcon,
    category: 'analysis',
    tags: ['AI-Powered', 'Code Quality', 'Analysis'],
    benefits: [
      'Discover hidden dependencies and potential refactoring opportunities',
      'Identify code patterns and architectural decisions throughout your codebase',
      'Understand impact analysis before making changes',
      'Receive suggestions for code optimization and best practices'
    ],
    example: '--- Code Analysis Report ---\n\nDependency Graph: 23 modules analyzed\nHigh Centrality Modules: auth.js, database.js, userController.js\nPotential Abstraction Opportunity: Similar validation patterns detected in 5 files\nRefactoring Suggestion: Consider implementing shared validation middleware',
    learnMoreLink: '/features/code-analysis'
  },
  {
    name: 'Customizable Documentation Templates',
    shortDescription: 'Tailor documentation formats to meet your team\'s specific needs and preferences.',
    description: 'Create and customize documentation templates that reflect your team\'s standards and requirements. Control formatting, organization, and content structure to generate documentation that fits your workflow.',
    icon: DocumentTextIcon,
    category: 'documentation',
    tags: ['Customization', 'Templates', 'Documentation'],
    benefits: [
      'Design documentation that matches your team\'s preferred format',
      'Create multiple templates for different documentation types',
      'Include custom sections, tags, and metadata fields',
      'Enforce documentation standards across projects'
    ],
    example: '// Custom template configuration\n\ndocTemplate: {\n  sections: [\n    "overview",\n    "parameters",\n    "returns",\n    "examples",\n    "security-considerations"\n  ],\n  requiredFields: ["author", "lastReviewed"],\n  format: "markdown",\n  outputDirectory: "./docs/api"\n}',
    learnMoreLink: '/features/templates'
  },
  {
    name: 'Collaborative Documentation Editing',
    shortDescription: 'Allow team members to collaborate on documentation improvements in real-time.',
    description: 'Enable your entire team to review, edit, and enhance documentation collaboratively. Comments, suggestions, and revisions are tracked, providing a seamless workflow for documentation refinement.',
    icon: UserGroupIcon,
    category: 'collaboration',
    tags: ['Collaboration', 'Team', 'Documentation'],
    benefits: [
      'Allow subject matter experts to refine auto-generated documentation',
      'Track contribution history and document evolution over time',
      'Enable discussion and clarification within documentation',
      'Streamline review and approval processes'
    ],
    example: '/* Comment thread on authentication.md */\n\nAlex (2 days ago): We should clarify the token expiration behavior here.\nEmma (yesterday): Added details about the JWT expiration and refresh token process.\nAlex (today): Looks good! Approved the changes.',
    learnMoreLink: '/features/collaboration'
  },
  {
    name: 'GitHub Integration',
    shortDescription: 'Seamlessly connect Nimbic AI to your GitHub repositories for continuous documentation.',
    description: 'Our GitHub integration enables automatic documentation generation as part of your pull request workflow. Documentation updates are created alongside code changes, making it easy to review and maintain documentation.',
    icon: CodeBracketIcon,
    category: 'integration',
    tags: ['GitHub', 'Integration', 'CI/CD'],
    benefits: [
      'Generate documentation previews for every pull request',
      'Enforce documentation quality as part of your code review process',
      'Automatically commit documentation updates to your docs repository',
      'Maintain documentation version history aligned with code'
    ],
    example: '// Pull Request #143: Add user authentication features\n\n--- Documentation Changes ---\nGenerated 3 new documentation files:\n  > docs/auth/login.md\n  > docs/auth/registration.md\n  > docs/models/user.md\n\nView the documentation preview → ',
    learnMoreLink: '/features/github-integration'
  },
  {
    name: 'Context-Aware Documentation',
    shortDescription: 'Generate documentation that understands the broader context of your codebase.',
    description: 'Our AI engine doesn\'t just document individual functions—it understands how components interact within your system. This creates documentation that captures the full context and relationships between different parts of your codebase.',
    icon: EyeIcon,
    category: 'documentation',
    tags: ['AI-Powered', 'Context', 'Documentation'],
    benefits: [
      'Understand how components interact across your system',
      'Document architectural decisions and design patterns',
      'Gain insights into data flow and process sequences',
      'Create higher-level documentation that explains the big picture'
    ],
    example: '--- Generated Architecture Overview ---\n\n## User Authentication Flow\nThe authentication system consists of the following components:\n\n1. **AuthController** - Handles HTTP requests and responses\n2. **AuthService** - Contains business logic for authentication\n3. **UserRepository** - Manages data persistence\n4. **JwtMiddleware** - Verifies token validity for protected routes\n\n*See interaction diagram below for request flow*',
    learnMoreLink: '/features/context-aware-docs'
  },
  {
    name: 'Private and Secure',
    shortDescription: 'Keep your code secure with our privacy-first approach to documentation.',
    description: 'We prioritize your data security. Your code never leaves your environment, and all processing occurs within your secure infrastructure. We maintain strict access controls and encryption to protect your intellectual property.',
    icon: ShieldCheckIcon,
    category: 'security',
    tags: ['Security', 'Privacy', 'Compliance'],
    benefits: [
      'Keep sensitive code within your secure environment',
      'Control who has access to generated documentation',
      'Maintain compliance with data protection regulations',
      'Protect your intellectual property'
    ],
    example: '// Security Configuration\n\nsecurity: {\n  dataProcessing: "local-only",\n  codeStorage: "none",\n  encryption: "AES-256",\n  accessControl: "RBAC",\n  auditLogging: true,\n  dataRetention: "none"\n}',
    learnMoreLink: '/features/security'
  },
  {
    name: 'Multi-language Support',
    shortDescription: 'Generate documentation for all major programming languages and frameworks.',
    description: 'Our platform supports documentation generation for a wide range of programming languages and frameworks. Whether you\'re using JavaScript, Python, Java, or specialized frameworks, we\'ve got you covered.',
    icon: CommandLineIcon,
    category: 'documentation',
    tags: ['Multi-language', 'Flexibility', 'Documentation'],
    benefits: [
      'Document polyglot codebases with consistent formatting',
      'Support for 20+ programming languages and frameworks',
      'Language-specific documentation features and conventions',
      'Custom parsers for domain-specific languages'
    ],
    example: '// Supported Languages\n\nlanguages: [\n  "JavaScript/TypeScript",\n  "Python",\n  "Java",\n  "C#",\n  "Go",\n  "Ruby",\n  "PHP",\n  "Rust",\n  "Swift",\n  "Kotlin"\n  // and many more...\n]',
    learnMoreLink: '/features/languages'
  },
  {
    name: 'API Documentation Generator',
    shortDescription: 'Create beautiful, interactive API documentation automatically.',
    description: 'Automatically generate comprehensive API documentation from your codebase, including endpoints, parameters, response formats, and authentication requirements. The result is beautiful, interactive documentation that helps developers integrate with your API.',
    icon: ServerIcon,
    category: 'documentation',
    tags: ['API', 'OpenAPI', 'Documentation'],
    benefits: [
      'Generate OpenAPI/Swagger specifications automatically',
      'Create interactive API reference documentation',
      'Document request/response examples with real data',
      'Keep API documentation in sync with implementation'
    ],
    example: '# User API\n\n## GET /api/users/:id\n\nRetrieve a user by their ID.\n\n**Authentication:** Bearer Token required\n**Permissions:** `users:read`\n\n### Parameters\n\n| Name | Located in | Description | Required | Type |\n| ---- | ---------- | ----------- | -------- | ---- |\n| id   | path       | User ID     | Yes      | UUID |\n\n### Responses\n\n**200** - Success\n```json\n{\n  "id": "a1b2c3d4",\n  "name": "Jane Smith",\n  "email": "jane@example.com",\n  "role": "admin"\n}\n```',
    learnMoreLink: '/features/api-docs'
  },
  {
    name: 'Documentation Analytics',
    shortDescription: 'Gain insights into documentation usage and identify improvement opportunities.',
    description: 'Track how your team interacts with documentation to understand what\'s most valuable and where improvements are needed. Our analytics dashboard provides visibility into documentation usage patterns and quality metrics.',
    icon: ChartBarIcon,
    category: 'analysis',
    tags: ['Analytics', 'Insights', 'Documentation'],
    benefits: [
      'Identify most frequently accessed documentation',
      'Discover knowledge gaps in your documentation',
      'Measure documentation quality and completeness',
      'Track documentation usage across teams'
    ],
    example: '--- Documentation Analytics (Last 30 Days) ---\n\nMost Viewed Pages:\n1. Authentication API (342 views)\n2. Database Schema (209 views)\n3. Deployment Process (187 views)\n\nDocumentation Health Score: 87/100\nRecent Improvement: +12 points (last 90 days)\nCoverage: 93% of codebase has documentation\nFreshness: 89% updated within last 3 months',
    learnMoreLink: '/features/analytics'
  },
  {
    name: 'Smart Search & Navigation',
    shortDescription: 'Find the documentation you need instantly with context-aware search.',
    description: 'Our intelligent search system understands the structure and context of your documentation, making it easy to find exactly what you\'re looking for. Advanced filtering and navigation features help developers quickly locate relevant information.',
    icon: ChatBubbleLeftRightIcon,
    category: 'collaboration',
    tags: ['Search', 'Navigation', 'Documentation'],
    benefits: [
      'Locate specific documentation instantly with semantic search',
      'Filter results by language, framework, or component',
      'Navigate between related documentation topics easily',
      'Discover connections between different parts of your system'
    ],
    example: '--- Search Results for "user authentication" ---\n\n1. Auth Service > authenticateUser() function\n   *Authenticates user credentials and generates JWT token*\n\n2. API Reference > POST /api/auth/login\n   *Endpoint for user authentication*\n\n3. Middleware > requireAuth()\n   *Protects routes requiring authentication*\n\n4. Architecture > Authentication Flow\n   *Overview of the authentication process*\n\nRelated topics: JWT, Authorization, User Registration',
    learnMoreLink: '/features/search'
  },
  {
    name: 'AI Documentation Assistant',
    shortDescription: 'Get answers to your codebase questions with our interactive AI assistant.',
    description: 'Our AI-powered documentation assistant can answer questions about your codebase, explain complex functions, and help developers understand system architecture. It\'s like having an expert who knows your entire codebase available at all times.',
    icon: ChatBubbleBottomCenterTextIcon,
    category: 'collaboration',
    tags: ['AI-Powered', 'Assistant', 'Documentation'],
    benefits: [
      'Get immediate answers to questions about the codebase',
      'Receive explanations of complex code and architecture',
      'Accelerate onboarding for new team members',
      'Reduce interruptions and context-switching for your team'
    ],
    example: '--- AI Assistant Chat ---\n\nDeveloper: How does our password reset flow work?\n\nAI Assistant: The password reset flow involves several components:\n\n1. The user requests a reset via `ForgotPasswordController.requestReset()`\n2. A unique token is generated and stored in the database (`ResetTokenService`)\n3. An email with a reset link is sent to the user (`EmailService`)\n4. When the user clicks the link, `ResetPasswordController.validateToken()` verifies the token\n5. The user submits a new password which is processed by `ResetPasswordController.updatePassword()`\n\nWould you like me to explain any particular component in more detail?',
    learnMoreLink: '/features/ai-assistant'
  },
  {
    name: 'Knowledge Graph',
    shortDescription: 'Visualize the relationships between components in your codebase.',
    description: 'Our knowledge graph provides a visual representation of your codebase, showing how different components relate to each other. This helps developers understand complex systems and navigate connections between various parts of your application.',
    icon: CpuChipIcon,
    category: 'analysis',
    tags: ['Visualization', 'Knowledge Graph', 'Architecture'],
    benefits: [
      'Visualize dependencies and relationships between components',
      'Understand the impact of changes across your system',
      'Navigate complex architectures more easily',
      'Identify architectural patterns and potential improvements'
    ],
    example: '--- Knowledge Graph Visualization ---\n\n• UserController depends on → UserService\n• UserService depends on → UserRepository, AuthService\n• AuthService depends on → JwtUtil, PasswordEncoder\n• UserRepository depends on → Database\n\nCentrality Analysis:\n• High Impact Components: UserService, AuthService\n• Isolated Components: NotificationService, LoggingUtil',
    learnMoreLink: '/features/knowledge-graph'
  },
  {
    name: 'Advanced Access Control',
    shortDescription: 'Control who can access, edit, and manage documentation with granular permissions.',
    description: 'Our advanced access control system lets you define exactly who can view, edit, or manage different parts of your documentation. Implement role-based access policies that align with your organization\'s security requirements.',
    icon: KeyIcon,
    category: 'security',
    tags: ['Security', 'Access Control', 'Permissions'],
    benefits: [
      'Set granular permissions for different documentation sections',
      'Implement role-based access control for teams',
      'Restrict sensitive documentation to authorized personnel',
      'Track documentation access and changes for compliance'
    ],
    example: '--- Access Control Configuration ---\n\nroles:\n  - name: "Admin"\n    permissions: ["read:all", "write:all", "manage:all"]\n    \n  - name: "Developer"\n    permissions: ["read:all", "write:code", "write:api"]\n    \n  - name: "Product"\n    permissions: ["read:all", "write:product"]\n    \n  - name: "External"\n    permissions: ["read:public"]\n\ngroups:\n  - name: "Backend Team"\n    roles: ["Developer"]\n    scope: ["services/", "api/"]\n\n  - name: "Frontend Team"\n    roles: ["Developer"]\n    scope: ["ui/", "components/"]',
    learnMoreLink: '/features/access-control'
  }
];

// Spotlight features
const spotlightFeatures = [
  {
    title: 'Code Understanding AI',
    description: 'Our proprietary AI understands code semantics, context, and relationships to generate documentation that explains not just what the code does, but why it works that way and how it fits into the broader system architecture.',
    icon: CpuChipIcon,
    tip: 'The AI works best when your codebase follows consistent naming conventions and includes basic comments for complex logic.'
  },
  {
    title: 'Continuous Documentation',
    description: 'Documentation becomes a part of your development lifecycle, automatically updating with every code change. Our integration with CI/CD pipelines means your documentation is always in sync with your code, eliminating documentation drift.',
    icon: ArrowPathIcon,
    tip: 'Set up documentation quality gates in your CI pipeline to ensure documentation meets standards before merging.'
  },
  {
    title: 'Collaborative Knowledge Hub',
    description: 'Beyond mere documentation, Nimbic AI creates a living knowledge hub for your team. Search, navigate, and understand complex systems through interactive visualizations, semantic search, and an AI assistant that answers questions about your codebase.',
    icon: UserGroupIcon,
    tip: 'Encourage team members to regularly refine auto-generated documentation to add context and insights that only humans can provide.'
  }
];

// Use cases
const useCases = [
  {
    title: 'Startups & Small Teams',
    description: 'Perfect for teams moving fast without the resources to create and maintain extensive documentation manually.',
    icon: BookOpenIcon,
    benefits: [
      'Start with good documentation habits from day one',
      'Reduce onboarding time for new engineers',
      'Maintain documentation without dedicated resources',
      'Scale your codebase without scaling documentation effort'
    ],
    tags: ['Seed Stage', 'Series A', 'Lean Teams'],
    link: '/use-cases/startups'
  },
  {
    title: 'Enterprise Organizations',
    description: 'Ideal for large codebases with multiple teams where keeping documentation in sync is traditionally challenging.',
    icon: ServerIcon,
    benefits: [
      'Standardize documentation across teams and projects',
      'Keep historical documentation accurate as systems evolve',
      'Support compliance and audit requirements',
      'Reduce knowledge silos between departments'
    ],
    tags: ['Fortune 500', 'Regulated Industries', 'Large Teams'],
    link: '/use-cases/enterprise'
  },
  {
    title: 'Open Source Projects',
    description: 'Help contributors understand your project quickly and reduce maintainer burden for documentation.',
    icon: CodeBracketIcon,
    benefits: [
      'Lower the barrier to entry for new contributors',
      'Keep documentation up-to-date without maintainer overhead',
      'Generate consistent documentation for APIs and components',
      'Improve project adoption with better documentation'
    ],
    tags: ['GitHub', 'Contributors', 'Community'],
    link: '/use-cases/open-source'
  },
  {
    title: 'Development Agencies',
    description: 'Deliver better client handoffs with comprehensive documentation that doesn\'t consume billable hours.',
    icon: ChatBubbleLeftRightIcon,
    benefits: [
      'Create professional documentation deliverables automatically',
      'Reduce time spent on client-facing documentation',
      'Improve client satisfaction and project handoff',
      'Maintain documentation across multiple client projects'
    ],
    tags: ['Client Work', 'Project Handoff', 'Efficiency'],
    link: '/use-cases/agencies'
  }
];

// Comparison data
const comparisonData = [
  { 
    feature: 'Automatic Generation', 
    nimbicAI: true, 
    manual: false,
    traditional: false
  },
  { 
    feature: 'Real-time Updates', 
    nimbicAI: true, 
    manual: false,
    traditional: 'Limited'
  },
  { 
    feature: 'AI-Powered Context', 
    nimbicAI: true, 
    manual: 'Depends on writer',
    traditional: false
  },
  { 
    feature: 'Code Analysis', 
    nimbicAI: true, 
    manual: false,
    traditional: false
  }
];

// FAQ data
const faqs = [
  {
    question: 'How does Nimbic AI generate documentation?',
    answer: 'Nimbic AI uses advanced machine learning models to analyze your codebase, understand its structure and functionality, and generate comprehensive documentation that explains both what the code does and why it works that way.'
  },
  {
    question: 'What programming languages are supported?',
    answer: 'Nimbic AI supports all major programming languages including JavaScript/TypeScript, Python, Java, C#, Go, and more. Our AI models are trained to understand the unique characteristics of each language.'
  },
  {
    question: 'How does real-time documentation updates work?',
    answer: 'Nimbic AI integrates with your version control system and automatically updates documentation whenever code changes are committed. This ensures your documentation stays in sync with your codebase.'
  }
];

// Social links
const socialLinks = [
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

export default function FeaturesPage() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  
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

  // Filter features based on active category
  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

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
        
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Powerful Features for Modern Development
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover how Nimbic AI transforms your codebase documentation with intelligent automation and powerful insights.
          </p>
          
          {/* Category filters */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All Features
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature) => (
              <div 
                key={feature.name}
                onClick={() => setSelectedFeature(feature)}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-gray-300">
                  {feature.shortDescription}
                </p>
                <div className="mt-4 flex items-center text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span className="text-sm">Learn more</span>
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Feature tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {feature.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature Spotlight Section */}
      <div className="bg-gray-900/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Spotlight
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Core Technology Advantages
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Nimbic AI leverages cutting-edge technology to deliver best-in-class documentation solutions for modern development teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {spotlightFeatures.map((feature, idx) => (
              <div key={feature.title} className="relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="text-[180px] font-bold text-emerald-500">
                    {idx + 1}
                  </div>
                </div>
                <div className="relative bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-white/5 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 flex-grow">
                    {feature.description}
                  </p>
                  <div className="rounded-lg bg-emerald-900/30 p-4 border border-emerald-500/20">
                    <feature.icon className="h-6 w-6 text-emerald-400 mb-2" />
                    <p className="text-sm text-emerald-300">
                      <span className="font-semibold">Pro Tip:</span> {feature.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Use Cases Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Use Cases
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Perfect for Teams of All Sizes
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              From startups to enterprise organizations, Nimbic AI adapts to your team's unique documentation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-emerald-500/20 transition-all group">
                <div className="p-8">
                  <div className="mb-4 flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <useCase.icon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {useCase.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-400 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-8 py-4 bg-emerald-900/20 border-t border-white/5 flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={useCase.link} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center">
                    <span>Learn more</span>
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Comparison Section */}
      <div className="bg-gray-900/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">
              Why Nimbic AI?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Revolutionary Approach to Documentation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              See how Nimbic AI compares to traditional documentation methods and competitors.
            </p>
          </div>
          
          <div className="mt-16 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"></th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-emerald-500/20">
                          <img src="/logo.svg" alt="Nimbic AI" className="h-5 w-5" />
                        </div>
                        <span>Nimbic AI</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Manual Documentation</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Traditional Doc Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {comparisonData.map((item) => (
                    <tr key={item.feature}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{item.feature}</td>
                      <td className="px-3 py-4">
                        {item.nimbicAI === true ? (
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-white">Yes</span>
                          </div>
                        ) : (
                          <span className="text-emerald-400">{item.nimbicAI}</span>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        {item.manual === true ? (
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-white">Yes</span>
                          </div>
                        ) : item.manual === false ? (
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-white">No</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">{item.manual}</span>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        {item.traditional === true ? (
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-white">Yes</span>
                          </div>
                        ) : item.traditional === false ? (
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 text-white">No</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">{item.traditional}</span>
                        )}
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
              Common Questions About Nimbic AI
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Everything you need to know about our powerful documentation solution.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl divide-y divide-gray-700">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-lg font-medium text-white flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {faq.question}
                </h3>
                <p className="mt-3 text-gray-300 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
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
                to="/signup"
                className="rounded-md bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-emerald-400 transition-colors"
              >
                Get started
              </Link>
              <Link
                to="/demo"
                className="text-base font-semibold leading-6 text-white flex items-center hover:text-emerald-400 transition-colors"
              >
                Request a demo <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setSelectedFeature(null)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-gray-800 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onClick={() => setSelectedFeature(null)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10">
                    <selectedFeature.icon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-white">{selectedFeature.name}</h3>
                </div>
                
                <div className="mb-8">
                  <p className="text-gray-300 text-lg">{selectedFeature.description}</p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Benefits</h4>
                  <ul className="space-y-3">
                    {selectedFeature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-400 mt-0.5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedFeature.example && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Example</h4>
                    <div className="bg-gray-900 rounded-lg p-4 border border-white/10">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {selectedFeature.example}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedFeature.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none"
                    onClick={() => setSelectedFeature(null)}
                  >
                    Close
                  </button>
                  <Link
                    to={selectedFeature.learnMoreLink || '/docs'}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 border border-transparent rounded-md hover:bg-emerald-600 focus:outline-none"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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