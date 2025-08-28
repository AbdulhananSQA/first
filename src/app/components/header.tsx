// app/components/Header.tsx
'use client';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'analyzer';
  setCurrentPage: (page: 'home' | 'about' | 'analyzer') => void;
}

const Header = ({ currentPage, setCurrentPage }: HeaderProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'analyzer', label: 'CV Analyzer', icon: '📄' },
  ] as const;

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
              <span className="text-2xl font-bold">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">CV Analyzer Pro</h1>
              <p className="text-sm text-gray-500">Smart CV Analysis Tool</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:scale-110 transition-transform duration-200"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;