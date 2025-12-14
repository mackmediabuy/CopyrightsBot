import React, { useState, useRef, useEffect } from 'react';
import { APP_NAME, Icons } from '../constants';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-accent selection:text-brand-900">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-tr from-brand-blue to-purple-600 rounded-lg group-hover:scale-105 transition-transform">
                 <Icons.ShieldCheck />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">{APP_NAME}</span>
            </Link>
            
            {/* Desktop & Mobile Menu Wrapper */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <span className="hidden sm:inline text-sm font-medium">Menu</span>
                <Icons.Menu />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    <Link 
                      to="/" 
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/submit-claim" 
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Submit Complaint
                    </Link>
                    <Link 
                      to="/status" 
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Track Status
                    </Link>
                    <div className="border-t border-slate-800 my-1"></div>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm text-brand-blue hover:bg-brand-blue/10 font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p className="mb-4">{APP_NAME} is an automated reporting tool. We are not a law firm.</p>
            <p>&copy; {new Date().getFullYear()} Elite Rights Protection. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export const DashboardLayout: React.FC<LayoutProps & { logout: () => void }> = ({ children, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Icons.Scale /> },
    { label: 'Submit Case', path: '/admin/new-case', icon: <Icons.Plus /> },
    { label: 'DMCA Generator', path: '/admin/dmca', icon: <Icons.DocumentText /> },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900">
        <span className="font-bold text-xl text-white tracking-tight">{APP_NAME}</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive 
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            Back to Website
          </button>

          <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Admin ID</p>
            <p className="font-mono text-brand-accent">3101</p>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-lg transition-colors border border-red-400/20"
          >
            Sign Out
          </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-30">
         <span className="font-bold text-lg text-white tracking-tight">{APP_NAME}</span>
         <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-300">
           <Icons.Menu />
         </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
           {/* Backdrop */}
           <div 
             className="fixed inset-0 bg-black/50 backdrop-blur-sm"
             onClick={() => setMobileMenuOpen(false)}
           ></div>
           
           {/* Sidebar Panel */}
           <aside className="relative w-64 bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              >
                <Icons.X />
              </button>
              <SidebarContent />
           </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
         <header className="hidden md:flex h-16 bg-slate-900/50 backdrop-blur border-b border-slate-800 items-center justify-between px-8 sticky top-0 z-20">
            <h1 className="text-lg font-semibold text-white">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-slate-400">System Online</span>
            </div>
         </header>
         <main className="flex-1 p-4 md:p-8 overflow-y-auto">
           {children}
         </main>
      </div>
    </div>
  );
};