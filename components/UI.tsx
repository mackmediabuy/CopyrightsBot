import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-brand-blue/25 focus:ring-brand-blue",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-500",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 focus:ring-red-500",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>}
    <input 
      className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors ${className}`}
      {...props}
    />
  </div>
);

export const Textarea = ({ label, className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>}
    <textarea 
      className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors ${className}`}
      {...props}
    />
  </div>
);

export const Select = ({ label, options, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string, options: string[] }) => (
  <div className="w-full">
     {label && <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>}
     <div className="relative">
       <select 
         className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-200 appearance-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors ${className}`}
         {...props}
       >
         {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
       </select>
       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
       </div>
     </div>
  </div>
);

export const Card = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const StatusBadge = ({ status }: { status: string }) => {
  let colors = "bg-slate-800 text-slate-400 border-slate-700";
  
  switch(status) {
    case 'Resolved': colors = "bg-green-500/10 text-green-400 border-green-500/20"; break;
    case 'Rejected': colors = "bg-red-500/10 text-red-400 border-red-500/20"; break;
    case 'Under Review': colors = "bg-brand-blue/10 text-brand-blue border-brand-blue/20"; break;
    case 'Submitted': colors = "bg-brand-accent/10 text-brand-accent border-brand-accent/20"; break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors}`}>
      {status}
    </span>
  );
};