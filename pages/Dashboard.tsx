import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Card, Button, StatusBadge } from '../components/UI';
import { mockDb } from '../services/mockDb';
import { Case } from '../types';
import { Icons } from '../constants';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ logout }: { logout: () => void }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCases(mockDb.getCases());
  }, []);

  const stats = {
    total: cases.length,
    pending: cases.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length,
    resolved: cases.filter(c => c.status === 'Resolved').length,
  };

  return (
    <DashboardLayout logout={logout}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-900 border-slate-800">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-brand-blue">
                <Icons.DocumentText />
              </div>
              <div>
                 <p className="text-sm text-slate-400">Total Cases</p>
                 <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
           </div>
        </Card>
        <Card>
           <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg text-brand-accent">
                <Icons.Scale />
              </div>
              <div>
                 <p className="text-sm text-slate-400">Action Required</p>
                 <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
           </div>
        </Card>
        <Card>
           <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <Icons.ShieldCheck />
              </div>
              <div>
                 <p className="text-sm text-slate-400">Resolved</p>
                 <p className="text-2xl font-bold text-white">{stats.resolved}</p>
              </div>
           </div>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Cases</h2>
        <Button onClick={() => navigate('/admin/new-case')}>
           <Icons.Plus /> New Case
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
               <tr>
                  <th className="px-6 py-4 font-medium">Case ID</th>
                  <th className="px-6 py-4 font-medium">Platform</th>
                  <th className="px-6 py-4 font-medium">Infringing URL</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
               {cases.map(c => (
                 <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-300">{c.id}</td>
                    <td className="px-6 py-4 text-slate-300">{c.platform}</td>
                    <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">{c.infringingUrl}</td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4">
                       <button 
                         onClick={() => navigate(`/admin/case/${c.id}`)}
                         className="text-brand-blue hover:text-blue-400 font-medium hover:underline"
                       >
                         Manage
                       </button>
                    </td>
                 </tr>
               ))}
               {cases.length === 0 && (
                 <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                     No cases found. Start by submitting a new case.
                   </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;