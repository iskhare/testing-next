export default function Dashboard() {
    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-200">Welcome to your Nimbic AI dashboard</p>
        </div>
  
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-200">Total Documents</h3>
            <p className="mt-2 text-3xl font-bold text-brand-accent">0</p>
          </div>
  
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-200">Active Projects</h3>
            <p className="mt-2 text-3xl font-bold text-brand-accent">0</p>
          </div>
  
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-200">API Usage</h3>
            <p className="mt-2 text-3xl font-bold text-brand-accent">0</p>
          </div>
        </div>
  
        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-200">Recent Activity</h2>
          <div className="mt-4">
            <p className="text-gray-400">No recent activity</p>
          </div>
        </div>
      </div>
    );
  }