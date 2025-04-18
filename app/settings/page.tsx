import React from 'react';

export default function Settings() {
  const handleGithubAppInstall = () => {
    // Redirect to GitHub App installation page
    window.location.href = `https://github.com/apps/nimbic-ai/installations/new`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-gray-200">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white">Profile Settings</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent bg-white/5 text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent bg-white/5 text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white">GitHub Integration</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-200">Install our GitHub App to enable advanced repository features</p>
          <button
            onClick={handleGithubAppInstall}
            className="mt-4 flex items-center justify-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                fill="currentColor"
              />
            </svg>
            <span>Install Nimbic AI GitHub App</span>
          </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white">API Settings</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-200">Manage your API keys and access tokens</p>
          <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-accent-400">
            Generate New API Key
          </button>
        </div>
      </div>
    </div>
  );
} 