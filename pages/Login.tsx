import React, { useState } from 'react';
import { Button, Input, Card } from '../components/UI';
import { Icons, APP_NAME } from '../constants';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  login: (id: string, pass: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(id, pass)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Admin ID or Password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 w-full h-1/2 bg-brand-blue/10 blur-[100px] pointer-events-none"></div>

      <div className="mb-8 text-center z-10">
         <div className="w-16 h-16 bg-gradient-to-tr from-brand-blue to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-blue/20">
            <div className="text-white scale-150"><Icons.LockClosed /></div>
         </div>
         <h1 className="text-3xl font-bold text-white tracking-tight">{APP_NAME}</h1>
         <p className="text-slate-400 mt-2">Sign in to your dashboard</p>
      </div>

      <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur border-slate-700 z-10">
        <form onSubmit={handleLogin} className="space-y-6">
           <Input 
             label="User ID" 
             placeholder="Enter User ID"
             value={id}
             onChange={e => setId(e.target.value)}
             className="bg-slate-950"
           />
           <Input 
             label="Password" 
             type="password" 
             placeholder="••••••••"
             value={pass}
             onChange={e => setPass(e.target.value)}
             className="bg-slate-950"
           />
           
           {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">{error}</p>}

           <Button type="submit" className="w-full h-11 text-base">
             Authenticate
           </Button>

           <div className="text-center">
             <button type="button" onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-300 text-sm">
               Return to Public Site
             </button>
           </div>
        </form>
      </Card>
      
      <p className="mt-8 text-slate-500 text-sm">
        Don't have an account? <span className="text-brand-blue cursor-pointer hover:underline">Contact Support</span>
      </p>
    </div>
  );
};

export default Login;