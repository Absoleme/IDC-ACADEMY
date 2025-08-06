export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="IDC Academy" className="h-10 w-auto mr-3" />
            <span className="text-xl font-bold text-gray-900">IDC ACADEMY</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#contact" className="btn-primary">
              Contact
            </a>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
