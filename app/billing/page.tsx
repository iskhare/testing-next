import React from 'react';

export default function Billing() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-brand-secondary">Billing</h1>
        <p className="mt-2 text-gray-600">Manage your subscription and payment methods</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-brand-secondary">Current Plan</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">You are currently on the Free plan</p>
          <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-accent-400">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-brand-secondary">Payment Methods</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">No payment methods added</p>
          <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-accent-400">
            Add Payment Method
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-brand-secondary">Billing History</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">No billing history available</p>
        </div>
      </div>
    </div>
  );
} 