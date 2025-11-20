export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Health Diagnostic
              </h1>
              <p className="text-sm text-gray-500">Video Analysis System</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Patients
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Reports
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}